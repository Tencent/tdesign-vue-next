import { expect } from 'vitest';
import { getFormItemClassName, isValueEmpty, validateOneRule, validate } from '@tdesign/components/form/utils';
import { FormRule } from '@tdesign/components/form/type';

describe('Form utils', () => {
  describe('form-item', () => {
    describe('getFormItemClassName', () => {
      it('null/undefined', () => {
        expect(getFormItemClassName('form', '')).toBe('');
        expect(getFormItemClassName('form', undefined)).toBe('');
        expect(getFormItemClassName('form', null)).toBe('');
      });

      it('correct input', () => {
        expect(getFormItemClassName('form', 'username')).toBe('form__username');
        expect(getFormItemClassName('t-form', 'password')).toBe('t-form__password');
      });

      it('special symbol', () => {
        expect(getFormItemClassName('form', 'user[name]')).toBe('form__user_name_');
        expect(getFormItemClassName('form', 'user[0].name')).toBe('form__user_0_name');
        expect(getFormItemClassName('form', 'user.info[0].name')).toBe('form__user_info_0_name');
      });
    });
  });

  describe('form-model', () => {
    describe('isValueEmpty', () => {
      it('null', () => {
        expect(isValueEmpty('')).toBe(true);
        expect(isValueEmpty(null)).toBe(true);
        expect(isValueEmpty(undefined)).toBe(true);
        expect(isValueEmpty({})).toBe(true);
        expect(isValueEmpty([])).toBe(true);
      });

      it('not null', () => {
        expect(isValueEmpty(0)).toBe(false);
        expect(isValueEmpty(false)).toBe(false);
        expect(isValueEmpty('text')).toBe(false);
        expect(isValueEmpty({ key: 'value' })).toBe(false);
        expect(isValueEmpty([1, 2, 3])).toBe(false);
        expect(isValueEmpty(new Date())).toBe(false);
      });
    });

    describe('validateOneRule', () => {
      it('should pass when optional field is empty', async () => {
        const rule = { required: false, message: '必填' };
        const result = await validateOneRule('', rule);
        expect(result.result).toBe(true);
      });

      it('required', async () => {
        const rule = { required: true, message: '必填' };
        expect((await validateOneRule('', rule)).result).toBe(false);
        expect((await validateOneRule('text', rule)).result).toBe(true);
      });

      it('whitespace', async () => {
        const rule = { whitespace: true, message: '空白字符' };
        expect((await validateOneRule('   ', rule)).result).toBe(false);
        expect((await validateOneRule('', rule)).result).toBe(true);
        expect((await validateOneRule(' text ', rule)).result).toBe(true);
        expect((await validateOneRule('text', rule)).result).toBe(true);
      });

      it('boolean', async () => {
        const rule = { boolean: true, message: '必须是布尔值' };
        expect((await validateOneRule(true, rule)).result).toBe(true);
        expect((await validateOneRule(false, rule)).result).toBe(true);
        expect((await validateOneRule('true', rule)).result).toBe(false);
        expect((await validateOneRule(1, rule)).result).toBe(false);
        // TODO ??  似乎不符合预期，这里应该为 false???
        expect((await validateOneRule(null, rule)).result).toBe(true);
      });

      it('number', async () => {
        const rule = { number: true, message: '必须是数字' };
        expect((await validateOneRule(123, rule)).result).toBe(true);
        expect((await validateOneRule('123', rule)).result).toBe(false);
      });

      it('email', async () => {
        const rule = { email: true, message: '邮箱格式错误' };
        expect((await validateOneRule('test@example.com', rule)).result).toBe(true);
        expect((await validateOneRule('invalid-email', rule)).result).toBe(false);
      });

      it('enum', async () => {
        const rule = { enum: ['red', 'green', 'blue'], message: '必须是枚举值之一' };
        expect((await validateOneRule('red', rule)).result).toBe(true);
        expect((await validateOneRule('green', rule)).result).toBe(true);
        expect((await validateOneRule('yellow', rule)).result).toBe(false);
        // TODO 似乎不符合预期，这里应该为 false??? 同上，如
        /** 原因在这里
            if (!rule.required && isValueEmpty(value) && !rule.validator) {
              return validateResult;
            }
           */
        // expect((await validateOneRule('', rule)).result).toBe(false);
        // expect((await validateOneRule(null, rule)).result).toBe(false);
      });

      it('idcard', async () => {
        const rule = { idcard: true, message: '身份证号格式错误' };
        expect((await validateOneRule('11010519491231002X', rule)).result).toBe(true);
        expect((await validateOneRule('110105491231002', rule)).result).toBe(true);
        expect((await validateOneRule('11010519491231002', rule)).result).toBe(false);
        expect((await validateOneRule('A1010519491231002X', rule)).result).toBe(false);
      });

      it('telnumber', async () => {
        const rule = { telnumber: true, message: '手机号格式错误' };
        expect((await validateOneRule('13800138000', rule)).result).toBe(true);
        expect((await validateOneRule('15912345678', rule)).result).toBe(true);
        expect((await validateOneRule('12345678901', rule)).result).toBe(false);
        expect((await validateOneRule('1380013800', rule)).result).toBe(false);
        expect((await validateOneRule('138001380000', rule)).result).toBe(false);
        expect((await validateOneRule('1380013800a', rule)).result).toBe(false);
      });

      it('url', async () => {
        const rule = { url: true, message: 'URL格式错误' };
        expect((await validateOneRule('https://example.com', rule)).result).toBe(true);
        expect((await validateOneRule('not-a-url', rule)).result).toBe(false);
      });

      it('length', async () => {
        const rule = { len: 5, message: '长度必须为5' };
        expect((await validateOneRule('12345', rule)).result).toBe(true);
        expect((await validateOneRule('1234', rule)).result).toBe(false);
      });

      it('min', async () => {
        const rule = { min: 10, message: '不能小于10' };
        expect((await validateOneRule(15, rule)).result).toBe(true);
        expect((await validateOneRule(5, rule)).result).toBe(false);
        expect((await validateOneRule('15个字符的字符串', rule)).result).toBe(true);
      });

      it('custom validator', async () => {
        const customValidatorBoolean = (val: any) => val === 'custom';
        const rule1 = { validator: customValidatorBoolean, message: '自定义校验失败' };
        expect((await validateOneRule('custom', rule1)).result).toBe(true);
        expect((await validateOneRule('other', rule1)).result).toBe(false);

        const result = {
          result: true,
          message: 'nice',
          type: 'error',
        } as const;
        const customValidatorObject = (val: any) => result;
        const rule2 = { validator: customValidatorObject, message: '自定义校验失败' };
        const validateResult = await validateOneRule('custom', rule2);
        expect(validateResult.result).toBe(result.result);
        expect(validateResult.message).toBe(result.message);
        expect(validateResult.type).toBe(result.type);
      });
    });

    describe('validate', () => {
      it('rules', async () => {
        const rules: FormRule[] = [
          { required: true, message: '必填' },
          { min: 3, message: '不能小于3' },
          { max: 10, message: '不能大于10' },
        ];

        const results1 = await validate('', rules);
        expect(results1[0].result).toBe(false); // 必填失败

        const results2 = await validate('12', rules);
        expect(results2[0].result).toBe(true); // 必填通过
        expect(results2[1].result).toBe(false); // 最小长度失败

        const results3 = await validate('12345', rules);
        expect(results3.every((r) => r.result)).toBe(true); // 全部通过
      });

      it('response', async () => {
        const rules: FormRule[] = [
          { required: true, message: '必填' },
          { pattern: /^[A-Z]/, message: '必须大写字母开头' },
        ];

        const results = await validate('abc', rules);
        expect(results.length).toBe(2);
        expect(results[0].result).toBe(true);
        expect(results[1].result).toBe(false);
      });
    });
  });
});
