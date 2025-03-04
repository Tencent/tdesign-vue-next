import _Typography from './typography';
import _Text from './text';
import _Title from './title';
import _Paragraph from './paragraph';
import withInstall from '../utils/withInstall';

export * from './type';

import './style';
import { cloneDeep } from 'lodash-es';

export const Typography = withInstall(_Typography);
export const TypographyText = withInstall(_Text);
export const TypographyTitle = withInstall(_Title);
export const TypographyParagraph = withInstall(_Paragraph);

const text = cloneDeep(_Text);
export const Text = withInstall(text, 'TText');
const title = cloneDeep(_Title);
export const Title = withInstall(title, 'TTitle');
const paragraph = cloneDeep(_Paragraph);
export const Paragraph = withInstall(paragraph, 'TParagraph');

export default Typography;
