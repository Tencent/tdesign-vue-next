// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { Tag, CheckTag } from '@tdesign/components/tag';

describe('Tag Component', () => {
  it('props.closable: Tag contains element `.t-tag__icon-close`', () => {
    // closable default value is false
    const wrapper = mount(<Tag></Tag>);
    expect(wrapper.find('.t-tag__icon-close').exists()).toBeFalsy();
    // closable = false
    const wrapper1 = mount(<Tag closable={false}></Tag>);
    expect(wrapper1.find('.t-tag__icon-close').exists()).toBeFalsy();
    // closable = true
    const wrapper2 = mount(<Tag closable={true}></Tag>);
    expect(wrapper2.find('.t-tag__icon-close').exists()).toBeTruthy();
  });

  it(`props.color is equal to #ff0000`, () => {
    const wrapper = mount(<Tag color={'#ff0000'}></Tag>);
    const domWrapper = wrapper.findComponent(Tag);
    expect(domWrapper.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
  it(`props.color expect variant=dark`, () => {
    const wrapper = mount(<Tag color={'#ff0000'} variant={'dark'} theme={'primary'}></Tag>);
    const domWrapper = wrapper.findComponent(Tag);
    expect(domWrapper.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
    expect(domWrapper.element.style.color).toBe('white');
  });
  it(`props.color expect variant=light`, () => {
    const wrapper = mount(<Tag color={'#ff0000'} variant={'light'}></Tag>);
    const domWrapper = wrapper.findComponent(Tag);
    expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
    expect(domWrapper.element.style.backgroundColor).toBe('rgba(255, 0, 0, 0.1)');
  });
  it(`props.color expect variant=outline`, () => {
    const wrapper = mount(<Tag color={'#ff0000'} variant={'outline'}></Tag>);
    const domWrapper = wrapper.findComponent(Tag);
    expect(domWrapper.element.style.borderColor).toBe('#ff0000');
    expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
  });
  it(`props.color expect variant=light-outline`, () => {
    const wrapper = mount(<Tag color={'#ff0000'} variant={'light-outline'}></Tag>);
    const domWrapper = wrapper.findComponent(Tag);
    expect(domWrapper.element.style.borderColor).toBe('#ff0000');
    expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
  });

  it('props.content works fine', () => {
    const wrapper = mount(<Tag content={() => <span class="custom-node">TNode</span>}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Tag v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Tag default={() => <span class="custom-node">TNode</span>}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Tag v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled: hide closeIcon if tag is disabled, and not trigger click event', async () => {
    const onClickFn = vi.fn();
    const wrapper = mount(<Tag disabled={true} closable={true} onClick={onClickFn}></Tag>);
    wrapper.findComponent(Tag).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag__icon-close').exists()).toBeFalsy();
    expect(onClickFn).not.toHaveBeenCalled();
  });

  it('props.icon works fine', () => {
    const wrapper = mount(<Tag icon={() => <span class="custom-node">TNode</span>}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.icon works fine', () => {
    const wrapper = mount(<Tag v-slots={{ icon: () => <span class="custom-node">TNode</span> }}></Tag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it(`props.maxWidth is equal to 150px`, () => {
    const wrapper = mount(<Tag maxWidth={'150px'} content={'This is a long long long long long tag'}></Tag>);
    const domWrapper = wrapper.find('.t-tag--text');
    expect(domWrapper.attributes('title')).toBe('This is a long long long long long tag');
    expect(domWrapper.element.style.maxWidth).toBe('150px');
  });
  it(`props.maxWidth is equal to 150`, () => {
    const wrapper = mount(<Tag maxWidth={'150'} content={'This is a long long long long long tag'}></Tag>);
    const domWrapper = wrapper.find('.t-tag--text');
    expect(domWrapper.attributes('title')).toBe('This is a long long long long long tag');
    expect(domWrapper.element.style.maxWidth).toBe('150px');
  });

  const shapeClassNameList = [{ 't-tag--square': false }, 't-tag--round', 't-tag--mark'];
  ['square', 'round', 'mark'].forEach((item, index) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Tag shape={item}></Tag>);
      if (typeof shapeClassNameList[index] === 'string') {
        expect(wrapper.classes(shapeClassNameList[index])).toBeTruthy();
      } else if (typeof shapeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(shapeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<Tag size={item}></Tag>);
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  ['default', 'primary', 'warning', 'danger', 'success'].forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<Tag theme={item}></Tag>);
      expect(wrapper.classes(`t-tag--${item}`)).toBeTruthy();
    });
  });

  it(`props.title without max-width`, () => {
    const title = 'This is a title';
    const wrapper = mount(<Tag title={title} content={'This is a content'}></Tag>);
    const span = wrapper.find('.t-tag > span');
    expect(span.attributes('title')).toBe(title);
  });
  it(`props.title is equal to This is a long tag`, () => {
    const wrapper = mount(
      <Tag title={'This is a long tag'} content={'This is a long long long long long tag'} maxWidth={'150px'}></Tag>,
    );
    const domWrapper = wrapper.find('.t-tag--text');
    expect(domWrapper.element.style.maxWidth).toBe('150px');
    expect(domWrapper.attributes('title')).toBe('This is a long tag');
  });
  it(`props.title is equal to `, () => {
    const wrapper = mount(<Tag title={''} content={'This is a long long long long long tag'} maxWidth={'150px'}></Tag>);
    const domWrapper = wrapper.find('.t-tag--text');
    expect(domWrapper.element.style.maxWidth).toBe('150px');
    expect(domWrapper.attributes('title')).toBeUndefined();
  });
  it(`props.title is equal to undefined`, () => {
    const wrapper = mount(
      <Tag title={undefined} content={'This is a long long long long long tag'} maxWidth={'150px'}></Tag>,
    );
    const domWrapper = wrapper.find('.t-tag--text');
    expect(domWrapper.element.style.maxWidth).toBe('150px');
    expect(domWrapper.attributes('title')).toBeUndefined();
  });

  ['dark', 'light', 'outline', 'light-outline'].forEach((item) => {
    it(`props.variant is equal to ${item}`, () => {
      const wrapper = mount(<Tag variant={item}></Tag>);
      expect(wrapper.classes(`t-tag--${item}`)).toBeTruthy();
    });
  });

  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount(<Tag onClick={fn}></Tag>);
    wrapper.findComponent(Tag).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.close works fine', async () => {
    const onCloseFn = vi.fn();
    const wrapper = mount(<Tag closable={true} onClose={onCloseFn}></Tag>);
    wrapper.find('.t-tag__icon-close').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onCloseFn).toHaveBeenCalled();
    expect(onCloseFn.mock.calls[0][0].e.type).toBe('click');
  });
});

describe('CheckTag Component', () => {
  it('props.content works fine', () => {
    const wrapper = mount(<CheckTag content={() => <span class="custom-node">TNode</span>}></CheckTag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<CheckTag v-slots={{ content: () => <span class="custom-node">TNode</span> }}></CheckTag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<CheckTag default={() => <span class="custom-node">TNode</span>}></CheckTag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<CheckTag v-slots={{ default: () => <span class="custom-node">TNode</span> }}></CheckTag>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
});

describe('Tag or CheckTag', () => {
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
          return <Tag theme={'default'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag theme={'primary'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag theme={'warning'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag theme={'danger'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag theme={'success'}></Tag>;
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
          return <Tag variant="dark" theme={'default'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:dark;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme={'primary'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:dark;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme={'warning'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:dark;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme={'danger'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:dark;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="dark" theme={'success'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--dark');
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':variant:light-outline;theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'default'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:light-outline;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'primary'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:light-outline;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'warning'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:light-outline;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'danger'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:light-outline;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'success'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--success');
    });
    it(':variant:light;theme:default', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'default'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--default');
    });
    it(':variant:light;theme:primary', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'primary'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--primary');
    });
    it(':variant:light;theme:warning', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'warning'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
    it(':variant:light;theme:danger', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'danger'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--danger');
    });
    it(':variant:light;theme:success', () => {
      const wrapper = mount({
        render() {
          return <Tag variant="light" theme={'success'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--light');
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':shape:round', () => {
      const wrapper = mount({
        render() {
          return <Tag shape={'round'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag--round');
    });
    it(':shape:square', () => {
      const wrapper = mount({
        render() {
          return <Tag shape={'square'}></Tag>;
        },
      });
      expect(wrapper.classes()).toContain('t-tag');
    });
    it(':shape:mark', () => {
      const wrapper = mount({
        render() {
          return <Tag shape={'mark'}></Tag>;
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
      const tag = wrapper.find('.t-tag--text');
      expect(getComputedStyle(tag.element, null).maxWidth).toBe('100px');
    });
  });

  describe('CheckTag:props', () => {
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

  describe('Tag:slot', () => {
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
    it('Event passthrough: click', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Tag onClick={fn}>text</Tag>;
        },
      });
      wrapper.findComponent(Tag).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
    it('Event passthrough: close', () => {
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
    it('Event passthrough: click', () => {
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
