import type { ArtKind } from '../../types'

const BRASS = '#D4AF65'
const BRASS_D = '#92713B'
const M = '#861B32'
const S = '#E8D5A3'
const G = '#B18D4D'
const I = '#FFF8EE'

export function ArtGlyph({ kind, className = '' }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-hidden="true">
      {glyph(kind)}
    </svg>
  )
}

function glyph(kind: ArtKind) {
  switch (kind) {
    case 'diya':
      return (<g>
        <path d="M50 14c7 9 9 16 0 26-9-10-7-17 0-26z" fill={S} /><path d="M50 22c3 5 4 8 0 13-4-5-3-8 0-13z" fill={I} />
        <path d="M14 52c10 0 16 8 36 8s26-8 36-8c-2 16-16 30-36 30S16 68 14 52z" fill={BRASS} /><path d="M14 52c10 0 16 8 36 8s26-8 36-8" fill="none" stroke={BRASS_D} strokeWidth="2.5" />
        <rect x="38" y="82" width="24" height="6" rx="3" fill={BRASS_D} />
      </g>)
    case 'kalasham':
      return (<g>
        <path d="M30 26c-8 6-10 16-8 26 2 16 12 32 28 32s26-16 28-32c2-10 0-20-8-26z" fill={BRASS} stroke={BRASS_D} strokeWidth="2.5" />
        <rect x="32" y="20" width="36" height="8" rx="4" fill={BRASS_D} />
        <path d="M50 4c10 4 12 12 12 16H38c0-4 2-12 12-16z" fill={S} />
        <path d="M36 20c-6-6-4-12 0-14M64 20c6-6 4-12 0-14M50 20V6" fill="none" stroke={G} strokeWidth="4" strokeLinecap="round" />
        <path d="M36 50h28M34 62h32" stroke={M} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="42" r="5" fill={M} />
      </g>)
    case 'lotus':
      return (<g>
        {[-60, -30, 0, 30, 60].map((r) => <path key={r} d="M50 84C34 66 36 40 50 18c14 22 16 48 0 66z" fill={r === 0 ? M : S} stroke={I} strokeWidth="1.5" transform={`rotate(${r} 50 84)`} opacity={Math.abs(r) === 60 ? 0.8 : 1} />)}
        <path d="M18 88c14-6 26-6 32-2 6-4 18-4 32 2-14 6-26 6-32 2-6 4-18 4-32-2z" fill={G} />
      </g>)
    case 'mala':
      return (<g>
        {Array.from({ length: 20 }).map((_, i) => { const a = (i / 20) * Math.PI * 2; return <circle key={i} cx={50 + 30 * Math.cos(a)} cy={44 + 30 * Math.sin(a)} r="5.2" fill={i % 5 === 0 ? S : M} stroke={I} strokeWidth="1" /> })}
        <path d="M50 78v10" stroke={BRASS_D} strokeWidth="3" /><circle cx="50" cy="74" r="6.5" fill={BRASS} stroke={BRASS_D} strokeWidth="1.5" />
        <path d="M50 90c-5 0-6 6-6 8h12c0-2-1-8-6-8z" fill={S} />
      </g>)
    case 'idol':
      return (<g>
        <path d="M30 88c0-8 8-12 20-12s20 4 20 12z" fill={BRASS_D} />
        <path d="M34 76c-4-18 2-34 16-34s20 16 16 34z" fill={BRASS} stroke={BRASS_D} strokeWidth="2" />
        <circle cx="50" cy="30" r="12" fill={BRASS} stroke={BRASS_D} strokeWidth="2" />
        <path d="M40 20l4-10 6 6 6-6 4 10z" fill={S} stroke={BRASS_D} strokeWidth="1.5" />
        <circle cx="50" cy="56" r="4" fill={M} />
        <path d="M30 48c-6 4-6 12-2 16M70 48c6 4 6 12 2 16" fill="none" stroke={BRASS_D} strokeWidth="3" strokeLinecap="round" />
      </g>)
    case 'bell':
      return (<g>
        <path d="M22 72c4-6 6-14 6-26 0-14 10-24 22-24s22 10 22 24c0 12 2 20 6 26z" fill={BRASS} stroke={BRASS_D} strokeWidth="2.5" />
        <rect x="18" y="72" width="64" height="8" rx="4" fill={BRASS_D} />
        <circle cx="50" cy="86" r="6" fill={M} /><circle cx="50" cy="16" r="5" fill="none" stroke={BRASS_D} strokeWidth="3" />
      </g>)
    case 'book':
      return (<g>
        <path d="M14 22c14-4 26-2 36 6v54c-10-8-22-10-36-6z" fill={M} /><path d="M86 22c-14-4-26-2-36 6v54c10-8 22-10 36-6z" fill={S} />
        <path d="M24 34c8-2 15-1 20 3M24 46c8-2 15-1 20 3M56 37c5-4 12-5 20-3M56 49c5-4 12-5 20-3" stroke={I} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>)
    case 'garland':
      return (<g>
        <path d="M8 22c20 40 64 40 84 0" fill="none" stroke={G} strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => { const t = i / 10; const x = 12 + t * 76; const y = 24 + Math.sin(t * Math.PI) * 40; return <g key={i}><circle cx={x} cy={y + 4} r="6.5" fill={i % 2 ? S : '#B18D4D'} /><circle cx={x} cy={y + 4} r="2.5" fill={M} /></g> })}
        <path d="M50 66v18" stroke={G} strokeWidth="3" /><circle cx="50" cy="88" r="6" fill={S} />
      </g>)
    case 'frame':
      return (<g>
        <rect x="16" y="12" width="68" height="76" rx="4" fill={BRASS} stroke={BRASS_D} strokeWidth="3" /><rect x="24" y="20" width="52" height="60" fill={I} />
        <circle cx="50" cy="40" r="9" fill={S} /><path d="M32 74c2-14 8-22 18-22s16 8 18 22z" fill={M} />
        <path d="M50 24v-2M38 28l-1-2M62 28l1-2" stroke={S} strokeWidth="2" />
      </g>)
    case 'bag':
      return (<g>
        <path d="M24 34h52l6 54H18z" fill={M} stroke={M} strokeWidth="2" /><path d="M36 34c0-14 6-20 14-20s14 6 14 20" fill="none" stroke={S} strokeWidth="4" />
        <path d="M50 52c6 6 6 12 0 18-6-6-6-12 0-18z" fill={S} />
      </g>)
    case 'cloth':
      return (<g>
        <path d="M14 24c14 8 28 8 36 0 8 8 22 8 36 0v52c-14 8-28 8-36 0-8 8-22 8-36 0z" fill={M} />
        <path d="M14 34c14 8 28 8 36 0 8 8 22 8 36 0M14 66c14 8 28 8 36 0 8 8 22 8 36 0" fill="none" stroke={S} strokeWidth="4" />
        {[26, 44, 62, 78].map((x) => <circle key={x} cx={x} cy="50" r="3" fill={I} />)}
      </g>)
    case 'mandir':
      return (<g>
        <path d="M50 6l8 10H42z" fill={S} /><path d="M20 38c0-16 14-22 30-22s30 6 30 22z" fill={M} stroke={BRASS_D} strokeWidth="2" />
        <rect x="18" y="38" width="64" height="8" fill={BRASS} />
        <rect x="24" y="46" width="52" height="40" fill={BRASS_D} />
        <path d="M34 86V58c0-10 6-14 16-14s16 4 16 14v28z" fill={I} /><circle cx="50" cy="64" r="6" fill={S} />
        <rect x="14" y="86" width="72" height="6" rx="2" fill={BRASS} />
      </g>)
    case 'crystal':
      return (<g>
        <path d="M50 8l22 26-8 54H36l-8-54z" fill="#F6E9D6" stroke={BRASS_D} strokeWidth="2" /><path d="M50 8l-8 26 8 54 8-54z" fill="#FFFFFF" opacity=".75" />
        <path d="M28 34h44" stroke={BRASS_D} strokeWidth="2" />
      </g>)
    case 'plate':
      return (<g>
        <ellipse cx="50" cy="60" rx="42" ry="18" fill={BRASS} stroke={BRASS_D} strokeWidth="2.5" /><ellipse cx="50" cy="58" rx="30" ry="11" fill="none" stroke={BRASS_D} strokeWidth="2" />
        <circle cx="50" cy="40" r="9" fill={S} /><circle cx="34" cy="48" r="6" fill={M} /><circle cx="66" cy="48" r="6" fill={G} />
      </g>)
    case 'banana':
      return (<g>
        <path d="M50 92V40" stroke={G} strokeWidth="8" strokeLinecap="round" />
        <path d="M50 44C28 40 14 22 10 8c24 2 36 14 40 36zM50 44c22-4 36-22 40-36-24 2-36 14-40 36zM50 56C34 56 24 46 20 36c16 0 26 8 30 20zM50 56c16 0 26-10 30-20-16 0-26 8-30 20z" fill={G} opacity=".92" />
      </g>)
    case 'ring':
      return (<g>
        <circle cx="50" cy="52" r="30" fill="none" stroke={BRASS} strokeWidth="8" /><circle cx="50" cy="52" r="30" fill="none" stroke={M} strokeWidth="2" strokeDasharray="3 6" />
        <path d="M50 12c6 8 6 14 0 20-6-6-6-12 0-20z" fill={S} />
        {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={50 + 30 * Math.cos((a * Math.PI) / 180)} cy={52 + 30 * Math.sin((a * Math.PI) / 180)} r="4" fill={M} />)}
      </g>)
  }
}
