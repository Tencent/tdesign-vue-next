import withInstall from '../utils/withInstall';

import _Transfer from './transfer';
import { TdTransferProps } from './type';

import './style';

export type TransferProps = TdTransferProps;

export const Transfer = withInstall(_Transfer);

export default Transfer;
