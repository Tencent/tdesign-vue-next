// @ts-nocheck
import { mount } from '@vue/test-utils';
import { TagInput } from '@tdesign/components';

// empty value
export function getTagInputDefaultMount(props = {}, events) {
  const slots = props['v-slots'];
  // eslint-disable-next-line
  delete props['v-slots'];

  return mount(<TagInput {...props} {...events} v-slots={slots}></TagInput>);
}

// with default value
export function getTagInputValueMount(props = {}, events) {
  const slots = props['v-slots'];
  // eslint-disable-next-line
  delete props['v-slots'];

  const value = ['tdesign-vue', 'tdesign-react', 'tdesign-miniprogram', 'tdesign-mobile-vue', 'tdesign-mobile-react'];
  return mount(<TagInput value={value} {...props} {...events} v-slots={slots}></TagInput>);
}
