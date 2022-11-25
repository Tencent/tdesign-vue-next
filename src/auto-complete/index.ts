import _AutoComplete from './auto-complete';
import _HighlightOption from './highlight-option';
import withInstall from '../utils/withInstall';
import { TdAutoCompleteProps } from './type';

import './style';

export * from './type';
export type AutoCompleteProps = TdAutoCompleteProps;

export const AutoComplete = withInstall(_AutoComplete);
export const HighlightOption = withInstall(_HighlightOption);

export default AutoComplete;
