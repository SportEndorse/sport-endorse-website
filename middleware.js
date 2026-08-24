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

// ISO 3166-1 alpha-2 country code -> pricing region (us | uk | ie | eu | za | row)
const REGION_BY_COUNTRY = {
  US: 'us',
  GB: 'uk',
  IE: 'ie',
  ZA: 'za',
  // EU / EEA / CH -> eu
  AT: 'eu', BE: 'eu', BG: 'eu', HR: 'eu', CY: 'eu', CZ: 'eu', DK: 'eu',
  EE: 'eu', FI: 'eu', FR: 'eu', DE: 'eu', GR: 'eu', HU: 'eu', IS: 'eu',
  IT: 'it', LV: 'eu', LI: 'eu', LT: 'eu', LU: 'eu', MT: 'eu', NL: 'eu',
  NO: 'eu', PL: 'eu', PT: 'eu', RO: 'eu', SK: 'eu', SI: 'eu', ES: 'eu',
  SE: 'eu', CH: 'eu',
  // everything else falls through to 'row'
};

export default function middleware(request) {
  const res = next();

  // Only tag the visitor once; the cookie persists for 30 days.
  const cookie = request.headers.get('cookie') || '';
  if (cookie.indexOf('se-geo=') === -1) {
    const { country } = geolocation(request);
    const region = REGION_BY_COUNTRY[(country || '').toUpperCase()] || 'row';
    res.headers.append(
      'Set-Cookie',
      `se-geo=${region}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
  }

  return res;
}
