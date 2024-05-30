import { withInstall } from '@td/adapter-vue';
import _AutoComplete from '@td/components-common/src/auto-complete/auto-complete';
import _HighlightOption from '@td/components-common/src/auto-complete/highlight-option';
import type { AutoCompleteOption, TdAutoCompleteProps } from './type';

import '@td/components-common/src/auto-complete/style';

export * from './type';
export type AutoCompleteProps<T extends AutoCompleteOption = AutoCompleteOption> = TdAutoCompleteProps<T>;

export const AutoComplete = withInstall(_AutoComplete);
export const HighlightOption = withInstall(_HighlightOption);

export default AutoComplete;
