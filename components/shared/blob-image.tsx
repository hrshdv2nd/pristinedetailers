'use client';

const BLOB_PATHS: Record<string, string> = {
  a: 'M 50,10 C 75,10 90,30 90,55 C 90,80 70,90 45,90 C 20,90 10,70 10,45 C 10,20 25,10 50,10 Z',
  b: 'M 50,5 C 80,5 95,25 90,55 C 85,85 60,95 35,90 C 10,85 5,60 10,35 C 15,15 25,5 50,5 Z',
  c: 'M 50,8 C 78,8 92,28 92,52 C 92,78 72,92 48,92 C 24,92 8,72 10,48 C 12,24 24,8 50,8 Z',
  d: 'M 55,6 C 82,10 94,35 88,60 C 82,85 55,95 30,88 C 8,82 4,55 10,32 C 16,12 32,4 55,6 Z',
  pill: 'M 20,5 L 80,5 C 88,5 92,20 92,50 C 92,80 88,95 80,95 L 20,95 C 12,95 8,80 8,50 C 8,20 12,5 20,5 Z',
};

export function BlobImage({
  variant = 'a',
  color = '#C89B37',
  children,
  size = 360,
  rotate = 0,
  style = {},
}: {
  variant?: string;
  color?: string;
  children?: React.ReactNode;
  size?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  const path = BLOB_PATHS[variant] || BLOB_PATHS.a;
  const maskSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${path}" fill="black"/></svg>`
  );
  const maskUrl = `url("data:image/svg+xml,${maskSvg}")`;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d={path} fill={color} />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          maskImage: maskUrl,
          WebkitMaskImage: maskUrl,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
