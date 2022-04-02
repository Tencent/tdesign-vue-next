import { computed, toRefs } from 'vue';
import { TdBaseTableProps } from '../type';
import { ClassName, Styles } from '../../common';
import useClassName from './useClassName';
import useCommonClassName from '../../hooks/useCommonClassName';

export function formatCSSUnit(unit: string | number) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useStyle(props: TdBaseTableProps) {
  const { size, bordered, stripe, hover, verticalAlign, height, maxHeight, tableContentWidth } = toRefs(props);

  const { tableBaseClass, tableAlignClasses } = useClassName();
  const { sizeClassNames } = useCommonClassName();

  const tableClasses = computed<ClassName>(() => [
    tableBaseClass.table,
    {
      [sizeClassNames[size.value]]: size.value !== 'medium',
      [tableBaseClass.bordered]: bordered.value,
      [tableBaseClass.striped]: stripe.value,
      [tableBaseClass.hover]: hover.value,
      [tableBaseClass.affixedHeader]: props.headerAffixedTop,
      [tableBaseClass.rowspanAndColspan]: props.rowspanAndColspan,
      [tableAlignClasses[verticalAlign.value]]: verticalAlign.value !== 'middle',
    },
  ]);

  const tableContentStyles = computed<Styles>(() => ({
    height: formatCSSUnit(height.value),
    maxHeight: formatCSSUnit(maxHeight.value),
  }));

  const tableElementStyles = computed<Styles>(() => ({
    width: formatCSSUnit(tableContentWidth.value),
  }));

  return {
    tableClasses,
    tableElementStyles,
    tableContentStyles,
  };
}
