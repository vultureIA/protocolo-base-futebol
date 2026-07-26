/**
 * Manifest da sequência de frames da órbita 360°.
 * Hardcoded (static export — sem fetch de JSON em runtime).
 * Os arquivos são gerados pelo pipeline de produção (ffmpeg → WebP).
 */
export type FrameSet = {
  count: number;
  width: number;
  height: number;
  dir: string;
  poster: string;
};

export const FRAME_SETS: { d: FrameSet; m: FrameSet } = {
  d: {
    count: 120,
    width: 1920,
    height: 1080,
    dir: "/orbit/d",
    poster: "/orbit/poster-d.webp",
  },
  m: {
    count: 80,
    width: 810,
    height: 1440,
    dir: "/orbit/m",
    poster: "/orbit/poster-m.webp",
  },
};

export const framePath = (set: FrameSet, index: number): string =>
  `${set.dir}/f_${String(index).padStart(3, "0")}.webp`;
