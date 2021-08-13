import _Transfer from './transfer';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTransferProps } from './type'

export * from './type';
export type TransferProps = TdTransferProps

export const Transfer: WithInstallType<typeof _Transfer> = withInstall(_Transfer);
export default Transfer;
