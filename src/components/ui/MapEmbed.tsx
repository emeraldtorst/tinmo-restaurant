interface MapEmbedProps {
  /** Google Maps embed URL. `null` = no location configured (nothing is shown). */
  embedUrl: string | null;
  /** Plain Google Maps link, shown under the map. */
  mapsUrl: string | null;
  labels: {
    title: string;
    openInMaps: string;
  };
}

/** The Google map, loaded as soon as it nears the screen (the iframe is lazy), with a plain link beneath it. */
export default function MapEmbed({ embedUrl, mapsUrl, labels }: MapEmbedProps) {
  if (!embedUrl && !mapsUrl) return null;
  return (
    <div>
      {embedUrl ? (
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-stone md:aspect-[5/6]">
          <iframe
            src={embedUrl}
            title={labels.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        </div>
      ) : null}
      {mapsUrl ? (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="tm-link tm-tap mt-4 font-medium">
          {labels.openInMaps}
        </a>
      ) : null}
    </div>
  );
}
