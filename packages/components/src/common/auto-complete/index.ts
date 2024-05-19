import type { AutoCompleteOption, TdAutoCompleteProps } from '@td/intel/components/auto-complete/type';
import { withInstall } from '@td/adapter-utils';
import _AutoComplete from './auto-complete';
import _HighlightOption from './highlight-option';

import './style';

export * from '@td/intel/components/auto-complete/type';
export type AutoCompleteProps<T extends AutoCompleteOption = AutoCompleteOption> = TdAutoCompleteProps<T>;

export const AutoComplete = withInstall(_AutoComplete);
export const HighlightOption = withInstall(_HighlightOption);

export default AutoComplete;
