import { useBaseClassName } from '@tdesign/components/color-picker/hooks';
import { usePrefixClass } from '@tdesign/shared-hooks';
import { expect } from 'vitest';

const BASE_COMPONENT_NAME = 'color-picker';
const baseClassName = usePrefixClass(BASE_COMPONENT_NAME);

describe('Color hooks', () => {
  describe('useBaseClassName', () => {
    it('base', () => {
      const result = useBaseClassName();
      expect(result.value).toBe(baseClassName.value);
    });

    it('suffix', () => {
      const result = useBaseClassName('foo');
      expect(result.value).toBe(`${baseClassName.value}-foo`);
    });
  });
});
