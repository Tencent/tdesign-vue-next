import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { vi } from 'vitest';
import Popup from '../../popup/index';
import Dropdown from '../dropdown';

// Popup stub，保证内容插槽本地渲染，避免 Teleport 导致的空 wrapper
const popupStub = {
  name: 'TPopup',
  emits: ['visible-change'],
  props: ['visible'],
  template: '<div class="popup-stub"><slot name="content" /></div>',
};

describe('Dropdown handlers coverage', () => {
  let querySpy: ReturnType<typeof vi.spyOn>;
  let getStyleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    querySpy = vi.spyOn(document, 'querySelector').mockReturnValue({ scrollHeight: 20 } as any);
    getStyleSpy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({ height: '0' } as any);
  });

  afterEach(() => {
    querySpy?.mockRestore();
    getStyleSpy?.mockRestore();
    vi.useRealTimers();
  });
  it('manualCloseTimeout defaults to 160ms when delay is undefined', async () => {
    const onVisible = vi.fn();
    const onVisibleKebab = vi.fn();

    const wrapper = mount(Dropdown, {
      props: {
        hideAfterItemClick: true,
        popupProps: {
          // delay 未设置，命中默认 160 分支
          onVisibleChange: onVisible,
          // @ts-ignore
          'on-visible-change': onVisibleKebab,
        },
        options: [{ content: 'A', value: 'a' }],
      },
      slots: { default: () => <button>Trigger</button> },
      global: { stubs: { TPopup: popupStub } },
    });

    // 打开以渲染内容
    await nextTick();

    // 触发菜单点击（直接点击渲染的下拉项）
    const li = wrapper.find('.t-dropdown__item');
    await li.trigger('click');

    vi.useFakeTimers();
    vi.advanceTimersByTime(160);
    await nextTick();

    expect(onVisible).toHaveBeenCalledWith(false, expect.any(Object));
    expect(onVisibleKebab).toHaveBeenCalledWith(false, expect.any(Object));
    vi.useRealTimers();
  });

  it('calls props.onClick when hideAfterItemClick=true', async () => {
    const onDropdownClick = vi.fn();

    const wrapper = mount(Dropdown, {
      props: {
        hideAfterItemClick: true,
        onClick: onDropdownClick,
        options: [{ content: 'B', value: 'b' }],
      },
      slots: { default: () => <button>Trigger</button> },
      global: { stubs: { TPopup: popupStub } },
    });

    await nextTick();

    const li = wrapper.find('.t-dropdown__item');
    await li.trigger('click');
    await nextTick();

    expect(onDropdownClick).toHaveBeenCalledWith(
      expect.objectContaining({ content: 'B', value: 'b' }),
      expect.objectContaining({ e: expect.any(MouseEvent) }),
    );
  });

  it('manualCloseTimeout uses first element when delay=[onlyShow]', async () => {
    const onVisible = vi.fn();
    const onVisibleKebab = vi.fn();

    const wrapper = mount(Dropdown, {
      props: {
        hideAfterItemClick: true,
        popupProps: {
          delay: [70], // 只有一个元素，应该取 70 + 10
          onVisibleChange: onVisible,
          // @ts-ignore
          'on-visible-change': onVisibleKebab,
        },
        options: [{ content: 'D', value: 'd' }],
      },
      slots: { default: () => <button>Trigger</button> },
      global: { stubs: { TPopup: popupStub } },
    });

    await nextTick();
    const li = wrapper.find('.t-dropdown__item');
    await li.trigger('click');

    vi.useFakeTimers();
    vi.advanceTimersByTime(80);
    await nextTick();

    expect(onVisible).toHaveBeenCalledWith(false, expect.any(Object));
    expect(onVisibleKebab).toHaveBeenCalledWith(false, expect.any(Object));
    vi.useRealTimers();
  });
});
