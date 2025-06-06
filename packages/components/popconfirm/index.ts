import _Popconfirm from './popconfirm';
import { withInstall } from '@tdesign/shared-utils';
import { TdPopconfirmProps } from './type';

import './style';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
