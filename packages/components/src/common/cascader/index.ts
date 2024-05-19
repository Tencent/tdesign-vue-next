import { withInstall } from '@td/adapter-utils';
import type { TreeOptionData } from '@td/shared/interface';
import type { TdCascaderProps } from '@td/intel/components/cascader/type';
import _Cascader from './cascader';
import _CascaderPanel from './cascader-panel';

import './style';

export * from '@td/intel/components/cascader/type';

export type CascaderProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;
export type CascaderPanelProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;

export const Cascader = withInstall(_Cascader);
export const CascaderPanel = withInstall(_CascaderPanel);

export default Cascader;
