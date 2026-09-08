import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ImageCard from '@tdesign/components/upload/components/image-card';
import type { TdUploadProps } from '@tdesign/components/upload/type';
import { createCommonProps } from './fixtures';

describe('UploadImageCard', () => {
  describe('props', () => {
    it(':multiple[boolean] + :max[number]', () => {
      const full = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [{ name: 'one.png' }] }),
          multiple: true,
          max: 1,
          showImageFileName: true,
        },
      });
      expect(full.find('.t-upload__image-add').exists()).toBe(false);

      const unlimited = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [{ name: 'one.png' }] }),
          multiple: true,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(unlimited.find('.t-upload__image-add').exists()).toBe(true);

      const single = mount(ImageCard, {
        props: { ...createCommonProps({ theme: 'image' }), multiple: false, max: 0, showImageFileName: true },
      });
      expect(single.find('.t-upload__image-add').exists()).toBe(true);
    });

    it(':displayFiles[success/waiting]', () => {
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({
            theme: 'image',
            displayFiles: [
              { name: 'linked.png', url: 'https://example.com/linked.png', status: 'success' },
              { name: 'raw.png', raw: new File(['image'], 'raw.png'), status: 'waiting' },
            ],
            abridgeName: [4, 4],
          }),
          multiple: true,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(wrapper.find('a').attributes('href')).toBe('https://example.com/linked.png');
      expect(wrapper.findAll('.t-upload__card-image')).toHaveLength(2);
      expect(wrapper.findAll('.t-upload__card-name')).toHaveLength(2);
    });

    it(':displayFiles[progress]', () => {
      const props = {
        ...createCommonProps({
          theme: 'image' as const,
          displayFiles: [{ name: 'progress.png', status: 'progress' as const, percent: 36 }],
        }),
        multiple: false,
        max: 0,
        showImageFileName: true,
      };
      const visible = mount(ImageCard, { props: { ...props, showUploadProgress: true } });
      expect(visible.text()).toContain('36%');

      const hidden = mount(ImageCard, { props: { ...props, showUploadProgress: false } });
      expect(hidden.text()).not.toContain('36%');
    });

    it(':displayFiles[fail]', () => {
      const responseError = mount(ImageCard, {
        props: {
          ...createCommonProps({
            theme: 'image',
            displayFiles: [{ name: 'fail.png', status: 'fail', response: { error: 'Rejected image' } }],
          }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(responseError.text()).toContain('Rejected image');

      const defaultError = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [{ name: 'fail.png', status: 'fail' }] }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(defaultError.text()).toContain('上传失败');
    });

    it(':showImageFileName[boolean]', () => {
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [{ name: 'hidden.png' }] }),
          multiple: false,
          max: 0,
          showImageFileName: false,
        },
      });
      expect(wrapper.find('.t-upload__card-name').exists()).toBe(false);
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', disabled: true, displayFiles: [{ name: 'disabled.png' }] }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(wrapper.find('.t-icon-delete').exists()).toBe(false);
    });

    it(':fileListDisplay[function]', () => {
      const renderList: NonNullable<TdUploadProps['fileListDisplay']> = (_h, { files }) =>
        h('span', { class: 'custom-list' }, files[0].name);
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({
            theme: 'image',
            displayFiles: [{ name: 'custom.png' }],
            fileListDisplay: renderList,
          }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      expect(wrapper.find('.custom-list').text()).toBe('custom.png');
      expect(wrapper.find('.t-upload__card').exists()).toBe(false);
    });

    it(':trigger[slot]', () => {
      const wrapper = mount(ImageCard, {
        props: { ...createCommonProps({ theme: 'image' }), multiple: false, max: 0, showImageFileName: true },
        slots: { trigger: () => h('button', { class: 'trigger-slot' }, 'custom trigger') },
      });
      expect(wrapper.find('.trigger-slot').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('trigger upload', async () => {
      const triggerUpload = vi.fn();
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image' }),
          multiple: false,
          max: 0,
          showImageFileName: true,
          triggerUpload,
        },
      });
      await wrapper.find('.t-upload__card-item').trigger('click');
      expect(triggerUpload).toHaveBeenCalledOnce();
    });

    it('preview', async () => {
      const onPreview = vi.fn();
      const file = { name: 'preview.png', url: 'https://example.com/preview.png' };
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [file] }),
          multiple: false,
          max: 0,
          showImageFileName: true,
          onPreview,
        },
      });
      await wrapper.find('.t-upload__card-mask-item').trigger('click');
      await wrapper.find('.t-icon-browse').trigger('click');
      expect(onPreview).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });

    it('remove success file', async () => {
      const onRemove = vi.fn();
      const file = { name: 'remove.png', url: 'https://example.com/remove.png' };
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [file], onRemove }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      await wrapper.findAll('.t-upload__card-mask-item')[1].trigger('click');
      await wrapper.find('.t-icon-delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });

    it('remove failed file', async () => {
      const onRemove = vi.fn();
      const file = { name: 'fail.png', status: 'fail' as const };
      const wrapper = mount(ImageCard, {
        props: {
          ...createCommonProps({ theme: 'image', displayFiles: [file], onRemove }),
          multiple: false,
          max: 0,
          showImageFileName: true,
        },
      });
      await wrapper.find('.t-upload__card-mask-item').trigger('click');
      await wrapper.find('.t-icon-delete').trigger('click');
      expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ file, index: 0 }));
    });
  });
});
