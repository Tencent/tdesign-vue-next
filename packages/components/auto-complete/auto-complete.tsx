import { computed, ref, defineComponent, toRefs, nextTick } from 'vue';
import props from './props';
import { TdAutoCompleteProps } from './type';
import TInput, { InputProps, StrInputProps } from '../input';
import Popup, { PopupProps } from '../popup';
import useCommonClassName from '../hooks/useCommonClassName';
import AutoCompleteOptionList from './option-list';
import useVModel from '../hooks/useVModel';
import { useConfig } from '../config-provider/useConfig';
import { ClassName } from '../common';
import { useContent, useTNodeJSX } from '../hooks';
import { useDisabled } from '../hooks/useDisabled';
import { useReadonly } from '../hooks/useReadonly';

export default defineComponent({
  name: 'TAutoComplete',
  props,
  setup(props: TdAutoCompleteProps, { slots }) {
    const { value, modelValue } = toRefs(props);
    const [tValue, setTValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const { classPrefix, sizeClassNames } = useCommonClassName();
    const { globalConfig: global } = useConfig('input');
    const isDisabled = useDisabled();
    const isReadonly = useReadonly();
    const popupVisible = ref();
    const optionListRef = ref();

    const getOverlayStyle = (trigger: HTMLElement, popupElement: HTMLElement) => {
      const triggerWidth = trigger.getBoundingClientRect().width || trigger.offsetWidth || trigger.clientWidth;
      const popupWidth =
        popupElement.getBoundingClientRect().width || popupElement.offsetWidth || popupElement.clientWidth;
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
      if (isReadonly.value || isDisabled.value) return;
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
      if (isReadonly.value || isDisabled.value) return;
      popupVisible.value = false;
      setTValue(value, context);
      props.onSelect?.(value, context);
    };

    const onPopupVisibleChange: PopupProps['onVisibleChange'] = (visible, { trigger }) => {
      if (isReadonly.value || isDisabled.value) return;
      if (trigger !== 'trigger-element-click') {
        popupVisible.value = visible;
      }
    };

    return () => {
      // 触发元素
      const triggerNode = renderContent('default', 'triggerElement') || (
        <TInput
          borderless={props.borderless}
          placeholder={props.placeholder ?? global.value.placeholder}
          tips={props.tips}
          status={props.status}
          readonly={isReadonly.value}
          disabled={isDisabled.value}
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
      const listContent = Array.isArray(props.options) && (
        <AutoCompleteOptionList
          ref={optionListRef}
          value={tValue.value}
          options={props.options}
          size={props.size}
          sizeClassNames={sizeClassNames}
          onSelect={onInnerSelect}
          popupVisible={popupVisible.value}
          highlightKeyword={props.highlightKeyword}
          filterable={props.filterable}
          filter={props.filter}
          empty={renderTNodeJSX('empty')}
          v-slots={{ option: slots.option }}
        />
      );

      const topContent = renderTNodeJSX('panelTopContent');
      const bottomContent = renderTNodeJSX('panelBottomContent');
      const panelContent =
        topContent || listContent || bottomContent ? (
          <div class={`${classPrefix.value}-auto-complete__panel`}>
            {topContent}
            {listContent}
            {bottomContent}
          </div>
        ) : null;
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
