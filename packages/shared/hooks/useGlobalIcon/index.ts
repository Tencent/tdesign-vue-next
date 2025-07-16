import { useConfig } from '../useConfig';
// TODO need refactor
import { IconConfig } from '@tdesign/components/config-provider/type';

// 从 globalConfig 获取 icon 配置用于覆盖组件内置 icon
export function useGlobalIcon(tdIcon: object): IconConfig {
  const { globalConfig } = useConfig('icon');

  const resultIcon: IconConfig = {};

  Object.keys(tdIcon).forEach((key: keyof typeof tdIcon) => {
    resultIcon[key] = globalConfig.value?.[key] || tdIcon[key];
  });

  return resultIcon;
}

export default useGlobalIcon;
