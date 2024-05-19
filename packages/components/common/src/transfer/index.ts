import _Transfer from './transfer';
import { withInstall } from '@td/adapter-utils';
import { TdTransferProps } from '@td/intel/transfer/type';

import './style';

export type TransferProps = TdTransferProps;

export const Transfer = withInstall(_Transfer);

export default Transfer;
