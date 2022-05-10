import { ref } from 'vue';
import isObject from 'lodash/isObject';
import { TdColProps, TdRowProps } from './type';
import { calcSize } from '../utils/responsive';
import { useListener } from '../hooks/useListener';
import { isServer } from '../utils/dom';

export interface RowProviderType {
  gutter: TdRowProps['gutter'];
}

/**
 * rowSizeHook
 * @returns
 */
export function useRowSize() {
  const size = ref(calcSize(isServer ? 0 : window.innerWidth));
  const updateSize = () => {
    size.value = calcSize(isServer ? 0 : window.innerWidth);
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
      rowGap: `${gutter}px`,
    });

  const strategyMap = {
    isNumber: (gutter: TdRowProps['gutter']) => {
      if (typeof gutter === 'number') {
        getMarginStyle(gutter);
      }
    },
    isArray: (gutter: TdRowProps['gutter']) => {
      if (Array.isArray(gutter) && gutter.length) {
        strategyMap.isNumber(gutter[0]);

        if (typeof gutter[1] === 'number') {
          getRowGapStyle(gutter[1]);
        }

        if (isObject(gutter[0]) && gutter[0][currentSize] !== undefined) {
          getMarginStyle(gutter[0][currentSize]);
        }

        if (isObject(gutter[1]) && gutter[1][currentSize] !== undefined) {
          getRowGapStyle(gutter[1][currentSize]);
        }
      }
    },
    isObject: (gutter: TdRowProps['gutter']) => {
      if (isObject(gutter) && gutter[currentSize]) {
        if (Array.isArray(gutter) && gutter.length) {
          getMarginStyle(gutter[currentSize][0]);
          getRowGapStyle(gutter[currentSize][1]);
        } else {
          getMarginStyle(gutter[currentSize]);
        }
      }
    },
  };

  Object.keys(strategyMap).forEach((item) => {
    strategyMap[item](gutter);
  });

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
  // 判断是否是flex
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
  const getPaddingStyle = (gutter: number) =>
    Object.assign(paddingObj, {
      paddingLeft: `${gutter / 2}px`,
      paddingRight: `${gutter / 2}px`,
    });

  const strategyMap = {
    isNumber: (gutter: TdRowProps['gutter']) => {
      if (typeof gutter === 'number') {
        getPaddingStyle(gutter);
      }
    },
    isArray: (gutter: TdRowProps['gutter']) => {
      if (Array.isArray(gutter) && gutter.length) {
        if (typeof gutter[0] === 'number') {
          getPaddingStyle(gutter[0]);
        }
        if (isObject(gutter[0]) && gutter[0][currentSize]) {
          getPaddingStyle(gutter[0][currentSize]);
        }
      }
    },
    isObject: (gutter: TdRowProps['gutter']) => {
      if (isObject(gutter) && gutter[currentSize]) {
        getPaddingStyle(gutter[currentSize]);
      }
    },
  };

  Object.keys(strategyMap).forEach((item) => {
    strategyMap[item](gutter);
  });

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
