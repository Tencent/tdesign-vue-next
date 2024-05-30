import { withInstall } from '@td/adapter-vue';
import _Transfer from '@td/components-common/src/transfer/transfer';
import type { TdTransferProps } from './type';

import '@td/components-common/src/transfer/style';

export type TransferProps = TdTransferProps;

export const Transfer = withInstall(_Transfer);

export default Transfer;
