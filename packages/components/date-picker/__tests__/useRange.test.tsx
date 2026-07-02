// @ts-nocheck
import { defineComponent, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { useRange } from '../hooks/useRange';

describe('useRange closePopup', () => {
  const mountUseRange = (props: Record<string, unknown> = {}) => {
    let api: ReturnType<typeof useRange>;
    const hookProps = reactive({
      value: [],
      format: 'YYYY-MM-DD',
      ...props,
    });

    mount(
      defineComponent({
        setup() {
          api = useRange(hookProps as any);
          return () => null;
        },
      }),
    );

    return () => api!;
  };

  it('calls popupProps.onVisibleChange when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const getApi = mountUseRange({ popupProps: { onVisibleChange } });
    const api = getApi();

    api.popupVisible.value = true;
    api.closePopup({ trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, { trigger: 'trigger-element-close' });
    expect(api.popupVisible.value).toBe(false);
  });

  it('calls popupProps["on-visible-change"] when closePopup is invoked', () => {
    const onVisibleChange = vi.fn();
    const getApi = mountUseRange({ popupProps: { 'on-visible-change': onVisibleChange } });
    const api = getApi();

    api.popupVisible.value = true;
    api.closePopup({ e: new MouseEvent('click'), trigger: 'trigger-element-close' });

    expect(onVisibleChange).toHaveBeenCalledWith(false, expect.objectContaining({ trigger: 'trigger-element-close' }));
    expect(api.popupVisible.value).toBe(false);
  });

  it('does not call onVisibleChange when popup is already closed', () => {
    const onVisibleChange = vi.fn();
    const getApi = mountUseRange({ popupProps: { onVisibleChange } });
    const api = getApi();

    api.closePopup();

    expect(onVisibleChange).not.toHaveBeenCalled();
  });

  it('notifies onVisibleChange when range input clear closes popup', async () => {
    const onVisibleChange = vi.fn();
    const onRawChange = vi.fn();
    const getApi = mountUseRange({
      clearable: true,
      popupProps: { onVisibleChange },
      onChange: onRawChange,
      value: ['2020-12-10', '2020-12-20'],
    });
    const api = getApi();

    api.popupVisible.value = true;
    const mouseEvent = new MouseEvent('click');
    await api.rangeInputProps.value.onClear(mouseEvent);

    expect(onVisibleChange).toHaveBeenCalledWith(
      false,
      expect.objectContaining({ trigger: 'trigger-element-close', e: mouseEvent }),
    );
    expect(onRawChange).toHaveBeenCalled();
  });

  it('notifies onVisibleChange when range input enter closes popup', async () => {
    const onVisibleChange = vi.fn();
    const getApi = mountUseRange({
      popupProps: { onVisibleChange },
      value: ['2020-12-10', '2020-12-20'],
      format: 'YYYY-MM-DD',
    });
    const api = getApi();

    api.popupVisible.value = true;
    await api.rangeInputProps.value.onEnter(['2020-12-10', '2020-12-20']);

    expect(onVisibleChange).toHaveBeenCalledWith(false, expect.objectContaining({ trigger: 'trigger-element-close' }));
    expect(api.popupVisible.value).toBe(false);
  });
});
