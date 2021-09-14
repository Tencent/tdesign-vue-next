import _Transfer from './transfer';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdTransferProps } from './type';

export * from './type';
export type TransferProps = TdTransferProps;

export const Transfer: WithInstallType<typeof _Transfer> = withInstall(mapProps([{
  name: 'checked',
  event: ['update:checked'],
}, {
  name: 'value',
  alias: ['modelValue'],
}])(_Transfer));

export default Transfer;
