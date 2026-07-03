import { defineComponent, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { useRange } from '../hooks/useRange';
import type { TdDateRangePickerProps } from '../type';
import type { PopupVisibleChangeContext } from '../../popup/type';

type PopupPropsWithKebabVisibleChange = NonNullable<TdDateRangePickerProps['popupProps']> & {
  'on-visible-change'?: (visible: boolean, context: PopupVisibleChangeContext) => void;
};

// 测试只用到少量 props，避免 Partial<TdDateRangePickerProps> 触发类型递归过深
type UseRangeTestProps = {
  value?: TdDateRangePickerProps['value'];
  format?: string;
  mode?: TdDateRangePickerProps['mode'];
  clearable?: boolean;
  popupProps?: PopupPropsWithKebabVisibleChange;
  onChange?: TdDateRangePickerProps['onChange'];
};

const defaultHookProps: UseRangeTestProps = {
  value: [],
  format: 'YYYY-MM-DD',
  mode: 'date',
};

const createHookProps = (override: UseRangeTestProps = {}): TdDateRangePickerProps =>
  reactive({
    ...defaultHookProps,
    ...override,
  }) as unknown as TdDateRangePickerProps;

describe('useRange closePopup', () => {
  const createRangeHook = (props: UseRangeTestProps = {}) => {
    let rangeHook: ReturnType<typeof useRange> | undefined;
    const hookProps = createHookProps(props);

    mount(
      defineComponent({
        setup() {
          rangeHook = useRange(hookProps);
          return () => null;
        },
      }),
    );

    if (!rangeHook) {
      throw new Error('useRange hook failed to initialize');
    }
    return rangeHook;
  };

  it('calls popupProps.onVisibleChange when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const rangeHook = createRangeHook({ popupProps: { onVisibleChange } });

    rangeHook.popupVisible.value = true;
    rangeHook.closePopup({ trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, { trigger: 'trigger-element-close' });
    expect(rangeHook.popupVisible.value).toBe(false);
  });

  it('calls popupProps["on-visible-change"] when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const rangeHook = createRangeHook({
      popupProps: {
        'on-visible-change': onVisibleChange,
      },
    });

    rangeHook.popupVisible.value = true;
    rangeHook.closePopup({ e: new MouseEvent('click'), trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, expect.objectContaining({ trigger: 'trigger-element-close' }));
    expect(rangeHook.popupVisible.value).toBe(false);
  });

  it('does not call onVisibleChange when popup is already closed', () => {
    const onVisibleChange = vi.fn();
    const rangeHook = createRangeHook({ popupProps: { onVisibleChange } });

    rangeHook.closePopup();

    expect(onVisibleChange).not.toHaveBeenCalled();
  });

  it('notifies onVisibleChange when range input clear closes popup', async () => {
    const onVisibleChange = vi.fn();
    const onRawChange = vi.fn();
    const rangeHook = createRangeHook({
      clearable: true,
      popupProps: { onVisibleChange },
      onChange: onRawChange,
      value: ['2020-12-10', '2020-12-20'],
    });

    rangeHook.popupVisible.value = true;
    const mouseEvent = new MouseEvent('click');
    await rangeHook.rangeInputProps.value.onClear(mouseEvent);

    expect(onVisibleChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ trigger: 'trigger-element-close', e: mouseEvent }),
    );
    expect(onRawChange).toHaveBeenCalled();
  });

  it('notifies onVisibleChange when range input enter closes popup', async () => {
    const onVisibleChange = vi.fn();
    const rangeHook = createRangeHook({
      popupProps: { onVisibleChange },
      value: ['2020-12-10', '2020-12-20'],
      format: 'YYYY-MM-DD',
    });

    rangeHook.popupVisible.value = true;
    await rangeHook.rangeInputProps.value.onEnter(['2020-12-10', '2020-12-20']);

    expect(onVisibleChange).toHaveBeenCalledWith(false, expect.objectContaining({ trigger: 'trigger-element-close' }));
    expect(rangeHook.popupVisible.value).toBe(false);
  });
});
