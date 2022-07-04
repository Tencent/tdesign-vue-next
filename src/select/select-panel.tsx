import { computed, defineComponent, inject, PropType, Slots, ref, onMounted, onBeforeUnmount } from 'vue';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { Styles } from '../common';

import { SelectOption, SelectOptionGroup, TdOptionProps } from './type';
import Option from './option';
import OptionGroup from './optionGroup';
import TdSelectProps from './props';

import { useTNodeJSX, useTNodeDefault } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import useVirtualScroll from '../hooks/useVirtualScroll';

import { selectInjectKey } from './helper';

export default defineComponent({
  name: 'TSelectPanel',
  props: {
    inputValue: TdSelectProps.inputValue,
    panelTopContent: TdSelectProps.panelTopContent,
    panelBottomContent: TdSelectProps.panelBottomContent,
    empty: TdSelectProps.empty,
    creatable: TdSelectProps.creatable,
    loading: TdSelectProps.loading,
    loadingText: TdSelectProps.loadingText,
    multiple: TdSelectProps.multiple,
    filterable: TdSelectProps.filterable,
    filter: TdSelectProps.filter,
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },
    scroll: TdSelectProps.scroll,
  },
  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('select');
    const renderTNodeJSX = useTNodeJSX();
    const renderDefaultTNode = useTNodeDefault();
    const { t, globalConfig } = useConfig('select');
    const tSelect = inject(selectInjectKey);
    const innerRef = ref<HTMLElement>(null);

    const {
      type,
      rowHeight = 28, // 默认每行高度28
      bufferSize = 20,
      isFixedRowHeight = false,
      threshold = 100,
    } = props.scroll || {};

    const isVirtual = computed(
      () => props.scroll?.type === 'virtual' && props.options?.length > (props.scroll?.threshold || 100),
    );

    const popupContentRef = computed(() => tSelect.value.popupContentRef.value);

    const showCreateOption = computed(() => props.creatable && props.filterable && props.inputValue);

    const displayOptions = computed(() => {
      if (!props.inputValue || props.creatable || !(props.filterable || isFunction(props.filter))) return props.options;

      const filterMethods = (option: SelectOption) => {
        if (isFunction(props.filter)) {
          return props.filter(`${props.inputValue}`, option);
        }

        return option.label?.indexOf(`${props.inputValue}`) > -1;
      };

      const res: SelectOption[] = [];

      props.options.forEach((option) => {
        if ((option as SelectOptionGroup).group && (option as SelectOptionGroup).children) {
          res.push({
            ...option,
            children: (option as SelectOptionGroup).children.filter(filterMethods),
          });
        }
        if (filterMethods(option)) {
          res.push(option);
        }
      });

      return res;
    });

    const {
      trs = null,
      visibleData = null,
      handleScroll: handleVirtualScroll = null,
      scrollHeight = null,
      translateY = null,
      handleRowMounted = null,
    } = type === 'virtual'
      ? useVirtualScroll({
          container: popupContentRef,
          data: displayOptions,
          fixedHeight: isFixedRowHeight,
          lineHeight: rowHeight,
          bufferSize,
          threshold,
        })
      : {};
    let lastScrollY = -1;

    const onInnerVirtualScroll = (e: WheelEvent) => {
      if (!isVirtual.value) {
        return;
      }
      const target = e.target as HTMLElement;
      const top = target.scrollTop;
      // 排除横向滚动出发的纵向虚拟滚动计算
      if (Math.abs(lastScrollY - top) > 5) {
        handleVirtualScroll();
        lastScrollY = top;
      } else {
        lastScrollY = -1;
      }
    };

    // 监听popup滚动 处理虚拟滚动时的virtualData变化
    onMounted(() => {
      if (props.scroll?.type === 'virtual') {
        popupContentRef.value?.addEventListener('scroll', onInnerVirtualScroll);
      }
    });

    // 卸载时取消监听
    onBeforeUnmount(() => {
      if (props.scroll?.type === 'virtual') {
        popupContentRef.value?.removeEventListener('scroll', onInnerVirtualScroll);
      }
    });

    const isEmpty = computed(() => !displayOptions.value.length);

    const renderCreateOption = () => (
      <ul class={[`${COMPONENT_NAME.value}__create-option`, `${COMPONENT_NAME.value}__list`]}>
        <Option
          value={props.inputValue}
          label={`${props.inputValue}`}
          createAble={true}
          class={`${COMPONENT_NAME.value}__create-option--special`}
        />
      </ul>
    );

    // 递归render options
    const renderOptionsContent = (options: SelectOption[]) => {
      return (
        <ul class={`${COMPONENT_NAME.value}__list`}>
          {options.map((item: SelectOptionGroup & TdOptionProps & { slots: Slots } & { $index: number }, index) => {
            if (item.group) {
              return (
                <OptionGroup label={item.group} divider={item.divider}>
                  {renderOptionsContent(item.children)}
                </OptionGroup>
              );
            }
            return (
              <Option
                {...omit(item, '$index')}
                {...(isVirtual.value
                  ? {
                      rowIndex: item.$index,
                      trs,
                      scrollType: props.scroll?.type,
                      isVirtual: isVirtual.value,
                      bufferSize,
                      key: `${item.$index || ''}_${index}`,
                    }
                  : {
                      key: index,
                    })}
                multiple={props.multiple}
                v-slots={item.slots}
                onRowMounted={handleRowMounted}
              />
            );
          })}
        </ul>
      );
    };
    const dropdownInnerSize = computed(() => {
      return {
        small: 's',
        medium: 'm',
        large: 'l',
      }[tSelect.value.size];
    });

    expose({
      innerRef,
    });

    if (isVirtual.value) {
      return () => (
        <div>
          <div
            style={
              {
                position: 'absolute',
                width: '1px',
                height: '1px',
                transition: 'transform 0.2s',
                transform: `translate(0, ${scrollHeight.value}px)`,
                '-ms-transform': `translate(0, ${scrollHeight.value}px)`,
                '-moz-transform': `translate(0, ${scrollHeight.value}px)`,
                '-webkit-transform': `translate(0, ${scrollHeight.value}px)`,
              } as Styles
            }
          ></div>
          <div
            ref={innerRef}
            class={[
              `${COMPONENT_NAME.value}__dropdown-inner`,
              `${COMPONENT_NAME.value}__dropdown-inner--size-${dropdownInnerSize.value}`,
            ]}
            onClick={(e) => e.stopPropagation()}
            style={
              {
                transform: `translate(0, ${translateY.value}px)`,
                '-ms-transform': `translate(0, ${translateY.value}px)`,
                '-moz-transform': `translate(0, ${translateY.value}px)`,
                '-webkit-transform': `translate(0, ${translateY.value}px)`,
              } as Styles
            }
          >
            {renderTNodeJSX('panelTopContent')}
            {/* create option */}
            {showCreateOption.value && renderCreateOption()}
            {!isEmpty.value && !props.loading && renderOptionsContent(visibleData.value)}
            {/* 空状态 */}
            {isEmpty.value &&
              renderDefaultTNode('empty', {
                defaultNode: <div class={`${COMPONENT_NAME.value}__empty`}>{t(globalConfig.value.empty)}</div>,
              })}
            {/* loading状态 */}
            {!isEmpty.value &&
              props.loading &&
              renderDefaultTNode('loadingText', {
                defaultNode: (
                  <div class={`${COMPONENT_NAME.value}__loading-tips`}>{t(globalConfig.value.loadingText)}</div>
                ),
              })}
            {renderTNodeJSX('panelBottomContent')}
          </div>
        </div>
      );
    }

    return () => (
      <div
        ref={innerRef}
        class={[
          `${COMPONENT_NAME.value}__dropdown-inner`,
          `${COMPONENT_NAME.value}__dropdown-inner--size-${dropdownInnerSize.value}`,
        ]}
        onClick={(e) => e.stopPropagation()}
      >
        {renderTNodeJSX('panelTopContent')}
        {/* create option */}
        {showCreateOption.value && renderCreateOption()}
        {!isEmpty.value && !props.loading && renderOptionsContent(displayOptions.value)}
        {/* 空状态 */}
        {isEmpty.value &&
          renderDefaultTNode('empty', {
            defaultNode: <div class={`${COMPONENT_NAME.value}__empty`}>{t(globalConfig.value.empty)}</div>,
          })}
        {/* loading状态 */}
        {!isEmpty.value &&
          props.loading &&
          renderDefaultTNode('loadingText', {
            defaultNode: <div class={`${COMPONENT_NAME.value}__loading-tips`}>{t(globalConfig.value.loadingText)}</div>,
          })}
        {renderTNodeJSX('panelBottomContent')}
      </div>
    );
  },
});
