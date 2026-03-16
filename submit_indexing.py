"""
Staggered Google Indexing API submission for Act60Review multi-domain.
Submits 15 URLs per day across 3 domains (5 per domain per day) to look natural.
Run daily via Claude Code session start or cron.
Tracks progress in submitted_urls.json.

Domains: act60review.com, decreecheck.com, act60shield.com
Total URLs: ~312 per domain (homepage + 100 SEO + legal pages)
At 5/domain/day = ~63 days to fully index all 3 domains.
"""
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession
import json, time, datetime, os, random

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
KEY_FILE = "C:/Users/alpha/google-indexing/service-account.json"
SUBMITTED_FILE = os.path.join(SCRIPT_DIR, "indexing_submitted.json")
DAILY_LIMIT_PER_DOMAIN = 5
DELAY_BETWEEN = (8, 25)  # seconds between submissions (randomized)

DOMAINS = ["act60review.com", "decreecheck.com", "act60shield.com"]

SEO_SLUGS = [
    "act-60-capital-gains-tax", "act-60-crypto-tax-puerto-rico", "act-60-transfer-pricing-rules",
    "act-60-fbar-requirements", "irc-933-exclusion-guide", "act-60-dividend-income-treatment",
    "act-60-rental-income-rules", "act-60-stock-options-tax", "act-60-partnership-income",
    "act-60-s-corp-tax-treatment", "act-60-passive-income-rules", "act-60-self-employment-tax",
    "act-60-foreign-trust-reporting", "act-60-form-8938-requirements", "act-60-estimated-tax-payments",
    "act-60-capital-loss-carryforward", "act-60-wash-sale-rules", "act-60-nft-tax-treatment",
    "act-60-defi-staking-income", "act-60-day-trading-tax", "act-60-real-estate-gains",
    "act-60-intellectual-property-income", "act-60-consulting-income-sourcing", "act-60-saas-revenue-sourcing",
    "act-60-ecommerce-income-rules", "act-60-pre-move-appreciation", "act-60-depreciation-recapture",
    "act-60-amt-implications", "act-60-gift-tax-rules", "act-60-estate-tax-planning",
    "act-60-presence-test-requirements", "act-60-closer-connection-test", "act-60-annual-report-filing",
    "act-60-decree-renewal-process", "irs-campaign-685-explained", "act-60-hacienda-audit-defense",
    "act-60-bona-fide-residency-test", "act-60-tax-home-requirements", "act-60-183-day-rule",
    "act-60-compliance-checklist-2026", "act-60-common-filing-mistakes", "act-60-penalty-abatement",
    "act-60-amended-return-process", "act-60-statute-of-limitations", "act-60-record-keeping-requirements",
    "act-60-dual-filing-requirements", "act-60-planilla-guide", "act-60-form-480-explained",
    "act-60-informative-returns", "act-60-withholding-requirements",
    "act-60-tax-advisor-san-juan", "act-60-tax-advisor-condado", "act-60-tax-advisor-guaynabo",
    "act-60-tax-advisor-dorado", "act-60-tax-advisor-rincon", "act-60-tax-advisor-isla-verde",
    "act-60-tax-advisor-palmas-del-mar", "act-60-tax-advisor-rio-grande",
    "moving-from-new-york-to-puerto-rico-taxes", "moving-from-miami-to-puerto-rico-taxes",
    "moving-from-los-angeles-to-puerto-rico-taxes", "moving-from-san-francisco-to-puerto-rico-taxes",
    "moving-from-austin-to-puerto-rico-taxes", "moving-from-chicago-to-puerto-rico-taxes",
    "moving-from-seattle-to-puerto-rico-taxes", "moving-from-boston-to-puerto-rico-taxes",
    "moving-from-denver-to-puerto-rico-taxes", "moving-from-atlanta-to-puerto-rico-taxes",
    "moving-from-dallas-to-puerto-rico-taxes", "moving-from-nashville-to-puerto-rico-taxes",
    "act-60-for-crypto-traders", "act-60-for-hedge-fund-managers", "act-60-for-consultants",
    "act-60-for-ecommerce-sellers", "act-60-for-saas-founders", "act-60-for-day-traders",
    "act-60-for-real-estate-investors", "act-60-for-youtubers-creators", "act-60-for-freelancers",
    "act-60-for-venture-capitalists", "act-60-for-retirees", "act-60-for-doctors-physicians",
    "act-60-for-attorneys", "act-60-for-financial-advisors", "act-60-for-tech-entrepreneurs",
    "act-60-review-vs-cpa", "ai-tax-review-vs-manual-review", "act-60-vs-act-20-vs-act-22",
    "puerto-rico-vs-us-virgin-islands-tax", "puerto-rico-vs-portugal-tax-incentives",
    "act-60-vs-foreign-earned-income-exclusion", "act-60-cost-of-non-compliance",
    "diy-tax-review-vs-professional", "act-60-review-pricing-comparison", "why-cpas-miss-act-60-errors",
    "complete-guide-act-60-compliance", "act-60-tax-filing-checklist", "first-year-act-60-tax-guide",
    "act-60-exit-strategy-tax-planning", "act-60-audit-survival-guide",
]

STATIC_PATHS = ["", "terms", "privacy", "disclaimer", "sitemap.xml"]


def get_all_urls():
    urls = []
    for domain in DOMAINS:
        base = f"https://{domain}"
        for path in STATIC_PATHS:
            urls.append(f"{base}/{path}" if path else base)
        for slug in SEO_SLUGS:
            urls.append(f"{base}/{slug}")
    return urls


def submit_url(session, url):
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    body = {"url": url, "type": "URL_UPDATED"}
    try:
        resp = session.post(endpoint, json=body)
        if resp.status_code == 200:
            return "OK"
        else:
            return f"ERR {resp.status_code}: {resp.text[:100]}"
    except Exception as e:
        return f"FAIL: {str(e)[:100]}"


def main():
    if os.path.exists(SUBMITTED_FILE):
        with open(SUBMITTED_FILE, "r") as f:
            submitted = set(json.load(f))
    else:
        submitted = set()

    all_urls = get_all_urls()
    remaining = [u for u in all_urls if u not in submitted]

    if not remaining:
        print(f"All {len(all_urls)} URLs already submitted.")
        return

    print(f"Total URLs: {len(all_urls)}, Submitted: {len(submitted)}, Remaining: {len(remaining)}")

    # Group by domain, take DAILY_LIMIT_PER_DOMAIN from each
    by_domain = {}
    for url in remaining:
        domain = url.split("//")[1].split("/")[0]
        by_domain.setdefault(domain, []).append(url)

    batch = []
    for domain in DOMAINS:
        domain_urls = by_domain.get(domain, [])
        batch.extend(domain_urls[:DAILY_LIMIT_PER_DOMAIN])

    if not batch:
        print("No URLs to submit today.")
        return

    random.shuffle(batch)  # Randomize order across domains

    creds = service_account.Credentials.from_service_account_file(
        KEY_FILE, scopes=["https://www.googleapis.com/auth/indexing"]
    )
    session = AuthorizedSession(creds)

    print(f"Submitting {len(batch)} URLs ({DAILY_LIMIT_PER_DOMAIN} per domain)...")
    today = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

    for i, url in enumerate(batch):
        result = submit_url(session, url)
        print(f"  [{i+1}/{len(batch)}] {result} — {url}")
        submitted.add(url)

        if i < len(batch) - 1:
            delay = random.uniform(*DELAY_BETWEEN)
            time.sleep(delay)

    with open(SUBMITTED_FILE, "w") as f:
        json.dump(sorted(submitted), f, indent=2)

    print(f"\nDone. {len(batch)} submitted today ({today}). Total submitted: {len(submitted)}/{len(all_urls)}")


if __name__ == "__main__":
    main()
