export type SignatureQuality = 'high' | 'medium' | 'low' | 'fallback';

const SOFTWARE_RENDERER_PATTERN = /swiftshader|software|llvmpipe/i;

function hasHardwareAcceleratedWebGL() {
  try {
    const canvas = document.createElement('canvas');
    if (!window.WebGLRenderingContext) return false;

    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!context) return false;

    const rendererInfo = context.getExtension('WEBGL_debug_renderer_info') as {
      UNMASKED_RENDERER_WEBGL: number;
    } | null;
    const renderer = String(
      rendererInfo
        ? context.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL)
        : context.getParameter(context.RENDERER),
    );
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return !SOFTWARE_RENDERER_PATTERN.test(renderer);
  } catch {
    return false;
  }
}

export function detectSignatureQuality(): SignatureQuality {
  if (!hasHardwareAcceleratedWebGL()) return 'fallback';

  const isReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const isSmall = window.innerWidth < 640;
  const hasFewCores = navigator.hardwareConcurrency <= 4;
  const hasMediumCores = navigator.hardwareConcurrency <= 8;
  const savesData =
    'connection' in navigator &&
    typeof navigator.connection === 'object' &&
    navigator.connection !== null &&
    'saveData' in navigator.connection &&
    navigator.connection.saveData === true;

  if (isReduced || isSmall || hasFewCores || savesData) return 'low';
  if (hasMediumCores || window.devicePixelRatio > 2) return 'medium';
  return 'high';
}
