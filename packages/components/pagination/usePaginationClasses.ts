import { computed, Ref } from 'vue';
import { getIEVersion } from '@tdesign/common/js/utils/helper';
import { useCommonClassName } from '../hooks/useConfig';
import { TdPaginationProps } from './type';

export default function usePaginationClasses(
  props: TdPaginationProps,
  innerCurrent: Ref<number>,
  innerPageSize: Ref<number>,
  name: Ref<string>,
) {
  const { SIZE, STATUS } = useCommonClassName();

  const pageCount = computed(() => {
    const c: number = Math.ceil(props.total / innerPageSize.value);
    return c > 0 ? c : 1;
  });

  const paginationClass = computed(() => [
    `${name.value}`,
    SIZE.value[props.size],
    {
      [STATUS.value.disabled]: props.disabled,
      [`${name.value}-ie`]: getIEVersion() < 11,
    },
    props.theme === 'simple' ? `${name.value}--simple` : ``,
  ]);

  const totalClass = computed(() => [`${name.value}__total`]);

  const sizerClass = computed(() => [`${name.value}__select`]);

  const preBtnClass = computed(() => [
    `${name.value}__btn`,
    `${name.value}__btn-prev`,
    {
      [STATUS.value.disabled]: props.disabled || innerCurrent.value === 1,
    },
  ]);

  const nextBtnClass = computed(() => [
    `${name.value}__btn`,
    `${name.value}__btn-next`,
    {
      [STATUS.value.disabled]: props.disabled || innerCurrent.value === pageCount.value,
    },
  ]);

  const btnWrapClass = computed(() => [`${name.value}__pager`]);

  const btnMoreClass = computed(() => [
    `${name.value}__number`,
    `${name.value}__number--more`,
    {
      [STATUS.value.disabled]: props.disabled,
    },
  ]);

  const jumperClass = computed(() => [`${name.value}__jump`]);

  const jumperInputClass = computed(() => [`${name.value}__input`]);

  const simpleClass = computed(() => [`${name.value}__select`]);

  const getButtonClass = (index: number) => [
    `${name.value}__number`,
    {
      [STATUS.value.disabled]: props.disabled,
      [STATUS.value.current]: innerCurrent.value === index,
    },
  ];

  return {
    pageCount,
    paginationClass,
    totalClass,
    sizerClass,
    preBtnClass,
    nextBtnClass,
    btnWrapClass,
    btnMoreClass,
    jumperClass,
    jumperInputClass,
    simpleClass,
    getButtonClass,
  };
}
