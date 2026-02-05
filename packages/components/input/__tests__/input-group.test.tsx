// @ts-nocheck
import { getInputGroupDefaultMount } from './mount';

describe('InputGroup Component', () => {
  describe('props.separate', () => {
    it('props.separate default value is false', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.classes('t-input-group--separate')).toBeFalsy();
    });

    it('props.separate = true', () => {
      const wrapper = getInputGroupDefaultMount({ separate: true });
      expect(wrapper.classes('t-input-group--separate')).toBeTruthy();
    });

    it('props.separate = false', () => {
      const wrapper = getInputGroupDefaultMount({ separate: false });
      expect(wrapper.classes('t-input-group--separate')).toBeFalsy();
    });
  });

  describe('basic rendering', () => {
    it('should render InputGroup with correct class', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.classes('t-input-group')).toBeTruthy();
    });

    it('should render multiple inputs inside InputGroup', () => {
      const wrapper = getInputGroupDefaultMount();
      const inputs = wrapper.findAll('.t-input');
      expect(inputs.length).toBe(2);
    });
  });

  describe('slots', () => {
    it('default slot works fine', () => {
      const wrapper = getInputGroupDefaultMount();
      expect(wrapper.findAll('input').length).toBe(2);
    });
  });
});
