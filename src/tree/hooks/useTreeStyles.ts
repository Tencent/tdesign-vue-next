import { computed, toRefs, TypeStyles, usePrefixClass } from '../adapt';
import { TreeProps, TypeTreeState } from '../tree-types';

export function formatCSSUnit(unit: string | number) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useTreeStyles(props: TreeProps, state: TypeTreeState) {
  const componentName = usePrefixClass('tree').value;
  const classPrefix = usePrefixClass().value;
  const treeState = state;
  const { virtualConfig, isScrolling } = treeState;

  const { height, maxHeight } = toRefs(props);

  const treeClasses = computed(() => {
    const list: Array<string> = [componentName];
    const { disabled, hover, transition, checkable, draggable, expandOnClickNode, scroll } = props;
    if (disabled) {
      list.push(`${classPrefix}-is-disabled`);
    }
    if (hover) {
      list.push(`${componentName}--hoverable`);
    }
    if (checkable) {
      list.push(`${componentName}--checkable`);
    }
    if (draggable) {
      list.push(`${componentName}--draggable`);
    }
    if (transition) {
      list.push(`${componentName}--transition`);
    }
    if (expandOnClickNode) {
      list.push(`${componentName}--block-node`);
    }

    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (isVirtual) {
      list.push(`${componentName}__vscroll`);
      if (isScrolling.value) {
        list.push(`${componentName}--scrolling`);
      }
    } else if (scroll && scroll.type === 'lazy') {
      list.push(`${componentName}__lazyload`);
    }

    return list;
  });

  const treeContentStyles = computed<TypeStyles>(() => ({
    height: formatCSSUnit(height.value),
    maxHeight: formatCSSUnit(maxHeight.value),
  }));

  const scrollStyles = computed<TypeStyles>(() => {
    // isVirtual 改为函数内取值，可接收属性的变动
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    const translateY = isVirtual ? virtualConfig?.translateY.value : 0;
    const transform = `translateY(${translateY}px)`;
    const posStyle = {
      transform,
      '-ms-transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
    };
    return posStyle;
  });

  const cursorStyles = computed<TypeStyles>(() => {
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    const translateY = isVirtual ? virtualConfig?.translateY.value : 0;
    const translate = `translate(0, ${translateY}px)`;
    return {
      transform: translate,
      '-ms-transform': translate,
      '-moz-transform': translate,
      '-webkit-transform': translate,
    };
  });

  return {
    treeClasses,
    treeContentStyles,
    scrollStyles,
    cursorStyles,
  };
}
