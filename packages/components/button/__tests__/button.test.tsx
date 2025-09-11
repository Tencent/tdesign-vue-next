// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Button } from '@tdesign/components/button';

describe('Button Component', () => {
  it('props.block works fine', () => {
    // block default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-size-full-width')).toBeFalsy();
    // block = true
    const wrapper2 = mount(<Button block={true}>Text</Button>);
    expect(wrapper2.classes('t-size-full-width')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // block = false
    const wrapper3 = mount(<Button block={false}>Text</Button>);
    expect(wrapper3.classes('t-size-full-width')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.content works fine', () => {
    const wrapper = mount(<Button content={() => <span class="custom-node">TNode</span>}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.content works fine', () => {
    const wrapper = mount(<Button v-slots={{ content: () => <span class="custom-node">TNode</span> }}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.default works fine', () => {
    const wrapper = mount(<Button default={() => <span class="custom-node">TNode</span>}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('slots.default works fine', () => {
    const wrapper = mount(<Button v-slots={{ default: () => <span class="custom-node">TNode</span> }}></Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.disabled works fine', () => {
    // disabled default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<Button disabled={true}>Text</Button>);
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // disabled = false
    const wrapper3 = mount(<Button disabled={false}>Text</Button>);
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.ghost works fine', () => {
    // ghost default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-button--ghost')).toBeFalsy();
    // ghost = true
    const wrapper2 = mount(<Button ghost={true}>Text</Button>);
    expect(wrapper2.classes('t-button--ghost')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // ghost = false
    const wrapper3 = mount(<Button ghost={false}>Text</Button>);
    expect(wrapper3.classes('t-button--ghost')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.href works fine', () => {
    const wrapper = mount(<Button href={'https://tdesign.tencent.com/'}>Text</Button>);
    expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('props.icon works fine', () => {
    const wrapper = mount(<Button icon={() => <span class="custom-node">TNode</span>}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.icon works fine', () => {
    const wrapper = mount(<Button v-slots={{ icon: () => <span class="custom-node">TNode</span> }}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.loading works fine', () => {
    // loading default value is false
    const wrapper1 = mount(<Button>Text</Button>);
    expect(wrapper1.classes('t-is-loading')).toBeFalsy();
    // loading = true
    const wrapper2 = mount(<Button loading={true}>Text</Button>);
    expect(wrapper2.classes('t-is-loading')).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
    // loading = false
    const wrapper3 = mount(<Button loading={false}>Text</Button>);
    expect(wrapper3.classes('t-is-loading')).toBeFalsy();
    expect(wrapper3.element).toMatchSnapshot();
  });

  it('props.loading: Button contains element `.t-loading`', () => {
    // loading default value is false
    const wrapper = mount(<Button>Text</Button>);
    expect(wrapper.find('.t-loading').exists()).toBeFalsy();
    // loading = false
    const wrapper1 = mount(<Button loading={false}>Text</Button>);
    expect(wrapper1.find('.t-loading').exists()).toBeFalsy();
    // loading = true
    const wrapper2 = mount(<Button loading={true}>Text</Button>);
    expect(wrapper2.find('.t-loading').exists()).toBeTruthy();
    expect(wrapper2.element).toMatchSnapshot();
  });

  const shapeClassNameList = [
    't-button--shape-rectangle',
    't-button--shape-square',
    't-button--shape-round',
    't-button--shape-circle',
  ];
  ['rectangle', 'square', 'round', 'circle'].forEach((item, index) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = mount(<Button shape={item}>Text</Button>);
      if (typeof shapeClassNameList[index] === 'string') {
        expect(wrapper.classes(shapeClassNameList[index])).toBeTruthy();
      } else if (typeof shapeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(shapeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const sizeClassNameList = ['t-size-s', null, 't-size-l']; // medium has no class as it's default
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<Button size={item}>Text</Button>);
      if (sizeClassNameList[index]) {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else {
        // medium size should not have any size class
        expect(wrapper.classes('t-size-s')).toBeFalsy();
        expect(wrapper.classes('t-size-m')).toBeFalsy();
        expect(wrapper.classes('t-size-l')).toBeFalsy();
      }
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount(<Button suffix={() => <span class="custom-node">TNode</span>}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount(<Button v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}>Text</Button>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  const tagExpectedDom = ['button', 'a', 'div'];
  ['button', 'a', 'div'].forEach((item, index) => {
    it(`props.tag is equal to ${item}`, () => {
      const wrapper = mount(<Button tag={item}>Text</Button>);
      expect(wrapper.find(tagExpectedDom[index]).exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  ['default', 'primary', 'danger', 'warning', 'success'].forEach((item) => {
    it(`props.theme is equal to ${item}`, () => {
      const wrapper = mount(<Button theme={item}>Text</Button>);
      expect(wrapper.classes(`t-button--theme-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  const attributeValues = ['submit', 'reset', 'button'];
  ['submit', 'reset', 'button'].forEach((item, index) => {
    it(`props.type is equal to ${item}`, () => {
      const wrapper = mount(<Button type={item}></Button>);
      expect(wrapper.attributes('type')).toBe(attributeValues[index]);
    });
  });

  ['base', 'outline', 'dashed', 'text'].forEach((item) => {
    it(`props.variant is equal to ${item}`, () => {
      const wrapper = mount(<Button variant={item}>Text</Button>);
      expect(wrapper.classes(`t-button--variant-${item}`)).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('Button Event: click', async () => {
    const fn = vi.fn();
    const wrapper = mount(<Button onClick={fn}></Button>);
    wrapper.findComponent(Button).trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].stopPropagation).toBeTruthy();
    expect(fn.mock.calls[0][0].type).toBe('click');
  });

  // Enhanced test cases for better coverage
  describe('Enhanced Button Tests', () => {
    it('props.loadingProps works fine', () => {
      const loadingProps = { text: 'Loading...', size: 'small' };
      const wrapper = mount(
        <Button loading={true} loadingProps={loadingProps}>
          Text
        </Button>,
      );
      expect(wrapper.classes('t-is-loading')).toBeTruthy();
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('props.form works fine', () => {
      const wrapper = mount(<Button form="test-form">Text</Button>);
      expect(wrapper.attributes('form')).toBe('test-form');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('icon-only button scenario', () => {
      const wrapper = mount(<Button icon={() => <span class="test-icon">Icon</span>}></Button>);
      expect(wrapper.find('.test-icon').exists()).toBeTruthy();
      expect(wrapper.classes('t-button--icon-only')).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('mergeTheme logic works correctly', () => {
      // When theme is specified, it should use the theme
      const wrapper1 = mount(<Button theme="primary">Text</Button>);
      expect(wrapper1.classes('t-button--theme-primary')).toBeTruthy();

      // When variant is base and no theme, should use primary
      const wrapper2 = mount(<Button variant="base">Text</Button>);
      expect(wrapper2.classes('t-button--theme-primary')).toBeTruthy();

      // When variant is not base and no theme, should use default
      const wrapper3 = mount(<Button variant="outline">Text</Button>);
      expect(wrapper3.classes('t-button--theme-default')).toBeTruthy();
    });

    it('tabindex accessibility feature', () => {
      // Normal button should have tabindex="0"
      const wrapper1 = mount(<Button>Text</Button>);
      expect(wrapper1.attributes('tabindex')).toBe('0');

      // Disabled button should not have tabindex
      const wrapper2 = mount(<Button disabled={true}>Text</Button>);
      expect(wrapper2.attributes('tabindex')).toBeUndefined();

      // Loading button should not have tabindex
      const wrapper3 = mount(<Button loading={true}>Text</Button>);
      expect(wrapper3.attributes('tabindex')).toBeUndefined();
    });

    it('combination of loading and disabled', () => {
      const wrapper = mount(
        <Button loading={true} disabled={true}>
          Text
        </Button>,
      );
      expect(wrapper.classes('t-is-loading')).toBeTruthy();
      expect(wrapper.classes('t-is-disabled')).toBeTruthy();
      expect(wrapper.attributes('disabled')).toBeDefined();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('href with automatic tag detection', () => {
      // When href is provided, should render as 'a' tag
      const wrapper = mount(<Button href="https://tdesign.tencent.com/">Link Button</Button>);
      expect(wrapper.find('a').exists()).toBeTruthy();
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com/');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('button with both icon and suffix', () => {
      const wrapper = mount(
        <Button icon={() => <span class="test-icon">Icon</span>} suffix={() => <span class="test-suffix">Suffix</span>}>
          Text Content
        </Button>,
      );
      expect(wrapper.find('.test-icon').exists()).toBeTruthy();
      expect(wrapper.find('.test-suffix').exists()).toBeTruthy();
      expect(wrapper.find('.t-button__text').exists()).toBeTruthy();
      expect(wrapper.find('.t-button__suffix').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('button class composition', () => {
      const wrapper = mount(
        <Button variant="outline" theme="primary" shape="round" size="large" ghost={true} block={true}>
          Text
        </Button>,
      );
      expect(wrapper.classes()).toContain('t-button');
      expect(wrapper.classes()).toContain('t-button--variant-outline');
      expect(wrapper.classes()).toContain('t-button--theme-primary');
      expect(wrapper.classes()).toContain('t-button--shape-round');
      expect(wrapper.classes()).toContain('t-size-l');
      expect(wrapper.classes()).toContain('t-button--ghost');
      expect(wrapper.classes()).toContain('t-size-full-width');
    });

    it('button disabled state prevents click events', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <Button disabled={true} onClick={fn}>
          Disabled Button
        </Button>,
      );

      await wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('loading state shows loading icon and prevents clicks', async () => {
      const fn = vi.fn();
      const wrapper = mount(
        <Button loading={true} onClick={fn}>
          Loading Button
        </Button>,
      );

      expect(wrapper.find('.t-loading').exists()).toBeTruthy();
      expect(wrapper.attributes('disabled')).toBeDefined();

      await wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
    });

    it('all size variants have correct classes', () => {
      const sizeConfigs = [
        { size: 'small', expectClass: 't-size-s' },
        { size: 'medium', expectClass: null }, // medium is default, no additional class
        { size: 'large', expectClass: 't-size-l' },
      ];

      sizeConfigs.forEach(({ size, expectClass }) => {
        const wrapper = mount(<Button size={size}>Text</Button>);
        if (expectClass) {
          expect(wrapper.classes()).toContain(expectClass);
        } else {
          // For medium size, ensure no size classes are applied
          expect(wrapper.classes().some((cls) => cls.match(/t-size-[sml]/))).toBeFalsy();
        }
      });
    });

    it('button content priority: default slot > content prop', () => {
      const wrapper = mount(<Button content="Content Prop Text">Default Slot Text</Button>);
      expect(wrapper.text()).toContain('Default Slot Text');
      expect(wrapper.text()).not.toContain('Content Prop Text');
    });

    it('custom tag with all attributes', () => {
      const wrapper = mount(
        <Button tag="div" type="button" disabled={true} href="https://example.com" form="test-form">
          Div Button
        </Button>,
      );
      expect(wrapper.find('div').exists()).toBeTruthy();
      expect(wrapper.attributes('type')).toBe('button');
      expect(wrapper.attributes('disabled')).toBeDefined();
      expect(wrapper.attributes('href')).toBe('https://example.com');
      expect(wrapper.attributes('form')).toBe('test-form');
    });

    it('button without any content', () => {
      const wrapper = mount(<Button></Button>);
      expect(wrapper.text()).toBe('');
      expect(wrapper.classes()).toContain('t-button');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('button with all boolean props false', () => {
      const wrapper = mount(
        <Button block={false} disabled={false} ghost={false} loading={false}>
          Text
        </Button>,
      );
      expect(wrapper.classes('t-size-full-width')).toBeFalsy();
      expect(wrapper.classes('t-is-disabled')).toBeFalsy();
      expect(wrapper.classes('t-button--ghost')).toBeFalsy();
      expect(wrapper.classes('t-is-loading')).toBeFalsy();
    });

    it('button with multiple content sources priority', () => {
      // Test that slots override props
      const wrapper = mount(
        <Button
          content="prop-content"
          icon={() => <span class="prop-icon">PropIcon</span>}
          suffix={() => <span class="prop-suffix">PropSuffix</span>}
          v-slots={{
            default: () => 'slot-content',
            icon: () => <span class="slot-icon">SlotIcon</span>,
            suffix: () => <span class="slot-suffix">SlotSuffix</span>,
          }}
        ></Button>,
      );

      // Slots should take precedence
      expect(wrapper.text()).toContain('slot-content');
      expect(wrapper.find('.slot-icon').exists()).toBeTruthy();
      expect(wrapper.find('.slot-suffix').exists()).toBeTruthy();

      // Props should not be rendered when slots exist
      expect(wrapper.text()).not.toContain('prop-content');
      expect(wrapper.find('.prop-icon').exists()).toBeFalsy();
      expect(wrapper.find('.prop-suffix').exists()).toBeFalsy();
    });
  });
});
