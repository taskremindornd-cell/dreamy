import { useState } from 'react';
import { Compass } from 'lucide-react';

interface IllustrationFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  aspectClass?: string;
  className?: string;
}

export function IllustrationFrame({
  src,
  alt,
  fallbackTitle,
  aspectClass = 'aspect-[4/3]',
  className = '',
}: IllustrationFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-slate-700">
          <Compass className="mb-2 h-10 w-10 text-amber-600" aria-hidden="true" />
          <p className="font-display text-base font-bold text-slate-900">
            {fallbackTitle}
          </p>
        </div>
      )}
    </div>
  );
}
