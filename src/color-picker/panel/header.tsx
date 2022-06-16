import { defineComponent, PropType, ref, watch } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import props from '../props';
import { COLOR_MODES } from '../const';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../../radio';
import { TdColorModes } from '../interfaces';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'PanelHeader',
  props: {
    ...props,
    mode: {
      type: String as PropType<TdColorModes>,
      default: 'color',
    },
    togglePopup: {
      type: Function,
    },
    onModeChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    const handleClosePopup = () => {
      props.togglePopup?.(false);
    };
    const handleModeChange = (v: string) => props.onModeChange(v);
    watch(
      () => props.mode,
      (v) => (modeValue.value = v),
    );
    return {
      baseClassName,
      modeValue,
      handleModeChange,
      handleClosePopup,
    };
  },
  render() {
    const { baseClassName } = this;
    return (
      <div className={`${baseClassName}__head`}>
        <div className={`${baseClassName}__mode`}>
          {this.colorModes?.length === 1 ? (
            COLOR_MODES[this.colorModes[0]]
          ) : (
            <TRadioGroup
              variant="default-filled"
              size="small"
              v-model={this.modeValue}
              onChange={this.handleModeChange}
            >
              {Object.keys(COLOR_MODES).map((key) => (
                <TRadioButton key={key} value={key}>
                  {COLOR_MODES[key]}
                </TRadioButton>
              ))}
            </TRadioGroup>
          )}
        </div>
        {this.closeBtn ? (
          <span
            role="button"
            class={[`${baseClassName}__icon`, `${baseClassName}__close`]}
            onClick={this.handleClosePopup}
          >
            <CloseIcon />
          </span>
        ) : null}
      </div>
    );
  },
});
