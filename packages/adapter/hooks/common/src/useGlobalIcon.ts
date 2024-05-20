// 从 globalConfig 获取 icon 配置用于覆盖组件内置 icon
export function useGlobalIcon(tdIcon: Record<string, any>) {
  // const { globalConfig } = useConfig('icon');
  const globalConfig = {};

  // const resultIcon: IconConfig = {};
  const resultIcon: any = {};

  Object.keys(tdIcon).forEach((key) => {
    // resultIcon[key] = globalConfig[key] || tdIcon[key];
    resultIcon[key] = tdIcon[key];
  });

  return resultIcon;
}
