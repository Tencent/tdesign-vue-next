import { defineComponent, nextTick } from 'vue';
import type { PropType } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import tagInputProps from '../props';
import { useTagList } from '../hooks/useTagList';
import type { TagInputProps } from '../types';
import type { TagInputValue } from '../type';

let tagListApi: ReturnType<typeof useTagList>;

const TagListHarness = defineComponent({
  name: 'TagInputListHarness',
  props: {
    ...tagInputProps,
    defaultValue: {
      type: Array as PropType<TagInputValue>,
      default: undefined,
    },
    getDragProps: Function as PropType<TagInputProps['getDragProps']>,
    hostLabel: String,
    displayAll: Boolean,
  },
  setup(props) {
    tagListApi = useTagList(props);
    return () => (
      <div class="tag-list-host">
        {tagListApi.renderLabel({
          displayNode: props.displayAll ? <span class="display-all">All tags</span> : null,
          label: props.hostLabel,
        })}
      </div>
    );
  },
});

const keyboardEvent = (key: string, code = key) => new KeyboardEvent('keydown', { key, code });

describe('useTagList', () => {
  const wrappers: VueWrapper[] = [];

  const render = (
    props: InstanceType<typeof TagListHarness>['$props'] = {},
    slots: Record<string, (...args: unknown[]) => unknown> = {},
  ) => {
    const wrapper = mount(TagListHarness, { props, slots });
    wrappers.push(wrapper);
    return { wrapper, api: tagListApi };
  };

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
  });

  describe('props', () => {
    it(':defaultValue[array]', () => {
      const { wrapper, api } = render({ defaultValue: ['Vue', 'React'] });

      expect(api.tagValue.value).toEqual(['Vue', 'React']);
      expect(wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(['Vue', 'React']);
    });

    it(':defaultValue[empty]', () => {
      const { wrapper, api } = render();

      expect(api.tagValue.value).toEqual([]);
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);
    });

    it(':value[null]', () => {
      const { api } = render({ value: null as unknown as TagInputValue });

      expect(api.tagValue.value).toEqual([]);
    });

    it(':disabled[boolean]', () => {
      const { wrapper } = render({ defaultValue: ['Vue'], disabled: true });

      expect(wrapper.find('.t-tag').classes()).toContain('t-tag--disabled');
      expect(wrapper.find('.t-tag__icon-close').exists()).toBe(false);
    });

    it(':readonly[boolean]', () => {
      const { wrapper } = render({ defaultValue: ['Vue'], readonly: true });

      expect(wrapper.find('.t-tag__icon-close').exists()).toBe(false);
    });

    it(':hostLabel[string]', () => {
      const { wrapper } = render({ defaultValue: ['Vue'], hostLabel: 'Framework' });

      expect(wrapper.find('.t-tag-input__prefix').text()).toBe('Framework');
      expect(wrapper.findAll('.t-tag')).toHaveLength(1);
    });

    it(':hostLabel[empty]', () => {
      const { wrapper } = render({ defaultValue: ['Vue'], hostLabel: '' });
      expect(wrapper.find('.t-tag-input__prefix').exists()).toBe(false);
    });

    it(':displayNode', () => {
      const { wrapper } = render({ defaultValue: ['Vue', 'React'], displayAll: true });

      expect(wrapper.find('.display-all').text()).toBe('All tags');
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);
    });

    it(':minCollapsedNum[number]', () => {
      const { wrapper } = render({ defaultValue: ['Vue', 'React', 'Svelte'], minCollapsedNum: 1 });

      expect(wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(['Vue', '+2']);
    });

    it(':collapsedItems[slot]', async () => {
      const onChange = vi.fn();
      const collapsedItems = ({
        collapsedSelectedItems,
        onClose,
      }: {
        collapsedSelectedItems: TagInputValue;
        onClose: (context: { index: number; e?: MouseEvent }) => void;
      }) => (
        <button class="collapsed" onClick={(e) => onClose({ index: 1, e })}>
          {collapsedSelectedItems.join(',')}
        </button>
      );
      const { wrapper } = render(
        { defaultValue: ['Vue', 'React', 'Svelte'], minCollapsedNum: 1, onChange },
        { collapsedItems },
      );

      await wrapper.find('.collapsed').trigger('click');

      expect(onChange).toHaveBeenCalledWith(
        ['Vue', 'Svelte'],
        expect.objectContaining({ trigger: 'tag-remove', index: 1, item: 'React' }),
      );
    });

    it(':getDragProps[function]', () => {
      const getDragProps = vi.fn(() => ({ draggable: true }));
      const { wrapper } = render({
        defaultValue: ['Vue', 'React'],
        getDragProps: getDragProps as unknown as TagInputProps['getDragProps'],
      });

      expect(getDragProps).toHaveBeenNthCalledWith(1, 0, 'Vue');
      expect(getDragProps).toHaveBeenNthCalledWith(2, 1, 'React');
      expect(wrapper.findAll('[draggable="true"]')).toHaveLength(2);
    });

    it(':tagProps[onClose]', async () => {
      const tagOnClose = vi.fn();
      const onChange = vi.fn();
      const { wrapper } = render({ defaultValue: ['Vue'], tagProps: { onClose: tagOnClose }, onChange });

      await wrapper.find('.t-tag__icon-close').trigger('click');

      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'tag-remove', item: 'Vue' }));
      expect(tagOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('events', () => {
    it(':onClose', async () => {
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const { api } = render({ defaultValue: ['Vue', 'React'], onChange, onRemove });
      const e = new MouseEvent('click');

      api.onClose({ index: 0, e });
      await nextTick();

      expect(api.tagValue.value).toEqual(['React']);
      expect(onChange).toHaveBeenCalledWith(
        ['React'],
        expect.objectContaining({ trigger: 'tag-remove', index: 0, item: 'Vue', e }),
      );
      expect(onRemove).toHaveBeenCalledWith({
        value: ['React'],
        trigger: 'tag-remove',
        index: 0,
        item: 'Vue',
        e,
      });
    });

    it(':clearAll', async () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue', 'React'], onChange });
      const e = new MouseEvent('click');

      api.clearAll({ e });
      await nextTick();

      expect(api.tagValue.value).toEqual([]);
      expect(onChange).toHaveBeenCalledWith([], { trigger: 'clear', e });
    });

    it(':onInnerEnter', async () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange, onEnter });
      const e = keyboardEvent('Enter');

      api.onInnerEnter('  React  ', { e });
      await nextTick();

      expect(api.tagValue.value).toEqual(['Vue', 'React']);
      expect(onChange).toHaveBeenCalledWith(
        ['Vue', 'React'],
        expect.objectContaining({ trigger: 'enter', index: 1, item: 'React', e }),
      );
      expect(onEnter).toHaveBeenCalledWith(['Vue', 'React'], { e, inputValue: '  React  ' });
    });

    it(':onInnerEnter[empty]', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange, onEnter });
      const e = keyboardEvent('Enter');

      api.onInnerEnter('   ', { e });

      expect(api.tagValue.value).toEqual(['Vue']);
      expect(onChange).not.toHaveBeenCalled();
      expect(onEnter).toHaveBeenCalledWith(['Vue'], { e, inputValue: '   ' });
    });

    it(':onInnerEnter[empty string]', () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange });

      api.onInnerEnter('', { e: keyboardEvent('Enter') });

      expect(api.tagValue.value).toEqual(['Vue']);
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInnerEnter[max]', () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], max: 1, onChange, onEnter });
      const e = keyboardEvent('Enter');

      api.onInnerEnter('React', { e });

      expect(api.tagValue.value).toEqual(['Vue']);
      expect(onChange).not.toHaveBeenCalled();
      expect(onEnter).toHaveBeenCalledWith(['Vue'], { e, inputValue: 'React' });
    });

    it(':onInputBackspaceKeyUp[empty]', () => {
      const { api } = render();
      expect(() => api.onInputBackspaceKeyUp('Vue')).not.toThrow();
    });

    it(':onInputBackspaceKeyUp[value]', () => {
      const { api } = render({ defaultValue: ['Vue'] });
      expect(() => api.onInputBackspaceKeyUp('React')).not.toThrow();
    });

    it(':onInputBackspaceKeyDown[empty tags]', () => {
      const onChange = vi.fn();
      const { api } = render({ onChange });

      api.onInputBackspaceKeyDown('', { e: keyboardEvent('Backspace') });

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInputBackspaceKeyDown[Process]', () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange });

      api.onInputBackspaceKeyDown('', { e: keyboardEvent('Process') });

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInputBackspaceKeyDown[readonly]', () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], readonly: true, onChange });

      api.onInputBackspaceKeyDown('', { e: keyboardEvent('Backspace') });

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInputBackspaceKeyDown[non-delete key]', () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange });

      api.onInputBackspaceKeyDown('', { e: keyboardEvent('ArrowLeft') });

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInputBackspaceKeyDown[non-empty input]', () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange });

      api.onInputBackspaceKeyDown('R', { e: keyboardEvent('Backspace') });

      expect(onChange).not.toHaveBeenCalled();
    });

    it(':onInputBackspaceKeyDown[Backspace]', async () => {
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const { api } = render({ defaultValue: ['Vue', 'React'], onChange, onRemove });
      const e = keyboardEvent('Backspace');

      api.onInputBackspaceKeyDown('', { e });
      await nextTick();

      expect(api.tagValue.value).toEqual(['Vue']);
      expect(onChange).toHaveBeenCalledWith(
        ['Vue'],
        expect.objectContaining({ trigger: 'backspace', index: 1, item: 'React', e }),
      );
      expect(onRemove).toHaveBeenCalledWith({
        value: ['Vue'],
        trigger: 'backspace',
        index: 1,
        item: 'React',
        e,
      });
    });

    it(':onInputBackspaceKeyDown[NumpadDelete code]', async () => {
      const onChange = vi.fn();
      const { api } = render({ defaultValue: ['Vue'], onChange });

      api.onInputBackspaceKeyDown('', { e: keyboardEvent('Delete', 'NumpadDelete') });
      await nextTick();

      expect(api.tagValue.value).toEqual([]);
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'backspace', item: 'Vue' }));
    });
  });
});
