import { computed, defineComponent, ref, watch } from 'vue';
import { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import TInput from '../input';
import props from './props';
import { TdInputNumberProps } from './type';

// hooks
import { usePrefixClass } from '../hooks/useConfig';
import useInputNumberAction from './useInputNumberAction';
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

    const { reduceEvents, addEvents, componentWrapClasses, inputEvents, inputAttrs, displayValue, isError } =
      useComponentComputed(COMPONENT_NAME, props);

    const { addClasses, reduceClasses, handleInput } = useInputNumberAction(COMPONENT_NAME, props, isError);
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
