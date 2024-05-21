import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Col, Row } from 'tdesign-vue-next';

const alignList = ['start', 'end', 'center', 'stretch', 'baseline', 'top', 'middle', 'bottom'];
const justifyList = ['start', 'end', 'center', 'space-around', 'space-between'];

describe('grid', () => {
  describe('row:props', () => {
    it('', () => {
      const wrapper = mount(() => (
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
        </Row>
      ));
      const row = wrapper.find('.t-row');
      const cols = wrapper.findAll('.t-col');
      expect(row.exists()).toBeTruthy();
      expect(cols.length).toBe(4);
    });
    it(':align', () => {
      alignList.forEach((align) => {
        const wrapper = mount(
          <Row align={align}>
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
        );
        const row = wrapper.find('.t-row');
        expect(row.classes()).toContain(`t-row--align-${align}`);
      });
    });
    it(':justify', () => {
      justifyList.forEach((justify) => {
        const wrapper = mount(
          <Row justify={justify}>
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
        );
        const row = wrapper.find('.t-row');
        expect(row.classes()).toContain(`t-row--${justify}`);
      });
    });
    it(':gutter', () => {
      const wrapper = mount(
        <Row gutter={20}>
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
      );
      const cols = wrapper.findAll('.t-col');
      cols.forEach((col) => {
        expect(getComputedStyle(col.element, null).paddingLeft).toBe('10px');
        expect(getComputedStyle(col.element, null).paddingRight).toBe('10px');
      });
    });
    it(':tag', () => {
      const wrapper = mount(
        <Row tag="span">
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
      );
      const row = wrapper.find('span');
      expect(row.exists()).toBeTruthy();
    });
  });
  describe('col:props', () => {
    it(':span', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-3</div>
          </Col>
          <Col span={8}>
            <div>col-3</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-8');
    });
    it(':flex', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-3</div>
          </Col>
          <Col flex="1">
            <div>col-3</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col');
    });
    it(':offset', () => {
      const wrapper = mount(
        <Row>
          <Col span={4}>
            <div>col-3</div>
          </Col>
          <Col span={4} offset={4}>
            <div>col-3</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-4');
      expect(cols[1].classes()).toContain('t-col-offset-4');
    });
    it(':pull&:push', () => {
      const wrapper = mount(
        <Row>
          <Col span={9} push={3}>
            <div>col-3</div>
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
    });
    it(':order', () => {
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
    });
    it(':tag', () => {
      const wrapper = mount(
        <Row>
          <Col span={12} tag="span">
            <div>col</div>
          </Col>
        </Row>,
      );
      const span = wrapper.find('span');
      expect(span.exists()).toBeTruthy();
    });
    it(':responsive', () => {
      const wrapper = mount(() => (
        <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
          <Col xs={10} sm={8} md={6} lg={4} xl={2}></Col>
        </Row>
      ));
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-xs-2');
      expect(cols[0].classes()).toContain('t-col-sm-4');
      expect(cols[0].classes()).toContain('t-col-md-6');
      expect(cols[0].classes()).toContain('t-col-lg-8');
      expect(cols[0].classes()).toContain('t-col-xl-10');
      expect(cols[1].classes()).toContain('t-col-xs-10');
      expect(cols[1].classes()).toContain('t-col-sm-8');
      expect(cols[1].classes()).toContain('t-col-md-6');
      expect(cols[1].classes()).toContain('t-col-lg-4');
      expect(cols[1].classes()).toContain('t-col-xl-2');
    });
  });

  describe('@event', () => {
    it('_______', () => {
      expect(true).toEqual(true);
    });
  });

  describe('<slot>', () => {
    it('_______', () => {
      expect(true).toEqual(true);
    });
  });
});
