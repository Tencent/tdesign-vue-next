import { getCurrentInstance } from 'vue';
import { kebabCase } from 'lodash-es';

/**
 * 判断组件的某个属性是否由外部传入
 * @param propName 属性名称
 */
export function isPropPassed(propName: string): boolean {
  const instance = getCurrentInstance();
  const vProps = (instance && instance.vnode && (instance.vnode as any).props) || {};
  const kebab = kebabCase(propName);
  return Object.prototype.hasOwnProperty.call(vProps, propName) || Object.prototype.hasOwnProperty.call(vProps, kebab);
}
