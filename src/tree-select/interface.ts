import { TdTreeSelectProps } from './type';

export type TreeSelectProps = TdTreeSelectProps;

export * from './type';
export interface RemoveOptions<DataOption> {
  value: string | number;
  data: DataOption;
  e: MouseEvent;
}

export interface NodeOptions {
  label: string;
  value: string | number;
}
