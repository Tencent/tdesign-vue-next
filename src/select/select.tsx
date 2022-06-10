import { defineComponent, provide, computed, toRefs, watch } from 'vue';
import picker from 'lodash/pick';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';

import FakeArrow from '../common-components/fake-arrow';
import SelectInput from '../select-input';
import SelectPanel from './select-panel';

import props from './props';
import { TdSelectProps, SelectValue } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';
import useDefaultValue from '../hooks/useDefaultValue';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey, getSingleContent, getMultipleContent } from './helper';
import { useSelectOptions } from './hooks';

export default defineComponent({
  name: 'TSelect',
  props: { ...props },
  setup(props, { slots }) {
    const disabled = useFormDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('select');
    const { global, t } = useConfig('select');

    const { popupVisible, inputValue, modelValue, value } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [innerInputValue, setInputValue] = useDefaultValue(
      inputValue,
      props.defaultInputValue,
      props.onInputChange,
      'inputValue',
    );
    const [innerPopupVisible, setInnerPopupVisible] = useDefaultValue(
      popupVisible,
      false,
      (...args: any[]) => {
        props.onPopupVisibleChange?.(args);
        props.onVisibleChange?.(args);
      },
      'popupVisible',
    );

    const { options, optionsMap } = useSelectOptions(props);

    const placeholderText = computed(
      () =>
        ((!props.multiple && innerPopupVisible.value && getSingleContent(innerValue.value, props.options)) ||
          props.placeholder) ??
        t(global.value.placeholder),
    );

    // selectInput 展示值
    const displayText = computed(() =>
      props.multiple
        ? getMultipleContent(innerValue.value as SelectValue[], options.value)
        : getSingleContent(innerValue.value, options.value),
    );

    // valueDisplayParmas参数
    const valueDisplayParmas = computed(() => {
      return props.multiple
        ? (innerValue.value as SelectValue[]).map((value) => ({
            value,
            label: optionsMap.value.get(value as string),
          }))
        : innerValue.value;
    });

    const isFilterable = computed(() => {
      return Boolean(props.filterable || isFunction(props.filter));
    });

    // 移除tag
    const removeTag = (index: number, e?: MouseEvent) => {
      e && e.stopPropagation();
      (innerValue.value as SelectValue[]).splice(index, 1);
      setInnerValue(innerValue.value, { e, trigger: 'clear' });
      props.onRemove?.({
        value: '',
        data: '',
        e,
      });
    };

    const handleCreate = () => {
      if (!innerInputValue.value) return;
      props.onCreate?.(innerInputValue.value);
      setInputValue('');
    };

    const SelectProvide = computed(() => ({
      slots,
      max: props.max,
      multiple: props.multiple,
      selectValue: innerValue.value,
      reserveKeyword: props.reserveKeyword,
      handleValueChange: setInnerValue,
      handlerInputChange: setInputValue,
      handlePopupVisibleChange: setInnerPopupVisible,
      handleCreate,
      size: props.size,
    }));

    provide(selectInjectKey, SelectProvide);

    watch(
      innerValue,
      () => {
        // 参数类型检测与修复
        if (!props.multiple && isArray(innerValue.value)) {
          innerValue.value = '';
        }
        if (props.multiple && !isArray(innerValue.value)) {
          innerValue.value = [];
        }
      },
      {
        immediate: true,
      },
    );

    return () => {
      const { overlayClassName, ...restPopupProps } = (props.popupProps || {}) as TdSelectProps['popupProps'];
      return (
        <div class={`${COMPONENT_NAME.value}__wrap`}>
          <SelectInput
            {...{
              autoWidth: props.autoWidth,
              readonly: props.readonly,
              borderless: props.borderless || !props.bordered,
              multiple: props.multiple,
              clearable: props.clearable,
              loading: props.loading,
              minCollapsedNum: props.minCollapsedNum,
            }}
            class={COMPONENT_NAME.value}
            value={displayText.value}
            disabled={disabled.value}
            popupVisible={innerPopupVisible.value}
            inputValue={innerInputValue.value}
            placeholder={placeholderText.value}
            allowInput={innerPopupVisible.value && isFilterable.value}
            collapsed-items={props.collapsedItems}
            inputProps={{
              size: props.size,
              bordered: props.bordered,
              ...(props.inputProps as TdSelectProps['inputProps']),
            }}
            tagInputProps={{
              size: props.size,
              ...(props.tagInputProps as TdSelectProps['tagInputProps']),
            }}
            onTagChange={(val, ctx) => {
              removeTag(ctx.index);
            }}
            tagProps={props.tagProps as TdSelectProps['tagProps']}
            popupProps={{
              overlayClassName: [`${COMPONENT_NAME.value}__dropdown`, ['narrow-scrollbar'], overlayClassName],
              ...restPopupProps,
            }}
            label={() => renderTNodeJSX('prefixIcon')}
            suffixIcon={() =>
              props.showArrow && (
                <FakeArrow
                  overlayClassName={`${COMPONENT_NAME.value}__right-icon`}
                  isActive={innerPopupVisible.value}
                />
              )
            }
            valueDisplay={() =>
              renderTNodeJSX('valueDisplay', {
                params: { value: valueDisplayParmas.value, onClose: (index: number) => removeTag(index) },
              })
            }
            onPopupVisibleChange={(val: boolean, context) => {
              setInnerPopupVisible(val, context);
            }}
            onInputChange={(value) => {
              setInputValue(value);
              debounce(() => {
                props.onSearch?.(value);
              }, 300);
            }}
            onClear={({ e }) => {
              setInnerValue(props.multiple ? [] : '');
              props.onClear?.({ e });
            }}
            onEnter={(inputValue, { e }) => {
              props.onEnter?.({ inputValue: innerInputValue.value, e, value: innerValue.value });
              handleCreate();
            }}
            onBlur={(inputValue, { e }) => {
              props.onBlur?.({ e, value: innerValue.value });
            }}
            onFocus={(inputValue, { e }) => {
              props.onFocus?.({ e, value: innerValue.value });
            }}
            {...(props.selectInputProps as TdSelectProps['selectInputProps'])}
            v-slots={{
              panel: () => (
                <SelectPanel
                  {...picker(props, [
                    'size',
                    'multiple',
                    'empty',
                    'loading',
                    'loadingText',
                    'filterable',
                    'creatable',
                    'panelTopContent',
                    'panelBottomContent',
                    'filter',
                  ])}
                  options={options.value}
                  inputValue={innerInputValue.value}
                  v-slots={slots}
                />
              ),
              collapsedItems: slots.collapsedItems,
            }}
          />
        </div>
      );
    };
  },
});
