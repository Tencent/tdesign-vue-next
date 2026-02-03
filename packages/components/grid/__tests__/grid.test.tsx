// @ts-nocheck
import { mount } from '@vue/test-utils';
import { it, expect, describe, vi } from 'vitest';
import { Row, Col } from '@tdesign/components/grid';
import rowProps from '@tdesign/components/grid/row-props';
import colProps from '@tdesign/components/grid/col-props';

const alignList = ['start', 'end', 'center', 'stretch', 'baseline', 'top', 'middle', 'bottom'];
const justifyList = ['start', 'end', 'center', 'space-around', 'space-between'];

describe('Grid', () => {
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
    test('_______', () => {
      expect(true).toEqual(true);
    });
  });

  describe('<slot>', () => {
    test('default slot renders content', () => {
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

    test('Row with empty slot', () => {
      const wrapper = mount(() => <Row></Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
      expect(wrapper.find('.t-row').text()).toBe('');
    });

    test('Col with empty slot', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}></Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
      expect(wrapper.find('.t-col').text()).toBe('');
    });

    test('nested slot content', () => {
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
  });

  describe('props validators', () => {
    describe('row align validator', () => {
      it('valid align values', () => {
        const validator = rowProps.align.validator;
        expect(validator('start')).toBe(true);
        expect(validator('end')).toBe(true);
        expect(validator('center')).toBe(true);
        expect(validator('stretch')).toBe(true);
        expect(validator('baseline')).toBe(true);
        expect(validator('top')).toBe(true);
        expect(validator('middle')).toBe(true);
        expect(validator('bottom')).toBe(true);
      });

      it('invalid align values', () => {
        const validator = rowProps.align.validator;
        expect(validator('invalid')).toBe(false);
        expect(validator('left')).toBe(false);
        expect(validator('right')).toBe(false);
      });

      it('empty/null/undefined values', () => {
        const validator = rowProps.align.validator;
        expect(validator('')).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator(undefined)).toBe(true);
      });
    });

    describe('row justify validator', () => {
      it('valid justify values', () => {
        const validator = rowProps.justify.validator;
        expect(validator('start')).toBe(true);
        expect(validator('end')).toBe(true);
        expect(validator('center')).toBe(true);
        expect(validator('space-around')).toBe(true);
        expect(validator('space-between')).toBe(true);
      });

      it('invalid justify values', () => {
        const validator = rowProps.justify.validator;
        expect(validator('invalid')).toBe(false);
        expect(validator('left')).toBe(false);
        expect(validator('right')).toBe(false);
      });

      it('empty/null/undefined values', () => {
        const validator = rowProps.justify.validator;
        expect(validator('')).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator(undefined)).toBe(true);
      });
    });
  });

  describe('gutter variations', () => {
    it(':gutter with array [horizontal, vertical]', () => {
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
    });

    it(':gutter with responsive object', () => {
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
      const row = wrapper.find('.t-row');
      expect(row.exists()).toBe(true);
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
    });
  });

  describe('flex variations', () => {
    it(':flex with number', () => {
      const wrapper = mount(
        <Row>
          <Col flex={1}>
            <div>flex-1</div>
          </Col>
          <Col flex={2}>
            <div>flex-2</div>
          </Col>
        </Row>,
      );
      const cols = wrapper.findAll('.t-col');
      // Browser parses '1 1 0' as '1 1 0px'
      expect(getComputedStyle(cols[0].element).flex).toContain('1 1');
      expect(getComputedStyle(cols[1].element).flex).toContain('2 2');
    });

    it(':flex with pixel string', () => {
      const wrapper = mount(
        <Row>
          <Col flex="100px">
            <div>flex-100px</div>
          </Col>
        </Row>,
      );
      const col = wrapper.find('.t-col');
      expect(getComputedStyle(col.element).flex).toBe('0 0 100px');
    });

    it(':flex with percentage', () => {
      const wrapper = mount(
        <Row>
          <Col flex="50%">
            <div>flex-50%</div>
          </Col>
        </Row>,
      );
      const col = wrapper.find('.t-col');
      expect(getComputedStyle(col.element).flex).toBe('0 0 50%');
    });

    it(':flex with complex string', () => {
      const wrapper = mount(
        <Row>
          <Col flex="1 1 200px">
            <div>flex-complex</div>
          </Col>
        </Row>,
      );
      const col = wrapper.find('.t-col');
      expect(getComputedStyle(col.element).flex).toBe('1 1 200px');
    });

    it(':flex with auto', () => {
      const wrapper = mount(
        <Row>
          <Col flex="auto">
            <div>flex-auto</div>
          </Col>
        </Row>,
      );
      const col = wrapper.find('.t-col');
      expect(getComputedStyle(col.element).flex).toBe('auto');
    });
  });

  describe('responsive object variations', () => {
    it(':xxl responsive', () => {
      const wrapper = mount(() => (
        <Row>
          <Col xxl={4}></Col>
          <Col xxl={8}></Col>
        </Row>
      ));
      const cols = wrapper.findAll('.t-col');
      expect(cols[0].classes()).toContain('t-col-xxl-4');
      expect(cols[1].classes()).toContain('t-col-xxl-8');
    });

    it(':responsive with object containing offset, order, push, pull', () => {
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

  describe('Col without Row context', () => {
    it('Col without Row', () => {
      const wrapper = mount(() => (
        <Col span={12}>
          <div>standalone col</div>
        </Col>
      ));
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      expect(col.classes()).toContain('t-col-12');
    });

    it('Col without Row with flex', () => {
      const wrapper = mount(() => (
        <Col flex="auto">
          <div>standalone col with flex</div>
        </Col>
      ));
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      expect(getComputedStyle(col.element).flex).toBe('auto');
    });

    it('Col without Row no flex', () => {
      const wrapper = mount(() => <Col span={6}></Col>);
      const col = wrapper.find('.t-col');
      expect(col.exists()).toBe(true);
      // No flex, no rowContext gutter, so style should be minimal
      expect(col.classes()).toContain('t-col-6');
    });
  });

  describe('edge cases', () => {
    it('Row with undefined children', () => {
      const wrapper = mount(() => <Row>{undefined}</Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
    });

    it('Col with undefined children', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>{undefined}</Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
    });

    it('Row with null children', () => {
      const wrapper = mount(() => <Row>{null}</Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
    });

    it('Col with null children', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>{null}</Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
    });

    it('multiple flex values', () => {
      const wrapper = mount(() => (
        <Row>
          <Col flex="100px">fixed</Col>
          <Col flex="auto">auto</Col>
          <Col flex={1}>flex-1</Col>
        </Row>
      ));
      const cols = wrapper.findAll('.t-col');
      expect(cols.length).toBe(3);
      expect(getComputedStyle(cols[0].element).flex).toBe('0 0 100px');
      expect(getComputedStyle(cols[1].element).flex).toBe('auto');
      expect(getComputedStyle(cols[2].element).flex).toContain('1 1');
    });

    it('span 0', () => {
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

    it('Row with false as children', () => {
      const wrapper = mount(() => <Row>{false}</Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
    });

    it('Col with false as children', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>{false}</Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
    });

    it('Col with empty string as children', () => {
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>{''}</Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
    });

    it('Row with number 0 as children', () => {
      const wrapper = mount(() => <Row>{0}</Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
      expect(wrapper.find('.t-row').text()).toBe('0');
    });

    it('conditional rendering in Row', () => {
      const showContent = false;
      const wrapper = mount(() => <Row>{showContent && <Col span={12}>Content</Col>}</Row>);
      expect(wrapper.find('.t-row').exists()).toBe(true);
      expect(wrapper.findAll('.t-col').length).toBe(0);
    });

    it('conditional rendering in Col', () => {
      const showContent = false;
      const wrapper = mount(() => (
        <Row>
          <Col span={12}>{showContent && <div>Content</div>}</Col>
        </Row>
      ));
      expect(wrapper.find('.t-col').exists()).toBe(true);
    });
  });
});
