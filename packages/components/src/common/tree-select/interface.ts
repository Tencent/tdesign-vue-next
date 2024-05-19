import type { TdTreeSelectProps } from '@td/intel/components/calendar/type';

export type TreeSelectProps = TdTreeSelectProps;

export * from '@td/intel/components/calendar/type';
export interface IRemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface INodeOptions {
  label: string;
  value: string | number;
}
