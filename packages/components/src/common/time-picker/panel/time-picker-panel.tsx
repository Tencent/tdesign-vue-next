import { computed, defineComponent, nextTick, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import { DEFAULT_FORMAT, DEFAULT_STEPS } from '@td/shared/_common/js/time-picker/const';
import log from '@td/shared/_common/js/log';
import type { TimePickerValue, TimeRangeValue } from '@td/intel/components/time-picker/type';
import TButton from '../../button/button';
import { panelProps } from './props';
import SinglePanel from './single-panel';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimePickerPanel',

  props: {
    ...panelProps(),
    isFooterDisplay: Boolean,
    handleConfirmClick: Function,
    onChange: Function,
  },

  setup(props) {
    const { globalConfig } = useConfig('timePicker');
    const COMPONENT_NAME = usePrefixClass('time-picker__panel');
    const { steps, isFooterDisplay, isShowPanel } = toRefs(props);
    const triggerScroll = ref(false);
    const panelRef = ref();
    const showNowTimeBtn = computed(() => !!steps.value.filter(step => Number(step) > 1).length);

    const defaultValue = computed(() => {
      const isStepsSet = showNowTimeBtn.value;
      const formattedValue = dayjs(props.value, props.format);
      if (props.value && formattedValue.isValid()) {
        return formattedValue.format(props.format);
      }

      if (isStepsSet) {
        return dayjs().hour(0).minute(0).second(0).format(props.format);
      }
      return dayjs().hour(0).minute(0).second(0).format(props.format);
    });

    const panelColUpdate = () => {
      nextTick(() => {
        triggerScroll.value = true;
      });
    };

    const resetTriggerScroll = () => {
      triggerScroll.value = false;
    };
    const handlePresetClick = (
      presetValue: TimePickerValue | (() => TimePickerValue) | TimeRangeValue | (() => TimeRangeValue),
    ) => {
      const presetVal = typeof presetValue === 'function' ? presetValue() : presetValue;
      if (typeof props.activeIndex === 'number') {
        if (Array.isArray(presetVal)) {
          props.onChange?.(presetVal[props.activeIndex]);
        } else {
          log.error('TimePicker', `preset: ${props.presets} 预设值必须是数组!`);
        }
      } else {
        props.onChange?.(presetVal);
      }
    };

    // 渲染后执行update 使面板滚动至当前时间位置
    onMounted(() => {
      panelColUpdate();
    });

    watch(
      () => isShowPanel.value,
      () => {
        panelColUpdate();
      },
    );

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div class={`${COMPONENT_NAME.value}-section-body`}>
          <SinglePanel
            {...props}
            ref={panelRef}
            format={props.format || DEFAULT_FORMAT}
            steps={props.steps || DEFAULT_STEPS}
            value={dayjs(props.value, props.format).isValid() ? props.value : defaultValue.value}
            triggerScroll={triggerScroll.value}
            onChange={props.onChange}
            resetTriggerScroll={resetTriggerScroll}
            isShowPanel={props.isShowPanel}
          />
        </div>
        {isFooterDisplay.value
          ? (
            <div class={`${COMPONENT_NAME.value}-section-footer`}>
              <TButton
                theme="primary"
                variant="base"
                disabled={!props.value}
                onClick={() => props.handleConfirmClick?.(defaultValue.value)}
                size="small"
              >
                {globalConfig.value.confirm}
              </TButton>
              {!showNowTimeBtn.value
                ? (
                  <TButton
                    theme="primary"
                    variant="text"
                    size="small"
                    onClick={() => props.onChange?.(dayjs().format(props.format))}
                  >
                    {globalConfig.value.now}
                  </TButton>
                  )
                : null}
              {props.presets
              && Object.keys(props.presets).map((key: string) => (
                <TButton
                  key={key}
                  theme="primary"
                  size="small"
                  variant="text"
                  onClick={() => handlePresetClick(props.presets[key])}
                >
                  {key}
                </TButton>
              ))}
            </div>
            )
          : null}
      </div>
    );
  },
});
