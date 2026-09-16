import { defineComponent, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { useSingle } from '../hooks/useSingle';
import type { TdDatePickerProps } from '../type';
import type { PopupVisibleChangeContext } from '../../popup/type';

type PopupPropsWithKebabVisibleChange = NonNullable<TdDatePickerProps['popupProps']> & {
  'on-visible-change'?: (visible: boolean, context: PopupVisibleChangeContext) => void;
};

// 测试只用到少量 props，避免 Partial<TdDatePickerProps> 触发类型递归过深
type UseSingleTestProps = {
  value?: TdDatePickerProps['value'];
  defaultValue?: TdDatePickerProps['defaultValue'];
  format?: string;
  clearable?: boolean;
  popupProps?: PopupPropsWithKebabVisibleChange;
  onChange?: TdDatePickerProps['onChange'];
};

const defaultHookProps: UseSingleTestProps = {
  defaultValue: '',
  format: 'YYYY-MM-DD',
};

const createHookProps = (override: UseSingleTestProps = {}): TdDatePickerProps =>
  reactive({
    ...defaultHookProps,
    ...override,
  }) as unknown as TdDatePickerProps;

describe('useSingle closePopup', () => {
  const createSingleHook = (props: UseSingleTestProps = {}) => {
    let singleHook: ReturnType<typeof useSingle> | undefined;
    const hookProps = createHookProps(props);

    mount(
      defineComponent({
        setup() {
          singleHook = useSingle(hookProps);
          return () => null;
        },
      }),
    );

    if (!singleHook) {
      throw new Error('useSingle hook failed to initialize');
    }
    return singleHook;
  };

  it('calls popupProps.onVisibleChange when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const singleHook = createSingleHook({ popupProps: { onVisibleChange } });

    singleHook.popupVisible.value = true;
    singleHook.closePopup({ trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, { trigger: 'trigger-element-close' });
    expect(singleHook.popupVisible.value).toBe(false);
  });

  it('calls popupProps["on-visible-change"] when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const singleHook = createSingleHook({
      popupProps: {
        'on-visible-change': onVisibleChange,
      },
    });

    singleHook.popupVisible.value = true;
    singleHook.closePopup({ e: new MouseEvent('click'), trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, expect.objectContaining({ trigger: 'trigger-element-close' }));
    expect(singleHook.popupVisible.value).toBe(false);
  });

  it('does not call onVisibleChange when popup is already closed', () => {
    const onVisibleChange = vi.fn();
    const singleHook = createSingleHook({ popupProps: { onVisibleChange } });

    singleHook.closePopup();

    expect(onVisibleChange).not.toHaveBeenCalled();
  });

  it('notifies onVisibleChange with event when closePopup is called with context', () => {
    const onVisibleChange = vi.fn();
    const singleHook = createSingleHook({ popupProps: { onVisibleChange } });

    singleHook.popupVisible.value = true;
    const mockEvent = new MouseEvent('click');
    singleHook.closePopup({ e: mockEvent, trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({
        trigger: 'trigger-element-close',
        e: mockEvent,
      }),
    );
    expect(singleHook.popupVisible.value).toBe(false);
  });
});
