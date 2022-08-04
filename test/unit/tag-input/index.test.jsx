import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import TagInput from '@/src/tag-input/index.ts';

describe('TagInput', () => {
  describe(':props', () => {
    const tags = ['a', 'b', 'c', 'd'];
    it(':basic', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':label', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} label="Controlled: " />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':max', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} max={3} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':collapsed', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} min-collapsed-num={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status:disabled', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} disabled />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status:readonly', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} readonly />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status:success', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} status={'success'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status:warning', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} status={'warning'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status:error', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} status={'error'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':draggable', () => {
      const wrapper = mount({
        render() {
          return <TagInput value={tags} dragSort />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', async () => {
    it('blur', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TagInput onBlur={fn} />;
        },
      });
      await wrapper.find('input').trigger('blur');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('change', async () => {});

    it('clear', () => {});

    it('drag-sort', () => {});

    it('enter', async () => {
      // const fn = vi.fn();
      // const wrapper = mount({
      //   render() {
      //     return <TagInput onEnter={fn} />;
      //   },
      // });
      // const el = wrapper.find('input');
      // await el.trigger('keydown.enter');
      // expect(fn).toHaveBeenCalledTimes(0);
      // await el.setValue('a');
      // expect(el.element.value).toBe('a');
      // await el.trigger('keydown.enter');
      // expect(el.element.value).toBe('');
      // expect(fn).toHaveBeenCalledTimes(1);
    });

    it('input-change', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TagInput onInputChange={fn} />;
        },
      });
      await wrapper.find('.t-input__inner').setValue('a');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('mouse-enter', () => {
      // const fn = vi.fn();
      // const wrapper = mount({
      //   render() {
      //     return <TagInput onMouseenter={fn} />;
      //   },
      // });
      // const el = wrapper.find('.t-input__inner');
      // el.trigger('mouseenter');
      // expect(fn).toHaveBeenCalledTimes(1);
    });

    it('mouse-leave', () => {});

    it('paste', () => {});

    it('remove', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TagInput value={['a']} onRemove={fn} />;
        },
      });
      const el = wrapper.findAll('.t-icon')[0];
      el.trigger('click');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('<slot>', () => {
    it('<collapsedTags>', () => {
      const wrapper = mount(TagInput, {
        scopedSlots: {
          collapsedItems: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
