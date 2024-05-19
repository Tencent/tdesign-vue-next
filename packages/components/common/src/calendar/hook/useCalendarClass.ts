import { computed } from '@td/adapter-vue';

import { usePrefixClass } from '../../hooks/useConfig';
import type { CalendarState } from '../interface';
import type { TdCalendarProps } from '../type';
import { COMPONENT_NAME } from '../const';

export function useCalendarClass(props: TdCalendarProps, state: CalendarState) {
  const prefixClass = usePrefixClass(COMPONENT_NAME);

  const body = computed<string[]>(() => {
    return [`${prefixClass.value}`, `${prefixClass.value}--${props.theme}`];
  });
  const panel = computed<string[]>(() => {
    return [`${prefixClass.value}__panel`, `${prefixClass.value}__panel--${state.curSelectedMode}`];
  });
  const control = computed<string[]>(() => {
    return [`${prefixClass.value}__control`];
  });
  const title = computed<string[]>(() => {
    return [`${prefixClass.value}__title`];
  });
  const controlSection = computed<string[]>(() => {
    return [`${prefixClass.value}__control-section`];
  });
  const controlSectionCell = computed<string[]>(() => {
    return [`${prefixClass.value}__control-section-cell`];
  });
  const controlTag = computed<string[]>(() => {
    return [`${prefixClass.value}__control-tag`];
  });
  const table = computed<string[]>(() => {
    return [`${prefixClass.value}__table`];
  });
  const tableHead = computed<string[]>(() => {
    return [`${prefixClass.value}__table-head`];
  });
  const tableHeadRow = computed<string[]>(() => {
    return [`${prefixClass.value}__table-head-row`];
  });
  const tableHeadCell = computed<string[]>(() => {
    return [`${prefixClass.value}__table-head-cell`];
  });
  const tableBody = computed<string[]>(() => {
    return [`${prefixClass.value}__table-body`];
  });
  const tableBodyRow = computed<string[]>(() => {
    return [`${prefixClass.value}__table-body-row`];
  });

  return {
    body,
    panel,
    control,
    title,
    controlSection,
    controlSectionCell,
    controlTag,
    table,
    tableHead,
    tableHeadRow,
    tableHeadCell,
    tableBody,
    tableBodyRow,
  };
}

export function useCalendarCellClass() {
  const prefixClass = usePrefixClass(COMPONENT_NAME);

  const tableBodyCell = computed<string[]>(() => {
    return [`${prefixClass.value}__table-body-cell`];
  });
  const tableBodyCell4Now = computed<string>(() => {
    return `${prefixClass.value}__table-body-cell--now`;
  });
  const tableBodyCellDisplay = computed<string[]>(() => {
    return [`${prefixClass.value}__table-body-cell-display`];
  });
  const tableBodyCellCsontent = computed<string[]>(() => {
    return [`${prefixClass.value}__table-body-cell-content`];
  });

  return {
    tableBodyCell,
    tableBodyCell4Now,
    tableBodyCellDisplay,
    tableBodyCellCsontent,
  };
}
