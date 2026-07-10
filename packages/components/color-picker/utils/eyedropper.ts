interface EyeDropperInstance {
  open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}

interface EyeDropperConstructor {
  new (): EyeDropperInstance;
}

function getEyeDropperCtor(): EyeDropperConstructor | undefined {
  if (typeof window === 'undefined') return undefined;
  const { EyeDropper } = window as Window & { EyeDropper?: unknown };
  return typeof EyeDropper === 'function' ? (EyeDropper as EyeDropperConstructor) : undefined;
}

export const isEyeDropperSupported = (): boolean => getEyeDropperCtor() !== undefined;

export const openEyeDropper = async (signal?: AbortSignal): Promise<string | null> => {
  const Ctor = getEyeDropperCtor();
  if (!Ctor) return null;
  try {
    const result = await new Ctor().open(signal ? { signal } : undefined);
    return result.sRGBHex;
  } catch {
    return null;
  }
};
