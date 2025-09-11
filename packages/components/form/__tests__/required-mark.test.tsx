import { mount } from '@vue/test-utils';
import { Form, FormItem, Input } from '../../../components';

describe('Form requiredMark behavior', () => {
  it('should only show required mark on required fields when form requiredMark is true', () => {
    const rules = {
      requiredField: [{ required: true, message: 'This field is required' }],
      // optionalField has no rules
    };

    const formData = {
      requiredField: '',
      optionalField: '',
    };

    const wrapper = mount(
      <Form rules={rules} data={formData} requiredMark={true}>
        <FormItem label="Required Field" name="requiredField">
          <Input v-model={formData.requiredField} />
        </FormItem>
        <FormItem label="Optional Field" name="optionalField">
          <Input v-model={formData.optionalField} />
        </FormItem>
      </Form>,
    );

    // Find all form labels
    const labels = wrapper.findAll('.t-form__label');

    // First label should have required mark (has required rules)
    expect(labels[0].classes()).toContain('t-form__label--required');

    // Second label should NOT have required mark (no required rules)
    expect(labels[1].classes()).not.toContain('t-form__label--required');
  });

  it('should not show required mark on any field when form requiredMark is false', () => {
    const rules = {
      requiredField: [{ required: true, message: 'This field is required' }],
    };

    const formData = {
      requiredField: '',
      optionalField: '',
    };

    const wrapper = mount(
      <Form rules={rules} data={formData} requiredMark={false}>
        <FormItem label="Required Field" name="requiredField">
          <Input v-model={formData.requiredField} />
        </FormItem>
        <FormItem label="Optional Field" name="optionalField">
          <Input v-model={formData.optionalField} />
        </FormItem>
      </Form>,
    );

    // Find all form labels
    const labels = wrapper.findAll('.t-form__label');

    // No labels should have required mark when requiredMark is false
    labels.forEach((label) => {
      expect(label.classes()).not.toContain('t-form__label--required');
    });
  });

  it('should show required mark only on required fields when form requiredMark is undefined', () => {
    const rules = {
      requiredField: [{ required: true, message: 'This field is required' }],
    };

    const formData = {
      requiredField: '',
      optionalField: '',
    };

    const wrapper = mount(
      <Form rules={rules} data={formData}>
        <FormItem label="Required Field" name="requiredField">
          <Input v-model={formData.requiredField} />
        </FormItem>
        <FormItem label="Optional Field" name="optionalField">
          <Input v-model={formData.optionalField} />
        </FormItem>
      </Form>,
    );

    // Find all form labels
    const labels = wrapper.findAll('.t-form__label');

    // First label should have required mark (has required rules)
    expect(labels[0].classes()).toContain('t-form__label--required');

    // Second label should NOT have required mark (no required rules)
    expect(labels[1].classes()).not.toContain('t-form__label--required');
  });

  it('should allow FormItem to override Form requiredMark setting', () => {
    const rules = {
      requiredField: [{ required: true, message: 'This field is required' }],
    };

    const formData = {
      requiredField: '',
    };

    const wrapper = mount(
      <Form rules={rules} data={formData} requiredMark={true}>
        <FormItem label="Required Field" name="requiredField" requiredMark={false}>
          <Input v-model={formData.requiredField} />
        </FormItem>
      </Form>,
    );

    // FormItem requiredMark=false should override Form requiredMark=true
    const label = wrapper.find('.t-form__label');
    expect(label.classes()).not.toContain('t-form__label--required');
  });
});
