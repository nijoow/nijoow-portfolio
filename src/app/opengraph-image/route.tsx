import { COLOR_TOKENS } from '@/lib/designTokens';
import { ImageResponse } from 'next/og';

const size = { width: 1200, height: 630 };
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle at 30% 20%, ${COLOR_TOKENS.brand.deep} 0%, ${COLOR_TOKENS.surface.ink} 64%)`,
          color: '#ffffff',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: COLOR_TOKENS.brand.lavender,
          }}
        >
          nijoow
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            color: COLOR_TOKENS.accent.light,
            opacity: 0.9,
          }}
        >
          Frontend Developer · Portfolio
        </div>
      </div>
    ),
    { ...size },
  );
}
