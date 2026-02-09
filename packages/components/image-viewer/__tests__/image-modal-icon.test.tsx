import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick } from 'vue';
import { ZoomInIcon, ZoomOutIcon, RotationIcon } from 'tdesign-icons-vue-next';
import ImageModalIcon from '../base/ImageModalIcon';

describe('ImageModalIcon', () => {
  describe('props', () => {
    let wrapper: VueWrapper;

    beforeEach(async () => {
      wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" /> },
      });
      await nextTick();
    });

    it(':icon[function]', () => {
      expect(wrapper.find('.t-image-viewer__modal-icon').exists()).eq(true);
      expect(wrapper.findComponent(ZoomInIcon).exists()).eq(true);
    });

    it(':icon different icons', async () => {
      const w1 = mount(ImageModalIcon, { props: { icon: () => <ZoomInIcon size="medium" /> } });
      const w2 = mount(ImageModalIcon, { props: { icon: () => <ZoomOutIcon size="medium" /> } });
      const w3 = mount(ImageModalIcon, { props: { icon: () => <RotationIcon size="medium" /> } });
      await nextTick();
      expect(w1.findComponent(ZoomInIcon).exists()).eq(true);
      expect(w2.findComponent(ZoomOutIcon).exists()).eq(true);
      expect(w3.findComponent(RotationIcon).exists()).eq(true);
    });

    it(':icon custom function', async () => {
      const CustomIcon = () => <span class="custom-icon">Custom</span>;
      const w = mount(ImageModalIcon, { props: { icon: CustomIcon } });
      await nextTick();
      expect(w.find('.custom-icon').exists()).eq(true);
      expect(w.find('.custom-icon').text()).eq('Custom');
    });

    it(':icon complex function', async () => {
      const ComplexIcon = () => (
        <div class="complex-icon">
          <ZoomInIcon size="small" />
          <span>+</span>
        </div>
      );
      const w = mount(ImageModalIcon, { props: { icon: ComplexIcon } });
      await nextTick();
      expect(w.find('.complex-icon').exists()).eq(true);
      expect(w.findComponent(ZoomInIcon).exists()).eq(true);
    });

    it(':icon prop change', async () => {
      expect(wrapper.findComponent(ZoomInIcon).exists()).eq(true);

      await wrapper.setProps({ icon: () => <ZoomOutIcon size="medium" /> });
      await nextTick();
      expect(wrapper.findComponent(ZoomOutIcon).exists()).eq(true);
      expect(wrapper.findComponent(ZoomInIcon).exists()).eq(false);
    });

    it(':icon null', async () => {
      const w = mount(ImageModalIcon, { props: { icon: null } });
      await nextTick();
      expect(w.find('.t-image-viewer__modal-icon').exists()).eq(true);
    });

    it(':label[string]', async () => {
      await wrapper.setProps({ label: 'Zoom In' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).eq('Zoom In');
    });

    it(':label numeric string', async () => {
      await wrapper.setProps({ label: '150%' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).eq(true);
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).eq('150%');
    });

    it(':label not provided', () => {
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).eq(false);
    });

    it(':label empty string', async () => {
      await wrapper.setProps({ label: '' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').exists()).eq(false);
    });

    it(':label prop change', async () => {
      await wrapper.setProps({ label: '100%' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).eq('100%');

      await wrapper.setProps({ label: '200%' });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).eq('200%');
    });

    it(':disabled = true', async () => {
      await wrapper.setProps({ disabled: true });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(true);
    });

    it(':disabled = false', () => {
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(false);
    });

    it(':disabled toggle', async () => {
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(false);

      await wrapper.setProps({ disabled: true });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(true);

      await wrapper.setProps({ disabled: false });
      await nextTick();
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(false);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, onClick },
      });
      await nextTick();

      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it('click passes correct event object', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, onClick },
      });
      await nextTick();

      await wrapper.find('.t-image-viewer__modal-icon').trigger('click');
      expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click', target: expect.any(Element) }));
    });

    it('click multiple times', async () => {
      const onClick = vi.fn();
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, onClick },
      });
      await nextTick();

      const el = wrapper.find('.t-image-viewer__modal-icon');
      await el.trigger('click');
      await el.trigger('click');
      await el.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('rapid prop changes', async () => {
      const wrapper = mount(ImageModalIcon, {
        props: { icon: () => <ZoomInIcon size="medium" />, label: '100%', disabled: false },
      });
      await nextTick();

      await wrapper.setProps({ label: '150%' });
      await wrapper.setProps({ disabled: true });
      await wrapper.setProps({ label: '200%' });
      await wrapper.setProps({ disabled: false });
      await nextTick();

      expect(wrapper.find('.t-image-viewer__modal-icon-label').text()).eq('200%');
      expect(wrapper.find('.t-image-viewer__modal-icon').classes('t-is-disabled')).eq(false);
    });
  });
});
