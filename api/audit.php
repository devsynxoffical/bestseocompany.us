<?php
/**
 * POST /api/audit  (rewritten here by .htaccess)
 * Live single-page SEO audit for /tools/seo-audit-tool. PHP port of app/api/audit/route.ts:
 * same JSON response { url, score, checkedAt, checks[] }.
 * Security: http(s) only, ports 80/443, no credentials, public IPs only (checked and pinned
 * on every redirect hop), 10s timeout, 3 MB cap, per-IP rate limit.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function out(int $status, array $body): void { http_response_code($status); echo json_encode($body); exit; }
final class Blocked extends Exception {}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['error' => 'Method not allowed.']);

// Rate limit: 8 audits per IP per minute.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rl = sys_get_temp_dir() . '/bsc_audit_' . md5($ip);
$hits = array_filter(array_map('intval', @file($rl, FILE_IGNORE_NEW_LINES) ?: []), static fn($t) => $t > time() - 60);
if (count($hits) >= 8) out(429, ['error' => 'Too many audits in a minute. Wait a moment and try again.']);
$hits[] = time();
@file_put_contents($rl, implode("\n", $hits));

$in = json_decode((string) file_get_contents('php://input'), true);
$raw = is_array($in) ? trim((string) ($in['url'] ?? '')) : '';
if ($raw === '' || strlen($raw) > 2000) out(400, ['error' => 'Enter a website address, like yourwebsite.com.']);

/* ---------------- URL safety ---------------- */
function normalize(string $raw): array {
    if (!preg_match('~^https?://~i', $raw)) $raw = 'https://' . $raw;
    $u = parse_url($raw);
    if (!$u || empty($u['host'])) throw new Blocked("That doesn't look like a valid web address.");
    $scheme = strtolower($u['scheme'] ?? '');
    if (!in_array($scheme, ['http', 'https'], true)) throw new Blocked('Only http and https URLs can be audited.');
    if (isset($u['user']) || isset($u['pass'])) throw new Blocked("URLs with credentials can't be audited.");
    if (isset($u['port']) && !in_array((int) $u['port'], [80, 443], true)) throw new Blocked('Only standard ports (80 and 443) can be audited.');
    $host = strtolower(trim($u['host'], '[]'));
    if (!str_contains($host, '.') || str_ends_with($host, '.local') || str_ends_with($host, '.internal')) throw new Blocked('Enter a public website address, like yourwebsite.com.');
    return $u + ['scheme' => $scheme, 'host' => $host];
}

function publicIp(string $host): string {
    $ips = filter_var($host, FILTER_VALIDATE_IP) ? [$host] : array_merge(
        gethostbynamel($host) ?: [],
        array_column(@dns_get_record($host, DNS_AAAA) ?: [], 'ipv6')
    );
    if (!$ips) throw new Blocked("That domain doesn't resolve.");
    foreach ($ips as $ip) {
        if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)
            || preg_match('~^(100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|198\.1[89]\.|0\.)~', $ip)) {
            throw new Blocked("That address points to a private network and can't be audited.");
        }
    }
    return $ips[0];
}

function build(array $u): string {
    return $u['scheme'] . '://' . $u['host'] . (isset($u['port']) ? ':' . $u['port'] : '') . ($u['path'] ?? '/') . (isset($u['query']) ? '?' . $u['query'] : '');
}

function resolveUrl(string $base, string $rel): string {
    if (preg_match('~^https?://~i', $rel)) return $rel;
    $b = parse_url($base);
    if (str_starts_with($rel, '//')) return $b['scheme'] . ':' . $rel;
    if (str_starts_with($rel, '/')) return $b['scheme'] . '://' . $b['host'] . (isset($b['port']) ? ':' . $b['port'] : '') . $rel;
    $dir = preg_replace('~/[^/]*$~', '/', $b['path'] ?? '/');
    return $b['scheme'] . '://' . $b['host'] . $dir . $rel;
}

/** Fetch with manual redirects; every hop is checked and DNS-pinned to the vetted IP. */
function safeFetch(string $url, int $timeout = 10, int $maxBytes = 3000000): array {
    $start = microtime(true);
    $redirects = [];
    for ($hop = 0; $hop <= 5; $hop++) {
        $u = normalize($url);
        $port = (int) ($u['port'] ?? ($u['scheme'] === 'https' ? 443 : 80));
        $ip = publicIp($u['host']);
        $body = ''; $bytes = 0; $headers = [];
        $ch = curl_init(build($u));
        curl_setopt_array($ch, [
            CURLOPT_RESOLVE => [$u['host'] . ':' . $port . ':' . (str_contains($ip, ':') ? "[$ip]" : $ip)],
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => 6,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; BestSEOCompanyAuditBot/1.0; +https://www.bestseocompany.us/tools/seo-audit-tool)',
            CURLOPT_HTTPHEADER => ['Accept: text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8'],
            CURLOPT_ENCODING => '',
            CURLOPT_HEADERFUNCTION => static function ($ch, $line) use (&$headers) {
                if (str_contains($line, ':')) { [$k, $v] = explode(':', $line, 2); $headers[strtolower(trim($k))] = trim($v); }
                return strlen($line);
            },
            CURLOPT_WRITEFUNCTION => static function ($ch, $chunk) use (&$body, &$bytes, $maxBytes) {
                $bytes += strlen($chunk);
                if ($bytes > $maxBytes) return 0; // abort: too large
                $body .= $chunk;
                return strlen($chunk);
            },
        ]);
        $ok = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $err = curl_errno($ch);
        curl_close($ch);
        if (!$ok && $err !== CURLE_WRITE_ERROR) {
            if ($err === CURLE_OPERATION_TIMEDOUT) throw new RuntimeException('timeout');
            throw new RuntimeException('fetch');
        }
        if ($status >= 300 && $status < 400 && !empty($headers['location'])) {
            $next = resolveUrl(build($u), $headers['location']);
            $redirects[] = "$status → $next";
            $url = $next;
            continue;
        }
        return ['finalUrl' => build($u), 'status' => $status, 'redirects' => $redirects, 'headers' => $headers, 'body' => $body, 'bytes' => $bytes, 'ms' => (int) round((microtime(true) - $start) * 1000)];
    }
    throw new Blocked('Too many redirects.');
}

/* ---------------- on-page checks ---------------- */
function c(string $id, string $group, string $label, string $status, string $value, string $detail): array {
    return compact('id', 'group', 'label', 'status', 'value', 'detail');
}
function len(string $s): int { return mb_strlen($s); }

function auditHtml(string $html, string $pageUrl): array {
    $checks = [];
    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_NONET | LIBXML_NOWARNING | LIBXML_NOERROR);
    libxml_clear_errors();
    $xp = new DOMXPath($doc);
    $text = static fn($n) => trim(preg_replace('~\s+~u', ' ', $n->textContent ?? ''));
    $meta = static function (string $attr, string $key) use ($xp) {
        foreach ($xp->query('//meta') as $m) if (strtolower($m->getAttribute($attr)) === $key) return $m->getAttribute('content');
        return null;
    };

    $titleNode = $xp->query('//title')->item(0);
    $title = $titleNode ? $text($titleNode) : '';
    $checks[] = c('title', 'Content', 'Title tag', !$title ? 'fail' : ((len($title) < 25 || len($title) > 65) ? 'warn' : 'pass'),
        $title ? len($title) . ' characters' : 'Missing',
        $title ? "\"$title\". Aim for roughly 30–60 characters so it isn't cut off in results." : 'Add a unique title that names the page topic and your brand.');

    $desc = $meta('name', 'description');
    $checks[] = c('description', 'Content', 'Meta description', !$desc ? 'fail' : ((len($desc) < 70 || len($desc) > 165) ? 'warn' : 'pass'),
        $desc ? len($desc) . ' characters' : 'Missing',
        $desc ? '"' . mb_substr($desc, 0, 180) . '". Aim for about 120–160 characters that sell the click.' : 'Write a short summary that tells searchers why to click. Google may still rewrite it.');

    $h1s = array_values(array_filter(array_map($text, iterator_to_array($xp->query('//body//h1')))));
    $n1 = count($h1s);
    $checks[] = c('h1', 'Content', 'H1 heading', $n1 === 1 ? 'pass' : ($n1 === 0 ? 'fail' : 'warn'), "$n1 found",
        $n1 ? '"' . mb_substr($h1s[0], 0, 120) . '"' . ($n1 > 1 ? ' plus ' . ($n1 - 1) . ' more. Use one clear H1 per page.' : '.') : 'Add one H1 that states what the page is about.');

    $h2 = $xp->query('//body//h2')->length; $h3 = $xp->query('//body//h3')->length;
    $checks[] = c('headings', 'Content', 'Heading structure', $h2 > 0 ? 'pass' : 'warn', "$h2 H2 · $h3 H3",
        $h2 > 0 ? 'Subheadings break the page into scannable sections.' : 'Add H2 subheadings so readers and search engines can follow the structure.');

    foreach (['script', 'style', 'noscript'] as $t) foreach (iterator_to_array($xp->query("//$t")) as $n) $n->parentNode?->removeChild($n);
    $body = $xp->query('//body')->item(0);
    $words = $body ? count(array_filter(preg_split('~\s+~u', $text($body)), static fn($w) => preg_match('~[\p{L}\p{N}]~u', $w))) : 0;
    $checks[] = c('words', 'Content', 'Text content', $words >= 300 ? 'pass' : ($words >= 120 ? 'warn' : 'fail'), number_format($words) . ' words',
        $words >= 300 ? 'There\'s enough text for search engines to understand the page.' : 'Thin pages struggle to rank. Explain the service, who it\'s for, location and FAQs.');

    $imgs = $xp->query('//body//img'); $missing = 0;
    foreach ($imgs as $i) if (!$i->hasAttribute('alt')) $missing++;
    $ni = $imgs->length;
    $checks[] = c('alt', 'Content', 'Image alt text', $ni === 0 ? 'info' : ($missing === 0 ? 'pass' : ($missing / $ni > 0.3 ? 'fail' : 'warn')),
        $ni ? ($ni - $missing) . "/$ni have alt" : 'No images',
        $missing ? "$missing image" . ($missing > 1 ? 's are' : ' is') . ' missing an alt attribute. Describe meaningful images; use alt="" for decorative ones.' : 'Alt text helps accessibility and image search.');

    $host = preg_replace('~^www\.~', '', strtolower((string) parse_url($pageUrl, PHP_URL_HOST)));
    $internal = 0; $external = 0;
    foreach ($xp->query('//body//a[@href]') as $a) {
        $href = trim($a->getAttribute('href'));
        if ($href === '' || $href[0] === '#' || preg_match('~^(mailto|tel|javascript):~i', $href)) continue;
        $h = preg_replace('~^www\.~', '', strtolower((string) parse_url(resolveUrl($pageUrl, $href), PHP_URL_HOST)));
        $h === $host ? $internal++ : $external++;
    }
    $checks[] = c('links', 'Content', 'Links', $internal >= 3 ? 'pass' : 'warn', "$internal internal · $external external",
        $internal >= 3 ? 'Internal links help search engines discover and rank your other pages.' : 'Link to your key service and location pages from here.');

    $canon = null;
    foreach ($xp->query('//link') as $l) if (strtolower($l->getAttribute('rel')) === 'canonical') { $canon = $l->getAttribute('href'); break; }
    $checks[] = c('canonical', 'Indexing', 'Canonical tag', $canon ? 'pass' : 'warn', $canon ? 'Present' : 'Missing',
        $canon ? "Points to $canon" : 'Add a self-referencing canonical to avoid duplicate-URL issues.');

    $robots = strtolower((string) $meta('name', 'robots'));
    $checks[] = c('robots-meta', 'Indexing', 'Meta robots', str_contains($robots, 'noindex') ? 'fail' : 'pass', $robots ?: 'Not set (indexable)',
        str_contains($robots, 'noindex') ? 'This page tells search engines not to index it. Remove noindex if it should rank.' : 'The page can be indexed.');

    $vp = $meta('name', 'viewport');
    $checks[] = c('viewport', 'Mobile', 'Mobile viewport', $vp ? 'pass' : 'fail', $vp ? 'Present' : 'Missing',
        $vp ? 'The page is set up for mobile screens.' : 'Add <meta name="viewport" content="width=device-width, initial-scale=1">. Google indexes the mobile version first.');

    $htmlEl = $xp->query('//html')->item(0);
    $lang = $htmlEl ? $htmlEl->getAttribute('lang') : '';
    $checks[] = c('lang', 'Mobile', 'Language attribute', $lang ? 'pass' : 'warn', $lang ?: 'Missing',
        $lang ? 'Declares the page language for browsers and assistive tech.' : 'Add lang="en" (or en-US) to the <html> tag.');

    $og = count(array_filter(['og:title', 'og:description', 'og:image'], static fn($p) => $meta('property', $p)));
    $checks[] = c('og', 'Sharing', 'Open Graph tags', $og === 3 ? 'pass' : ($og ? 'warn' : 'fail'), "$og/3 found",
        $og === 3 ? 'Links to this page will show a proper title, description and image when shared.' : 'Add og:title, og:description and og:image so shared links look right.');

    $types = []; $invalid = false;
    foreach ($xp->query('//script[@type="application/ld+json"]') as $s) {
        $j = json_decode($s->textContent, true);
        if ($j === null) { $invalid = true; continue; }
        $walk = static function ($n) use (&$walk, &$types) {
            if (!is_array($n)) return;
            if (isset($n['@type'])) foreach ((array) $n['@type'] as $t) if (is_string($t)) $types[$t] = true;
            if (isset($n['@graph'])) $walk($n['@graph']);
            if (array_is_list($n)) foreach ($n as $x) $walk($x);
        };
        $walk($j);
    }
    // Note: <script> nodes were removed above for word count, so re-parse JSON-LD from raw HTML if needed.
    if (!$types && !$invalid && preg_match_all('~<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>~is', $html, $m)) {
        foreach ($m[1] as $block) {
            $j = json_decode($block, true);
            if ($j === null) { $invalid = true; continue; }
            array_walk_recursive($j, static function ($v, $k) use (&$types) { if ($k === '@type' && is_string($v)) $types[$v] = true; });
        }
    }
    $tl = array_slice(array_keys($types), 0, 6);
    $checks[] = c('schema', 'Structured data', 'Structured data (JSON-LD)', $invalid ? 'fail' : ($tl ? 'pass' : 'warn'), $tl ? implode(', ', $tl) : 'None found',
        $tl ? 'Schema helps search engines and AI assistants understand your business.' : 'Add Organization or LocalBusiness schema, plus FAQ or Product where relevant.');

    return $checks;
}

/* ---------------- run ---------------- */
try {
    $page = safeFetch($raw);
    $checks = [];
    $s = $page['status'];
    $checks[] = c('status', 'Indexing', 'HTTP status', $s === 200 ? 'pass' : ($s < 400 ? 'warn' : 'fail'), (string) $s,
        $s === 200 ? 'The page loads normally.' : 'Pages you want to rank should return 200 OK.');
    $nr = count($page['redirects']);
    $checks[] = c('redirects', 'Indexing', 'Redirects', $nr === 0 ? 'pass' : ($nr === 1 ? 'info' : 'warn'), $nr ? "$nr hop" . ($nr > 1 ? 's' : '') : 'None',
        $nr ? implode(' · ', $page['redirects']) : 'The URL resolves without redirects.');
    $https = str_starts_with($page['finalUrl'], 'https://');
    $checks[] = c('https', 'Security', 'HTTPS', $https ? 'pass' : 'fail', $https ? 'Secure' : 'Not secure',
        $https ? 'The page is served over HTTPS.' : 'Serve the site over HTTPS and redirect HTTP to it.');
    $ms = $page['ms'];
    $checks[] = c('speed', 'Speed', 'Server response', $ms < 800 ? 'pass' : ($ms < 2000 ? 'warn' : 'fail'), number_format($ms / 1000, 2) . 's',
        'Time to download the HTML from our server. For full Core Web Vitals use PageSpeed Insights.');
    $b = $page['bytes'];
    $checks[] = c('size', 'Speed', 'HTML size', $b < 500000 ? 'pass' : ($b < 1500000 ? 'warn' : 'fail'), round($b / 1024) . ' KB',
        $b < 500000 ? 'The HTML document is a reasonable size.' : 'Large HTML slows rendering. Look for inlined data or bloated page builders.');

    $ct = $page['headers']['content-type'] ?? '';
    if (stripos($ct, 'html') !== false || stripos($page['body'], '<html') !== false) array_push($checks, ...auditHtml($page['body'], $page['finalUrl']));

    $p = parse_url($page['finalUrl']);
    $origin = $p['scheme'] . '://' . $p['host'] . (isset($p['port']) ? ':' . $p['port'] : '');
    $robotsTxt = ''; $sitemapUrl = "$origin/sitemap.xml"; $sitemapFound = false;
    try { $r = safeFetch("$origin/robots.txt", 5, 200000); if ($r['status'] === 200 && stripos($r['body'], '<html') === false) $robotsTxt = $r['body']; } catch (Throwable $e) {}
    if (preg_match('~^\s*sitemap:\s*(\S+)~im', $robotsTxt, $m)) $sitemapUrl = $m[1];
    try { $sm = safeFetch($sitemapUrl, 5, 300000); $sitemapFound = $sm['status'] === 200 && preg_match('~<(urlset|sitemapindex)~i', $sm['body']); } catch (Throwable $e) {}
    $blocksAll = $robotsTxt && preg_match('~^\s*disallow:\s*/\s*$~im', $robotsTxt) && preg_match('~user-agent:\s*\*~i', $robotsTxt);
    $checks[] = c('robots-txt', 'Indexing', 'robots.txt', $robotsTxt ? ($blocksAll ? 'warn' : 'pass') : 'warn', $robotsTxt ? 'Found' : 'Not found',
        $robotsTxt ? (isset($m[1]) ? 'Found, and it lists your sitemap.' : 'Found. Consider adding a Sitemap: line.') : 'Add a robots.txt at the site root with a link to your sitemap.');
    $checks[] = c('sitemap', 'Indexing', 'XML sitemap', $sitemapFound ? 'pass' : 'warn', $sitemapFound ? 'Found' : 'Not found',
        $sitemapFound ? "Found at $sitemapUrl" : 'Create an XML sitemap and submit it in Google Search Console.');

    $weight = ['pass' => 1, 'warn' => 0.5, 'fail' => 0, 'info' => 1];
    $scored = array_filter($checks, static fn($c) => $c['status'] !== 'info');
    $score = (int) round(array_sum(array_map(static fn($c) => $weight[$c['status']], $scored)) / max(1, count($scored)) * 100);

    out(200, ['url' => $page['finalUrl'], 'score' => $score, 'checkedAt' => gmdate('c'), 'checks' => array_values($checks)]);
} catch (Blocked $e) {
    out(400, ['error' => $e->getMessage()]);
} catch (RuntimeException $e) {
    if ($e->getMessage() === 'timeout') out(504, ['error' => 'The site took too long to respond (over 10 seconds).']);
    out(502, ['error' => "We couldn't load that page. Check the address and that the site is online."]);
} catch (Throwable $e) {
    out(502, ['error' => "We couldn't load that page. Check the address and that the site is online."]);
}
