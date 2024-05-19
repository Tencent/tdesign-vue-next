import { useConfig } from './useConfig';

export enum EAnimationType {
  ripple = 'ripple',
  expand = 'expand',
  fade = 'fade',
}

export function useKeepAnimation() {
  const { globalConfig } = useConfig('animation');

  const keepAnimation = (type: EAnimationType) => {
    const animationConfig = globalConfig.value as Partial<Record<'include' | 'exclude', EAnimationType[]>>;
    return animationConfig && !animationConfig.exclude?.includes(type) && animationConfig.include?.includes(type);
  };
  return {
    keepExpand: keepAnimation(EAnimationType.expand),
    keepRipple: keepAnimation(EAnimationType.ripple),
    keepFade: keepAnimation(EAnimationType.fade),
  };
}
