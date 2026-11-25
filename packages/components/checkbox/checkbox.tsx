import { defineComponent, ref, toRefs, inject, watch, computed, ComputedRef } from 'vue';
import { isString } from 'lodash-es';
import { Check1Icon as TdCheck1Icon, Remove1Icon as TdRemove1Icon } from 'tdesign-icons-vue-next';
import props from './props';
import {
  useVModel,
  useRipple,
  useContent,
  useDisabled,
  useReadonly,
  usePrefixClass,
  useCommonClassName,
  useGlobalIcon,
} from '@tdesign/shared-hooks';

import { CheckboxGroupInjectionKey } from './constants';
import useCheckboxLazyLoad from './hooks/useCheckboxLazyLoad';
import useKeyboardEvent from './hooks/useKeyboardEvent';

export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...props,
    needRipple: Boolean,
    stopLabelTrigger: Boolean,
    index: Number,
    // 传递给 Checkbox 组件额外的数据
    data: Object,
  },
  setup(props) {
    const { Check1Icon, Remove1Icon } = useGlobalIcon({
      Check1Icon: TdCheck1Icon,
      Remove1Icon: TdRemove1Icon,
    });
    const labelRef = ref<HTMLElement>();
    if (props.needRipple) {
      useRipple(labelRef);
    }
    const { STATUS } = useCommonClassName();

    const { checked, modelValue, lazyLoad } = toRefs(props);

    // 自定义选中载荷值（issue #6979）：设置 customValue 后，onChange 的载荷改为
    // [选中时的值, 未选中时的值]（如 1/0、'yes'/'no'），与 Switch.customValue 语义一致；
    // v-model:checked 仍为布尔，未设置 customValue 时行为完全不变。
    const activeValue = computed(() => {
      if (props.customValue && props.customValue.length > 0) return props.customValue[0];
      return true;
    });
    const inactiveValue = computed(() => {
      if (props.customValue && props.customValue.length > 1) return props.customValue[1];
      return false;
    });
    const proxyOnChange: (value: boolean, context: { e: Event }) => void = (value, context) => {
      // 每次调用时读取最新 props.onChange，保持与 useVModel 原生行为一致的响应性
      const onChange = props.onChange;
      if (props.customValue && props.customValue.length && typeof value === 'boolean') {
        onChange?.(value ? activeValue.value : inactiveValue.value, context);
        return;
      }
      onChange?.(value, context);
    };

    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      proxyOnChange,
      'checked',
    );

    const checkboxGroupData = inject(CheckboxGroupInjectionKey, undefined);

    /**
     * Warn: Do not use computed to set tName,
     * otherwise checkbox group will render all checkbox items on every checked or unchecked.
     */
    const tName = ref<string>();
    watch(
      () => [props.name, checkboxGroupData?.value.name].join('_'),
      () => {
        const name = props.name || checkboxGroupData?.value.name;
        if (name) {
          tName.value = name;
        }
      },
      { immediate: true },
    );

    // checked
    const tChecked = ref(false);
    const getChecked = () => {
      const { value, checkAll } = props;
      if (checkAll) return checkboxGroupData?.value.isCheckAll;
      return checkboxGroupData?.value ? checkboxGroupData.value.checkedValues.includes(value) : innerChecked.value;
    };
    watch(
      () => [
        innerChecked.value,
        checkboxGroupData?.value.isCheckAll,
        checkboxGroupData?.value.checkedValues?.join(','),
      ],
      () => {
        tChecked.value = getChecked();
      },
      { immediate: true },
    );

    //  Checkbox.disabled > CheckboxGroup.disabled > Form.disabled
    const beforeDisabled = computed(() => {
      if (!props.checkAll && !tChecked.value && checkboxGroupData?.value.maxExceeded) {
        return true;
      }
      return null;
    });
    const afterDisabled = computed(() => {
      return checkboxGroupData?.value.disabled;
    });
    const isDisabled = useDisabled({ beforeDisabled, afterDisabled }) as ComputedRef<boolean>;

    //  Checkbox.readonly > CheckboxGroup.readonly > Form.readonly
    const afterReadonly = computed(() => {
      return checkboxGroupData?.value.readonly;
    });
    const isReadonly = useReadonly({ afterReadonly });

    const tIndeterminate = ref(false);
    watch(
      () => [props.checkAll, props.indeterminate, checkboxGroupData?.value.indeterminate],
      () => {
        tIndeterminate.value = props.checkAll ? checkboxGroupData?.value.indeterminate : props.indeterminate;
      },
      { immediate: true },
    );

    /** update labelClasses, do not use computed to get labelClasses */
    const COMPONENT_NAME = usePrefixClass('checkbox');
    const labelClasses = ref({});
    watch(
      [tChecked, isDisabled, tIndeterminate],
      () => {
        labelClasses.value = [
          `${COMPONENT_NAME.value}`,
          {
            [STATUS.value.checked]: tChecked.value,
            [STATUS.value.disabled]: isDisabled.value,
            [STATUS.value.indeterminate]: tIndeterminate.value,
          },
        ];
      },
      { immediate: true },
    );

    const handleChange = (e: Event) => {
      if (isReadonly.value || isDisabled.value) return;
      const checked = !tChecked.value;
      // 自定义选中载荷值场景：onChange 的载荷改为自定义值（如 1/0、'yes'/'no'），
      // 组件内部选中态仍为布尔；未设置 customValue 时行为完全不变（issue #6979）
      setInnerChecked(checked, { e });
      if (checkboxGroupData?.value.handleCheckboxChange) {
        checkboxGroupData.value.onCheckedChange({ checked, checkAll: props.checkAll, e, option: props });
      }
    };

    const renderContent = useContent();

    const handleLabelClick = (e: MouseEvent) => {
      // 在 Tree、Cascader 等组件中使用  阻止 label触发 checked 与非叶子节点的 expand 冲突
      if (props.stopLabelTrigger) e.preventDefault();
    };

    const { showCheckbox } = useCheckboxLazyLoad(labelRef, lazyLoad);
    const { onCheckboxFocus, onCheckboxBlur } = useKeyboardEvent(handleChange);

    return () => {
      const titleAttr = isString(props.title) && props.title ? props.title : null;
      return (
        <label
          ref={labelRef}
          class={labelClasses.value}
          tabindex={isDisabled.value ? undefined : '0'}
          onFocus={onCheckboxFocus}
          onBlur={onCheckboxBlur}
          onClick={handleLabelClick}
          title={titleAttr}
        >
          {!showCheckbox.value
            ? null
            : [
                <input
                  type="checkbox"
                  tabindex="-1"
                  class={`${COMPONENT_NAME.value}__former`}
                  disabled={isDisabled.value}
                  readonly={isReadonly.value}
                  indeterminate={tIndeterminate.value}
                  name={tName.value}
                  value={props.value ? props.value : undefined}
                  checked={tChecked.value}
                  onChange={handleChange}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                  key="input"
                ></input>,
                <span
                  class={`${COMPONENT_NAME.value}__input`}
                  key="input-span"
                  onClick={props.stopLabelTrigger && handleChange} // stopLabelTrigger 情况下，仍需保证真正的 input 触发 change
                >
                  {tIndeterminate.value ? <Remove1Icon /> : <Check1Icon />}
                </span>,
                <span class={`${COMPONENT_NAME.value}__label`} key="label">
                  {renderContent('default', 'label')}
                </span>,
              ]}
        </label>
      );
    };
  },
});
