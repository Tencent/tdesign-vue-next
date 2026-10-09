import { describe, it } from 'vitest';
import ChatInput from '..';
import { expectEmitsContract, expectPropsContract } from '../../test/helpers';

describe('ChatInput', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatInput', ChatInput));
  });
  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatInput', ChatInput));
  });
});
