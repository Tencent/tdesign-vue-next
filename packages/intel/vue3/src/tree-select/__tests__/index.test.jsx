import { expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeSelect from 'tdesign-vue-next'

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];

const propsOptions = [
  {
    name: '广东省',
    pinyin: 'guangdong',
    children: [
      {
        name: '广州市',
        pinyin: 'guangzhou',
      },
      {
        name: '深圳市',
        pinyin: 'shenzhen',
      },
    ],
  },
  {
    name: '江苏省',
    pinyin: 'jiangsu',
    children: [
      {
        name: '南京市',
        pinyin: 'nanjing',
      },
      {
        name: '苏州市',
        pinyin: 'suzhou',
      },
    ],
  },
];

const objectValue = { label: '深圳市', value: 'shenzhen' };

// every component needs four parts: props/events/slots/functions.
describe('TreeSelect', () => {
  // test props api
  describe(':props', () => {
    it(':clearable', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect clearable={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect disabled={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':empty string', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect empty={'no data'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':filterable', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect filterable={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect loading={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loadingText', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect loadingText={'data loading'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':max', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect max={10} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':minCollapsedNum', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect minCollapsedNum={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':multiple', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect multiple={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':placeholder', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect placeholder={'please select address'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':popupProps', () => {
      const popupProps = {
        overlayStyle: {
          width: '500px',
        },
      };
      const wrapper = mount({
        render() {
          return <TreeSelect popupProps={popupProps} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect size={'large'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':treeProps', () => {
      const treeProps = {
        keys: {
          label: 'name',
          value: 'pinyin',
          children: 'children',
        },
      };
      const wrapper = mount({
        render() {
          return <TreeSelect data={propsOptions} treeProps={treeProps} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':value', () => {
      const value = 'shenzhen';
      const wrapper = mount({
        render() {
          return <TreeSelect v-model={value} data={options} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultValue', () => {
      const defaultValue = ['shenzhen', 'guangzhou'];
      const wrapper = mount({
        render() {
          return <TreeSelect defaultValue={defaultValue} data={options} multiple={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':valueType', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect valueType={'object'} data={options} value={objectValue} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    it('onBlur', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} filterable={true} onBlur={fn} />;
        },
      });
      const inputElement = wrapper.find('input');
      inputElement.trigger('focus');
      inputElement.trigger('blur');
      expect(fn).toBeCalled();
    });
    it('onClear', () => {
      const fn = vi.fn();
      const value = 'shenzhen';
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} value={value} clearable={true} filterable={true} onClear={fn} />;
        },
      });
      const treeSelectWrapper = wrapper.findComponent(TreeSelect);
      treeSelectWrapper.vm.onClear();
      expect(fn).toBeCalled();
    });
    it('onFocus', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} filterable={true} onFocus={fn} />;
        },
      });
      const inputElement = wrapper.find('input');
      inputElement.trigger('focus');
      expect(fn).toBeCalled();
    });
    it('onRemove', () => {
      const fn = vi.fn();
      const value = ['shenzhen'];
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} value={value} multiple={true} onRemove={fn} />;
        },
      });
      const closeIconWrapper = wrapper.find('.t-icon-close');
      closeIconWrapper.trigger('click');
      expect(fn).toBeCalled();
    });
    it('onSearch', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} filterable={true} onSearch={fn} />;
        },
      });
      const inputElement = wrapper.find('input');
      inputElement.setValue('shenzhen');
      expect(fn).toBeCalled();
    });
    it('onChange', () => {
      const fn = vi.fn();
      const value = ['shenzhen'];
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} value={value} multiple={true} onChange={fn} />;
        },
      });
      expect(fn).not.toBeCalled();
      const closeIconWrapper = wrapper.find('.t-icon-close');
      closeIconWrapper.trigger('click');
      expect(fn).toBeCalledTimes(1);
    });
  });

  describe('<slot>', () => {
    it('<collapsedItems>', () => {
      const value = ['shenzhen', 'guangzhou'];
      const wrapper = mount(TreeSelect, {
        propsData: {
          value,
          data: options,
          multiple: true,
          minCollapsedNum: 1,
        },
        slots: {
          collapsedItems: '<span>更多...</span>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<empty>', () => {
      const wrapper = mount(TreeSelect, {
        propsData: {
          data: [],
        },
        slots: {
          collapsedItems: '<div>found no data</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<loadingText>', () => {
      const wrapper = mount(TreeSelect, {
        propsData: {
          data: [],
          loading: true,
        },
        slots: {
          loadingText: '<div>loading...</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<prefixIcon>', () => {
      const wrapper = mount(TreeSelect, {
        propsData: {
          data: options,
        },
        slots: {
          prefixIcon: '<i>this is a icon.</i>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<valueDisplay>', () => {
      const wrapper = mount(TreeSelect, {
        propsData: {
          data: options,
        },
        slots: {
          valueDisplay: '<div>深圳市(shenzhen)</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test exposure function
  describe('function', () => {
    it(':collapsedItems', () => {
      const value = ['shenzhen', 'guangzhou'];
      const renderCollapsedItems = (h) => (
        <div>
          <span>更多...</span>
        </div>
      );
      const wrapper = mount({
        render() {
          return (
            <TreeSelect
              v-model={value}
              data={options}
              multiple={true}
              minCollapsedNum={1}
              collapsedItems={renderCollapsedItems}
            />
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':empty', () => {
      const renderEmpty = (h) => <div>found no data.</div>;
      const wrapper = mount({
        render() {
          return <TreeSelect data={[]} empty={renderEmpty}></TreeSelect>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loadingText', () => {
      const renderLoadingText = (h) => <div>loading...</div>;
      const wrapper = mount({
        render() {
          return <TreeSelect data={[]} loading={true} loadingText={renderLoadingText} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':prefixIcon', () => {
      const renderPrefixIcon = (h) => (
        <div>
          <i>this is a icon.</i>
        </div>
      );
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} prefixIcon={renderPrefixIcon} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':valueDisplay', () => {
      const renderValueDisplay = (h) => <div>深圳市(shenzhen)</div>;
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} valueDisplay={renderValueDisplay} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
