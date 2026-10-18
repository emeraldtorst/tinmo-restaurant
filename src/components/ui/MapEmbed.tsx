"use client";

import { useState } from "react";

interface MapEmbedProps {
  /** Google Maps embed URL. `null` = no location configured (shows the placeholder). */
  embedUrl: string | null;
  /** Plain Google Maps link — safe to show without loading anything from Google. */
  mapsUrl: string | null;
  privacyHref: string;
  labels: {
    title: string;
    placeholder: string;
    loadButton: string;
    consent: string;
    privacyLink: string;
    openInMaps: string;
  };
}

/**
 * Privacy-friendly map: nothing is requested from Google until the visitor clicks "Load map"
 * (GDPR: no third-party connection before consent). A plain "Open in Google Maps" link is always available.
 */
export default function MapEmbed({ embedUrl, mapsUrl, privacyHref, labels }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const frame = "relative aspect-[4/5] w-full overflow-hidden border border-line bg-stone md:aspect-[5/6]";

  if (embedUrl && loaded) {
    return (
      <div className={frame}>
        <iframe
          src={embedUrl}
          title={labels.title}
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <svg viewBox="0 0 400 480" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke="var(--color-ink)" strokeWidth="1">
        <g opacity="0.18">
          <path d="M-20 90 C 90 70 170 130 260 110 S 380 60 430 80" />
          <path d="M-20 210 C 60 230 140 180 220 215 S 360 270 430 240" />
          <path d="M-20 350 C 80 330 160 390 250 370 S 370 330 430 360" />
          <path d="M70 -10 C 90 90 60 180 100 270 S 80 420 110 500" />
          <path d="M210 -10 C 190 80 240 170 200 260 S 230 410 210 500" />
          <path d="M330 -10 C 350 100 310 190 340 280 S 320 400 350 500" />
        </g>
        <g opacity="0.1">
          <rect x="108" y="226" width="64" height="40" />
          <rect x="228" y="130" width="70" height="46" />
          <rect x="118" y="300" width="56" height="52" />
          <rect x="236" y="290" width="60" height="38" />
        </g>
      </svg>
      <span className="absolute left-1/2 top-[42%] block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" aria-hidden="true" />

      <div className="absolute inset-x-5 bottom-5 flex flex-col items-start gap-4">
        {embedUrl ? (
          <>
            <button type="button" className="tm-btn" data-variant="solid" data-tone="light" onClick={() => setLoaded(true)}>
              <span>{labels.loadButton}</span>
            </button>
            <p className="max-w-[28rem] text-small text-muted-strong">
              {labels.consent}{" "}
              <a href={privacyHref} className="tm-link" data-underline>
                {labels.privacyLink}
              </a>
            </p>
          </>
        ) : (
          <p className="tm-label text-muted-strong">{labels.placeholder}</p>
        )}
        {mapsUrl ? (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="tm-link tm-tap tm-label">
            {labels.openInMaps}
          </a>
        ) : null}
      </div>
    </div>
  );
}
