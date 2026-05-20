// Google Analytics 4 + Google Ads gtag loader.
// Inactive until SITE.gaId or SITE.adsId is set in /admin → Cài đặt chung.
// Once set, injects the standard gtag.js bootstrap and exposes window.gtag.
//
// Page-view tracking on every React Router route change.

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../data/site';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

const gaId = (SITE as { gaId?: string }).gaId?.trim() || '';
const adsId = (SITE as { adsId?: string }).adsId?.trim() || '';
const TRACKING_ID = gaId || adsId; // gtag loader URL needs ANY one valid ID

let scriptLoaded = false;

function loadGtagOnce() {
  if (scriptLoaded || !TRACKING_ID) return;
  scriptLoaded = true;

  // 1. Bootstrap dataLayer + gtag function FIRST — using arguments
  //    (not rest spread) so gtag.js sees the standard Arguments shape.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  window.gtag('js', new Date());

  // 2. Configure each ID. Leave send_page_view at default true so the
  //    first hit fires automatically; SPA route changes call config
  //    again with the updated page_path.
  if (gaId) window.gtag('config', gaId);
  if (adsId) window.gtag('config', adsId);

  // 3. Inject gtag.js loader script (AFTER dataLayer is primed so the
  //    queued commands are processed in order).
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export default function Analytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Load gtag once on mount — config() auto-fires the first page_view
  useEffect(() => {
    loadGtagOnce();
  }, []);

  // SPA route changes: re-fire page_view for any navigation AFTER mount.
  // The first one is already covered by gtag('config', gaId) above.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!gaId || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  // Global click delegation: any tel: / zalo / messenger link auto-fires an event.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      // Crude "source" — section id of nearest <section>, fallback to pathname
      const section = link.closest('section')?.id || location.pathname || 'unknown';
      if (href.startsWith('tel:')) trackPhoneClick(section);
      else if (href.includes('zalo.me') || href.includes('zalo://')) trackZaloClick(section);
      else if (href.includes('m.me') || href.includes('messenger.com')) trackMessengerClick(section);
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [location]);

  return null;
}

// ----- Event helpers exported for use across the app -----

/** Generic gtag event sender. Safe no-op if gtag isn't loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/** Phone click — primary conversion goal for a service business. */
export function trackPhoneClick(source: string) {
  trackEvent('phone_click', { source });
  // Also report to Google Ads as a Call conversion if configured
  const callLabel = (SITE as { adsCallLabel?: string }).adsCallLabel?.trim();
  if (adsId && callLabel) {
    trackEvent('conversion', {
      send_to: `${adsId}/${callLabel}`,
      event_category: 'Call',
      event_label: source,
    });
  }
}

export function trackZaloClick(source: string) {
  trackEvent('zalo_click', { source });
}

export function trackMessengerClick(source: string) {
  trackEvent('messenger_click', { source });
}

export function trackContactFormSubmit(service?: string) {
  trackEvent('generate_lead', { service: service ?? 'unknown' });
}
