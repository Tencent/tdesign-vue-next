import { expect } from 'vitest';
import baseline from '../api-baseline.json';
import { acceptsExistingPropTypes, contractOf } from './contract';

type ComponentName = keyof typeof baseline.props;

export const expectPropsContract = (name: ComponentName, component: any) => {
  const actual = contractOf(component).props;
  Object.entries(baseline.props[name]).forEach(([prop, expected]: [string, any]) => {
    const message = `${name}.${prop} 既有契约发生变化`;
    expect(actual[prop], message).toBeDefined();
    expect(acceptsExistingPropTypes(actual[prop].type, expected.type), message).toBe(true);
    expect(actual[prop].default, message).toEqual(expected.default);
    expect(actual[prop].required && !expected.required, message).toBe(false);
  });
};

export const expectEmitsContract = (name: ComponentName, component: any) => {
  expect(contractOf(component).emits).toEqual(expect.arrayContaining(baseline.emits[name]));
};
