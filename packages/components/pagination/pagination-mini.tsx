import { defineComponent, computed } from 'vue';
import { isObject } from 'lodash-es';
import {
  ChevronLeftIcon as TdChevronLeftIcon,
  RoundIcon as TdRoundIcon,
  ChevronRightIcon as TdChevronRightIcon,
  ChevronUpIcon as TdChevronUpIcon,
  ChevronDownIcon as TdChevronDownIcon,
} from 'tdesign-icons-vue-next';

import props from './pagination-mini-props';
import { useGlobalIcon, usePrefixClass } from '@tdesign/shared-hooks';

import TButton from '../button';
import TTooltip from '../tooltip';

export default defineComponent({
  name: 'TPaginationMini',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('pagination-mini');
    const { ChevronLeftIcon, RoundIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } = useGlobalIcon({
      ChevronLeftIcon: TdChevronLeftIcon,
      RoundIcon: TdRoundIcon,
      ChevronRightIcon: TdChevronRightIcon,
      ChevronUpIcon: TdChevronUpIcon,
      ChevronDownIcon: TdChevronDownIcon,
    });

    const titleConfig = computed<{
      prev?: string;
      current?: string;
      next?: string;
    }>(() => {
      if (isObject(props.tips)) return props.tips;
      if (props.tips === true) return { prev: '上一页', current: '当前', next: '下一页' };
      return {};
    });

    const disabledConfig = computed<{
      prev?: boolean;
      current?: boolean;
      next?: boolean;
    }>(() => {
      if (isObject(props.disabled)) return props.disabled;
      if (props.disabled === true) return { prev: true, current: true, next: true };
      return { prev: false, current: false, next: false };
    });

    const renderWithTooltip = (content: string | undefined, node: JSX.Element) => {
      if (!content) return node;
      return (
        <TTooltip content={content} showArrow={false}>
          {node}
        </TTooltip>
      );
    };

    return () => {
      const jumperClass = [
        COMPONENT_NAME.value,
        {
          [`${COMPONENT_NAME.value}--outline`]: props.variant === 'outline',
        },
      ];

      return (
        <div class={jumperClass}>
          {renderWithTooltip(
            titleConfig.value.prev,
            <TButton
              variant={props.variant}
              size={props.size}
              shape="square"
              onClick={(e) => props.onChange?.({ e, trigger: 'prev' })}
              icon={props.layout === 'horizontal' ? () => <ChevronLeftIcon /> : () => <ChevronUpIcon />}
              class={`${COMPONENT_NAME.value}__prev`}
              disabled={disabledConfig.value.prev}
            />,
          )}

          {props.showCurrent &&
            renderWithTooltip(
              titleConfig.value.current,
              <TButton
                variant={props.variant}
                size={props.size}
                shape="square"
                onClick={(e) => props.onChange?.({ e, trigger: 'current' })}
                icon={() => <RoundIcon />}
                class={`${COMPONENT_NAME.value}__current`}
                disabled={disabledConfig.value.current}
              />,
            )}

          {renderWithTooltip(
            titleConfig.value.next,
            <TButton
              variant={props.variant}
              size={props.size}
              shape="square"
              onClick={(e) => props.onChange?.({ e, trigger: 'next' })}
              icon={props.layout === 'horizontal' ? () => <ChevronRightIcon /> : () => <ChevronDownIcon />}
              class={`${COMPONENT_NAME.value}__next`}
              disabled={disabledConfig.value.next}
            />,
          )}
        </div>
      );
    };
  },
});
