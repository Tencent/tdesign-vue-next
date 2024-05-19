import { defineComponent, computed, toRefs, ref } from '@td/adapter-vue';
import { StarFilledIcon } from 'tdesign-icons-vue-next';
import { useVModel } from '@td/adapter-hooks';
import props from '@td/intel/rate/props';
import { useConfig } from '@td/adapter-hooks';
import { useTNodeJSX } from '@td/adapter-hooks';
import Tooltip from '../tooltip/index';
import { isArray } from 'lodash-es';

export default defineComponent({
  name: 'TRate',
  props: { ...props },
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();

    const activeColor = isArray(props.color) ? props.color[0] : props.color;
    const defaultColor = isArray(props.color) ? props.color[1] : 'var(--td-bg-color-component)';

    const { value: inputValue, modelValue } = toRefs(props);
    const [starValue, setStarValue] = useVModel(inputValue, modelValue, props.defaultValue, props.onChange);

    const hoverValue = ref(undefined);
    const root = ref<HTMLTableElement>();

    const displayValue = computed(() => Number(hoverValue.value || starValue.value));
    const displayTexts = computed(() =>
      props.texts.length === 0 ? ['极差', '失望', '一般', '满意', '惊喜'] : props.texts,
    );
    const displayText = computed(() => displayTexts.value[Math.ceil(displayValue.value - 1)]);

    // 评分图标
    const RateIcon = (iconProps: any) => {
      if (slots.icon !== undefined) {
        return renderTNodeJSX('icon', {
          params: iconProps,
        });
      }

      return <StarFilledIcon {...iconProps} />;
    };

    const getStarValue = (event: MouseEvent, index: number) => {
      if (props.allowHalf) {
        const { left } = root.value.getBoundingClientRect();
        const firstStar = root.value.firstChild.nextSibling as HTMLElement;
        const { width } = firstStar.getBoundingClientRect();
        const { clientX } = event;
        const starMiddle = width * (index - 0.5) + props.gap * (index - 1);

        if (clientX - left >= starMiddle) return index;
        if (clientX - left < starMiddle) return index - 0.5;
      }

      return index;
    };

    const mouseEnterHandler = (event: MouseEvent, index: number) => {
      if (props.disabled) return;
      hoverValue.value = getStarValue(event, index);
    };

    const mouseLeaveHandler = () => {
      if (props.disabled) return;
      hoverValue.value = undefined;
    };

    const clickHandler = (event: MouseEvent, index: number) => {
      if (props.disabled) return;
      setStarValue(getStarValue(event, index));
    };

    const getStarCls = (index: number) => {
      if (props.allowHalf && index + 0.5 === displayValue.value) return `${classPrefix.value}-rate__item--half`;
      if (index >= displayValue.value) return '';
      if (index < displayValue.value) return `${classPrefix.value}-rate__item--full`;
    };

    const { classPrefix } = useConfig('classPrefix');

    return () => {
      return (
        <div class={`${classPrefix.value}-rate`} onMouseleave={mouseLeaveHandler}>
          <ul class={`${classPrefix.value}-rate__list`} style={{ gap: `${props.gap}px` }} ref={root}>
            {[...Array(Number(props.count))].map((_, index) => (
              <li
                key={index}
                class={[`${classPrefix.value}-rate__item`, getStarCls(index)]}
                onClick={(event) => clickHandler(event, index + 1)}
                onMousemove={(event: MouseEvent) => {
                  return mouseEnterHandler(event, index + 1);
                }}
              >
                {props.showText ? (
                  <Tooltip key={index} content={displayText.value}>
                    <div class={`${classPrefix.value}-rate__star-top`}>
                      <RateIcon size={props.size} color={activeColor} />
                    </div>
                    <div class={`${classPrefix.value}-rate__star-bottom`}>
                      <RateIcon size={props.size} color={defaultColor} />
                    </div>
                  </Tooltip>
                ) : (
                  <>
                    <div class={`${classPrefix.value}-rate__star-top`}>
                      <RateIcon size={props.size} color={activeColor} />
                    </div>
                    <div class={`${classPrefix.value}-rate__star-bottom`}>
                      <RateIcon size={props.size} color={defaultColor} />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          {props.showText && <div className={`${classPrefix.value}-rate__text`}>{displayText.value}</div>}
        </div>
      );
    };
  },
});
