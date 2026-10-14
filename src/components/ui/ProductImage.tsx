import { useState } from 'react'
import { PLACEHOLDER_IMAGE } from '../../data/images'

interface Props { src?: string; alt: string; fit?: 'contain' | 'cover'; className?: string; imageClassName?: string }

/** Reserves its layout while loading and falls back to the shared placeholder when a source is missing or fails. */
export function ProductImage({ src, alt, fit = 'contain', className = '', imageClassName = '' }: Props) {
  const source = src || PLACEHOLDER_IMAGE
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const [loadedSource, setLoadedSource] = useState<string | null>(null)
  const displaySource = failedSource === source ? PLACEHOLDER_IMAGE : source
  const isPlaceholder = displaySource === PLACEHOLDER_IMAGE
  const isLoaded = loadedSource === displaySource

  return (
    <span className={`relative block overflow-hidden bg-ivory-100 ${className}`}>
      {!isLoaded && !isPlaceholder && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-gradient-to-br from-ivory-100 via-gold-100 to-ivory-200" />}
      <img
        key={displaySource}
        src={displaySource}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoadedSource(displaySource)}
        onError={() => { if (!isPlaceholder) setFailedSource(source) }}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${isLoaded || isPlaceholder ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
      />
    </span>
  )
}
