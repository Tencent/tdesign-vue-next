import { PLACEMENT_LIST } from '../const';

interface Keyframe {
  composite?: CompositeOperationOrAuto;
  easing?: string;
  offset?: number | null;
  [property: string]: string | number | null | undefined;
}
type CompositeOperationOrAuto = 'accumulate' | 'add' | 'auto' | 'replace';

const ANIMATION_OPTION = {
  duration: 200,
  easing: 'linear',
};

const fadeIn = (dom: HTMLElement, placement: string) => {
  if (!dom) return;
  const offsetHeight = dom?.offsetHeight || 0;
  const offsetWidth = dom?.offsetWidth || 0;
  const keyframes: Array<Keyframe> | null = getFadeInKeyframes(placement, offsetWidth, offsetHeight);
  if (!keyframes) return;
  dom.animate && dom.animate(keyframes, ANIMATION_OPTION);
};

const fadeOut = (dom: HTMLElement, placement: string, onFinish: Function) => {
  if (!dom) return;
  const offsetHeight = dom?.offsetHeight || 0;
  const offsetWidth = dom?.offsetWidth || 0;
  const keyframes: Array<Keyframe> | null = getFadeOutKeyframes(placement, offsetWidth, offsetHeight);
  if (!keyframes) return onFinish();

  const animate = dom.animate && dom.animate(keyframes, ANIMATION_OPTION);
  if (animate) {
    animate.onfinish = () => {
      onFinish();
    };
  } else {
    dom.style.display = 'none';
    onFinish();
  }
};

const getFadeInKeyframes = (placement: string, offsetWidth: Number, offsetHeight: Number): Array<Keyframe> | null => {
  if (!PLACEMENT_LIST.includes(placement)) return null;
  if (placement === 'top-right') {
    return [
      { opacity: 0, transform: `translateX(${offsetWidth}px)` },
      { opacity: 1, transform: `translateX(0px)` },
    ];
  }
  if (placement === 'bottom-right') {
    return [
      { opacity: 0, transform: `translateX(${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
      { opacity: 1, transform: `translateX(0px)` },
    ];
  }
  if (placement === 'top-left') {
    return [
      { opacity: 0, transform: `translateX(-${offsetWidth}px)` },
      { opacity: 1, transform: `translateX(0px)` },
    ];
  }
  if (placement === 'bottom-left') {
    return [
      { opacity: 0, transform: `translateX(-${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
      { opacity: 1, transform: `translateX(0px)` },
    ];
  }
  return null
};

const getFadeOutKeyframes = (placement: string, offsetWidth: Number, offsetHeight: Number): Array<Keyframe> | null => {
  if (!PLACEMENT_LIST.includes(placement)) return null;
  if (placement === 'top-right') {
    return [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
    ];
  }
  if (placement === 'bottom-right') {
    return [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(${offsetWidth}px)` },
    ];
  }
  if (placement === 'top-left') {
    return [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(-${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
    ];
  }
  if (placement === 'bottom-left') {
    return [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(-${offsetWidth}px)` },
    ];
  }

  return null
};

export { fadeIn, fadeOut };
