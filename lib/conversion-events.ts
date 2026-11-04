export const CONSENT_VERSION = "2026-08-26";
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export const conversionEvents = [
  "cv_classic_preview", "cv_illustrated_preview",
  "cv_classic_download_click", "cv_illustrated_download_click",
  "cv_classic_pdf_open", "cv_illustrated_pdf_open", "contact_email_click"
] as const;

type ConversionEvent = typeof conversionEvents[number];
type TrackingWindow = {
  __clarityLoaded?: boolean;
  clarity?: (command: string, event: string) => void;
  localStorage: Pick<Storage, "getItem">;
};

// Fixed names only: no email, query string, document content or visitor identifier.
export function trackConversion(event: ConversionEvent, target: TrackingWindow | undefined =
  typeof window === "undefined" ? undefined : window as unknown as TrackingWindow,
  now = Date.now()) {
  try {
    if (!target?.__clarityLoaded || !conversionEvents.includes(event)) return;
    const record = JSON.parse(target.localStorage.getItem("js-consent") || "null");
    if (record?.choice !== "granted" || record.version !== CONSENT_VERSION ||
      typeof record.decidedAt !== "number" || !Number.isFinite(record.decidedAt) ||
      record.decidedAt > now || now - record.decidedAt >= CONSENT_MAX_AGE_MS) return;
    target.clarity?.("event", event);
  } catch {
    // Analytics must never prevent navigation or downloading a CV.
  }
}
