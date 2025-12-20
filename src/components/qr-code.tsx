'use client';

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export function QRCodeButton({ pathKey, domain }: { pathKey: string; domain?: string; }) {
  const t = useTranslations('qrCode');
  const [open, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const [isDropUp, setIsDropUp] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const baseUrl = domain || process.env.NEXT_PUBLIC_SHORT_DOMAIN || "https://i0c.cc";
  const cleanPath = pathKey.startsWith('/') ? pathKey : `/${pathKey}`;
  const finalUrl = `${baseUrl}${cleanPath}`;

  const toggleOpen = () => {
    if (!open && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setIsDropUp(spaceBelow < 320);
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  if (!pathKey) return null;

  return (
    <div ref={rootRef} className="relative inline-flex shrink-0">
      <button
        type="button"
        onClick={toggleOpen}
        title={t('openQRCode')}
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
          open
            ? "border-slate-300 bg-slate-100 text-slate-900"
            : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600 hover:bg-slate-50"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M14 9v6"/><path d="M9 15h6"/>
        </svg>
      </button>

      {open && (
        <div 
          className={`absolute right-0 z-50 w-56 animate-[fade-up_200ms_ease-out] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl ${
            isDropUp 
              ? "bottom-full mb-2 origin-bottom-right" 
              : "top-full mt-2 origin-top-right"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
              <div className="relative flex items-center justify-center">
                <QRCodeCanvas
                  value={finalUrl}
                  size={160}
                  level={"H"}
                  marginSize={0}
                />
                {showIcon && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src="/favicon.ico"
                      alt={t('faviconAlt')}
                      width={32}
                      height={32}
                      className="rounded-lg border-2 border-white bg-white shadow-sm"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full space-y-4">
              <p className="truncate text-[10px] font-mono text-slate-400 px-2 text-center" title={finalUrl}>
                {finalUrl}
              </p>
              <div className="h-px bg-slate-100 w-full" />
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-slate-600">{t('faviconLabel')}</span>

                <button
                  type="button"
                  onClick={() => setShowIcon(!showIcon)}
                  aria-pressed={showIcon}
                  aria-label={showIcon ? t('hideFavicon') : t('showFavicon')}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    showIcon ? 'bg-slate-900' : 'bg-slate-200'
                  }`}
                >

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-all duration-200 ease-in-out ${
                      showIcon ? 'ml-auto' : 'ml-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
