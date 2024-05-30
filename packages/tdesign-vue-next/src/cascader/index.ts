import { withInstall } from '@td/adapter-vue';
import type { TdCascaderProps } from '@td/components/cascader/type';
import type { TreeOptionData } from '@td/types';
import _CascaderPanel from './cascader-panel';
import _Cascader from './cascader';

import './style';

export * from '@td/components/cascader/type';

export type CascaderProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;
export type CascaderPanelProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;

export const Cascader = withInstall(_Cascader);
export const CascaderPanel = withInstall(_CascaderPanel);

export default Cascader;
