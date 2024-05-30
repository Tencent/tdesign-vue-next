import { withInstall } from '@td/adapter-vue';
import type { TdTransferProps } from './type';
import _Transfer from '@td/components-common/src/transfer/transfer';

import '@td/components-common/src/transfer/style';

export type TransferProps = TdTransferProps;

export const Transfer = withInstall(_Transfer);

export default Transfer;
