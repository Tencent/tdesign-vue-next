import { withInstall } from '@td/adapter-vue';
import type { TdCascaderProps } from './type';
import type { TreeOptionData } from '@td/types';
import _CascaderPanel from '@td/components-common/src/cascader/cascader-panel';
import _Cascader from '@td/components-common/src/cascader/cascader';

import '@td/components-common/src/cascader/style';

export * from './type';

export type CascaderProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;
export type CascaderPanelProps<T extends TreeOptionData = TreeOptionData> = TdCascaderProps<T>;

export const Cascader = withInstall(_Cascader);
export const CascaderPanel = withInstall(_CascaderPanel);

export default Cascader;
