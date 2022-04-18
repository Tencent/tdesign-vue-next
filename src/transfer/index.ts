import _Transfer from './transfer';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';
import { TdTransferProps } from './type';

import './style';

export type TransferProps = TdTransferProps;

export const Transfer: WithInstallType<typeof _Transfer> = withInstall(_Transfer);

export default Transfer;
