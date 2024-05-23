import { nextTick } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';

import { ImageViewer } from '../index';

const imgUrl = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const imgUrl2 = 'https://tdesign.gtimg.com/demo/demo-image-2.png';
const triggerText = '预览单张图片';

describe('ImageViewer', () => {
  it('base', async () => {
    const onClose = vi.fn();
    const trigger = (h, { open }) => <t-button onClick={open}>{triggerText}</t-button>;
    const wrapper = mount({
      render() {
        return <ImageViewer trigger={trigger} images={[imgUrl]} onClose={onClose} />;
      },
    });

    const clickTrigger = wrapper.find('button');

    // 模拟鼠标点击
    await clickTrigger.trigger('click');
    await nextTick();

    // 模拟鼠标点击关闭
    const closeBtn = document.querySelector('.t-image-viewer__modal-close-bt');
    await closeBtn.click();
    await nextTick();

    // 点击后，没有元素存在
    expect(onClose).toHaveBeenCalledTimes(1);
    // 延迟时常
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(document.querySelector('.t-image-viewer-preview-image')).toBeNull();
  });

  it('modeless', async () => {
    const onClose = vi.fn();
    const trigger = (h, { open }) => <t-button onClick={open}>{triggerText}</t-button>;
    const wrapper = mount({
      render() {
        return <ImageViewer trigger={trigger} images={[imgUrl]} onClose={onClose} mode="modeless" />;
      },
    });
    const clickTrigger = wrapper.find('button');
    await clickTrigger.trigger('click');
    await nextTick();

    // 鼠标点击后，有 mini 元素
    const miniFooter = document.querySelector('.t-image-viewer-mini__footer');
    expect(miniFooter).not.toBe(null);

    // 模拟鼠标点击关闭
    const closeBtn = document.querySelector('.t-dialog__close');
    await closeBtn.click();
    await nextTick();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('ImageViewerModel', () => {
  it('closeBtn', async () => {
    const trigger = (h, { open }) => <t-button onClick={open}>{triggerText}</t-button>;
    const wrapper = mount({
      render() {
        return (
          <ImageViewer
            trigger={trigger}
            images={[imgUrl, imgUrl2]}
            closeBtn={() => <span id="closeBtn">closeBtn</span>}
          />
        );
      },
    });
    const clickTrigger = wrapper.find('button');

    // 模拟鼠标点击
    await clickTrigger.trigger('click');
    const closeBtn = document.querySelector('#closeBtn');
    expect(closeBtn).not.toBeNull();
  });
});
