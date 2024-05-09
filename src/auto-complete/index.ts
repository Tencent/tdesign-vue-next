import withInstall from '../utils/withInstall';

import _AutoComplete from './auto-complete';
import _HighlightOption from './highlight-option';
import { AutoCompleteOption, TdAutoCompleteProps } from './type';

import './style';

export * from './type';
export type AutoCompleteProps<T extends AutoCompleteOption = AutoCompleteOption> = TdAutoCompleteProps<T>;

export const AutoComplete = withInstall(_AutoComplete);
export const HighlightOption = withInstall(_HighlightOption);

export default AutoComplete;
