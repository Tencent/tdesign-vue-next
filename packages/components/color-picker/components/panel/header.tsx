import { defineComponent, onBeforeUnmount, PropType, ref, watch } from 'vue';
import { SipIcon as TdSipIcon } from 'tdesign-icons-vue-next';

import { COLOR_MODES } from '@tdesign/common-js/color-picker/constants';
import { useCommonClassName, useConfig, useGlobalIcon } from '@tdesign/shared-hooks';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../../radio';
import props from '../../color-picker-panel-props';
import { useBaseClassName } from '../../hooks';
import { isEyeDropperSupported, openEyeDropper } from '../../utils/eyedropper';
import type { TdColorModes } from '../../types';

export default defineComponent({
  name: 'PanelHeader',
  props: {
    ...props,
    mode: {
      type: String as PropType<TdColorModes>,
      default: 'color',
    },
    onModeChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    onEyeDropperPick: {
      type: Function as PropType<(hex: string) => void>,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const { globalConfig } = useConfig('colorPicker');
    const baseClassName = useBaseClassName();
    const { SipIcon } = useGlobalIcon({ SipIcon: TdSipIcon });
    const { STATUS } = useCommonClassName();
    const statusClassNames = STATUS.value;
    const modeValue = ref(props.mode);
    const handleModeChange = (v: string) => props.onModeChange(v);

    const eyeDropperSupported = isEyeDropperSupported();
    const eyeDropperAbortController = ref<AbortController | null>(null);

    const handleEyeDropperClick = async () => {
      if (!eyeDropperSupported || props.disabled) return;
      eyeDropperAbortController.value?.abort();
      eyeDropperAbortController.value = new AbortController();
      const hex = await openEyeDropper({ signal: eyeDropperAbortController.value.signal });
      // 用户取消或吸色失败时返回 null，不触发变更
      if (hex) props.onEyeDropperPick(hex);
    };

    // 组件卸载时中断进行中的吸色，避免对已销毁组件回调
    onBeforeUnmount(() => {
      eyeDropperAbortController.value?.abort();
    });

    watch(
      () => props.mode,
      (v) => (modeValue.value = v),
    );
    return () => {
      const showModeSelect = props.colorModes?.length > 1;
      if (!showModeSelect && !props.eyeDropper) {
        return null;
      }
      const eyeDropperDisabled = !eyeDropperSupported || props.disabled;
      return (
        <div class={`${baseClassName.value}__head`}>
          <div class={`${baseClassName.value}__mode`}>
            {showModeSelect ? (
              <TRadioGroup variant="default-filled" size="small" v-model={modeValue.value} onChange={handleModeChange}>
                {Object.keys(COLOR_MODES).map((key) => (
                  <TRadioButton key={key} value={key}>
                    {Reflect.get(globalConfig.value, COLOR_MODES[key as keyof typeof COLOR_MODES])}
                  </TRadioButton>
                ))}
              </TRadioGroup>
            ) : null}
          </div>
          {props.eyeDropper ? (
            <button
              type="button"
              aria-label="eyedropper"
              disabled={eyeDropperDisabled}
              class={[
                `${baseClassName.value}__icon`,
                `${baseClassName.value}__eyedropper`,
                { [statusClassNames.disabled]: eyeDropperDisabled },
              ]}
              onClick={handleEyeDropperClick}
            >
              <SipIcon />
            </button>
          ) : null}
        </div>
      );
    };
  },
});
