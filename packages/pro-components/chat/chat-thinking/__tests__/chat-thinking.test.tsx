import { describe, it } from 'vitest';
import ChatThinking from '..';
import { expectPropsContract } from '../../test/helpers';

describe('ChatThinking', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatThinking', ChatThinking));
  });
});
