import Icon from './icon';
import Button from './button';

const components = {
  Icon,
  Button,
};

const install = function(Vue:any, config?:object): void {
  const defaults = {
    prefix: 'tdesign',
  };
  const installConfig = { ...defaults, ...config };
  Object.keys(components).forEach((key) => {
    Vue.component(installConfig.prefix + key, components[key]);
  });
};

// install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version: typeof VERSION === 'undefined' ? '' : VERSION, // eslint-disable-line
  ...components,
};
