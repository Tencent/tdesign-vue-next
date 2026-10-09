import { describe, it } from 'vitest';
import ChatContent from '..';
import { expectEmitsContract, expectPropsContract } from '../../test/helpers';

describe('ChatContent', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatContent', ChatContent));
  });
  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatContent', ChatContent));
  });
});
