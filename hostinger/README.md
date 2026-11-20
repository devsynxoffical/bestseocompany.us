# Deploying bestseocompany.us on Hostinger

The `hostinger` branch of the GitHub repo holds the **ready-to-upload website**: static HTML pages, `.htaccess`, and two PHP files (`api/lead.php` for every form, `api/audit.php` for the free SEO audit tool). No Node.js is needed on Hostinger; any plan with PHP works.

## First-time setup (about 10 minutes)

### Option A: Git deploy (recommended, one click for future updates)
1. In hPanel go to **Websites → Manage → Files → File Manager**, open `public_html` and **delete everything inside it**. Hostinger's Git deploy needs an empty folder.
2. Go to **Websites → Manage → Advanced → GIT**.
3. The repo is private, so in the GIT screen copy Hostinger's **SSH key**, then in GitHub open **devsynxoffical/bestseocompany.us → Settings → Deploy keys → Add deploy key**, paste it and save (read-only is enough).
4. Back in hPanel, under **Create a New Repository**:
   - Repository: `git@github.com:devsynxoffical/bestseocompany.us.git`
   - Branch: `hostinger`
   - Install path: leave empty (deploys to `public_html`)
5. Click **Create**, then **Deploy**.
6. Optional: turn on **Auto Deployment** and add the webhook URL Hostinger shows to GitHub (**Settings → Webhooks**). Every push to the `hostinger` branch then goes live automatically.

### Option B: Upload a ZIP
1. On GitHub, switch to the `hostinger` branch → **Code → Download ZIP**.
2. In hPanel **File Manager**, open `public_html`, upload the ZIP, then **Extract** it. Make sure the files (`index.html`, `.htaccess`, `_next/`, `api/` …) end up directly in `public_html`, not inside a sub-folder.

## After the files are live
1. **Domain:** point `bestseocompany.us` to Hostinger (hPanel → Domains; if DNS is elsewhere, use Hostinger's A record/nameservers) and **remove the old Vercel DNS records**.
2. **SSL:** hPanel → Security → SSL → install the free SSL for `bestseocompany.us` and `www.bestseocompany.us`. The `.htaccess` already redirects everything to `https://www.bestseocompany.us`.
3. **Form emails:** hPanel → Emails → create `hello@bestseocompany.us` (receives leads) and `noreply@bestseocompany.us` (sender). Then edit `public_html/api/config.php` if you want a different address, a webhook (Zapier/Make/CRM) or a CSV backup.
4. **Test:** open the site, submit the contact form, and check the inbox. Run the free audit tool on any website.
5. **Search Console:** nothing to change (the verification tag is in every page). Re-submit `https://www.bestseocompany.us/sitemap.xml`.

## Updating the site later
On a computer with the repo and Node.js 20+:

```bash
npm install
npm run build:hostinger -- --publish
```

That builds the static site and pushes it to the `hostinger` branch. With auto-deploy on, Hostinger updates by itself; otherwise click **Deploy** in hPanel → GIT. (Google Analytics: set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXX` in the environment before building.)

## What's different from the Vercel version
| Feature | Vercel | Hostinger |
|---|---|---|
| Pages, sitemap, robots, llms.txt, RSS, share images | Next.js | Pre-built static files (identical output) |
| Forms (`/api/lead`) | Node route + webhook | `api/lead.php`: email via PHP mail, optional webhook and CSV |
| Free SEO audit tool (`/api/audit`) | Node route | `api/audit.php`: same checks and same security limits |
| Redirects, HTTPS/www, security headers | `next.config.ts` | `.htaccess` |
| Hostinger preview domain | n/a | Sent `noindex` automatically |
