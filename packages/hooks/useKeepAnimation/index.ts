import { useConfig } from '../useConfig';
// TODO need refactor
import { EAnimationType } from '../../components/config-provider/utils/context';

const { expand, ripple, fade } = EAnimationType;

export function useKeepAnimation() {
  const { globalConfig } = useConfig('animation');

  const keepAnimation = (type: EAnimationType) => {
    const animationConfig = globalConfig.value;
    return animationConfig && !animationConfig.exclude?.includes(type) && animationConfig.include?.includes(type);
  };
  return {
    keepExpand: keepAnimation(expand),
    keepRipple: keepAnimation(ripple),
    keepFade: keepAnimation(fade),
  };
}
