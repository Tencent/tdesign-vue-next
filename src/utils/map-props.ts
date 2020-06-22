import Vue, { ComponentOptions, CreateElement } from 'vue';

const defaultModel = {
  prop: 'value',
  event: 'input',
};

function toCamel(str: string): string {
  return str.replace(/-([a-z])/ig, (m, letter) => letter.toUpperCase());
}

type PropOption = {
  name: string;
  event?: string | string[];
  alias?: string[];
};

type Option = {
  model?: typeof defaultModel;
};

type ParsedPropOption = {
  defaultName: string;
  dataName: string;
  events: string[];
  alias?: string[];
  [propName: string]: any;
};


function getPropOptionMap(props: (string | PropOption)[], options: Option = {}):
  { [name: string]: ParsedPropOption } {
  const propOptionMap = {};

  const { model } = options;

  function parseProp(propOption: PropOption): ParsedPropOption {
    const {
      name: propName,
      ...others } = propOption;
    const camelName = propName.replace(/^[a-z]/, (letter: string) => letter.toUpperCase());
    const defaultName = `default${camelName}`;
    const dataName = `data${camelName}`;

    let events: string[] = [];
    if (propOption.event) {
      events = events.concat(propOption.event);
    } else if (model.prop === propName) {
      events = events.concat(model.event);
    } else {
      events = events.concat(`update:${propName}`);
    }

    return {
      events,
      defaultName,
      dataName,
      ...others,
    };
  }

  props.forEach((prop: string | PropOption) => {
    const defaultOption = {
      alias: [] as string[],
    };
    let propOption: PropOption;
    if (typeof prop === 'string') {
      propOption = Object.assign({}, defaultOption, { name: prop });
    } else {
      propOption = Object.assign({}, defaultOption, prop);
    }

    propOptionMap[propOption.name] = parseProp(propOption);
  });

  return propOptionMap;
}

export default function (props: (string | PropOption)[], options: Option = {}): any {
  function mapProps(componentConstructor: Vue): any {
    const model = options.model || defaultModel;
    const propOptionMap = getPropOptionMap(props, { model });

    const defineProps: Record<string, any> = {};
    const defineWatches = {};
    let defineEvents: string[] = [];
    const defineMethods = {};
    const component: ComponentOptions<Vue> =
      (componentConstructor as any).prototype.constructor.options;

    const propsKeys: string[] = Object.keys(component.props);
    const camelPropsKeys = propsKeys.map(key => toCamel(key));

    Object.keys(propOptionMap).forEach((propName) => {
      const { events, alias, defaultName, dataName } = propOptionMap[propName];

      defineProps[propName] = component.props[propName];
      defineProps[defaultName] = component.props[defaultName];
      if (alias) {
        alias.forEach((prop: string) => {
          defineProps[prop] = defineProps[propName];
        });
      }
      defineEvents = defineEvents.concat(events);

      // watch default prop
      defineWatches[defaultName] = {
        handler(v: any): void {
          if (
            defaultName in this.$vnode.componentOptions.propsData &&
            !(propName in this.$vnode.componentOptions.propsData)
          ) {
            this.$data[dataName] = v;
          }
        },
        immediate: true,
      };

      // watch alias
      alias.forEach((aliasItem) => {
        defineWatches[aliasItem] = {
          handler(v: any): void {
            if (
              aliasItem in this.$vnode.componentOptions.propsData &&
              !(propName in this.$vnode.componentOptions.propsData)
            ) {
              this.$data[dataName] = v;
            }
          },
          immediate: true,
        };
      });

      // watch prop
      defineWatches[propName] = {
        handler(v: any): void {
          if (propName in this.$vnode.componentOptions.propsData) {
            this.$data[dataName] = v;
          }
        },
        immediate: true,
      };
    });
    if (component.methods) {
      Object.keys(component.methods).forEach((key) => {
        defineMethods[key] = function (this: any, ...args: any[]): any {
          if (this.$refs.component) {
            return this.$refs.component[key](...args);
          }
        };
      });
    }

    const { name } = component;
    return Vue.extend({
      name: `${name}-mapprops`,
      inheritAttrs: false,
      model: {
        prop: model.prop,
        event: Array.isArray(model.event) ? model.event[0] : model.event,
      },
      data() {
        const data = {};
        Object.keys(propOptionMap).forEach((propName: string): void => {
          const { dataName } = propOptionMap[propName];
          data[dataName] = undefined;
        });
        return { ...data };
      },
      props: {
        ...defineProps,
      },
      computed: {
        _listeners(): Record<string, any> {
          const others = {};
          Object.keys(this.$listeners).forEach((event: string): void => {
            if (defineEvents.indexOf(event) === -1) {
              others[event] = (...args: any[]): void => {
                // (this.$listeners[event] as Function)(...args);
                this.$emit(event, ...args);
              };
            }
          });
          return others;
        },
      },
      watch: defineWatches,
      render(h: CreateElement) {
        const propMap = {};
        const handlerMap = {};

        Object.keys(propOptionMap).forEach((propName: string): void => {
          const { dataName, events } = propOptionMap[propName];
          if (
            propName in this.$vnode.componentOptions.propsData ||
            typeof this[dataName] !== 'undefined'
          ) {
            propMap[propName] = this[dataName];
          }
          // 只监听第一个定义的事件，参数取第一个事件参数
          handlerMap[events[0]] =
            (v: any, ...args: any[]): any => this.updateData(propName, v, ...args);
        });

        const attrs = {};
        Object.keys(this.$attrs).forEach((attrName) => {
          const camelAttrKey = toCamel(attrName);
          if (camelPropsKeys.indexOf(camelAttrKey) === -1) {
            attrs[attrName] = this.$attrs[attrName];
          }
        });

        return h(component, {
          props: {
            ...this.$attrs,
            ...propMap,
          },

          attrs: {
            ...attrs,
          },

          on: {
            ...this._listeners as Record<string, any>,
            ...handlerMap,
          },

          scopedSlots: {
            ...this.$scopedSlots,
          },

          ref: 'component',
        });
      },
      methods: {
        updateData(this: any, propName: string, v: any, ...args: any[]): any {
          propOptionMap[propName].events.forEach((event) => {
            this.$emit(event, v, ...args);
          });
          if (!(propName in this.$vnode.componentOptions.propsData)) {
            this[propOptionMap[propName].dataName] = v;
            return true;
          }
        },
        ...defineMethods,
      },
    });
  };

  return mapProps;
};
