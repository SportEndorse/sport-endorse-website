---
title: How to edit the Sport Endorse site
---

# How to edit the Sport Endorse site

Read this first. It explains what you can change here, and how the two things that make this site different - **geo-targeting** (different content by visitor location) and **languages** (the translated pages) - fit into editing.

## The big picture

There is one codebase that builds the whole website. When you save a change here, the site rebuilds automatically and goes live a few minutes later - no developer needed for anything in this list.

You are always editing **one responsive site**. You edit each item once and it adapts to phone, tablet and desktop on its own.

## What you can edit here

Each section in the left-hand menu edits live content:

- **Site settings** - the homepage logo wall and the overview video. Each logo has an optional **Size adjust** if it looks visually larger or smaller than the ones beside it.
- **Company facts** - the numbers in the footer, the About facts table and the site's structured data (roster size, sports, countries, offices).
- **Team** - the people on the About page.
- **Featured athlete profiles** - the athlete cards shown to brands.
- **Case-study cards (Success Stories)** - both the card on the grid and the full story page (summary, challenge, solution, deliverables, results, quote). **Deliverables** is a bulleted list - add one bullet per item. **Results metrics** is the table of headline numbers under Results - each row is a label ("Media Impressions") and a value ("2.5 million"); leave it empty for no table.
- **Careers** - open roles.
- **Blog posts** - write and publish articles.
- **Press & Media** - coverage, interviews, awards, company news.

## What is NOT editable here (yet)

The **main marketing-page copy** - the big headlines and body text on Home, For Brands, For Talent, For Agencies, Pricing, Healthcare, Finance, Universities and the FAQs - lives in the build system, not in this CMS. The same is true of the **geo-targeted variations** and the **translations** (see below).

This is deliberate: that copy is tightly woven together with the geo-targeting and SEO structure. Any of it can be moved into this CMS **page by page** when you want to edit it yourself - just ask, and name the page. Until then, to change that copy, send the page name and the new wording and a developer applies it (usually same day).

## Geo-targeting: same page, different content by location

The site detects each visitor's location and shows **region-specific content on the same URL**. There are seven regions:

- **us** - United States
- **uk** - United Kingdom
- **ie** - Ireland
- **eu** - Europe (Spain, France, Germany, Netherlands and others)
- **it** - Italy
- **za** - South Africa
- **row** - rest of world

Examples already live on the site:

- On the **Healthcare** page, US visitors see the US regulators (FTC/FDA); Ireland, UK and EU visitors see ASAI, the ASAI/CAP codes and the HPRA.
- **Italian** visitors see three Italian athletes on the For Brands and For Talent pages, and euro pricing.
- **Pricing** shows in the local currency for each region (USD, GBP, EUR).
- The **athlete coverage** wording leads with the sports that matter most in each market.

**What this means for editing:** almost all geo-variation is in the build system, so to change what a specific region sees, name the region and the change and a developer applies it. Two geo-related things you CAN control here:

- **Success Stories "Region"** - this is a filter label on the card (Ireland / UK / Europe / International / Multi-market). It groups the card on the grid; it is not a visitor-targeting rule.
- **The Italian athlete roster** - the athletes shown to Italian visitors. Ask a developer to add or swap these, with the athlete's consent.

## Languages: the translated pages

The site is published in English plus five languages, each with its own set of pages:

- **es** - Spanish (/es/)
- **fr** - French (/fr/)
- **de** - German (/de/)
- **it** - Italian (/it/)
- **nl** - Dutch (/nl/)

Translations are held in the site's localization files, not in this CMS.

**What this means for editing:**

- When you edit **English** content here (a story, a fact, an athlete), the **English** pages update straight away.
- The **translated** pages keep their current wording until the translation is refreshed. After a meaningful English change, ask a developer to re-translate the affected text so the other languages match.
- **Athlete bios:** editing an athlete here sets its **English** bio. The localized athlete pages then show that English bio unless a translated bio has been provided for it.

## How a change goes live

1. Edit the item and press **Publish** (Save).
2. The change is committed and the site rebuilds automatically.
3. It is live in a few minutes. Refresh the page (a hard refresh) if you do not see it immediately.

## Requesting a change that isn't in the CMS

For anything above marked "ask a developer" - main-page copy, a new geo-targeted variation, a fresh translation, or moving a page into this CMS so you can edit it yourself - note **which page**, **which region or language** (if relevant), and **the exact new wording**. That is everything needed to apply it.
