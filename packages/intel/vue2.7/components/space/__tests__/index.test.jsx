import { mount } from '@vue/test-utils';
import Divider from '@/src/divider/index.ts';
import Space from '@/src/space/index.ts';

describe('Space', () => {
  describe(':props', () => {
    it('direction and size', () => {
      const sizeMap = new Map(
        Object.entries({
          small: '8px',
          medium: '16px',
          large: '24px',
          '100pt': '100pt',
        }),
      );
      sizeMap.set(0, '0px');
      sizeMap.set(123.456, '123.456px');

      ['vertical', 'horizontal'].forEach((direction) => {
        sizeMap.forEach((value, key) => {
          const wrapper = mount({
            render() {
              return (
                <Space direction={direction} size={key}>
                  <div>child1</div>
                  <div>child2</div>
                </Space>
              );
            },
          });
          expect(wrapper.classes()).toContain(`t-space-${direction}`);
          expect(wrapper.element.style.gap).toEqual(value);
        });
      });
    });

    it('align', () => {
      ['start', 'end', 'center', 'baseline'].forEach((align) => {
        const wrapper = mount({
          render() {
            return (
              <Space align={align}>
                <div></div>
              </Space>
            );
          },
        });
        expect(wrapper.classes()).toContain(`t-space-align-${align}`);
      });
    });

    it('break line', () => {
      const wrapper = mount({
        render() {
          return (
            <Space breakLine={true}>
              <div></div>
            </Space>
          );
        },
      });
      expect(wrapper.element.classList.contains('t-space--break-line')).toBeTruthy();
    });

    it('separator', () => {
      const wrapper = mount({
        render() {
          return (
            <Space align="center" separator={() => <Divider layout="vertical" />}>
              <div>child1</div>
              <div>child2</div>
            </Space>
          );
        },
      });
      expect(wrapper.findComponent(Divider).exists());
      expect(wrapper.find('.t-space-item-separator').exists());
    });

    it('slot', () => {
      const wrapper = mount({
        render() {
          return (
            <Space align="center">
              <div slot="separator">
                <Divider layout="vertical" />
              </div>
              <div>child1</div>
              <div>child2</div>
            </Space>
          );
        },
      });
      expect(wrapper.findComponent(Divider).exists());
      expect(wrapper.find('.t-space-item-separator').exists());
    });
  });
});
