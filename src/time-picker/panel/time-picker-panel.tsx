import { defineComponent, toRefs, computed, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { DEFAULT_STEPS, DEFAULT_FORMAT } from '../../_common/js/time-picker/const';
import { panelProps } from './props';
import SinglePanel from './single-panel';
import TButton from '../../button/button';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TimePickerPanel',
  components: {
    SinglePanel,
    TButton,
  },
  props: { ...panelProps(), isFooterDisplay: Boolean, handleConfirmClick: Function, onChange: Function },

  setup(props) {
    const panelClassName = usePrefixClass('time-picker__panel');
    const { steps, isFooterDisplay } = toRefs(props);
    const triggerScroll = ref(false);
    const panelRef = ref();
    const { global } = useConfig('timePicker');
    const showNowTimeBtn = computed(() => !!steps.value.filter((v) => v > 1).length);

    const defaultValue = computed(() => {
      const isStepsSet = showNowTimeBtn.value;
      if (props.value) {
        return dayjs(props.value, props.format);
      }
      if (isStepsSet) {
        return dayjs().hour(0).minute(0).second(0);
      }
      return dayjs();
    });

    const panelColUpdate = () => {
      setTimeout(() => {
        triggerScroll.value = true;
      });
    };

    const resetTriggerScroll = () => {
      triggerScroll.value = false;
    };

    // 渲染后执行update 使面板滚动至当前时间位置
    onMounted(() => {
      panelColUpdate();
    });

    return () => (
      <div class={panelClassName.value}>
        <div class={`${panelClassName.value}-section-body`}>
          <single-panel
            {...props}
            ref={panelRef}
            format={props.format || DEFAULT_FORMAT}
            steps={props.steps || DEFAULT_STEPS}
            value={props.value}
            triggerScroll={triggerScroll.value}
            onChange={props.onChange}
            resetTriggerScroll={resetTriggerScroll}
          />
        </div>
        {isFooterDisplay.value ? (
          <div class={`${panelClassName.value}-section-footer`}>
            <t-button
              theme="primary"
              variant="base"
              onClick={() => props.handleConfirmClick(defaultValue)}
              size="small"
            >
              {global.value.confirm}
            </t-button>
            {!showNowTimeBtn.value ? (
              <t-button
                theme="primary"
                variant="text"
                size="small"
                onClick={() => props.onChange(dayjs().format(props.format))}
              >
                {global.value.now}
              </t-button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
});
