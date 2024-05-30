import { withInstall } from '@td/adapter-vue';
import type { TdPopconfirmProps } from './type';
import _Popconfirm from '@td/components-common/src/popconfirm/popconfirm';

import '@td/components-common/src/popconfirm/style';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
