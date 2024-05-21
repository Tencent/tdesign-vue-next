import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { Button } from 'tdesign-vue-next';
import { ImageViewer } from 'tdesign-vue-next'

// every component needs four parts: props/events/slots/functions.
describe('image-viewer', () => {
  // test props api
  describe(':props', () => {
    it('trigger', () => {
      const wrapper = mount({
        render() {
          return <ImageViewer trigger={() => <Button>test</Button>} />;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
    it('images, index, visible', () => {
      const images = [
        'https://tdesign.gtimg.com/demo/demo-image-1.png',
        'https://tdesign.gtimg.com/demo/demo-image-2.png',
        'https://tdesign.gtimg.com/demo/demo-image-3.png',
      ];
      const props = {
        index: 1,
        visible: true,
        images,
      };
      mount({
        render() {
          return <ImageViewer {...props} />;
        },
      });

      // expect(wrapper.element).toMatchSnapshot();
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
    });

    // it('showOverlay', () => {
    //   mount( {
    //     render() {
    //       return <ImageViewer visible  showOverlay={false}/>
    //     }
    //   });
    //   console.log(document.querySelector('.t-image-viewer__modal--mask'))
    //   expect(document.querySelector('.t-image-viewer__modal--mask')).toBe(null);
    // });

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
      mount(ImageViewer, {
        props: {
          defaultVisible: true,
        },
      });
      expect(document.querySelector('.t-image-viewer-preview-image')).toMatchSnapshot();
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
