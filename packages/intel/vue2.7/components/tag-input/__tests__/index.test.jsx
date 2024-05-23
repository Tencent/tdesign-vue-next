import { mount } from '@vue/test-utils';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue';
import { nextTick } from '@td/adapter-vue';
import TagInput from '@/src/tag-input/index.ts';

describe('tagInput', () => {
  const tags = ['Vue', 'React'];
  describe(':props', () => {
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <TagInput v-model={tags} />;
        },
      });
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return <TagInput defaultValue={tags} />;
        },
      });
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':autoWidth', () => {
      const wrapper = mount({
        render() {
          return <TagInput autoWidth />;
        },
      });
      expect(wrapper.classes()).toContain('t-input--auto-width');
    });

    it(':clearable', async () => {
      const wrapper = mount({
        render() {
          return <TagInput v-model={tags} clearable />;
        },
      });
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });
  });
});
