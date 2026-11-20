<?php
/**
 * Hostinger settings for the site's two PHP endpoints.
 * Edit these values in Hostinger → File Manager → public_html/api/config.php.
 */

// Where form submissions are emailed (free audit, contact, report requests, newsletter).
// Create this mailbox in Hostinger → Emails, or use any address you read.
const LEAD_EMAIL = 'hello@bestseocompany.us';

// "From" address for those emails. Must be a mailbox on your domain or Hostinger may reject it.
const LEAD_FROM = 'noreply@bestseocompany.us';

// Optional: also POST every lead as JSON to a webhook (Zapier, Make, Slack, CRM). Leave '' to skip.
const LEAD_WEBHOOK_URL = '';

// Optional: also append every lead to a private CSV file outside the web root as a backup.
// Example: __DIR__ . '/../../leads.csv'  (public_html/../leads.csv). Leave '' to skip.
const LEAD_LOG_FILE = '';
