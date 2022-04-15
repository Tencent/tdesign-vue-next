import { Ref, ref, toRefs } from 'vue';
import { ChangeSource, TdInputNumberProps } from './type';
import useDefaultValue from '../hooks/useDefaultValue';

type ChangeContextEvent = InputEvent | MouseEvent | FocusEvent;

export default function useInputAction(props: TdInputNumberProps, digitsNum: Ref<number>) {
  const userInput = ref(null);
  const { value } = toRefs(props);
  const [innerValue, setInnerValue] = useDefaultValue(value, props.defaultValue, props.onChange, 'value');

  const clearInput = () => (userInput.value = '');

  const handleChange = (value: number, ctx: { type: ChangeSource; e: ChangeContextEvent }) => {
    const v = Number(value.toFixed(digitsNum.value));
    setInnerValue(v, { type: ctx.type, e: ctx.e });
  };

  const handleAction = (value: number, actionType: ChangeSource, e: ChangeContextEvent) => {
    if (actionType !== 'input') {
      clearInput();
    }
    handleChange(value, { type: actionType, e });
  };

  return {
    handleAction,
    innerValue,
    userInput,
  };
}
