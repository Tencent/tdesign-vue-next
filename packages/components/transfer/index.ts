import _Transfer from './transfer';
import { withInstall } from '@tdesign/shared-utils';
import { TdTransferProps } from './type';

import './style';

export type TransferProps = TdTransferProps;

export const Transfer = withInstall(_Transfer);

export default Transfer;
