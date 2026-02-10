import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { nextTick } from 'vue';
import { ZoomInIcon, ZoomOutIcon, RotationIcon } from 'tdesign-icons-vue-next';
import ImageModalIcon from '../base/ImageModalIcon';

describe('ImageModalIcon', () => {
  describe('props', () => {
    it(':icon[function]', async () => {
      // basic icon
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" /> },
      });
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();

      // different icons
      const w2 = mount(ImageModalIcon, { props: { icon: () => <ZoomOutIcon size="medium" /> } });
      expect(w2.findComponent(ZoomOutIcon).exists()).toBeTruthy();

      const w3 = mount(ImageModalIcon, { props: { icon: () => <RotationIcon size="medium" /> } });
      expect(w3.findComponent(RotationIcon).exists()).toBeTruthy();
    });

    it(':icon custom function', async () => {
      const CustomIcon = () => <span class="custom-icon">Custom</span>;
      const wrapper = mount(ImageModalIcon, { props: { icon: CustomIcon } });
      await nextTick();
      expect(wrapper.find('.custom-icon').exists()).toBeTruthy();
      expect(wrapper.find('.custom-icon').text()).toBe('Custom');
    });

    it(':icon complex function', async () => {
      const ComplexIcon = () => (
        <div class="complex-icon">
          <ZoomInIcon size="small" />
          <span>+</span>
        </div>
      );
      const wrapper = mount(ImageModalIcon, { props: { icon: ComplexIcon } });
      await nextTick();
      expect(wrapper.find('.complex-icon').exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();
    });

    it(':icon null', async () => {
      const wrapper = mount(ImageModalIcon, { props: { icon: null } });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).toBeTruthy();
    });

    it(':icon prop change', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" /> },
      });
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeTruthy();

      await wrapper.setProps({ icon: () => <ZoomOutIcon size="medium" /> });
      await nextTick();
      expect(wrapper.findComponent(ZoomOutIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(ZoomInIcon).exists()).toBeFalsy();
    });

    it(':label[string]', async () => {
      // not provided
      const wrapper1 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" /> },
      });
      expect(wrapper1.find('.t-image-viewer__modal-icon-label').exists()).toBeFalsy();

      // with label
      const wrapper2 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, label: 'Zoom In' },
      });
      expect(wrapper2.find('.t-image-viewer__modal-icon-label').exists()).toBeTruthy();
      expect(wrapper2.find('.t-image-viewer__modal-icon-label').text()).toBe('Zoom In');

      // empty string
      const wrapper3 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, label: '' },
      });
      expect(wrapper3.find('.t-image-viewer__modal-icon-label').exists()).toBeFalsy();

      // numeric string
      const wrapper4 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, label: '150%' },
      });
      expect(wrapper4.find('.t-image-viewer__modal-icon-label').text()).toBe('150%');
      expect(wrapper4.element).toMatchSnapshot();
    });

    it(':disabled[boolean]', () => {
      // default
      const wrapper1 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" /> },
      });
      expect(wrapper1.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).toBeFalsy();

      // true
      const wrapper2 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, disabled: true },
      });
      expect(wrapper2.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).toBeTruthy();

      // false
      const wrapper3 = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, disabled: false },
      });
      expect(wrapper3.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).toBeFalsy();
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, onClick },
      });

      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it('click multiple times', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, onClick },
      });

      const el = wrapper.find('.t-image-viewer__modal-icon');
      await el.trigger('click');
      await el.trigger('click');
      await el.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(3);
    });
  });
});
