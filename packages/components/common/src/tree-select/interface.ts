import type { TdTreeSelectProps } from '@td/components/tree-select/type';

export type TreeSelectProps = TdTreeSelectProps;

export * from '@td/components/tree-select/type';
export interface IRemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface INodeOptions {
  label: string;
  value: string | number;
}
