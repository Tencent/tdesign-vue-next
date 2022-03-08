import { computed, Ref } from 'vue';
import CLASSNAMES from '../utils/classnames';
import { TdPaginationProps } from './type';

export default function usePaginationClasses(props: TdPaginationProps, innerCurrent: Ref<number>, name: Ref<string>) {
  const pageCount = computed(() => {
    const c: number = Math.ceil(props.total / props.pageSize);
    return c > 0 ? c : 1;
  });

  const paginationClass = computed(() => [
    `${name.value}`,
    CLASSNAMES.SIZE[props.size],
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
    },
  ]);

  const totalClass = computed(() => [`${name.value}__total`]);

  const sizerClass = computed(() => [`${name.value}__select`]);

  const preBtnClass = computed(() => [
    `${name.value}__btn`,
    `${name.value}__btn-prev`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled || innerCurrent.value === 1,
    },
  ]);

  const nextBtnClass = computed(() => [
    `${name.value}__btn`,
    `${name.value}__btn-next`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled || innerCurrent.value === pageCount.value,
    },
  ]);

  const btnWrapClass = computed(() => [`${name.value}__pager`]);

  const btnMoreClass = computed(() => [
    `${name.value}__number`,
    `${name.value}__number--more`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
    },
  ]);

  const jumperClass = computed(() => [`${name.value}__jump`]);

  const jumperInputClass = computed(() => [`${name.value}__input`]);

  const simpleClass = computed(() => [`${name.value}__select`]);

  const getButtonClass = (index: number) => [
    `${name.value}__number`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
      [CLASSNAMES.STATUS.current]: innerCurrent.value === index,
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
