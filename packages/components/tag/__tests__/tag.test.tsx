// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { vi } from 'vitest';
import { Tag, CheckTag, CheckTagGroup } from '@tdesign/components/tag';

describe('Tag', () => {
  describe('props', () => {
    it(':closable[boolean]', () => {
      // default
      const wrapper1 = mount(<Tag></Tag>);
      expect(wrapper1.find('.t-tag__icon-close').exists()).toBeFalsy();

      // true
      const wrapper2 = mount(<Tag closable={true}></Tag>);
      expect(wrapper2.find('.t-tag__icon-close').exists()).toBeTruthy();

      // false
      const wrapper3 = mount(<Tag closable={false}></Tag>);
      expect(wrapper3.find('.t-tag__icon-close').exists()).toBeFalsy();
    });

    it(':variant[dark/light/outline/light-outline]', () => {
      const wrapper = mount(<Tag></Tag>);
      const domWrapper = wrapper.findComponent(Tag);
      expect(domWrapper.classes()).toContain('t-tag--dark');

      const wrapper2 = mount(<Tag variant="dark"></Tag>);
      const domWrapper2 = wrapper2.findComponent(Tag);
      expect(domWrapper2.classes()).toContain('t-tag--dark');

      const wrapper3 = mount(<Tag variant="light"></Tag>);
      const domWrapper3 = wrapper3.findComponent(Tag);
      expect(domWrapper3.classes()).toContain('t-tag--light');

      const wrapper4 = mount(<Tag variant="outline"></Tag>);
      const domWrapper4 = wrapper4.findComponent(Tag);
      expect(domWrapper4.classes()).toContain('t-tag--outline');

      const wrapper5 = mount(<Tag variant="light-outline"></Tag>);
      const domWrapper5 = wrapper5.findComponent(Tag);
      expect(domWrapper5.classes()).toContain('t-tag--light-outline');
    });

    describe(':color', () => {
      it(':color[string]', () => {
        // hex color
        const wrapper = mount(<Tag color={'#ff0000'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
      });

      it(':color with :variant[dark]', () => {
        const wrapper = mount(<Tag color={'#ff0000'} variant={'dark'} theme={'primary'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
        expect(domWrapper.element.style.color).toBe('white');
      });

      it(':color with :variant[light]', () => {
        const wrapper = mount(<Tag color={'#ff0000'} variant={'light'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
        expect(domWrapper.element.style.backgroundColor).toBe('rgba(255, 0, 0, 0.1)');
      });

      it(':color with :variant[outline]', () => {
        const wrapper = mount(<Tag color={'#ff0000'} variant={'outline'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.borderColor).toBe('#ff0000');
        expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
      });

      it(':color with :variant[light-outline]', () => {
        const wrapper = mount(<Tag color={'#ff0000'} variant={'light-outline'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.borderColor).toBe('#ff0000');
        expect(domWrapper.element.style.color).toBe('rgb(255, 0, 0)');
      });

      it(':color with light luminance (> 0.5)', () => {
        const wrapper = mount(<Tag color={'#ffffff'} variant={'dark'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.color).toBe('black');
      });

      it(':color with dark luminance (<= 0.5)', () => {
        const wrapper = mount(<Tag color={'#000000'} variant={'dark'}></Tag>);
        const domWrapper = wrapper.findComponent(Tag);
        expect(domWrapper.element.style.color).toBe('white');
      });
    });

    it(':content[string/function]', () => {
      const wrapper = mount(<Tag content={'Hello World'}></Tag>);
      expect(wrapper.text()).toContain('Hello World');

      const wrapper2 = mount(<Tag content={() => <span class="custom-node">TNode</span>}></Tag>);
      expect(wrapper2.find('.custom-node').exists()).toBeTruthy();
    });

    it(':default[string/function]', () => {
      const wrapper = mount(<Tag default={'Default Content'}></Tag>);
      expect(wrapper.text()).toContain('Default Content');

      const wrapper2 = mount(<Tag default={() => <span class="custom-node">TNode</span>}></Tag>);
      expect(wrapper2.find('.custom-node').exists()).toBeTruthy();
    });

    it(':disabled[boolean]', () => {
      // default
      const wrapper1 = mount(<Tag></Tag>);
      expect(wrapper1.classes('t-tag--disabled')).toBeFalsy();

      // true
      const wrapper2 = mount(<Tag disabled={true}></Tag>);
      expect(wrapper2.classes('t-tag--disabled')).toBeTruthy();

      // false
      const wrapper3 = mount(<Tag disabled={false}></Tag>);
      expect(wrapper3.classes('t-tag--disabled')).toBeFalsy();
    });

    it(':icon[function]', () => {
      const wrapper = mount(<Tag icon={() => <span class="custom-icon">Icon</span>}></Tag>);
      expect(wrapper.find('.custom-icon').exists()).toBeTruthy();
    });

    it(':maxWidth[string/number]', () => {
      const wrapper = mount(<Tag maxWidth={150} content={'This is a long long long long long tag'}></Tag>);
      const domWrapper = wrapper.find('.t-tag--text');
      expect(domWrapper.attributes('title')).toBe('This is a long long long long long tag');
      expect(domWrapper.element.style.maxWidth).toBe('150px');

      const wrapper2 = mount(<Tag maxWidth={'150px'} content={'This is a long long long long long tag'}></Tag>);
      const domWrapper2 = wrapper2.find('.t-tag--text');
      expect(domWrapper2.attributes('title')).toBe('This is a long long long long long tag');
      expect(domWrapper2.element.style.maxWidth).toBe('150px');
    });

    it(':shape[square/round/mark]', () => {
      // default
      const wrapper1 = mount(<Tag></Tag>);
      expect(wrapper1.classes()).toContain('t-tag');
      expect(wrapper1.classes('t-tag--square')).toBeFalsy();

      // square
      const wrapper2 = mount(<Tag shape={'square'}></Tag>);
      expect(wrapper2.classes()).toContain('t-tag');
      expect(wrapper2.classes('t-tag--square')).toBeFalsy();

      const wrapper3 = mount(<Tag shape={'round'}></Tag>);
      expect(wrapper3.classes()).toContain('t-tag--round');

      const wrapper4 = mount(<Tag shape={'mark'}></Tag>);
      expect(wrapper4.classes()).toContain('t-tag--mark');
    });

    it(':size[small/medium/large]', () => {
      const wrapper = mount(<Tag size={'small'}></Tag>);
      expect(wrapper.classes()).toContain('t-size-s');

      const wrapper2 = mount(<Tag size={'medium'}></Tag>);
      expect(wrapper2.classes('t-size-m')).toBeFalsy();

      const wrapper3 = mount(<Tag size={'large'}></Tag>);
      expect(wrapper3.classes()).toContain('t-size-l');
    });

    it(':theme[default/primary/warning/danger/success]', () => {
      const wrapper = mount(<Tag theme={'default'}></Tag>);
      expect(wrapper.classes('t-tag--default')).toBeTruthy();

      const wrapper2 = mount(<Tag theme={'primary'}></Tag>);
      expect(wrapper2.classes('t-tag--primary')).toBeTruthy();

      const wrapper3 = mount(<Tag theme={'warning'}></Tag>);
      expect(wrapper3.classes('t-tag--warning')).toBeTruthy();

      const wrapper4 = mount(<Tag theme={'danger'}></Tag>);
      expect(wrapper4.classes('t-tag--danger')).toBeTruthy();

      const wrapper5 = mount(<Tag theme={'success'}></Tag>);
      expect(wrapper5.classes('t-tag--success')).toBeTruthy();
    });

    it(':title[string]', () => {
      const wrapper = mount(<Tag content="Default Title Content"></Tag>);
      const domWrapper = wrapper.find('.t-tag > span');
      expect(domWrapper.attributes('title')).toBe('Default Title Content');

      const wrapper2 = mount(<Tag>Default Title Content</Tag>);
      const domWrapper2 = wrapper2.find('.t-tag > span');
      expect(domWrapper2.attributes('title')).toBe('Default Title Content');

      const wrapper3 = mount(
        <Tag>
          <span>Content</span>
          <span>Text</span>
        </Tag>,
      );
      const span = wrapper3.find('.t-tag > span');
      expect(span.attributes('title')).toBe('Content Text');

      const title = 'This is a title';
      const wrapper4 = mount(<Tag title={title} content={'This is a content'}></Tag>);
      const span2 = wrapper4.find('.t-tag > span');
      expect(span2.attributes('title')).toBe(title);
    });

    it(':variant[dark/light/outline/light-outline]', () => {
      const wrapper = mount(<Tag variant={'dark'}></Tag>);
      expect(wrapper.classes('t-tag--dark')).toBeTruthy();

      const wrapper2 = mount(<Tag variant={'light'}></Tag>);
      expect(wrapper2.classes('t-tag--light')).toBeTruthy();

      const wrapper3 = mount(<Tag variant={'outline'}></Tag>);
      expect(wrapper3.classes('t-tag--outline')).toBeTruthy();

      const wrapper4 = mount(<Tag variant={'light-outline'}></Tag>);
      expect(wrapper4.classes('t-tag--light-outline')).toBeTruthy();
    });
  });

  describe('events', () => {
    it('onClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Tag onClick={fn}></Tag>);
      wrapper.findComponent(Tag).trigger('click');
      await nextTick();
      expect(fn).toHaveBeenCalled();
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onClose', async () => {
      const onCloseFn = vi.fn();
      const wrapper = mount(<Tag closable={true} onClose={onCloseFn}></Tag>);
      wrapper.find('.t-tag__icon-close').trigger('click');
      await nextTick();
      expect(onCloseFn).toHaveBeenCalled();
      expect(onCloseFn.mock.calls[0][0].e.type).toBe('click');
    });

    it('onClick on close icon should not trigger tag click', async () => {
      const onClickFn = vi.fn();
      const onCloseFn = vi.fn();
      const wrapper = mount(<Tag closable={true} onClick={onClickFn} onClose={onCloseFn}></Tag>);
      wrapper.find('.t-tag__icon-close').trigger('click');
      await nextTick();
      expect(onCloseFn).toHaveBeenCalled();
      expect(onClickFn).not.toHaveBeenCalled();
    });
  });
});

describe('CheckTag', () => {
  describe('props', () => {
    it(':content[string/number/function]', () => {
      const wrapper = mount(<CheckTag content={'Check Content'}></CheckTag>);
      expect(wrapper.text()).toContain('Check Content');

      const wrapper2 = mount(<CheckTag content={123}></CheckTag>);
      expect(wrapper2.text()).toContain('123');

      const wrapper3 = mount(<CheckTag content={() => <span class="custom-node">TNode</span>}></CheckTag>);
      expect(wrapper3.find('.custom-node').exists()).toBeTruthy();
    });

    it(':default[string/function]', () => {
      const wrapper = mount(<CheckTag default={'Default Content'}></CheckTag>);
      expect(wrapper.text()).toContain('Default Content');

      const wrapper2 = mount(<CheckTag default={() => <span class="custom-node">TNode</span>}></CheckTag>);
      expect(wrapper2.find('.custom-node').exists()).toBeTruthy();
    });

    it(':checked[boolean]', () => {
      // true
      const wrapper1 = mount(<CheckTag checked={true}></CheckTag>);
      expect(wrapper1.classes()).toContain('t-tag--checked');

      // false
      const wrapper2 = mount(<CheckTag checked={false}></CheckTag>);
      expect(wrapper2.classes('t-tag--checked')).toBeFalsy();
    });

    it(':defaultChecked[boolean]', () => {
      const wrapper = mount(<CheckTag defaultChecked={true}></CheckTag>);
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it(':modelValue[boolean]', () => {
      // true
      const wrapper1 = mount(<CheckTag modelValue={true}></CheckTag>);
      expect(wrapper1.classes()).toContain('t-tag--checked');

      // false
      const wrapper2 = mount(<CheckTag modelValue={false}></CheckTag>);
      expect(wrapper2.classes('t-tag--checked')).toBeFalsy();
    });

    it(':disabled[boolean]', () => {
      // true
      const wrapper1 = mount(<CheckTag disabled={true}></CheckTag>);
      expect(wrapper1.classes()).toContain('t-tag--disabled');

      // false
      const wrapper2 = mount(<CheckTag disabled={false}></CheckTag>);
      expect(wrapper2.classes('t-tag--disabled')).toBeFalsy();
    });

    it(':size[small/medium/large]', () => {
      const wrapper = mount(<CheckTag size={'small'}></CheckTag>);
      expect(wrapper.classes()).toContain('t-size-s');

      const wrapper2 = mount(<CheckTag size={'medium'}></CheckTag>);
      expect(wrapper2.classes()).toContain('t-size-m');

      const wrapper3 = mount(<CheckTag size={'large'}></CheckTag>);
      expect(wrapper3.classes()).toContain('t-size-l');
    });

    it(':checkedProps[object]', () => {
      const wrapper = mount(<CheckTag checked={true} checkedProps={{ theme: 'success' }}></CheckTag>);
      expect(wrapper.classes()).toContain('t-tag--success');
    });

    it(':uncheckedProps[object]', () => {
      const wrapper = mount(<CheckTag checked={false} uncheckedProps={{ theme: 'warning' }}></CheckTag>);
      expect(wrapper.classes()).toContain('t-tag--warning');
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn}></CheckTag>);
      wrapper.findComponent(CheckTag).trigger('click');
      await nextTick();
      expect(onChangeFn.mock.calls[0][0]).toBe(true);
      expect(onChangeFn).toHaveBeenCalled();
    });

    it('onClick', async () => {
      const onClickFn = vi.fn();
      const wrapper = mount(<CheckTag onClick={onClickFn}></CheckTag>);
      wrapper.findComponent(CheckTag).trigger('click');
      await nextTick();
      expect(onClickFn).toHaveBeenCalled();
    });
  });

  describe('keyboard events', () => {
    it('Enter key', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn}>CheckTag</CheckTag>, {
        attachTo: document.body,
      });
      const tag = wrapper.findComponent(CheckTag);
      tag.trigger('click');
      await nextTick();

      tag.trigger('focus');
      await nextTick();

      const keyboardEvent = new KeyboardEvent('keydown', { code: 'Enter', key: 'Enter' });
      await tag.element.dispatchEvent(keyboardEvent);
      await nextTick();

      expect(onChangeFn).toHaveBeenCalled();
    });

    it('Space key', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTag onChange={onChangeFn}></CheckTag>, {
        attachTo: document.body,
      });
      const tag = wrapper.findComponent(CheckTag);
      tag.trigger('click');
      await nextTick();

      tag.trigger('focus');
      await nextTick();

      const keyboardEvent = new KeyboardEvent('keydown', { code: 'Space', key: ' ' });
      await tag.element.dispatchEvent(keyboardEvent);
      await nextTick();

      expect(onChangeFn).toHaveBeenCalled();
    });
  });
});

describe('CheckTagGroup', () => {
  describe('props', () => {
    it(':options[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ];
      const wrapper = mount(<CheckTagGroup options={options}></CheckTagGroup>);
      const tags = wrapper.findAllComponents(CheckTag);
      expect(tags).toHaveLength(3);

      const options2 = [
        { label: 'Enabled', value: 1, disabled: false },
        { label: 'Disabled', value: 2, disabled: true },
      ];
      const wrapper2 = mount(<CheckTagGroup options={options2}></CheckTagGroup>);
      const tags2 = wrapper2.findAllComponents(CheckTag);
      expect(tags2[1].classes()).toContain('t-tag--disabled');

      const options3 = [
        { label: 'Small', value: 1, size: 'small' },
        { label: 'Large', value: 2, size: 'large' },
      ];
      const wrapper3 = mount(<CheckTagGroup options={options3}></CheckTagGroup>);
      const tags3 = wrapper3.findAllComponents(CheckTag);
      expect(tags3[0].classes()).toContain('t-size-s');
      expect(tags3[1].classes()).toContain('t-size-l');

      // Test different content types in options
      const options4 = [
        { label: () => <span class="fn-label">Fn Label</span>, value: 4 },
        { content: () => <span class="fn-content">Fn Content</span>, value: 5 },
        { default: () => <span class="fn-default">Fn Default</span>, value: 6 },
        { value: 7 },
      ];
      const wrapper4 = mount(<CheckTagGroup options={options4}></CheckTagGroup>);

      expect(wrapper4.find('.fn-label').exists()).toBeTruthy();
      expect(wrapper4.find('.fn-content').exists()).toBeTruthy();
      expect(wrapper4.find('.fn-default').exists()).toBeTruthy();
      expect(wrapper4.text()).toContain('7');
    });

    it(':value[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mount(<CheckTagGroup options={options} value={[1]}></CheckTagGroup>);
      const tags = wrapper.findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain('t-tag--checked');
      expect(tags[1].classes('t-tag--checked')).toBeFalsy();
    });

    it(':defaultValue[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mount(<CheckTagGroup options={options} defaultValue={[1]}></CheckTagGroup>);
      const tags = wrapper.findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain('t-tag--checked');
    });

    it(':modelValue[array]', () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mount(<CheckTagGroup options={options} modelValue={[1]}></CheckTagGroup>);
      const tags = wrapper.findAllComponents(CheckTag);
      expect(tags[0].classes()).toContain('t-tag--checked');
    });

    it(':multiple[boolean]', async () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} multiple={true} onChange={onChangeFn}></CheckTagGroup>);
      const tags = wrapper.findAllComponents(CheckTag);

      // Click first tag
      await tags[0].trigger('click');
      expect(onChangeFn).toHaveBeenCalledWith([1], expect.anything());

      // Click second tag
      await tags[1].trigger('click');
      expect(onChangeFn).toHaveBeenLastCalledWith([1, 2], expect.anything());

      // Click first tag again to uncheck
      await tags[0].trigger('click');
      expect(onChangeFn).toHaveBeenLastCalledWith([2], expect.anything());

      expect(onChangeFn).toHaveBeenCalledTimes(3);

      const options2 = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const onChangeFn2 = vi.fn();
      const wrapper2 = mount(
        <CheckTagGroup options={options2} multiple={false} onChange={onChangeFn2}></CheckTagGroup>,
      );
      const tags2 = wrapper2.findAllComponents(CheckTag);

      // Click first tag
      await tags2[0].trigger('click');
      expect(onChangeFn2).toHaveBeenCalledWith([1], expect.anything());

      // Click second tag
      await tags2[1].trigger('click');
      expect(onChangeFn2).toHaveBeenLastCalledWith([2], expect.anything());

      // Click second tag again to uncheck
      await tags2[1].trigger('click');
      expect(onChangeFn2).toHaveBeenLastCalledWith([], expect.anything());

      expect(onChangeFn2).toHaveBeenCalledTimes(3);
    });

    it(':checkedProps[object]', async () => {
      const wrapper = mount(
        <CheckTagGroup options={[{ label: 'Option', value: 1 }]} checkedProps={{ theme: 'success' }}></CheckTagGroup>,
      );
      const tag = wrapper.findComponent(CheckTag);
      tag.trigger('click');
      await nextTick();
      expect(tag.classes()).toContain('t-tag--success');
    });

    it(':uncheckedProps[object]', () => {
      const wrapper = mount(
        <CheckTagGroup options={[{ label: 'Option', value: 1 }]} uncheckedProps={{ theme: 'warning' }}></CheckTagGroup>,
      );
      const tag = wrapper.findComponent(CheckTag);
      expect(tag.classes()).toContain('t-tag--warning');
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} onChange={onChangeFn}></CheckTagGroup>);

      const tags = wrapper.findAllComponents(CheckTag);
      tags[0].trigger('click');
      await nextTick();

      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][1].e).toBeDefined();
      expect(onChangeFn.mock.calls[0][1].value).toBe(1);
    });

    it('onChange context includes type=check', async () => {
      const options = [{ label: 'Option', value: 1 }];
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} onChange={onChangeFn}></CheckTagGroup>);

      const tag = wrapper.findComponent(CheckTag);
      tag.trigger('click');
      await nextTick();

      expect(onChangeFn.mock.calls[0][1].type).toBe('check');
    });

    it('onChange context includes type=uncheck', async () => {
      const options = [{ label: 'Option', value: 1 }];
      const onChangeFn = vi.fn();
      const wrapper = mount(<CheckTagGroup options={options} value={[1]} onChange={onChangeFn}></CheckTagGroup>);

      const tag = wrapper.findComponent(CheckTag);
      tag.trigger('click');
      await nextTick();

      expect(onChangeFn.mock.calls[0][1].type).toBe('uncheck');
    });
  });

  describe('slots', () => {
    it('option', () => {
      const options = [{ label: 'Option', value: 1 }];
      const wrapper = mount({
        render() {
          return (
            <CheckTagGroup
              options={options}
              v-slots={{
                option: () => <span class="custom-option">Custom</span>,
              }}
            ></CheckTagGroup>
          );
        },
      });
      expect(wrapper.find('.custom-option').exists()).toBeTruthy();
    });

    it('label', () => {
      const options = [{ label: 'Option', value: 1 }];
      const wrapper = mount({
        render() {
          return (
            <CheckTagGroup
              options={options}
              v-slots={{
                label: () => <span class="custom-label">Custom Label</span>,
              }}
            ></CheckTagGroup>
          );
        },
      });
      expect(wrapper.find('.custom-label').exists()).toBeTruthy();
    });
  });
});
