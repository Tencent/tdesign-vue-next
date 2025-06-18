import _Typography from './typography';
import _Text from './text';
import _Title from './title';
import _Paragraph from './paragraph';
import { withInstall } from '@tdesign/shared-utils';

export * from './type';
import './style';

export const Typography = withInstall(_Typography);
export const Text = withInstall(_Text);
export const Title = withInstall(_Title);
export const Paragraph = withInstall(_Paragraph);

export default Typography;
