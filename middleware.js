// Vercel Edge Middleware - true IP-based region geotargeting.
//
// Reads the visitor's IP country at Vercel's edge and stores a short-lived
// `se-geo` cookie holding the matching Sport Endorse pricing region. The
// static site's assets/site.js reads that cookie first when deciding which
// pricing region / currency to show.
//
// Graceful fallback: if this middleware is ever removed or disabled, site.js
// still detects the region client-side from browser language + timezone, so
// nothing breaks - it's just slightly less precise.
//
// See NOTE-FOR-COLLIN-geotargeting.md for the Vercel-side setup.

import { geolocation, next } from '@vercel/edge';

export const config = {
  // Run on page navigations only; skip static assets to minimise invocations.
  matcher: ['/((?!assets/|images/|admin/|_vercel/|favicon).*)'],
};

// ISO 3166-1 alpha-2 country code -> region (us | uk | ie | eu | it | de | nl | za | row)
// 'it', 'de' and 'nl' are content regions (Italian / DACH / Dutch-speaking athlete rosters); all inherit EU pricing.
const REGION_BY_COUNTRY = {
  US: 'us',
  GB: 'uk',
  IE: 'ie',
  ZA: 'za',
  // EU / EEA / CH -> eu
  AT: 'de', BE: 'nl',  // BE refined by province below (Wallonia / Brussels -> eu)
  BG: 'eu', HR: 'eu', CY: 'eu', CZ: 'eu', DK: 'eu',
  EE: 'eu', FI: 'eu', FR: 'eu', DE: 'de', GR: 'eu', HU: 'eu', IS: 'eu',
  IT: 'it', LV: 'eu', LI: 'eu', LT: 'eu', LU: 'eu', MT: 'eu', NL: 'nl',
  NO: 'eu', PL: 'eu', PT: 'eu', RO: 'eu', SK: 'eu', SI: 'eu', ES: 'eu',
  SE: 'eu', CH: 'de',  // CH refined by canton below (French/Italian cantons -> eu)
  // everything else falls through to 'row'
};

// Swiss cantons (ISO 3166-2:CH) where French or Italian is the main language.
// Bilingual Fribourg (FR) and Valais (VS) are treated as French-majority.
const NON_GERMAN_CH_CANTONS = ['GE', 'VD', 'NE', 'JU', 'FR', 'VS', 'TI'];
// Belgian subdivisions (ISO 3166-2:BE) that are NOT Dutch-speaking: the Walloon
// region + provinces, and bilingual (French-majority) Brussels. Everything else
// (Flanders: VLG / VAN / VBR / VLI / VOV / VWV) keeps the Dutch roster.
const NON_DUTCH_BE_REGIONS = ['WAL', 'WBR', 'WHT', 'WLG', 'WLX', 'WNA', 'BRU'];

export default function middleware(request) {
  const res = next();

  // Only tag the visitor once; the cookie persists for 30 days.
  const cookie = request.headers.get('cookie') || '';
  if (cookie.indexOf('se-geo=') === -1) {
    const { country, countryRegion } = geolocation(request);
    const cc = (country || '').toUpperCase();
    let region = REGION_BY_COUNTRY[cc] || 'row';
    // Switzerland: only German-speaking cantons get the DACH roster.
    if (cc === 'CH' && NON_GERMAN_CH_CANTONS.indexOf((countryRegion || '').toUpperCase()) > -1) {
      region = 'eu';
    }
    // Belgium: only Flanders gets the Dutch-language roster.
    if (cc === 'BE' && NON_DUTCH_BE_REGIONS.indexOf((countryRegion || '').toUpperCase()) > -1) {
      region = 'eu';
    }
    res.headers.append(
      'Set-Cookie',
      `se-geo=${region}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
  }

  return res;
}
