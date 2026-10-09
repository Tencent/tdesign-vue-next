import { describe, it } from 'vitest';
import ChatContent from '..';
import { expectPropsContract } from '../../test/helpers';

describe('ChatContent', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatContent', ChatContent));
  });
});
