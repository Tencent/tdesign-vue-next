import { mount } from '@vue/test-utils';
import { createElementById } from '../../../test/utils';

// empty value
export function getTagInputDefaultMount(TagInput, props = {}, events) {
  const { scopedSlots } = props;
  // eslint-disable-next-line
  delete props.scopedSlots;

  createElementById();

  return mount(
    {
      render() {
        return <TagInput props={props} on={events} scopedSlots={scopedSlots}></TagInput>;
      },
    },
    { attachTo: '#focus-dom' },
  );
}

// with default value
export function getTagInputValueMount(TagInput, props = {}, events) {
  const { scopedSlots } = props;
  // eslint-disable-next-line
  delete props.scopedSlots;

  createElementById();

  const value = ['tdesign-vue', 'tdesign-react', 'tdesign-miniprogram', 'tdesign-mobile-vue', 'tdesign-mobile-react'];
  return mount(
    {
      render() {
        return <TagInput value={value} props={props} on={events} scopedSlots={scopedSlots}></TagInput>;
      },
    },
    { attachTo: '#focus-dom' },
  );
}
