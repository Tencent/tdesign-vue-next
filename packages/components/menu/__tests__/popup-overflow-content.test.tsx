import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import PopupOverflowContent from '../components/popup-overflow-content';

describe('PopupOverflowContent', () => {
  describe('props', () => {
    it(':foldIndex[number]', () => {
      const wrapper = mount(PopupOverflowContent, {
        props: { foldIndex: 2 },
        slots: {
          default: () => [
            <div class="t-menu__item">First</div>,
            <div>
              <div class="t-submenu">Second</div>
            </div>,
            <div class="t-menu__item">Third</div>,
          ],
        },
      });
      const items = wrapper.findAll('.t-menu__item, .t-submenu');

      expect(items.map((item) => item.text())).toEqual(['First', 'Second', 'Third']);
      expect(items.map((item) => item.attributes('style'))).toEqual(['display: none;', 'display: none;', undefined]);
    });

    it(':foldIndex[number] (reactive)', async () => {
      const wrapper = mount(PopupOverflowContent, {
        props: { foldIndex: 2 },
        slots: {
          default: () => [<div class="t-menu__item">First</div>, <div class="t-menu__item">Second</div>],
        },
      });

      await wrapper.setProps({ foldIndex: 1 });

      expect(wrapper.findAll('.t-menu__item').map((item) => item.attributes('style'))).toEqual(['display: none;', '']);
    });

    it(':default[slot] (non-HTML/depth limit)', () => {
      const wrapper = mount(PopupOverflowContent, {
        props: { foldIndex: 2 },
        slots: {
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
        },
      });

      expect(wrapper.get('[data-testid="svg"]').element).toBeInstanceOf(SVGElement);
      expect(wrapper.get('[data-testid="too-deep"]').attributes('style')).toBeUndefined();
    });

    it(':default[undefined]', () => {
      const wrapper = mount(PopupOverflowContent, { props: { foldIndex: 0 } });

      expect(wrapper.element.tagName).toBe('DIV');
      expect(wrapper.element.children).toHaveLength(0);
    });
  });
});
