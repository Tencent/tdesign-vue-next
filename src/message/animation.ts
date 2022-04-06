import { PLACEMENT_LIST } from './const';

const ANIMATION_OPTION = {
  duration: 200,
  easing: 'linear',
};

function fadeIn(dom: HTMLElement, placement: string) {
  if (!dom) return;
  const offsetWidth = dom?.offsetWidth || 0;
  const offsetHeight = dom?.offsetHeight || 0;
  const fadeInKeyframes: Array<Keyframe> | null = getFadeInKeyframes(placement, offsetWidth, offsetHeight);
  if (!fadeInKeyframes) return;
  const styleAfterFadeIn = fadeInKeyframes[fadeInKeyframes.length - 1];
  setDomStyleAfterAnimation(dom, styleAfterFadeIn);
  dom.animate && dom.animate(fadeInKeyframes, ANIMATION_OPTION);
}

function fadeOut(dom: HTMLElement, placement: string, onFinish: Function) {
  if (!dom) return;
  const offsetHeight = dom?.offsetHeight || 0;
  const fadeOutKeyframes: Array<Keyframe> | null = getFadeOutKeyframes(placement, offsetHeight);
  if (!fadeOutKeyframes) return onFinish();
  const styleAfterFadeOut = fadeOutKeyframes[fadeOutKeyframes.length - 1];
  setDomStyleAfterAnimation(dom, styleAfterFadeOut);

  const animation = dom.animate && dom.animate(fadeOutKeyframes, ANIMATION_OPTION);
  if (animation) {
    animation.onfinish = () => {
      // eslint-disable-next-line no-param-reassign
      dom.style.display = 'none';
      onFinish();
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    dom.style.display = 'none';
    onFinish();
  }
}

function setDomStyleAfterAnimation(dom: HTMLElement, styleAfterAnimation: Keyframe) {
  const keys = Object.keys(styleAfterAnimation);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    // eslint-disable-next-line no-param-reassign
    dom.style[key] = styleAfterAnimation[key];
  }
}

function getFadeInKeyframes(placement: string, offsetWidth: Number, offsetHeight: Number): Array<Keyframe> | null {
  if (!PLACEMENT_LIST.includes(placement)) return null;
  if (['top-left', 'left', 'bottom-left'].includes(placement)) {
    return [
      { opacity: 0, marginLeft: `-${offsetWidth}px` },
      { opacity: 1, marginLeft: '0' },
    ];
  }
  if (['top-right', 'right', 'bottom-right'].includes(placement)) {
    return [
      { opacity: 0, marginRight: `-${offsetWidth}px` },
      { opacity: 1, marginRight: '0' },
    ];
  }
  if (['top', 'center'].includes(placement)) {
    return [
      { opacity: 0, marginTop: `-${offsetHeight}px` },
      { opacity: 1, marginTop: '0' },
    ];
  }
  if (['bottom'].includes(placement)) {
    return [
      { opacity: 0, transform: `translate3d(0, ${offsetHeight}px, 0)` },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    ];
  }
}

function getFadeOutKeyframes(placement: string, offsetHeight: Number): Array<Keyframe> | null {
  if (!PLACEMENT_LIST.includes(placement)) return null;
  if (['bottom-left', 'bottom', 'bottom-right'].includes(placement)) {
    const marginOffset = `${offsetHeight}px`;
    return [
      { opacity: 1, marginTop: '0px' },
      { opacity: 0, marginTop: marginOffset },
    ];
  }
  const marginOffset = `-${offsetHeight}px`;
  return [
    { opacity: 1, marginTop: '0px' },
    { opacity: 0, marginTop: marginOffset },
  ];
}

export { fadeIn, fadeOut };
