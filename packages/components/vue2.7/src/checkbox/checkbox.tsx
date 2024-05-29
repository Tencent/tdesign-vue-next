import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import props from '@td/components/checkbox/props';
import {
  useCommonClassName,
  useDisabled,
  useElementLazyRender,
  usePrefixClass,
  useTNodeJSX,
  useVModel,
} from '@td/adapter-hooks';
import { CheckboxGroupInjectionKey } from './constants';
import { getCheckboxStore } from './store';
import type { ObserverListenerParams } from './store';
import useKeyboardEvent from './hooks/useKeyboardEvent';

export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...props,
    stopLabelTrigger: Boolean,
    storeKey: String,
    index: Number,
    // 传递给 Checkbox 组件额外的数据
    data: Object,
  },

  model: {
    prop: 'checked',
    event: 'change',
  },

  setup(props) {
    const { storeKey } = toRefs(props);
    const checkboxStore = computed(() => getCheckboxStore(storeKey.value));
    const labelRef = ref<HTMLElement>();
    const { STATUS } = useCommonClassName();
    const checkboxGroupExist = ref(false);
    const renderTNodeJSX = useTNodeJSX();

    const {
      checked,
      indeterminate,
      disabled,
      value,
      lazyLoad,
      label,
      data,
    } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      checked,
      props.defaultChecked,
      props.onChange,
      'change',
      'checked',
    );

    const checkboxGroupData = inject(CheckboxGroupInjectionKey, undefined);

    // checked
    const tIndeterminate = ref(false);
    const tChecked = ref(false);
    const handleParentCheckedChange = ({
      parentIsCheckAll,
      parentChecked,
      parentIsIndeterminate,
    }: ObserverListenerParams) => {
      const { value, checkAll } = props;
      if (checkAll) {
        tChecked.value = parentIsCheckAll;
        tIndeterminate.value = parentIsIndeterminate;
      } else {
        tChecked.value = parentChecked.includes(value);
      }
      checkboxGroupExist.value = checkboxStore.value.parentExist;
    };

    watch(
      [innerChecked, checkboxStore],
      () => {
        // CheckboxGroup does not exist, self checked works
        if (checkboxStore.value?.parentExist) {
          checkboxGroupExist.value = true;
        } else {
          tChecked.value = innerChecked.value;
        }
      },
      { immediate: true },
    );

    watch(
      [indeterminate, checkboxStore],
      ([val, checkboxStore]) => {
        // CheckboxGroup does not exist, self indeterminate works
        if (!checkboxStore?.parentExist) {
          tIndeterminate.value = val;
        }
      },
      { immediate: true },
    );

    const tName = ref<string>();

    // Warn: Do not use computed to set tDisabled
    // Priority: Form.disabled < CheckboxGroup.disabled < Checkbox.disabled
    const tDisabled = ref<boolean>();
    const isDisabled = useDisabled();
    const handleParentDisabled = ({ parentDisabled, parentMaxExceeded }: ObserverListenerParams) => {
      const { checkAll, disabled } = props;
      if (!checkAll && !tChecked.value && parentMaxExceeded) {
        tDisabled.value = true;
        return;
      }
      if (disabled !== undefined) {
        tDisabled.value = disabled;
        return;
      }
      if (parentDisabled !== undefined) {
        tDisabled.value = parentDisabled;
        return;
      }
      tDisabled.value = disabled;
    };

    watch([checkboxStore], () => {
      if (!checkboxStore.value?.parentExist) {
        tDisabled.value = props.disabled;
      }
    });

    watch(
      [disabled],
      ([val]) => {
        tDisabled.value = val;
      },
      { immediate: true },
    );

    /** update labelClasses, do not use computed to get labelClasses */
    const COMPONENT_NAME = usePrefixClass('checkbox');
    const labelClasses = ref([]);

    watch(
      [tChecked, tIndeterminate],
      ([tChecked, tIndeterminate]) => {
        labelClasses.value = [
          `${COMPONENT_NAME.value}`,
          {
            [STATUS.value.checked]: tChecked,
            [STATUS.value.indeterminate]: tIndeterminate,
          },
        ];
      },
      { immediate: true },
    );

    const subscribeParentData = (val: string | number | boolean) => {
      checkboxStore.value.subscribe(val, (data: ObserverListenerParams) => {
        if (data.type === 'checked') {
          handleParentCheckedChange(data);
        } else if (data.type === 'checkbox') {
          /**
           * checked state can influence disabled state because of `max`,
           * therefore we need to update disabled state after checked state changed
           */
          nextTick(() => {
            handleParentDisabled(data);
          });
          if (data.checkboxName) {
            tName.value = data.checkboxName;
          }
        }
      });
    };

    watch(
      [data, label, storeKey],
      () => {
        if (!storeKey.value) {
          return;
        }
        if (!tChecked.value && checkboxStore.value?.parentChecked?.includes(props.value)) {
          tChecked.value = true;
        }
        subscribeParentData(props.checkAll ? 'CHECK_ALL' : value.value);
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      checkboxStore.value?.unSubscribe(props.checkAll ? 'CHECK_ALL' : value.value);
    });

    const handleChange = (e: Event) => {
      if (props.readonly) {
        return;
      }
      const checked = !tChecked.value;
      setInnerChecked(checked, { e });
      if (checkboxGroupData?.value.onCheckedChange) {
        checkboxGroupData.value.onCheckedChange({
          checked,
          checkAll: props.checkAll,
          e,
          option: props,
        });
      }
    };

    const handleLabelClick = (e: MouseEvent) => {
      // 在tree等组件中使用  阻止label触发checked 与expand冲突
      if (props.stopLabelTrigger) {
        e.preventDefault();
      }
    };

    const { showElement: showCheckbox } = useElementLazyRender(labelRef, lazyLoad);

    const { onCheckboxFocus, onCheckboxBlur } = useKeyboardEvent(handleChange);

    return () => {
      const disabled = tDisabled.value ?? isDisabled.value;
      const classes = labelClasses.value.concat({ [STATUS.value.disabled]: disabled });
      const slotsPrams = {
        data: data.value,
        index: props.index,
      };

      return (
        <label
          ref="labelRef"
          class={classes}
          tabindex={disabled ? undefined : '0'}
          onFocus={onCheckboxFocus}
          onBlur={onCheckboxBlur}
        >
          {!showCheckbox.value
            ? null
            : [
              <input
                type="checkbox"
                class={`${COMPONENT_NAME.value}__former`}
                disabled={disabled}
                readonly={props.readonly}
                indeterminate={tIndeterminate.value}
                name={tName.value || props.name || undefined}
                value={value.value ? value.value : undefined}
                checked={tChecked.value}
                onChange={handleChange}
                key="input"
                tabindex="-1"
              >
              </input>,
              <span class={`${COMPONENT_NAME.value}__input`} key="input-span"></span>,
              <span class={`${COMPONENT_NAME.value}__label`} key="label" onClick={handleLabelClick}>
                {renderTNodeJSX('default', { params: slotsPrams })
                || renderTNodeJSX('label', { params: slotsPrams, slotFirst: checkboxGroupExist.value })}
              </span>,
              ]}
        </label>
      );
    };
  },
});
