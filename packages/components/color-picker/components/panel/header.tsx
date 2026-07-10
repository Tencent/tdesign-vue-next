import { defineComponent, PropType, ref, watch, onUnmounted } from 'vue';
import { COLOR_MODES } from '@tdesign/common-js/color-picker/constants';
import { isEyeDropperSupported, openEyeDropper } from '../../utils/eyedropper';
import { useConfig } from '@tdesign/shared-hooks';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../../radio';
import props from '../../color-picker-panel-props';
import { useBaseClassName } from '../../hooks';
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
      default: () => () => {},
    },
    onEyeDropperPick: {
      type: Function as PropType<(hex: string) => void>,
      default: () => () => {},
    },
  },
  setup(props) {
    const { globalConfig } = useConfig('colorPicker');
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    const picking = ref(false);
    const supported = isEyeDropperSupported();
    let abortCtrl: AbortController | null = null;

    watch(
      () => props.mode,
      (v) => (modeValue.value = v),
    );

    onUnmounted(() => {
      abortCtrl?.abort();
    });

    const handleModeChange = (v: string) => props.onModeChange(v);

    const handleEyeDropperClick = async () => {
      if (picking.value || !supported) return;
      abortCtrl = new AbortController();
      picking.value = true;
      try {
        const hex = await openEyeDropper(abortCtrl.signal);
        if (hex) props.onEyeDropperPick(hex);
      } finally {
        picking.value = false;
        abortCtrl = null;
      }
    };

    return () => {
      const showModeSwitch = (props.colorModes?.length ?? 0) !== 1;
      const showEyeDropper = props.eyeDropper;
      if (!showModeSwitch && !showEyeDropper) return null;

      return (
        <div class={`${baseClassName.value}__head`}>
          {showModeSwitch && (
            <div class={`${baseClassName.value}__mode`}>
              <TRadioGroup variant="default-filled" size="small" v-model={modeValue.value} onChange={handleModeChange}>
                {Object.keys(COLOR_MODES).map((key) => (
                  <TRadioButton key={key} value={key}>
                    {Reflect.get(globalConfig.value, COLOR_MODES[key as keyof typeof COLOR_MODES])}
                  </TRadioButton>
                ))}
              </TRadioGroup>
            </div>
          )}
          {showEyeDropper && (
            <button
              class={[`${baseClassName.value}__eyedropper`, !supported && 't-is-disabled']}
              title={globalConfig.value.eyeDropper ?? '吸色'}
              disabled={!supported || picking.value}
              onClick={handleEyeDropperClick}
            >
              <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M13.354.646a2.207 2.207 0 0 0-3.121 0L8.75 2.129l-.604-.604a1 1 0 1 0-1.414 1.414l.25.25L1.47 9.2A2.5 2.5 0 0 0 .75 11v.25H.5a.5.5 0 0 0 0 1h.25V12.5a.5.5 0 0 0 1 0v-.25H2a2.5 2.5 0 0 0 1.8-.72l5.982-5.982.25.25a1 1 0 1 0 1.414-1.414l-.604-.604 1.483-1.483a2.207 2.207 0 0 0 0-3.121zM3.094 11.78A1.5 1.5 0 0 1 2 12.25H1.75v-.25A1.5 1.5 0 0 1 2.22 10.906L8 5.121l.879.879-5.785 5.78z"/>
              </svg>
            </button>
          )}
        </div>
      );
    };
  },
});
