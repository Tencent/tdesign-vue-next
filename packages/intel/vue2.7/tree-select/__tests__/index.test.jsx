import { mount } from '@vue/test-utils';
import TreeSelect from '@/src/tree-select/index.ts';

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
    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <TreeSelect disabled={true} />;
        },
      });
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
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
    it('remove', () => {
      const value = ['shenzhen'];
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} value={value} multiple={true} />;
        },
      });
      const treeSelectWrapper = wrapper.findComponent(TreeSelect);
      const closeIconWrapper = wrapper.find('.t-icon-close');
      closeIconWrapper.trigger('click');
      expect(treeSelectWrapper.emitted().remove).toBeTruthy();
    });
    it('search', () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <TreeSelect data={options} filterable={true} onSearch={fn} />;
        },
      });
      const treeSelectWrapper = wrapper.findComponent(TreeSelect);
      const inputElement = wrapper.find('input');
      inputElement.setValue('shenzhen');
      expect(treeSelectWrapper.emitted().search).toBeTruthy();
    });
  });

  // test slots
  describe('<slot>', () => {
    it('<collapsedItems>', () => {
      const wrapper = mount({
        render() {
          return (
            <TreeSelect>
              <div slot="collapsedItems">
                <span>更多...</span>
              </div>
            </TreeSelect>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<empty>', () => {
      const wrapper = mount({
        render() {
          return (
            <TreeSelect>
              <div slot="empty">no data</div>
            </TreeSelect>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<loadingText>', () => {
      const wrapper = mount({
        render() {
          return (
            <TreeSelect loading={true}>
              <div slot="loadingText">data loading</div>
            </TreeSelect>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it('<prefixIcon>', () => {
      const wrapper = mount({
        render() {
          return (
            <TreeSelect>
              <div slot="prefixIcon">
                <i>icon</i>
              </div>
            </TreeSelect>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test exposure function
  describe('function', () => {
    it(':collapsedItems', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const renderCollapsedItems = (h) => (
        <div>
          <span>更多...</span>
        </div>
      );
      const wrapper = mount({
        render() {
          return <TreeSelect collapsedItems={renderCollapsedItems} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':empty', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const renderEmpty = (h) => <div>no data</div>;
      const wrapper = mount({
        render() {
          return <TreeSelect empty={renderEmpty}></TreeSelect>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loadingText', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const renderLoadingText = (h) => <div>data loading</div>;
      const wrapper = mount({
        render() {
          return <TreeSelect loading={true} loadingText={renderLoadingText} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':prefixIcon', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const renderPrefixIcon = (h) => (
        <div>
          <i>icon</i>
        </div>
      );
      const wrapper = mount({
        render() {
          return <TreeSelect prefixIcon={renderPrefixIcon} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
