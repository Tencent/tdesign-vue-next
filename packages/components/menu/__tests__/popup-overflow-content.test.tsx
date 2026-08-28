import { afterEach, describe, expect, it } from 'vitest';

import { cleanupMenuMounts, mountPopupOverflowContent } from './mount';

afterEach(() => {
  cleanupMenuMounts();
});

describe('PopupOverflowContent', () => {
  describe('props', () => {
    it(':foldIndex[number]', () => {
      const wrapper = mountPopupOverflowContent(2, {
        default: () => [
          <div class="t-menu__item">First</div>,
          <div>
            <div class="t-submenu">Second</div>
          </div>,
          <div class="t-menu__item">Third</div>,
        ],
      });
      const items = wrapper.findAll('.t-menu__item, .t-submenu');

      expect(items.map((item) => item.text())).toEqual(['First', 'Second', 'Third']);
      expect(items.map((item) => item.attributes('style'))).toEqual(['display: none;', 'display: none;', undefined]);
    });

    it(':foldIndex[number] (reactive)', async () => {
      const wrapper = mountPopupOverflowContent(2, {
        default: () => [<div class="t-menu__item">First</div>, <div class="t-menu__item">Second</div>],
      });

      await wrapper.setProps({ foldIndex: 1 });

      expect(wrapper.findAll('.t-menu__item').map((item) => item.attributes('style'))).toEqual(['display: none;', '']);
    });

    it(':default[slot] (non-HTML/depth limit)', () => {
      const wrapper = mountPopupOverflowContent(2, {
        default: () => (
          <div>
            <svg data-testid="svg">
              <circle />
            </svg>
            <div>
              <div>
                <div>
                  <div>
                    <div class="t-menu__item" data-testid="too-deep">
                      Too deep
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      });

      expect(wrapper.get('[data-testid="svg"]').element).toBeInstanceOf(SVGElement);
      expect(wrapper.get('[data-testid="too-deep"]').attributes('style')).toBeUndefined();
    });

    it(':default[undefined]', () => {
      const wrapper = mountPopupOverflowContent(0);

      expect(wrapper.element.tagName).toBe('DIV');
      expect(wrapper.element.children).toHaveLength(0);
    });
  });
});
