import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { simulateDragFileChange } from '@tdesign/internal-tests/utils';
import CustomFile from '@tdesign/components/upload/components/custom-file';
import { createCommonProps } from './fixtures';

describe('UploadCustomFile', () => {
  describe('props', () => {
    it(':draggable[boolean]', () => {
      const draggable = mount(CustomFile, {
        props: { ...createCommonProps(), draggable: true, dragEvents: {} },
        slots: { default: () => 'drag content' },
      });
      expect(draggable.find('.t-upload__dragger').exists()).toBe(true);

      const normal = mount(CustomFile, {
        props: { ...createCommonProps(), draggable: false, dragEvents: {} },
        slots: { default: () => h('span', { class: 'normal-slot' }, 'normal content') },
      });
      expect(normal.find('.normal-slot').exists()).toBe(true);
    });

    it(':dragContent[function/slot]', () => {
      const renderDragContent = vi.fn((_h, { dragActive }) =>
        h('span', { class: 'drag-function' }, String(dragActive)),
      );
      const functionWrapper = mount(CustomFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'function.txt' }] }),
          draggable: true,
          dragEvents: {},
          dragContent: renderDragContent,
        },
      });
      expect(functionWrapper.find('.drag-function').text()).toBe('false');
      expect(renderDragContent).toHaveBeenCalled();

      const slotWrapper = mount(CustomFile, {
        props: { ...createCommonProps(), draggable: true, dragEvents: {} },
        slots: { dragContent: () => h('span', { class: 'drag-slot' }, 'slot') },
      });
      expect(slotWrapper.find('.drag-slot').exists()).toBe(true);
    });

    it(':childrenNode[function]', () => {
      const childrenNode = vi.fn(({ files }) => h('span', { class: 'children-node' }, String(files.length)));
      const wrapper = mount(CustomFile, {
        props: {
          ...createCommonProps({ displayFiles: [{ name: 'one.txt' }] }),
          draggable: true,
          dragEvents: {},
          childrenNode,
        },
      });
      expect(wrapper.find('.children-node').text()).toBe('1');
      expect(childrenNode).toHaveBeenCalled();
    });

    it(':childrenNode[function] falls back to the default slot', () => {
      const wrapper = mount(CustomFile, {
        props: {
          ...createCommonProps(),
          draggable: false,
          dragEvents: {},
          childrenNode: (): null => null,
        },
        slots: { default: () => h('span', { class: 'fallback-slot' }, 'fallback') },
      });
      expect(wrapper.find('.fallback-slot').exists()).toBe(true);
    });

    it(':trigger[slot]', () => {
      const wrapper = mount(CustomFile, {
        props: { ...createCommonProps(), draggable: true, dragEvents: {} },
        slots: { trigger: () => h('span', { class: 'trigger-slot' }, 'trigger') },
      });
      expect(wrapper.find('.trigger-slot').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const triggerUpload = vi.fn();
      const wrapper = mount(CustomFile, {
        props: { ...createCommonProps(), draggable: false, dragEvents: {}, triggerUpload },
      });
      await wrapper.find('.t-upload__trigger').trigger('click');
      expect(triggerUpload).toHaveBeenCalledOnce();
    });

    it('dragenter/dragleave/drop', async () => {
      const onDragFileChange = vi.fn();
      const onDragenter = vi.fn();
      const onDragleave = vi.fn();
      const onDrop = vi.fn();
      const wrapper = mount(CustomFile, {
        props: {
          ...createCommonProps(),
          draggable: true,
          dragEvents: { onDragFileChange, onDragenter, onDragleave, onDrop },
          childrenNode: ({ dragActive }: { dragActive: boolean }) => String(dragActive),
        },
      });
      const dragger = wrapper.find('.t-upload__dragger').element;
      simulateDragFileChange(dragger, 'dragEnter');
      await nextTick();
      expect(wrapper.text()).toContain('true');
      simulateDragFileChange(dragger, 'dragLeave');
      simulateDragFileChange(dragger, 'drop');

      expect(onDragenter).toHaveBeenCalledOnce();
      expect(onDragleave).toHaveBeenCalledOnce();
      expect(onDrop).toHaveBeenCalledOnce();
      expect(onDragFileChange).toHaveBeenCalledOnce();
    });
  });
});
