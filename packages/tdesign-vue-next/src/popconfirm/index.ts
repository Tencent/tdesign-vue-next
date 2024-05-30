import { withInstall } from '@td/adapter-vue';
import type { TdPopconfirmProps } from '@td/components/popconfirm/type';
import _Popconfirm from '@td/components-common/src/popconfirm/popconfirm';

import '@td/components-common/src/popconfirm/style';

export * from '@td/components/popconfirm/type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
