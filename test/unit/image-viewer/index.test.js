import { mount } from '@vue/test-utils';
import { ImageViewer } from '@/src/image-viewer/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Image-viewer', () => {
  // test props api
  describe(':props', () => {
    it('images, index, visible', () => {
      const images = [
        'https://tdesign.gtimg.com/demo/demo-image-1.png',
        'https://tdesign.gtimg.com/demo/demo-image-2.png',
        'https://tdesign.gtimg.com/demo/demo-image-3.png',
      ];
      const wrapper = mount(ImageViewer, {
        props: {
          index: 1,
          visible: true,
          images,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('showOverlay', () => {
      const wrapper = mount(ImageViewer, {
        props: {
          visible: true,
          showOverlay: false,
        },
      });
      expect(wrapper.find('.t-image-viewer__modal--mask').exists()).toBe(false);
    });

    // it('zIndex', () => {
    //   const wrapper = mount(ImageViewer, {
    //     props: {
    //       visible: true,
    //       zIndex: 2
    //     },
    //     attachTo: document.getElementById('#app')
    //   })
    //   expect(document.querySelector('.t-image-viewer-preview-image').attributes.style).toMatch(/z-index: 2/)
    // })

    it('defaultVisible', () => {
      const wrapper = mount(ImageViewer, {
        props: {
          defaultVisible: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
