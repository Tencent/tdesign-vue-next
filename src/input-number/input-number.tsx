import { computed, defineComponent } from 'vue';
import { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import TInput from '../input';
import props from './props';

// hooks
import { usePrefixClass } from '../hooks/useConfig';
import useComponentComputed from './useComponentComputed';

export default defineComponent({
  name: 'TInputNumber',
  components: {
    AddIcon,
    RemoveIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    TButton,
    TInput,
  },
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('input-number');

    const {
      reduceEvents,
      addEvents,
      componentWrapClasses,
      inputEvents,
      inputAttrs,
      displayValue,
      addClasses,
      reduceClasses,
      handleInput,
    } = useComponentComputed(COMPONENT_NAME, props);

    const decreaseIcon = computed(() =>
      props.theme === 'column' ? <chevron-down-icon size={props.size} /> : <remove-icon size={props.size} />,
    );
    const increaseIcon = computed(() =>
      props.theme === 'column' ? <chevron-up-icon size={props.size} /> : <add-icon size={props.size} />,
    );

    return () => (
      <div class={componentWrapClasses.value}>
        {props.theme !== 'normal' && (
          <t-button
            class={reduceClasses.value}
            {...reduceEvents.value}
            variant="outline"
            shape="square"
            v-slots={{
              icon: () => decreaseIcon.value,
            }}
          />
        )}

        <t-input
          {...inputAttrs.value}
          {...inputEvents.value}
          {...props.inputProps}
          value={displayValue.value}
          onChange={(val: string, { e }: { e: InputEvent }) => handleInput(val, e)}
        />
        {props.theme !== 'normal' && (
          <t-button
            class={addClasses.value}
            {...addEvents.value}
            variant="outline"
            shape="square"
            v-slots={{
              icon: () => increaseIcon.value,
            }}
          />
        )}
      </div>
    );
  },
});
