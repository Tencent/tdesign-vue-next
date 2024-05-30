import { withInstall } from '@td/adapter-vue';
import type { TdPopconfirmProps } from '@td/components/popconfirm/type';
import _Popconfirm from './popconfirm';

import './style';

export * from '@td/components/popconfirm/type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
