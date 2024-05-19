import _Cascader from './cascader';
import _CascaderPanel from './cascader-panel';
import withInstall from '../utils/withInstall';
import { TdCascaderProps } from '@td/intel/cascader/type';
import { TreeOptionData } from '../common';

import './style';

export * from '@td/intel/cascader/type';

export type CascaderProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;
export type CascaderPanelProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;

export const Cascader = withInstall(_Cascader);
export const CascaderPanel = withInstall(_CascaderPanel);

export default Cascader;
