import 'tdesign-web-components/lib/filecard';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdFileCardProps } from 'tdesign-web-components';

export const Filecard = omiVueify('t-filecard', {
  methodNames: [],
}) as DefineComponent<TdFileCardProps>;

export default Filecard;
