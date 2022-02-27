import { computed } from 'vue';
import CLASSNAMES from '../utils/classnames';
import { TdPaginationProps } from './type';

export default function usePaginationClasses(props: TdPaginationProps, name: string) {
  const pageCount = computed(() => {
    const c: number = Math.ceil(props.total / props.pageSize);
    return c > 0 ? c : 1;
  });

  const paginationClass = computed(() => [
    `${name}`,
    CLASSNAMES.SIZE[props.size],
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
    },
  ]);

  const totalClass = computed(() => [`${name}__total`]);

  const sizerClass = computed(() => [`${name}__select`]);

  const preBtnClass = computed(() => [
    `${name}__btn`,
    `${name}__btn-prev`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled || props.current === 1,
    },
  ]);

  const nextBtnClass = computed(() => [
    `${name}__btn`,
    `${name}__btn-next`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled || props.current === pageCount.value,
    },
  ]);

  const btnWrapClass = computed(() => [`${name}__pager`]);

  const btnMoreClass = computed(() => [
    `${name}__number`,
    `${name}__number--more`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
    },
  ]);

  const jumperClass = computed(() => [`${name}__jump`]);

  const jumperInputClass = computed(() => [`${name}__input`]);

  const simpleClass = computed(() => [`${name}__select`]);

  const getButtonClass = (index: number) => [
    `${name}__number`,
    {
      [CLASSNAMES.STATUS.disabled]: props.disabled,
      [CLASSNAMES.STATUS.current]: props.current === index,
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
