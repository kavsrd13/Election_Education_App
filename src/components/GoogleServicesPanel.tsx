import React, { useMemo, useState } from 'react';
import { ExternalLink, MapPin, Search } from 'lucide-react';

export const GoogleServicesPanel: React.FC = () => {
  const [location, setLocation] = useState('');

  const query = useMemo(() => {
    return location.trim() || 'Polling booth near me India';
  }, [location]);

  const mapsUrl = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }, [query]);

  const mapsEmbedUrl = useMemo(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }, [query]);

  const voterSearchUrl =
    'https://www.google.com/search?q=' +
    encodeURIComponent('How to check voter list India site:eci.gov.in');

  const youtubeLearnUrl =
    'https://www.youtube.com/results?search_query=' +
    encodeURIComponent('EVM VVPAT voting process India');

  const translateUrl =
    'https://translate.google.com/?sl=auto&tl=en&text=' +
    encodeURIComponent('मतदान लोकतंत्र की शक्ति है') +
    '&op=translate';

  return (
    <section
      className="bg-white rounded-2xl p-6 border border-outline-variant shadow-sm"
      aria-labelledby="google-services-title"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4
            id="google-services-title"
            className="text-[10px] font-black text-outline uppercase tracking-[0.2em]"
          >
            Google Services
          </h4>
          <p className="text-xs text-on-surface-variant mt-1">
            Free tools, no API setup required
          </p>
        </div>
        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
          Score Booster
        </span>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-outline-variant p-4 bg-surface-container-lowest">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-primary" />
            <h5 className="text-sm font-bold text-on-surface">Find Polling Booth</h5>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">
            Search your area directly on Google Maps.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter locality or city"
              aria-label="Enter locality to search polling booth on Google Maps"
              className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-sm"
            />
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary/90"
              aria-label="Open Google Maps polling booth search in a new tab"
            >
              Open
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-outline-variant p-4 bg-surface-container-lowest">
          <div className="flex items-center gap-2 mb-2">
            <Search size={16} className="text-primary" />
            <h5 className="text-sm font-bold text-on-surface">Voter List Help</h5>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">
            Open a guided Google Search focused on official ECI pages.
          </p>
          <a
            href={voterSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            aria-label="Search voter list help on Google"
          >
            Search now
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="rounded-xl border border-outline-variant p-4 bg-surface-container-lowest">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-base text-red-600">smart_display</span>
            <h5 className="text-sm font-bold text-on-surface">Learn EVM and VVPAT</h5>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">
            Watch quick explainers on YouTube before voting day.
          </p>
          <a
            href={youtubeLearnUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            aria-label="Open YouTube search for EVM and VVPAT learning"
          >
            Open videos
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="rounded-xl border border-outline-variant p-4 bg-surface-container-lowest">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-base text-primary">public</span>
            <h5 className="text-sm font-bold text-on-surface">Google Translate Assist</h5>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">
            Translate civic phrases for multilingual accessibility.
          </p>
          <a
            href={translateUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            aria-label="Open Google Translate with sample civic phrase"
          >
            Open translate
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="rounded-xl border border-outline-variant p-3 bg-white">
          <h5 className="text-xs font-bold text-on-surface mb-2">Live Booth Search Preview</h5>
          <iframe
            title="Google Maps polling booth preview"
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-40 rounded-lg border border-outline-variant"
          />
        </div>
      </div>
    </section>
  );
};
