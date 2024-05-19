import { computed, defineComponent, nextTick, ref, toRefs } from '@td/adapter-vue';
import type { TdPopupProps } from '@td/intel/components/popup/type';
import { useCommonClassName, useConfig, useContent, usePrefixClass, useTNodeJSX, useVModel } from '@td/adapter-hooks';
import type { ClassName } from '@td/shared/interface';
import type { TdAutoCompleteProps } from '@td/intel/components/auto-complete/type';
import props from '@td/intel/components/auto-complete/props';
import { Input, Popup } from '@td/component';
import type { InputProps, StrInputProps } from '../input';
import AutoCompleteOptionList from './option-list';

export default defineComponent({
  name: 'TAutoComplete',
  props,
  setup(props: TdAutoCompleteProps, { slots }) {
    const { value, modelValue } = toRefs(props);
    const [tValue, setTValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const classPrefix = usePrefixClass();
    const { SIZE } = useCommonClassName();
    const { globalConfig: global } = useConfig('input');

    const popupVisible = ref();
    const optionListRef = ref();

    const getOverlayStyle = (trigger: HTMLElement, popupElement: HTMLElement) => {
      const triggerWidth = trigger.getBoundingClientRect().width || trigger.offsetWidth || trigger.clientWidth;
      const popupWidth
        = popupElement.getBoundingClientRect().width || popupElement.offsetWidth || popupElement.clientWidth;
      return {
        width: triggerWidth >= popupWidth ? `${triggerWidth}px` : 'auto',
        ...props.popupProps?.overlayInnerStyle,
      };
    };

    const classes = computed(() => [`${classPrefix.value}-auto-complete`]);
    const popupClasses = computed(() => {
      let classes: ClassName = [`${classPrefix.value}-select__dropdown`];
      if (props.popupProps?.overlayClassName) {
        classes = classes.concat(props.popupProps.overlayClassName);
      }
      return classes;
    });
    const popupInnerClasses = computed(() => {
      let classes: ClassName = [`${classPrefix.value}-select__dropdown-inner`];
      if (props.popupProps?.overlayInnerClassName) {
        classes = classes.concat(props.popupProps.overlayInnerClassName);
      }
      return classes;
    });

    const onInputChange: StrInputProps['onChange'] = (value, context) => {
      setTValue(value, context);
    };

    const innerInputProps = computed(() => {
      const tProps: InputProps = {
        value: tValue.value,
        size: props.size,
        ...props.inputProps,
      };
      return tProps;
    });

    const onInnerFocus: StrInputProps['onFocus'] = (value, context) => {
      popupVisible.value = true;
      props.onFocus?.({ ...context, value });
      nextTick(() => {
        optionListRef.value?.addKeyboardListener();
      });
    };

    const onInnerBlur: StrInputProps['onBlur'] = (value, context) => {
      props.onBlur?.({ ...context, value });
    };

    const onInnerCompositionend: InputProps['onCompositionend'] = (value, context) => {
      props.onCompositionend?.({ ...context, value });
    };

    const onInnerCompositionstart: InputProps['onCompositionstart'] = (value, context) => {
      props.onCompositionstart?.({ ...context, value });
    };

    const onInnerEnter: StrInputProps['onEnter'] = (value, context) => {
      props.onEnter?.({ ...context, value });
    };

    const onInnerSelect: TdAutoCompleteProps['onSelect'] = (value, context) => {
      if (props.readonly || props.disabled) {
        return;
      }
      popupVisible.value = false;
      setTValue(value, context);
      props.onSelect?.(value, context);
    };

    const onPopupVisibleChange: TdPopupProps['onVisibleChange'] = (visible, { trigger }) => {
      if (trigger !== 'trigger-element-click') {
        popupVisible.value = visible;
      }
    };

    return () => {
      // 触发元素
      const triggerNode = renderContent('default', 'triggerElement') || (
        <Input
          placeholder={props.placeholder ?? global.value.placeholder}
          tips={props.tips}
          status={props.status}
          readonly={props.readonly}
          disabled={props.disabled}
          autofocus={props.autofocus}
          clearable={props.clearable}
          onChange={onInputChange}
          onFocus={onInnerFocus}
          onBlur={onInnerBlur}
          onClear={props.onClear}
          onCompositionend={onInnerCompositionend}
          onCompositionstart={onInnerCompositionstart}
          onEnter={onInnerEnter}
          {...innerInputProps.value}
          v-slots={slots}
        />
      );
      // 联想词列表
      const listContent = (
        <AutoCompleteOptionList
          ref={optionListRef}
          value={tValue.value}
          options={props.options}
          size={props.size}
          sizeClassNames={SIZE.value}
          onSelect={onInnerSelect}
          popupVisible={popupVisible.value}
          highlightKeyword={props.highlightKeyword}
          filterable={props.filterable}
          filter={props.filter}
          v-slots={{ option: slots.option }}
        />
      );
      const topContent = renderTNodeJSX('panelTopContent');
      const bottomContent = renderTNodeJSX('panelBottomContent');
      const panelContent = topContent || props.options?.length || bottomContent
        ? (
          <div class={`${classPrefix.value}-autocomplete__panel`}>
            {topContent}
            {listContent}
            {bottomContent}
          </div>
          )
        : null;
      const popupProps = {
        ...props.popupProps,
        overlayInnerStyle: getOverlayStyle,
        overlayInnerClassName: popupInnerClasses.value,
        overlayClassName: popupClasses.value,
      };
      return (
        <div class={classes.value}>
          <Popup
            visible={popupVisible.value}
            onVisibleChange={onPopupVisibleChange}
            trigger="focus"
            placement="bottom-left"
            hideEmptyPopup={true}
            content={panelContent ? () => panelContent : null}
            {...popupProps}
          >
            {triggerNode}
          </Popup>
        </div>
      );
    };
  },
});
