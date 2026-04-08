import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import { Row, Col } from '@tdesign/components/grid';
import rowProps from '@tdesign/components/grid/row-props';

describe('Row', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Row>> | null = null;

    beforeEach(() => {
      wrapper = mount(
        <Row>
          <Col span={3}>
            <div>col-3</div>
          </Col>
          <Col span={3}>
            <div>col-3</div>
          </Col>
          <Col span={3}>
            <div>col-3</div>
          </Col>
          <Col span={3}>
            <div>col-3</div>
          </Col>
        </Row>,
      ) as VueWrapper<InstanceType<typeof Row>>;
    });

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it(':align[string]', async () => {
      const validator = rowProps.align.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      const alignValues = ['start', 'end', 'center', 'stretch', 'baseline', 'top', 'middle', 'bottom'] as const;
      for (const align of alignValues) {
        await wrapper.setProps({ align });
        expect(wrapper.find('.t-row').classes()).toContain(`t-row--align-${align}`);
      }
    });

    it(':justify[string]', async () => {
      const validator = rowProps.justify.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      const justifyValues = ['start', 'end', 'center', 'space-around', 'space-between'] as const;
      for (const justify of justifyValues) {
        await wrapper.setProps({ justify });
        expect(wrapper.find('.t-row').classes()).toContain(`t-row--${justify}`);
      }
    });

    it(':gutter[number]', () => {
      const wrapper = mount(
        <Row gutter={20}>
          <Col span={6}>
            <div>col-6</div>
          </Col>
          <Col span={6}>
            <div>col-6</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      cols.forEach((col) => {
        expect(getComputedStyle(col.element, null).paddingLeft).toBe('10px');
        expect(getComputedStyle(col.element, null).paddingRight).toBe('10px');
      });
      wrapper.unmount();
    });

    it(':gutter[array]', () => {
      const wrapper = mount(
        <Row gutter={[20, 10]}>
          <Col span={6}>
            <div>col-6</div>
          </Col>
          <Col span={6}>
            <div>col-6</div>
          </Col>
        </Row>,
      );
      const row = wrapper.find('.t-row');
      const cols = wrapper.findAll('.t-col');
      expect(row.exists()).toBe(true);
      cols.forEach((col) => {
        expect(getComputedStyle(col.element, null).paddingLeft).toBe('10px');
        expect(getComputedStyle(col.element, null).paddingRight).toBe('10px');
      });
      wrapper.unmount();
    });

    it(':gutter[object]', () => {
      const wrapper = mount(
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col span={6}>
            <div>col-6</div>
          </Col>
          <Col span={6}>
            <div>col-6</div>
          </Col>
        </Row>,
      );
      expect(wrapper.find('.t-row').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':gutter with zero value', () => {
      const wrapper = mount(
        <Row gutter={0}>
          <Col span={6}>
            <div>col-6</div>
          </Col>
        </Row>,
      );
      const col = wrapper.find('.t-col');
      expect(getComputedStyle(col.element, null).paddingLeft).toBe('0px');
      wrapper.unmount();
    });

    it(':tag[string]', async () => {
      expect(wrapper.find('div.t-row').exists()).toBe(true);

      await wrapper.setProps({ tag: 'span' });
      expect(wrapper.find('span.t-row').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>
            <div class="slot-content">Hello</div>
          </Col>
        </Row>
      ));
      expect(wrapper.find('.slot-content').exists()).toBe(true);
      expect(wrapper.find('.slot-content').text()).toBe('Hello');
    });

    it('empty', () => {
      const wrapper = mount(() => <Row></Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
      expect(wrapper.find('.t-row').text()).toBe('');
    });
  });
});

describe('Col', () => {
  describe('props', () => {
    it(':span[number]', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-4</div>
          </Col>
          <Col span={8}>
            <div>col-8</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-8');
      wrapper.unmount();
    });

    it(':span with 0', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={0}>
            <div>hidden</div>
          </Col>
        </Row>
      ));
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      expect(col.classes()).toContain('t-col-0');
    });

    it(':flex[string/number]', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-4</div>
          </Col>
          <Col flex="1">
            <div>flex-1</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col');

      wrapper.unmount();

      const wrapperNumber = mount(
        <Row>
          <Col flex={1}>
            <div>flex-1</div>
          </Col>
          <Col flex={2}>
            <div>flex-2</div>
          </Col>
        </Row>,
      );
      const colsNum = wrapperNumber.findAll('.t-col');
      expect(getComputedStyle(colsNum[0].element).flex).toContain('1 1');
      expect(getComputedStyle(colsNum[1].element).flex).toContain('2 2');
      wrapperNumber.unmount();
    });

    it(':flex with pixel/percentage/complex/auto', () => {
      const wrapper = mount(
        <Row>
          <Col flex="100px">
            <div>flex-100px</div>
          </Col>
        </Row>,
      );
      expect(getComputedStyle(wrapper.find('.t-col').element).flex).toBe('0 0 100px');
      wrapper.unmount();

      const wrapperPercent = mount(
        <Row>
          <Col flex="50%">
            <div>flex-50%</div>
          </Col>
        </Row>,
      );
      expect(getComputedStyle(wrapperPercent.find('.t-col').element).flex).toBe('0 0 50%');
      wrapperPercent.unmount();

      const wrapperComplex = mount(
        <Row>
          <Col flex="1 1 200px">
            <div>flex-complex</div>
          </Col>
        </Row>,
      );
      expect(getComputedStyle(wrapperComplex.find('.t-col').element).flex).toBe('1 1 200px');
      wrapperComplex.unmount();

      const wrapperAuto = mount(
        <Row>
          <Col flex="auto">
            <div>flex-auto</div>
          </Col>
        </Row>,
      );
      expect(getComputedStyle(wrapperAuto.find('.t-col').element).flex).toBe('auto');
      wrapperAuto.unmount();
    });

    it(':offset[number]', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-4</div>
          </Col>
          <Col span={4} offset={4}>
            <div>col-4</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-offset-4');
      wrapper.unmount();
    });

    it(':pull[number] & :push[number]', () => {
      const wrapper = mount(
        <Row>
          <Col span={9} push={3}>
            <div>col-9</div>
          </Col>
          <Col span={3} pull={9}>
            <div>col-3</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-9');
      expect(cols[0].classes()).toContain('t-col-push-3');
      expect(cols[1].classes()).toContain('t-col-3');
      expect(cols[1].classes()).toContain('t-col-pull-9');
      wrapper.unmount();
    });

    it(':order[number]', () => {
      const wrapper = mount(
        <Row>
          <Col span={3} order={4}>
            <div>col-3-order-4</div>
          </Col>
          <Col span={3} order={3}>
            <div>col-3-order-3</div>
          </Col>
          <Col span={3} order={2}>
            <div>col-3-order-2</div>
          </Col>
          <Col span={3} order={1}>
            <div>col-3-order-1</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-order-4');
      expect(cols[1].classes()).toContain('t-col-order-3');
      expect(cols[2].classes()).toContain('t-col-order-2');
      expect(cols[3].classes()).toContain('t-col-order-1');
      wrapper.unmount();
    });

    it(':tag[string]', () => {
      const wrapper = mount(
        <Row>
          <Col span={12} tag="span">
            <div>col</div>
          </Col>
        </Row>,
      );
      expect(wrapper.find('span.t-col').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':xs/sm/md/lg/xl/xxl[number]', () => {
      const wrapper = mount(() => (
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10} xxl={4}></Col>
          <Col xs={10} sm={8} md={6} lg={4} xl={2} xxl={8}></Col>
        </Row>
      ));
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-xs-2');
      expect(cols[0].classes()).toContain('t-col-sm-4');
      expect(cols[0].classes()).toContain('t-col-md-6');
      expect(cols[0].classes()).toContain('t-col-lg-8');
      expect(cols[0].classes()).toContain('t-col-xl-10');
      expect(cols[0].classes()).toContain('t-col-xxl-4');
      expect(cols[1].classes()).toContain('t-col-xs-10');
      expect(cols[1].classes()).toContain('t-col-sm-8');
      expect(cols[1].classes()).toContain('t-col-md-6');
      expect(cols[1].classes()).toContain('t-col-lg-4');
      expect(cols[1].classes()).toContain('t-col-xl-2');
      expect(cols[1].classes()).toContain('t-col-xxl-8');
    });

    it(':responsive[object] with offset/order/push/pull', () => {
      const wrapper = mount(() => (
        <Row>
          <Col xs={{ span: 12, offset: 0 }} md={{ span: 6, offset: 3, order: 1, push: 1, pull: 0 }}></Col>
        </Row>
      ));
      const col = wrapper.find('.t-col');
      expect(col.classes()).toContain('t-col-xs-12');
      expect(col.classes()).toContain('t-col-xs-offset-0');
      expect(col.classes()).toContain('t-col-md-6');
      expect(col.classes()).toContain('t-col-md-offset-3');
      expect(col.classes()).toContain('t-col-md-order-1');
      expect(col.classes()).toContain('t-col-md-push-1');
      expect(col.classes()).toContain('t-col-md-pull-0');
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={6}>
            <span>First</span>
          </Col>
          <Col span={6}>
            <span>Second</span>
          </Col>
        </Row>
      ));
      const spans = wrapper.findAll('span');
      expect(spans.length).toBe(2);
      expect(spans[0].text()).toBe('First');
      expect(spans[1].text()).toBe('Second');
    });

    it('empty', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}></Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
      expect(wrapper.find('.t-col').text()).toBe('');
    });
  });

  describe('without Row context', () => {
    it('standalone Col renders correctly', () => {
      const wrapper = mount(() => (
        <Col span={12}>
          <div>standalone col</div>
        </Col>
      ));
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      expect(col.classes()).toContain('t-col-12');
    });

    it('standalone Col with flex', () => {
      const wrapper = mount(() => (
        <Col flex="auto">
          <div>standalone col with flex</div>
        </Col>
      ));
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      expect(getComputedStyle(col.element).flex).toBe('auto');
    });
  });
});
