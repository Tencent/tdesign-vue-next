import { ComponentOptions, defineComponent, ComponentPublicInstance, h } from 'vue';
import kebabCase from 'lodash/kebabCase';

function toCamel(str: string): string {
  return str.replace(/-([a-z])/ig, (m, letter) => letter.toUpperCase());
}

type PropOption = {
  name: string;
  event?: string | string[];
  alias?: string[];
};


type ParsedPropOption = {
  defaultName: string;
  dataName: string;
  events: string[];
  alias?: string[];
  [propName: string]: any;
};


function getPropOptionMap(props: (string | PropOption)[]):
  { [name: string]: ParsedPropOption } {
  const propOptionMap = {};

  function parseProp(propOption: PropOption): ParsedPropOption {
    const {
      name: propName,
      alias,
      ...others } = propOption;
    const camelName = propName.replace(/^[a-z]/, (letter: string) => letter.toUpperCase());
    const defaultName = `default${camelName}`;
    const dataName = `data${camelName}`;

    let events: string[] = [];
    if (propOption.event) {
      events = events.concat(propOption.event);
    }
    events.push(`update:${propName}`);
    if (alias) {
      events = events.concat(alias.map(item => `update:${item}`));
    }

    return {
      events,
      defaultName,
      dataName,
      alias,
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

export default function (props: (string | PropOption)[]): any {
  function mapProps(componentConstructor: ComponentPublicInstance): any {
    const component: ComponentOptions<ComponentPublicInstance> = componentConstructor;
    const propOptionMap = getPropOptionMap(props);

    const defineProps: Record<string, any> = { ...component.props };
    const defineWatches = {};
    let defineEvents: string[] = [];
    const defineMethods = {};

    const camelPropsKeys = Object.keys(component.props).map(key => toCamel(key));

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
          const { props } = this.$.vnode;
          const hasDefault = props && (defaultName in props || kebabCase(defaultName) in props);
          if (
            hasDefault
            && !(propName in props)
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
            const { props } = this.$.vnode;
            if (
              props && aliasItem in props
              && !(propName in props)
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
          const { props } = this.$.vnode;
          if (props && propName in props) {
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
    return defineComponent({
      name: `${name}-mapprops`,
      inheritAttrs: false,
      props: {
        ...defineProps,
      },
      data() {
        const data = {};
        Object.keys(propOptionMap).forEach((propName: string): void => {
          const { dataName } = propOptionMap[propName];
          data[dataName] = undefined;
        });
        return { ...data };
      },
      computed: {
        _listeners(): Record<string, any> {
          const others = {};
          Object.keys(this.$attrs).forEach((attr: string): void => {
            const event = attr.startsWith('on')
              ? attr[2].toLowerCase() + attr.substr(2)
              : null;
            if (event && defineEvents.indexOf(event) === -1) {
              others[attr] = (...args: any[]): void => {
                // (this.$listeners[event] as Function)(...args);
                this.$emit(event, ...args);
              };
            }
          });
          return others;
        },
      },
      watch: defineWatches,
      methods: {
        updateData(this: any, propName: string, v: any, ...args: any[]): any {
          propOptionMap[propName].events.forEach((event) => {
            this.$emit(event, v, ...args);
          });
          const { props } = this.$.vnode;
          if (!props || !(propName in props)) {
            this[propOptionMap[propName].dataName] = v;
            return true;
          }
        },
        ...defineMethods,
      },
      render() {
        const propMap = {};
        const handlerMap = {};

        Object.keys(propOptionMap).forEach((propName: string): void => {
          const { dataName, events } = propOptionMap[propName];
          const eventName = `on${events[0].charAt(0).toUpperCase()}${events[0].substr(1)}`;
          const { props } = this.$.vnode;
          if (
            (props && propName in props)
            || typeof this[dataName] !== 'undefined'
          ) {
            propMap[propName] = this[dataName];
          }
          // 只监听第一个定义的事件，参数取第一个事件参数
          handlerMap[eventName] = (v: any, ...args: any[]): any => this.updateData(propName, v, ...args);
        });

        const attrs = {};
        Object.keys(this.$attrs).forEach((attrName) => {
          const camelAttrKey = toCamel(attrName);
          if (camelPropsKeys.indexOf(camelAttrKey) === -1) {
            attrs[attrName] = this.$attrs[attrName];
          }
        });

        return h(componentConstructor, {
          // props
          ...this.$props,
          ...propMap,

          // attrs
          ...attrs,

          // events
          ...this._listeners as Record<string, any>,
          ...handlerMap,

          ref: 'component',
        }, this.$slots);
      },
    });
  }

  return mapProps;
}
