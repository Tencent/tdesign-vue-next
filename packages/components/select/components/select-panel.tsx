import { computed, defineComponent, inject, Slots, ref } from 'vue';
import { omit } from 'lodash-es';
import { Styles } from '../../common';

import { SelectOption, SelectOptionGroup, TdOptionProps } from '../type';
import Option from '../option';
import OptionGroup from '../option-group';
import TdSelectProps from '../props';

import { useConfig, useTNodeJSX, usePrefixClass, useTNodeDefault } from '@tdesign/shared-hooks';

import { usePanelVirtualScroll } from '../hooks';
import { selectInjectKey } from '../consts';

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
    scroll: TdSelectProps.scroll,
    size: TdSelectProps.size,
  },
  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('select');
    const renderTNodeJSX = useTNodeJSX();
    const renderDefaultTNode = useTNodeDefault();
    const { t, globalConfig } = useConfig('select');
    const tSelect = inject(selectInjectKey);
    const innerRef = ref<HTMLElement>(null);

    const popupContentRef = computed(() => tSelect.value.popupContentRef.value);
    const showCreateOption = computed(() => props.creatable && props.filterable && props.inputValue);
    const displayOptions = computed(() => tSelect.value.displayOptions);

    const { trs, visibleData, handleRowMounted, isVirtual, panelStyle, cursorStyle } = usePanelVirtualScroll({
      scroll: props.scroll,
      popupContentRef,
      options: displayOptions,
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
            if (item.children) {
              return (
                <OptionGroup label={item.group} divider={item.divider}>
                  {renderOptionsContent(item.children)}
                </OptionGroup>
              );
            }
            return (
              <Option
                {...omit(item, 'index', '$index', 'className', 'tagName')}
                {...(isVirtual.value
                  ? {
                      rowIndex: item.$index,
                      trs,
                      scrollType: props.scroll?.type,
                      isVirtual: isVirtual.value,
                      bufferSize: props.scroll?.bufferSize,
                      key: `${item.$index || ''}_${index}_${item.value}`,
                    }
                  : {
                      key: `${index}_${item.value}`,
                    })}
                index={index}
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
      visibleData, // 虚拟滚动的展示数据
      isVirtual,
      displayOptions, // 非虚拟滚动的展示数据
    });

    const renderPanel = (options: SelectOption[], extraStyle?: Styles) => (
      <div
        ref={innerRef}
        class={[
          `${COMPONENT_NAME.value}__dropdown-inner`,
          `${COMPONENT_NAME.value}__dropdown-inner--size-${dropdownInnerSize.value}`,
        ]}
        style={extraStyle}
      >
        {/* create option */}
        {showCreateOption.value && renderCreateOption()}
        {/* loading状态 */}
        {props.loading &&
          renderDefaultTNode('loadingText', {
            defaultNode: <div class={`${COMPONENT_NAME.value}__loading-tips`}>{t(globalConfig.value.loadingText)}</div>,
          })}
        {/* 空状态 */}
        {!props.loading && isEmpty.value && !showCreateOption.value && (
          <div class={`${COMPONENT_NAME.value}__empty`}>{renderTNodeJSX('empty') || t(globalConfig.value.empty)}</div>
        )}
        {!isEmpty.value && renderOptionsContent(options)}
      </div>
    );

    return () => {
      return isVirtual.value ? (
        <>
          {renderTNodeJSX('panelTopContent')}
          <div>
            <div style={cursorStyle.value}></div>
            {renderPanel(visibleData.value, panelStyle.value)}
          </div>
          {renderTNodeJSX('panelBottomContent')}
        </>
      ) : (
        <>
          {renderTNodeJSX('panelTopContent')}
          {renderPanel(displayOptions.value)}
          {renderTNodeJSX('panelBottomContent')}
        </>
      );
    };
  },
});
