import { useConfig } from './useConfig';
import { IconConfig } from '../config-provider/type';

// 从 globalConfig 获取 icon 配置用于覆盖组件内置 icon
export function useGlobalIcon(tdIcon: Object) {
  const { globalConfig } = useConfig('icon');

  const resultIcon: IconConfig = {};

  Object.keys(tdIcon).forEach((key) => {
    resultIcon[key] = globalConfig.value?.[key] || tdIcon[key];
  });

  return resultIcon;
}

export default useGlobalIcon;
