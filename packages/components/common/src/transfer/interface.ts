import type { DataOption, SearchContext, TdTransferProps, TransferListType, TransferValue } from '@td/intel/transfer/type';

export * from '@td/intel/transfer/type';

export type TransferProps = TdTransferProps;

export interface TransferItemOption {
  label: string;
  value: TransferValue;
  disabled: boolean;
  key: string;
  data: DataOption;
  children?: TransferItemOption[];
}

export type TransferListOptionBase<T> = {
  [type in TransferListType]: T;
};

export type SearchEvent = SearchContext;
