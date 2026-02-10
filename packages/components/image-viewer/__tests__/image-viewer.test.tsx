import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { ImageViewer } from '@tdesign/components/image-viewer';
import props from '@tdesign/components/image-viewer/props';
import { Button } from '@tdesign/components/button';

const images = [
  'https://tdesign.gtimg.com/demo/demo-image-1.png',
  'https://tdesign.gtimg.com/demo/demo-image-2.png',
  'https://tdesign.gtimg.com/demo/demo-image-3.png',
];

describe('ImageViewer', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':trigger[function]', async () => {
      // render function
      const wrapper1 = mount({
        render() {
          return <ImageViewer trigger={() => <Button>test</Button>} />;
        },
      });
      expect(wrapper1.element).toMatchSnapshot();

      // function prop with open callback
      const trigger = (_h: unknown, { open }: { open: () => void }) => (
        <button class="custom-trigger" onClick={open}>
          Open
        </button>
      );
      const wrapper2 = mount({
        setup() {
          return () => <ImageViewer images={images} trigger={trigger} />;
        },
      });
      await nextTick();
      expect(wrapper2.find('.custom-trigger').exists()).toBeTruthy();
      expect(wrapper2.find('.t-image-viewer__trigger').exists()).toBeFalsy();

      await wrapper2.find('.custom-trigger').trigger('click');
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':trigger default', async () => {
      const wrapper = mount(ImageViewer, { props: { images } });
      expect(wrapper.find('.t-image-viewer__trigger').exists()).toBeTruthy();

      // click opens viewer
      const triggerEl = wrapper.element.querySelector('.t-image-viewer__trigger--hover') as HTMLElement;
      expect(triggerEl).toBeTruthy();
      triggerEl.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':images[string[]]', () => {
      mount(ImageViewer, { props: { visible: true, images } });
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
    });

    it(':images[ImageInfo[]]', async () => {
      const imageInfos = [
        {
          mainImage: 'https://example.com/main1.jpg',
          thumbnail: 'https://example.com/thumb1.jpg',
          download: true,
        },
      ];
      mount(ImageViewer, { props: { visible: true, images: imageInfos } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer')).toBeTruthy();
    });

    it(':images empty/mixed', async () => {
      // empty array
      mount(ImageViewer, { props: { visible: true, images: [] } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer')).toBeTruthy();

      document.body.innerHTML = '';

      // mixed string and ImageInfo
      mount(ImageViewer, {
        props: {
          visible: true,
          images: [
            'https://example.com/image1.jpg',
            { mainImage: 'https://example.com/main2.jpg', thumbnail: 'https://example.com/thumb2.jpg' },
            'https://example.com/image3.jpg',
          ],
        },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      expect(document.querySelectorAll('.t-image-viewer__header-img').length).toBe(3);
    });

    it(':index[number]', async () => {
      mount(ImageViewer, { props: { visible: true, images, index: 1 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':defaultIndex[number]', async () => {
      // custom
      mount(ImageViewer, { props: { visible: true, images, defaultIndex: 1 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('2/3');

      document.body.innerHTML = '';

      // default (0)
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('1/3');
    });

    it(':visible[boolean]', async () => {
      // controlled
      const wrapper = mount(ImageViewer, { props: { visible: false, images } });
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeFalsy();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':visible v-model', async () => {
      const visibleRef = ref(false);
      mount({
        setup() {
          return () => <ImageViewer v-model:visible={visibleRef.value} images={images} />;
        },
      });
      visibleRef.value = true;
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it(':defaultVisible[boolean]', () => {
      // true
      mount(ImageViewer, { props: { defaultVisible: true, images } });
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();

      document.body.innerHTML = '';

      // false
      mount(ImageViewer, { props: { defaultVisible: false, images } });
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeFalsy();
    });

    it(':closeBtn[boolean/function]', async () => {
      // true
      mount(ImageViewer, { props: { visible: true, images, closeBtn: true } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeTruthy();

      document.body.innerHTML = '';

      // false
      mount(ImageViewer, { props: { visible: true, images, closeBtn: false } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-close-bt')).toBeFalsy();

      document.body.innerHTML = '';

      // function
      mount(ImageViewer, {
        props: { visible: true, images, closeBtn: () => <span class="custom-close">X</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-close')).toBeTruthy();
    });

    it(':closeOnEscKeydown[boolean]', async () => {
      // true
      const onClose1 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnEscKeydown: true, onClose: onClose1 } });
      await nextTick();
      const viewer1 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer1).toBeTruthy();
      viewer1.focus();
      viewer1.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
      await nextTick();
      expect(onClose1).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));

      document.body.innerHTML = '';

      // false
      const onClose2 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnEscKeydown: false, onClose: onClose2 } });
      await nextTick();
      const viewer2 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer2).toBeTruthy();
      viewer2.focus();
      viewer2.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
      await nextTick();
      expect(onClose2).not.toHaveBeenCalled();
    });

    it(':closeOnOverlay[boolean]', async () => {
      // true
      const onClose1 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnOverlay: true, onClose: onClose1 } });
      await nextTick();
      const mask1 = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      expect(mask1).toBeTruthy();
      mask1.click();
      await nextTick();
      expect(onClose1).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'overlay' }));

      document.body.innerHTML = '';

      // false
      const onClose2 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnOverlay: false, onClose: onClose2 } });
      await nextTick();
      const mask2 = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      if (mask2) {
        mask2.click();
        await nextTick();
        expect(onClose2).not.toHaveBeenCalled();
      }
    });

    it(':draggable[boolean]', async () => {
      // true
      mount(ImageViewer, { props: { visible: true, images, mode: 'modeless', draggable: true } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();

      document.body.innerHTML = '';

      // false
      mount(ImageViewer, { props: { visible: true, images, mode: 'modeless', draggable: false } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':imageScale[object]', async () => {
      // basic
      mount(ImageViewer, {
        props: { visible: true, images, imageScale: { max: 3, min: 0.1, step: 0.1, defaultScale: 1.5 } },
      });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      document.body.innerHTML = '';

      // custom step with zoom
      mount(ImageViewer, {
        props: { visible: true, images, imageScale: { max: 5, min: 0.1, step: 0.5, defaultScale: 1 } },
      });
      await nextTick();
      const scaleEl = document.querySelector('.t-image-viewer__utils-scale');
      expect(scaleEl?.textContent).toContain('100%');

      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const zoomInBtn = icons[4] as HTMLElement;
      expect(zoomInBtn).toBeTruthy();
      zoomInBtn.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await nextTick();
    });

    it(':mode[modal/modeless]', async () => {
      const { validator } = props.mode;
      expect(validator('modal')).toBeTruthy();
      expect(validator('modeless')).toBeTruthy();
      // @ts-expect-error testing invalid value
      expect(validator('invalid')).toBeFalsy();
      expect(validator(undefined)).toBeTruthy();

      // modal
      mount(ImageViewer, { props: { visible: true, images, mode: 'modal' } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();

      document.body.innerHTML = '';

      // modeless
      mount(ImageViewer, { props: { visible: true, images, mode: 'modeless' } });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer-mini__footer')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
    });

    it(':mode = modeless with custom trigger', async () => {
      const trigger = (_h: unknown, { open }: { open: () => void }) => (
        <button class="modeless-trigger" onClick={open}>
          Open Modeless
        </button>
      );
      const wrapper = mount({
        setup() {
          return () => <ImageViewer images={images} mode="modeless" trigger={trigger} />;
        },
      });
      await nextTick();

      const triggerEl = wrapper.find('.modeless-trigger');
      expect(triggerEl.exists()).toBeTruthy();
      await triggerEl.trigger('click');
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
    });

    it(':navigationArrow[boolean/function]', async () => {
      // true
      mount(ImageViewer, { props: { visible: true, images, navigationArrow: true } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeTruthy();

      document.body.innerHTML = '';

      // function
      mount(ImageViewer, {
        props: { visible: true, images, navigationArrow: () => <span class="custom-arrow">arrow</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-arrow')).toBeTruthy();
    });

    it(':showOverlay[boolean]', async () => {
      // true
      mount(ImageViewer, { props: { visible: true, images, showOverlay: true } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();

      document.body.innerHTML = '';

      // false
      mount(ImageViewer, { props: { visible: true, images, showOverlay: false } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeFalsy();

      document.body.innerHTML = '';

      // default for modal mode
      mount(ImageViewer, { props: { visible: true, images, mode: 'modal' } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-mask')).toBeTruthy();
    });

    it(':title[string/function]', async () => {
      // string
      mount(ImageViewer, { props: { visible: true, images, title: 'Custom Title' } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('Custom Title');

      document.body.innerHTML = '';

      // function
      mount(ImageViewer, {
        props: { visible: true, images, title: () => <span class="custom-title">Function Title</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-title')).toBeTruthy();

      document.body.innerHTML = '';

      // default shows index
      mount(ImageViewer, { props: { visible: true, images, index: 0 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('1/3');
    });

    it(':title updates when index changes', async () => {
      const wrapper = mount(ImageViewer, { props: { visible: true, images, index: 0 } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('1/3');

      await wrapper.setProps({ index: 2 });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-index')?.textContent).toBe('3/3');
    });

    it(':zIndex[number]', async () => {
      // custom
      mount(ImageViewer, { props: { visible: true, images, zIndex: 5000 } });
      await nextTick();
      expect((document.querySelector('.t-image-viewer-preview-image') as HTMLElement)?.style.zIndex).toBe('5000');

      document.body.innerHTML = '';

      // default 3000
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();
      expect((document.querySelector('.t-image-viewer-preview-image') as HTMLElement)?.style.zIndex).toBe('3000');
    });

    it(':attach[string]', async () => {
      // custom container
      const container = document.createElement('div');
      container.id = 'custom-container';
      document.body.appendChild(container);
      mount(ImageViewer, { props: { visible: true, images, attach: '#custom-container' } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      document.body.innerHTML = '';

      // default = body
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();
      expect(document.body.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      document.body.innerHTML = '';

      // empty string disables teleport
      const wrapper = mount(ImageViewer, { props: { visible: true, images, attach: '' } });
      await nextTick();
      expect(wrapper.element).toBeTruthy();
    });

    it(':viewerScale[object]', async () => {
      mount(ImageViewer, {
        props: { visible: true, images, mode: 'modeless', viewerScale: { minWidth: 400, minHeight: 300 } },
      });
      await nextTick();
      expect(document.querySelector('.t-dialog')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer-mini__content')).toBeTruthy();
    });

    it(':imageReferrerpolicy[string]', async () => {
      const { validator } = props.imageReferrerpolicy;
      expect(validator('no-referrer')).toBeTruthy();
      expect(validator('origin')).toBeTruthy();
      expect(validator('same-origin')).toBeTruthy();
      expect(validator('unsafe-url')).toBeTruthy();
      expect(validator(undefined)).toBeTruthy();

      mount(ImageViewer, { props: { visible: true, images, imageReferrerpolicy: 'no-referrer' } });
      await nextTick();
      const img = document.querySelector('.t-image-viewer__modal-image') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.getAttribute('referrerpolicy')).toBe('no-referrer');
    });
  });

  describe('slots', () => {
    it('trigger slot', async () => {
      const wrapper = mount(ImageViewer, {
        props: { images },
        slots: {
          trigger: ({ open }) => <Button onClick={() => open()}>Open Viewer</Button>,
        },
      });
      expect(wrapper.find('button').exists()).toBeTruthy();
    });

    it('closeBtn slot', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: { closeBtn: () => <span class="custom-close-slot">x</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-close-slot')).toBeTruthy();
    });

    it('navigationArrow slot', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: { navigationArrow: () => <span class="custom-nav-arrow">arrow</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-nav-arrow')).toBeTruthy();
    });

    it('title slot', async () => {
      mount(ImageViewer, {
        props: { visible: true, images },
        slots: { title: () => <span class="custom-slot-title">Custom Title Slot</span> },
      });
      await nextTick();
      expect(document.querySelector('.custom-slot-title')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('onClose triggered by close button', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, onClose } });
      await nextTick();

      const closeBtn = document.querySelector('.t-image-viewer__modal-close-bt') as HTMLElement;
      expect(closeBtn).toBeTruthy();
      closeBtn.click();
      await nextTick();
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'close-btn' }));
    });

    it('onClose triggered by ESC key', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnEscKeydown: true, onClose } });
      await nextTick();

      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer).toBeTruthy();
      viewer.focus();
      viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
      await nextTick();
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));
    });

    it('onClose triggered by overlay click', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, closeOnOverlay: true, onClose } });
      await nextTick();

      const mask = document.querySelector('.t-image-viewer__modal-mask') as HTMLElement;
      expect(mask).toBeTruthy();
      mask.click();
      await nextTick();
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'overlay' }));
    });

    it('onClose triggered in modeless mode', async () => {
      const onClose = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, mode: 'modeless', onClose } });
      await nextTick();

      const closeBtn = document.querySelector('.t-dialog__close') as HTMLElement;
      expect(closeBtn).toBeTruthy();
      closeBtn.click();
      await nextTick();
      expect(onClose).toHaveBeenCalled();
    });

    it('onIndexChange triggered by prev button', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 1, onIndexChange } });
      await nextTick();

      const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
      expect(prevBtn).toBeTruthy();
      prevBtn.click();
      await nextTick();
      expect(onIndexChange).toHaveBeenCalledWith(0, { trigger: 'prev' });
    });

    it('onIndexChange triggered by next button', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 0, onIndexChange } });
      await nextTick();

      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      expect(nextBtn).toBeTruthy();
      nextBtn.click();
      await nextTick();
      expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'next' });
    });

    it('onIndexChange triggered by thumbnail click', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 0, onIndexChange } });
      await nextTick();

      const thumbnails = document.querySelectorAll('.t-image-viewer__header-img');
      expect(thumbnails.length).toBeGreaterThan(1);
      (thumbnails[1] as HTMLElement).click();
      await nextTick();
      expect(onIndexChange).toHaveBeenCalledWith(1, { trigger: 'current' });
    });

    it('onIndexChange triggered by arrow keys', async () => {
      // left arrow
      const onIndexChange1 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 1, onIndexChange: onIndexChange1 } });
      await nextTick();
      const viewer1 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer1).toBeTruthy();
      viewer1.focus();
      viewer1.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await nextTick();
      expect(onIndexChange1).toHaveBeenCalledWith(0, { trigger: 'prev' });

      document.body.innerHTML = '';

      // right arrow
      const onIndexChange2 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 0, onIndexChange: onIndexChange2 } });
      await nextTick();
      const viewer2 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer2).toBeTruthy();
      viewer2.focus();
      viewer2.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await nextTick();
      expect(onIndexChange2).toHaveBeenCalledWith(1, { trigger: 'next' });
    });

    it('onDownload custom handler', async () => {
      const onDownload = vi.fn();
      mount(ImageViewer, {
        props: { visible: true, images: [{ mainImage: images[0], download: true }], onDownload },
      });
      await nextTick();

      const icons = document.querySelectorAll('.t-image-viewer__utils-content .t-image-viewer__modal-icon');
      const downloadBtn = icons[icons.length - 1] as HTMLElement;
      expect(downloadBtn).toBeTruthy();
      downloadBtn.click();
      await nextTick();
      expect(onDownload).toHaveBeenCalledWith(images[0]);
    });

    it('v-model:index on navigation', async () => {
      const indexRef = ref(0);
      mount({
        setup() {
          return () => <ImageViewer v-model:index={indexRef.value} visible={true} images={images} />;
        },
      });
      await nextTick();

      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      expect(nextBtn).toBeTruthy();
      nextBtn.click();
      await nextTick();
    });

    it('open viewer at specific index', async () => {
      let openFn: ((index: number) => void) | undefined;
      mount(ImageViewer, {
        props: { images },
        slots: {
          trigger: ({ open }: { open: (index: number) => void }) => {
            openFn = open;
            return <button>Open</button>;
          },
        },
      });
      await nextTick();
      expect(typeof openFn).toBe('function');

      if (openFn) openFn(2);
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('wheel zoom', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer).toBeTruthy();

      // zoom in
      viewer.dispatchEvent(new WheelEvent('wheel', { deltaY: -100 }));
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      // zoom out
      viewer.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('keyboard zoom', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer).toBeTruthy();
      viewer.focus();

      // up arrow zooms in
      viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();

      // down arrow zooms out
      viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('header expand/collapse', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      const expandBtn = document.querySelector('.t-image-viewer__header-pre-bt') as HTMLElement;
      expect(expandBtn).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__modal-header.t-is-show')).toBeTruthy();

      expandBtn.click();
      await nextTick();

      expandBtn.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-header')).toBeTruthy();
    });

    it('utils toolbar buttons', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      // mirror
      const mirrorBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[0] as HTMLElement;
      expect(mirrorBtn).toBeTruthy();
      mirrorBtn.click();
      await nextTick();

      // rotate
      const rotateBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[1] as HTMLElement;
      expect(rotateBtn).toBeTruthy();
      rotateBtn.click();
      await nextTick();

      // zoom out
      const zoomOutBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[2] as HTMLElement;
      expect(zoomOutBtn).toBeTruthy();
      zoomOutBtn.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();

      // zoom in
      const zoomInBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[4] as HTMLElement;
      expect(zoomInBtn).toBeTruthy();
      zoomInBtn.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();

      // reset
      const resetBtn = document.querySelectorAll('.t-image-viewer__modal-icon')[5] as HTMLElement;
      expect(resetBtn).toBeTruthy();
      resetBtn.click();
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('single image without navigation', async () => {
      mount(ImageViewer, { props: { visible: true, images: [images[0]] } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__modal-prev-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-next-bt')).toBeFalsy();
      expect(document.querySelector('.t-image-viewer__modal-header')).toBeFalsy();
    });

    it('boundary navigation', async () => {
      // prev at first image
      const onIndexChange1 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 0, onIndexChange: onIndexChange1 } });
      await nextTick();
      const prevBtn = document.querySelector('.t-image-viewer__modal-prev-bt') as HTMLElement;
      expect(prevBtn).toBeTruthy();
      prevBtn.click();
      await nextTick();
      expect(onIndexChange1).toHaveBeenCalledWith(0, { trigger: 'prev' });

      document.body.innerHTML = '';

      // next at last image
      const onIndexChange2 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 2, onIndexChange: onIndexChange2 } });
      await nextTick();
      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      expect(nextBtn).toBeTruthy();
      nextBtn.click();
      await nextTick();
      expect(onIndexChange2).toHaveBeenCalledWith(2, { trigger: 'next' });

      document.body.innerHTML = '';

      // arrow key at first image
      const onIndexChange3 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 0, onIndexChange: onIndexChange3 } });
      await nextTick();
      const viewer3 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer3).toBeTruthy();
      viewer3.focus();
      viewer3.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await nextTick();
      expect(onIndexChange3).toHaveBeenCalledWith(0, { trigger: 'prev' });

      document.body.innerHTML = '';

      // arrow key at last image
      const onIndexChange4 = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 2, onIndexChange: onIndexChange4 } });
      await nextTick();
      const viewer4 = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer4).toBeTruthy();
      viewer4.focus();
      viewer4.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await nextTick();
      expect(onIndexChange4).toHaveBeenCalledWith(2, { trigger: 'next' });
    });

    it('unrecognized key codes', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      expect(viewer).toBeTruthy();
      viewer.focus();
      viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
      await nextTick();
      expect(document.querySelector('.t-image-viewer')).toBeTruthy();
    });

    it('rapid navigation clicks', async () => {
      const onIndexChange = vi.fn();
      mount(ImageViewer, { props: { visible: true, images, index: 1, onIndexChange } });
      await nextTick();

      const nextBtn = document.querySelector('.t-image-viewer__modal-next-bt') as HTMLElement;
      expect(nextBtn).toBeTruthy();
      nextBtn.click();
      nextBtn.click();
      nextBtn.click();
      await nextTick();
      expect(onIndexChange).toHaveBeenCalled();
    });

    it('thumbnail state', async () => {
      // active state
      mount(ImageViewer, { props: { visible: true, images, index: 0 } });
      await nextTick();
      const thumbnails = document.querySelectorAll('.t-image-viewer__header-box');
      expect(thumbnails.length).toBeGreaterThan(0);
      expect(thumbnails[0].classList.contains('t-is-active')).toBeTruthy();

      // count matches images
      expect(document.querySelectorAll('.t-image-viewer__header-img').length).toBe(3);
    });

    it('header thumbnail transform on index change', async () => {
      const wrapper = mount(ImageViewer, { props: { visible: true, images, index: 0 } });
      await nextTick();

      const trans = document.querySelector('.t-image-viewer__header-trans') as HTMLElement;
      const initialTransform = trans?.style.transform;

      await wrapper.setProps({ index: 1 });
      await nextTick();
      expect(trans?.style.transform).not.toBe(initialTransform);
    });

    it('reset transform on visibility change', async () => {
      const wrapper = mount(ImageViewer, { props: { visible: false, images } });

      await wrapper.setProps({ visible: true });
      await nextTick();

      const viewer = document.querySelector('.t-image-viewer-preview-image') as HTMLElement;
      if (viewer) {
        viewer.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        await nextTick();
      }

      await wrapper.setProps({ visible: false });
      await nextTick();
      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-image-viewer-preview-image')).toBeTruthy();
    });

    it('unmount cleanup', async () => {
      const wrapper = mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();
      wrapper.unmount();
    });

    it('rapid visibility toggle', async () => {
      const wrapper = mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();

      await wrapper.setProps({ visible: false });
      await wrapper.setProps({ visible: true });
      await wrapper.setProps({ visible: false });
      await nextTick();
      wrapper.unmount();
    });

    it('string image with trigger-img', async () => {
      const wrapper = mount(ImageViewer, { props: { images: [images[0]] } });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__trigger-img').exists()).toBeTruthy();
    });

    it('utils toolbar rendered', async () => {
      mount(ImageViewer, { props: { visible: true, images } });
      await nextTick();
      expect(document.querySelector('.t-image-viewer__utils')).toBeTruthy();
      expect(document.querySelector('.t-image-viewer__utils-scale')).toBeTruthy();
    });
  });
});
