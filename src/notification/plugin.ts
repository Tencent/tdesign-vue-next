import NotificationList from './notificationList';

let seed = 0;
// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<Element, object> = new Map();

const getAttach = (attach: string | Function = 'body') => {
  let r: Element;
  if (typeof attach === 'string') {
    r = document.querySelector(attach);
  } else if (typeof attach === 'function') {
    r = attach();
  } else {
    console.error('TDesign Error: attach type must a string or function.');
  }
  return r;
};

const Plugin = function (options: any) {
  seed += 1;
  const hackOptions = Object.assign({
    placement: 'top-right',
    zIndex: 6000,
    attach: 'body',
    id: seed,
  }, options);
  hackOptions.default = options.content ? options.content : '';

  const _a = getAttach(hackOptions.attach);
  if (!instanceMap.get(_a)) {
    instanceMap.set(_a, {});
  }
  let _p = instanceMap.get(_a)[hackOptions.placement];
  if (!_p) {
    const List = new NotificationList({
      propsData: {
        placement: hackOptions.placement,
      },
    });
    List.add(hackOptions);
    List.$mount();
    instanceMap.get(_a)[hackOptions.placement] = List;
    _a.appendChild(List.$el);
    _p = instanceMap.get(_a)[hackOptions.placement];
  } else {
    _p.add(hackOptions);
  }

  return new Promise((resolve) => {
    _p.$nextTick(() => {
      const list = _p.$children;
      resolve(list[list.length - 1]);
    });
  });
};

['success', 'warning', 'info', 'error'].forEach((theme) => {
  Plugin[theme] = (options: object) => {
    const hackOptions = Object.assign(options, { theme });
    return Plugin(hackOptions);
  };
});

Plugin.close = function (promise: Promise<{close: Function}>) {
  promise.then(instance => instance.close());
};

Plugin.closeAll = function () {
  instanceMap.forEach((attach) => {
    Object.keys(attach).forEach((placement) => {
      attach[placement].removeAll();
    });
  });
};

export default Plugin;
