import { TreeOptionData } from '../common';
import withInstall from '../utils/withInstall';

import _Cascader from './cascader';
import _CascaderPanel from './cascader-panel';
import { TdCascaderProps } from './type';

import './style';

export * from './type';

export type CascaderProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;
export type CascaderPanelProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;

export const Cascader = withInstall(_Cascader);
export const CascaderPanel = withInstall(_CascaderPanel);

export default Cascader;
