import { mount } from '@vue/test-utils';
import { expect, it, vi, describe, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import TImageViewerUtils from '@tdesign/components/image-viewer/base/ImageViewerUtils';
import TImageViewerIcon from '@tdesign/components/image-viewer/base/ImageModalIcon';

describe('ImageViewerUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call onDownload when download button clicked and currentImage.download is true', async () => {
    const onDownload = vi.fn();
    const currentImage = {
      mainImage: 'https://example.com/image.jpg',
      download: true,
    };
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onDownload,
        currentImage,
      },
    });
    await nextTick();
    // Find all TImageViewerIcon components, filter out the scale label (no onClick)
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const downloadIcon = iconComponents.find(
      (comp) =>
        comp.vm.$props.icon?.name === 'DownloadIcon' || comp.vm.$props.icon?.toString().includes('DownloadIcon'),
    );
    expect(downloadIcon).toBeDefined();
    await downloadIcon?.trigger('click');
    expect(onDownload).toHaveBeenCalled();
    expect(onDownload).toHaveBeenCalledWith('https://example.com/image.jpg');
  });

  it('should not render download button when currentImage.download is false', async () => {
    const currentImage = {
      mainImage: 'https://example.com/image.jpg',
      download: false,
    };
    const wrapper = mount(TImageViewerUtils, {
      props: {
        currentImage,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const downloadIcon = iconComponents.find(
      (comp) =>
        comp.vm.$props.icon?.name === 'DownloadIcon' || comp.vm.$props.icon?.toString().includes('DownloadIcon'),
    );
    expect(downloadIcon).toBeUndefined();
  });

  it('should call onZoomIn when zoom in button clicked', async () => {
    const onZoomIn = vi.fn();
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onZoomIn,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    // Zoom in button is the fifth icon (index 4) after filtering out scale label
    // Let's find the one with onClick prop equal to onZoomIn
    const zoomInIcon = iconComponents.find((comp) => comp.vm.$props.onClick === onZoomIn);
    expect(zoomInIcon).toBeDefined();
    await zoomInIcon?.trigger('click');
    expect(onZoomIn).toHaveBeenCalled();
  });

  it('should call onZoomOut when zoom out button clicked', async () => {
    const onZoomOut = vi.fn();
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onZoomOut,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const zoomOutIcon = iconComponents.find((comp) => comp.vm.$props.onClick === onZoomOut);
    expect(zoomOutIcon).toBeDefined();
    await zoomOutIcon?.trigger('click');
    expect(onZoomOut).toHaveBeenCalled();
  });

  it('should call onMirror when mirror button clicked', async () => {
    const onMirror = vi.fn();
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onMirror,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const mirrorIcon = iconComponents.find((comp) => comp.vm.$props.onClick === onMirror);
    expect(mirrorIcon).toBeDefined();
    await mirrorIcon?.trigger('click');
    expect(onMirror).toHaveBeenCalled();
  });

  it('should call onRotate when rotate button clicked', async () => {
    const onRotate = vi.fn();
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onRotate,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const rotateIcon = iconComponents.find((comp) => comp.vm.$props.onClick === onRotate);
    expect(rotateIcon).toBeDefined();
    await rotateIcon?.trigger('click');
    expect(onRotate).toHaveBeenCalled();
  });

  it('should call onReset when reset button clicked', async () => {
    const onReset = vi.fn();
    const wrapper = mount(TImageViewerUtils, {
      props: {
        onReset,
      },
    });
    await nextTick();
    const iconComponents = wrapper.findAllComponents(TImageViewerIcon);
    const resetIcon = iconComponents.find((comp) => comp.vm.$props.onClick === onReset);
    expect(resetIcon).toBeDefined();
    await resetIcon?.trigger('click');
    expect(onReset).toHaveBeenCalled();
  });
});
