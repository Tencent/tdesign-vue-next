import { withInstall } from '@td/adapter-vue';
import type { TdTextareaProps } from '@td/components/textarea/type';
import _Textarea from '@td/components-common/src/textarea/textarea';

import '@td/components-common/src/textarea/style';

export * from '@td/components/textarea/type';
export type TextareaProps = TdTextareaProps;

export const Textarea = withInstall(_Textarea);
export default Textarea;
