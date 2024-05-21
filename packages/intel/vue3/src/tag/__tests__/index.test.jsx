import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { CheckTag, Tag } from 'tdesign-vue-next';

describe('tag or CheckTag', () => {
  describe(':Tag:props', () => {
    it(':theme:', () => {
      const wrapper = mount({
        render() {
          return <Tag></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag');
    });
    it(':theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag theme="default"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag theme="primary"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag theme="warning"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag theme="danger"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag theme="success"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':size:small', () => {
      const wrapper = mount(() => <Tag size="small"></Tag>);
      expect(wrapper.classes()).toContain('t-size-s');
    });
    it(':size:medium', () => {
      const wrapper = mount(() => <Tag size="medium"></Tag>);
      expect(wrapper.classes('t-size-m')).toBeFalsy();
    });
    it(':size:large', () => {
      const wrapper = mount(() => <Tag size="large"></Tag>);
      expect(wrapper.classes()).toContain('t-size-l');
    });

    it(':closable', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tag closable onClose={fn}></Tag>;
        },
      });
      expect(wrapper.findComponent(CloseIcon)).toBeTruthy();
      wrapper.find('.t-icon-close').trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it(':disabled', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tag disabled onClick={fn}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--disabled');
      expect(fn).not.toHaveBeenCalled();
    });

    it(':variant:dark;theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme="default"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:dark;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme="primary"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:dark;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme="warning"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:dark;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme="danger"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:dark;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme="success"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':variant:light-outline;theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="default"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:light-outline;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="primary"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:light-outline;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="warning"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:light-outline;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="danger"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:light-outline;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="success"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--success');
    });
    it(':variant:light;theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="default"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:light;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="primary"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:light;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="warning"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:light;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="danger"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:light;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme="success"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':shape:round', () => {
      const wrapper = mount({
        render() {
          return <Tag shape="round"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--round');
    });
    it(':shape:square', () => {
      const wrapper = mount({
        render() {
          return <Tag shape="square"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag');
    });
    it(':shape:mark', () => {
      const wrapper = mount({
        render() {
          return <Tag shape="mark"></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--mark');
    });

    it(':maxWidth', () => {
      const wrapper = mount({
        render() {
          return <Tag max-width={100}></Tag>;
        },
      });
      const tag = wrapper.find('.t-tag');
      expect(getComputedStyle(tag.element, null).maxWidth).toBe('100px');
    });
  });

  describe('checkTag:props', () => {
    it(':checked', () => {
      const wrapper = mount({
        render() {
          return <CheckTag checked></CheckTag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag');
      expect(wrapper.classes()).toContain('t-tag--checked');
    });
    it(':disabled', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <CheckTag disabled onClick={fn}></CheckTag>;
        },
      });
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.classes()).toContain('t-tag--disabled');
    });
  });

  describe('tag:slot', () => {
    it('<icon>', () => {
      const slots = {
        icon: () => <div>text</div>,
      };
      const wrapper = mount(() => <Tag v-slots={slots} />);
      const tag = wrapper.find('.t-tag div');
      expect(tag.text()).toBe('text');
    });
  });

  describe('@event: Tag', () => {
    it('event passthrough: click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tag onClick={fn}>text</Tag>;
        },
      });
      wrapper.findComponent(Tag).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
    it('event passthrough: close', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tag closable onClose={fn}></Tag>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      wrapper.find('.t-icon-close').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('@event: CheckTag', () => {
    it('event passthrough: click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <CheckTag checked onClick={fn}>
              text
            </CheckTag>
          );
        },
      });
      wrapper.findComponent(CheckTag).trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
