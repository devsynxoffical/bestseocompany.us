<?php
/**
 * POST /api/lead  (rewritten here by .htaccess)
 * Receives every form on the site and delivers it by email, optional webhook and optional CSV log.
 * Same request/response contract as the Next.js route it replaces (app/api/lead/route.ts).
 */
declare(strict_types=1);
require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['error' => 'Method not allowed.']);

$data = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($data)) respond(400, ['error' => 'Invalid request.']);

$clean = static function ($v, int $max = 300): string {
    return is_string($v) ? mb_substr(trim(str_replace(["\r", "\0"], '', $v)), 0, $max) : '';
};

// Honeypot: real visitors never fill this hidden field.
if ($clean($data['company_url'] ?? '') !== '') respond(200, ['ok' => true]);

$types = ['audit', 'backlink-report', 'traffic-report', 'rank-report', 'newsletter', 'contact'];
$lead = [
    'type'       => in_array($data['type'] ?? '', $types, true) ? $data['type'] : 'contact',
    'email'      => $clean($data['email'] ?? '', 200),
    'website'    => $clean($data['website'] ?? '', 300),
    'name'       => $clean($data['name'] ?? '', 120),
    'keywords'   => $clean($data['keywords'] ?? '', 600),
    'location'   => $clean($data['location'] ?? '', 120),
    'message'    => $clean($data['message'] ?? '', 3000),
    'page'       => $clean($data['page'] ?? '', 300),
    'receivedAt' => gmdate('c'),
];

if ($lead['email'] !== '' && !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) respond(400, ['error' => 'Enter a valid email address.']);
if ($lead['email'] === '' && $lead['website'] === '') respond(400, ['error' => 'Enter your website or email.']);

// Basic rate limit: 10 submissions per IP per 10 minutes.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rl = sys_get_temp_dir() . '/bsc_lead_' . md5($ip);
$hits = array_filter(array_map('intval', @file($rl, FILE_IGNORE_NEW_LINES) ?: []), static fn($t) => $t > time() - 600);
if (count($hits) >= 10) respond(429, ['error' => 'Too many submissions. Please try again in a few minutes.']);
$hits[] = time();
@file_put_contents($rl, implode("\n", $hits));

$delivered = false;

// 1) Email
if (LEAD_EMAIL !== '') {
    $labels = ['audit' => 'Free SEO audit request', 'contact' => 'Contact message', 'newsletter' => 'Newsletter signup',
               'backlink-report' => 'Backlink report request', 'traffic-report' => 'Traffic report request', 'rank-report' => 'Rank report request'];
    $subject = '[bestseocompany.us] ' . $labels[$lead['type']] . ($lead['website'] ? ' – ' . $lead['website'] : '');
    $body = '';
    foreach ($lead as $k => $v) if ($v !== '') $body .= str_pad(ucfirst($k) . ':', 13) . $v . "\n";
    $headers = 'From: Best SEO Company <' . LEAD_FROM . ">\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    if ($lead['email'] !== '') $headers .= 'Reply-To: ' . $lead['email'] . "\r\n";
    $delivered = @mail(LEAD_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers) || $delivered;
}

// 2) Webhook
if (LEAD_WEBHOOK_URL !== '') {
    $ch = curl_init(LEAD_WEBHOOK_URL);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => json_encode($lead), CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
                            CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8]);
    curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    $delivered = ($code >= 200 && $code < 300) || $delivered;
}

// 3) CSV backup
if (LEAD_LOG_FILE !== '') {
    $fh = @fopen(LEAD_LOG_FILE, 'a');
    if ($fh) { fputcsv($fh, array_values($lead)); fclose($fh); $delivered = true; }
}

error_log('[lead] ' . json_encode($lead));
if (!$delivered) respond(502, ['error' => "We couldn't send that right now. Please email us at " . LEAD_EMAIL . '.']);
respond(200, ['ok' => true]);
