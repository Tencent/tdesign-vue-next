import { describe, it } from 'vitest';
import ChatThinking from '..';
import { expectEmitsContract, expectPropsContract } from '../../test/helpers';

describe('ChatThinking', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatThinking', ChatThinking));
  });
  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatThinking', ChatThinking));
  });
});
