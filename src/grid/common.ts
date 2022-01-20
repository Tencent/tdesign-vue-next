import { ref } from 'vue';
import isObject from 'lodash/isObject';
import { TdColProps, TdRowProps } from './type';
import { calcSize } from '../utils/responsive';
import { useListener } from '../hooks/event';

export interface RowProviderType {
  gutter: TdRowProps['gutter'];
}

/**
 * rowSizeHook
 * @returns
 */
export function useRowSize() {
  const size = ref(calcSize(window.innerWidth));
  const updateSize = () => {
    size.value = calcSize(window.innerWidth);
  };

  useListener('resize', updateSize);

  return size;
}

/**
 *
 * @param name
 * @param props
 * @returns
 */
export function getRowClasses(name: string, props: TdRowProps) {
  const { justify, align } = props;
  return [
    name,
    {
      [`${name}--${justify}`]: justify,
      [`${name}--${align}`]: align,
    },
  ];
}

/**
 *
 * @param gutter
 * @param currentSize
 * @returns
 */
export function calcRowStyle(gutter: TdRowProps['gutter'], currentSize: string) {
  const rowStyle = {};
  const getMarginStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      marginLeft: `${gutter / -2}px`,
      marginRight: `${gutter / -2}px`,
    });

  const getRowGapStyle = (gutter: number) =>
    Object.assign(rowStyle, {
      rowGap: `${gutter / -2}px`,
    });

  if (typeof gutter === 'number') {
    getMarginStyle(gutter);
  } else if (Array.isArray(gutter) && gutter.length) {
    if (typeof gutter[0] === 'number') {
      getMarginStyle(gutter[0]);
    }
    if (typeof gutter[1] === 'number') {
      getRowGapStyle(gutter[1]);
    }

    if (isObject(gutter[0]) && gutter[0][currentSize] !== undefined) {
      getMarginStyle(gutter[0][currentSize]);
    }

    if (isObject(gutter[1]) && gutter[1][currentSize] !== undefined) {
      getRowGapStyle(gutter[1][currentSize]);
    }
  } else if (isObject(gutter) && gutter[currentSize]) {
    if (Array.isArray(gutter[currentSize]) && gutter[currentSize].length) {
      getMarginStyle(gutter[currentSize][0]);
      getRowGapStyle(gutter[currentSize][1]);
    } else {
      getMarginStyle(gutter[currentSize]);
    }
  }
  return rowStyle;
}

/**
 * 解析Flex
 * @param flex
 * @returns
 */
export function parseFlex(flex: TdColProps['flex']): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} 0`;
  }
  // 判断fle是否
  if (/^\d+(\.\d+)?(px|r?em|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}

/**
 * 计算ColPadding
 * @param gutter
 * @param currentSize
 * @returns
 */
export function calcColPadding(gutter: TdRowProps['gutter'], currentSize: string) {
  const paddingObj = {};
  const getMarginStyle = (gutter: number) =>
    Object.assign(paddingObj, {
      marginLeft: `${gutter / -2}px`,
      marginRight: `${gutter / -2}px`,
    });

  if (typeof gutter === 'number') {
    getMarginStyle(gutter);
  } else if (Array.isArray(gutter) && gutter.length) {
    if (typeof gutter[0] === 'number') {
      getMarginStyle(gutter[0]);
    }
    if (isObject(gutter[0]) && gutter[0][currentSize]) {
      getMarginStyle(gutter[0][currentSize]);
    }
  } else if (isObject(gutter) && gutter[currentSize]) {
    getMarginStyle(gutter[currentSize]);
  }
  return paddingObj;
}

/**
 * 获取 col size
 * @param props
 * @returns
 */
export function getColClasses(name: string, props: TdColProps) {
  const { span, order, offset, push, pull } = props;
  const allSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  const ColSizeClasses = allSizes.reduce((acc, currSize) => {
    const sizeProp = props[currSize];
    let sizeObject: any = {};
    if (typeof sizeProp === 'number') {
      sizeObject.span = sizeProp;
    } else if (isObject(sizeProp)) {
      sizeObject = sizeProp || {};
    }
    return {
      ...acc,
      [`${name}-${currSize}-${sizeObject.span}`]: sizeObject.span !== undefined,
      [`${name}-${currSize}-order-${sizeObject.order}`]: parseInt(sizeObject.order, 10) >= 0,
      [`${name}-${currSize}-offset-${sizeObject.offset}`]: parseInt(sizeObject.offset, 10) >= 0,
      [`${name}-${currSize}-push-${sizeObject.push}`]: parseInt(sizeObject.push, 10) >= 0,
      [`${name}-${currSize}-pull-${sizeObject.pull}`]: parseInt(sizeObject.pull, 10) >= 0,
    };
  }, {});

  return {
    [`${name}`]: true,
    [`${name}-${span}`]: span !== undefined,
    [`${name}-order-${order}`]: order,
    [`${name}-offset-${offset}`]: offset,
    [`${name}-push-${push}`]: push,
    [`${name}-pull-${pull}`]: pull,
    ...ColSizeClasses,
  };
}
