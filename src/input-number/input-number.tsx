import { computed, defineComponent } from 'vue';
import { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-vue-next';
import TButton from '../button';
import TInput, { InputProps } from '../input';
import props from './props';

// hooks
import { usePrefixClass } from '../hooks/useConfig';
import useComponentComputed from './useComponentComputed';

export default defineComponent({
  name: 'TInputNumber',
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
      props.theme === 'column' ? <ChevronDownIcon size={props.size} /> : <RemoveIcon size={props.size} />,
    );
    const increaseIcon = computed(() =>
      props.theme === 'column' ? <ChevronUpIcon size={props.size} /> : <AddIcon size={props.size} />,
    );

    return () => (
      <div class={componentWrapClasses.value}>
        {props.theme !== 'normal' && (
          <TButton
            class={reduceClasses.value}
            {...reduceEvents.value}
            variant="outline"
            shape="square"
            v-slots={{
              icon: () => decreaseIcon.value,
            }}
          />
        )}

        <TInput
          {...inputAttrs.value}
          {...inputEvents.value}
          {...(props.inputProps as InputProps)}
          value={displayValue.value}
          onChange={(val: string, { e }: { e: InputEvent }) => handleInput(val, e)}
        />
        {props.theme !== 'normal' && (
          <TButton
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
