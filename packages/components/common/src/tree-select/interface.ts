import { TdTreeSelectProps } from '@td/intel/tree-select/type';

export type TreeSelectProps = TdTreeSelectProps;

export * from '@td/intel/tree-select/type';
export interface IRemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface INodeOptions {
  label: string;
  value: string | number;
}
