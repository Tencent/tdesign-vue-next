import { TdTreeSelectProps } from './type';

export type TreeSelectProps = TdTreeSelectProps;

export * from './type';
export interface IRemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface INodeOptions {
  label: string;
  value: string | number;
}
