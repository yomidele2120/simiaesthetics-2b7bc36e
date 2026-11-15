# Website reviews — automatic (one-time setup, ~3 minutes)

Reviews posted on the website appear **immediately** for everyone. They're saved in a free
Redis database that Vercel connects to your project — no separate server, no Google account.

Until this is set up, the review form sends reviews to Simi's WhatsApp instead, so nothing breaks.

## 1. Add free storage in Vercel
1. Open your project on https://vercel.com → **Storage** tab.
2. Click **Create Database** (or "Connect Store") → choose **Upstash for Redis** (Marketplace) → **Free** plan.
3. Give it any name (e.g. `simi-reviews`) → **Create** → connect it to this project for all environments.
   Vercel adds the connection settings (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) automatically.

## 2. Add Simi's private admin key
In **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `REVIEWS_ADMIN_KEY` | a long secret only you and Simi know (I sent you one in chat) |

## 3. Redeploy
**Deployments** → latest → **⋯ → Redeploy**. Reviews are now live.

## Removing a bad review
Simi opens this private link (keep it secret, bookmark it on her phone):

    https://YOUR-SITE-ADDRESS/reviews?admin=YOUR_ADMIN_KEY

Each review then shows a **Delete** button.

## Built-in protection
- One review per visitor every 10 minutes
- Links are blocked (stops most spam), hidden bot trap, length limits
- Only the fields name, service, star rating and review are stored — no phone numbers or emails

## Optional: reviews in code
`src/data/reviews.ts` can still hold extra reviews (e.g. ones received on WhatsApp before this was set up).
