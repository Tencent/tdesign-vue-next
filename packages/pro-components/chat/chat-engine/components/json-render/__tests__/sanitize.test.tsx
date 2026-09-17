/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { sanitizeProps } from '@tdesign/shared-utils';
import { JsonRenderDataStore, provideJsonRenderData } from '../context';
import { JsonRenderButton, withA2UIBinding } from '../registry';

describe('sanitizeProps', () => {
  it('blocks dangerous prop and URL keys regardless of casing', () => {
    const result = sanitizeProps({
      srcDoc: '<script>alert(1)</script>',
      INNERHTML: '<img src=x onerror=alert(1)>',
      HREF: 'javascript:alert(1)',
      title: 'safe',
    });

    expect(result).toEqual({ title: 'safe' });
  });

  it('blocks prototype-related keys without changing the result prototype', () => {
    const props = JSON.parse(
      '{"__proto__":{"polluted":true},"prototype":{"polluted":true},"constructor":{"polluted":true},"title":"safe"}',
    );
    const result = sanitizeProps(props);

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect((result as Record<string, unknown>).polluted).toBeUndefined();
    expect(result).toEqual({ title: 'safe' });
  });

  it('drops non-function event props and preserves function handlers regardless of casing', () => {
    const onInput = vi.fn();
    const result = sanitizeProps({ onClick: 'submit', ONCHANGE: 'change', OnInput: onInput });

    expect(result).toEqual({ OnInput: onInput });
  });
});

describe('json-render handler safety', () => {
  it('does not invoke a non-function Button onClick prop', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          provideJsonRenderData(new JsonRenderDataStore());
          return () =>
            h(JsonRenderButton, {
              element: { type: 'Button', props: { label: 'Submit', onClick: 'submit' } } as any,
            });
        },
      }),
    );

    await expect(wrapper.find('button').trigger('click')).resolves.toBeUndefined();
    wrapper.unmount();
  });

  it('preserves a valid Button onClick handler', async () => {
    const onClick = vi.fn();
    const wrapper = mount(
      defineComponent({
        setup() {
          provideJsonRenderData(new JsonRenderDataStore());
          return () =>
            h(JsonRenderButton, {
              element: { type: 'Button', props: { label: 'Submit', onClick } } as any,
            });
        },
      }),
    );

    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
    wrapper.unmount();
  });

  it('does not invoke a non-function custom action trigger', async () => {
    const WrappedComponent = defineComponent({
      props: { trigger: Function },
      setup: (props) => () => h('button', { onClick: () => props.trigger?.() }, 'Trigger'),
    });
    const BoundComponent = withA2UIBinding(WrappedComponent, {
      supportsAction: true,
      actionTrigger: 'trigger',
    });
    const wrapper = mount(
      defineComponent({
        setup() {
          provideJsonRenderData(new JsonRenderDataStore());
          return () =>
            h(BoundComponent, {
              element: {
                type: 'Custom',
                props: { trigger: 'not-a-function', action: { action: 'submit' } },
              } as any,
            });
        },
      }),
    );

    await expect(wrapper.find('button').trigger('click')).resolves.toBeUndefined();
    wrapper.unmount();
  });
});
