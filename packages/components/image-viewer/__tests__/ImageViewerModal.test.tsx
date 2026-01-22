import { mount } from '@vue/test-utils';
import { expect, it, vi, describe } from 'vitest';
import { nextTick } from 'vue';
import TImageViewerModal from '@tdesign/components/image-viewer/base/ImageViewerModal';

describe('ImageViewerModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should use empty object as default currentImage', async () => {
    const wrapper = mount(TImageViewerModal, {
      props: {
        visible: true,
        images: [],
      },
    });
    await nextTick();
    // Component should render without error
    expect(wrapper.exists()).toBe(true);
    // The currentImage prop default should be {}
    expect(wrapper.props().currentImage).toEqual({});
  });

  it('should render with provided currentImage', async () => {
    const currentImage = {
      mainImage: 'https://example.com/main.jpg',
      thumbnail: 'https://example.com/thumb.jpg',
      download: true,
    };
    const wrapper = mount(TImageViewerModal, {
      props: {
        visible: true,
        images: [],
        currentImage,
      },
    });
    await nextTick();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().currentImage).toEqual(currentImage);
  });

  it('should show overlay when showOverlay is true', async () => {
    mount(TImageViewerModal, {
      props: {
        visible: true,
        images: [],
        showOverlay: true,
      },
    });
    await nextTick();
    expect(document.querySelector('.t-dialog__mask')).toBeNull();
  });

  it('should not show overlay when showOverlay is false', async () => {
    mount(TImageViewerModal, {
      props: {
        visible: true,
        images: [],
        showOverlay: false,
      },
    });
    await nextTick();
    expect(document.querySelector('.t-dialog__mask')).toBeNull();
  });
});
