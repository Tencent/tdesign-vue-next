import { computed, defineComponent } from '@td/adapter-vue';
import { isObject } from 'lodash-es';
import {
  ChevronDownIcon as TdChevronDownIcon,
  ChevronLeftIcon as TdChevronLeftIcon,
  ChevronRightIcon as TdChevronRightIcon,
  ChevronUpIcon as TdChevronUpIcon,
  RoundIcon as TdRoundIcon,
} from 'tdesign-icons-vue-next';

import props from '@td/intel/pagination/pagination-mini-props';
import { useGlobalIcon, usePrefixClass } from '@td/adapter-hooks';
import TButton from '../button';

export default defineComponent({
  name: 'TPaginationMini',

  props: { ...props },

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
      if (isObject(props.tips)) {
        return props.tips;
      }
      if (props.tips === true) {
        return { prev: '上一页', current: '当前', next: '下一页' };
      }
      return {};
    });

    const disabledConfig = computed<{
      prev?: boolean;
      current?: boolean;
      next?: boolean;
    }>(() => {
      if (isObject(props.disabled)) {
        return props.disabled;
      }
      if (props.disabled === true) {
        return { prev: true, current: true, next: true };
      }
      return { prev: false, current: false, next: false };
    });

    return () => {
      const jumperClass = [
        COMPONENT_NAME.value,
        {
          [`${COMPONENT_NAME.value}--outline`]: props.variant === 'outline',
        },
      ];

      return (
        <div class={jumperClass}>
          <TButton
            title={titleConfig.value.prev}
            variant={props.variant}
            size={props.size}
            shape="square"
            onClick={e => props.onChange?.({ e, trigger: 'prev' })}
            icon={props.layout === 'horizontal' ? () => <ChevronLeftIcon /> : () => <ChevronUpIcon />}
            class={`${COMPONENT_NAME.value}__prev`}
            disabled={disabledConfig.value.prev}
          />

          {props.showCurrent && (
            <TButton
              title={titleConfig.value.current}
              variant={props.variant}
              size={props.size}
              shape="square"
              onClick={e => props.onChange?.({ e, trigger: 'current' })}
              icon={() => <RoundIcon />}
              class={`${COMPONENT_NAME.value}__current`}
              disabled={disabledConfig.value.current}
            />
          )}

          <TButton
            title={titleConfig.value.next}
            variant={props.variant}
            size={props.size}
            shape="square"
            onClick={e => props.onChange?.({ e, trigger: 'next' })}
            icon={props.layout === 'horizontal' ? () => <ChevronRightIcon /> : () => <ChevronDownIcon />}
            class={`${COMPONENT_NAME.value}__next`}
            disabled={disabledConfig.value.next}
          />
        </div>
      );
    };
  },
});
