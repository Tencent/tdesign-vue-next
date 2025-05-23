import { defineComponent, SetupContext } from 'vue';
import {
  AddIcon as TdAddIcon,
  RemoveIcon as TdRemoveIcon,
  ChevronDownIcon as TdChevronDownIcon,
  ChevronUpIcon as TdChevronUpIcon,
} from 'tdesign-icons-vue-next';
import TButton from '../button';
import TInput from '../input';
import props from './props';
import { useGlobalIcon } from '@tdesign/hooks';
import { TdInputNumberProps } from './type';
import useInputNumber from './hooks/useInputNumber';

export default defineComponent({
  name: 'TInputNumber',
  props,
  // 保持纯净（逻辑和节点渲染分开）
  setup(props: TdInputNumberProps, context: SetupContext) {
    const { AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon } = useGlobalIcon({
      AddIcon: TdAddIcon,
      RemoveIcon: TdRemoveIcon,
      ChevronDownIcon: TdChevronDownIcon,
      ChevronUpIcon: TdChevronUpIcon,
    });
    const p = useInputNumber(props);
    const { inputRef } = p;
    context.expose({ ...p });

    return () => {
      const reduceIcon =
        props.theme === 'column' ? <ChevronDownIcon size={props.size} /> : <RemoveIcon size={props.size} />;
      const addIcon = props.theme === 'column' ? <ChevronUpIcon size={props.size} /> : <AddIcon size={props.size} />;
      const status = p.isError.value ? 'error' : props.status;

      return (
        <div class={p.wrapClasses.value}>
          {props.theme !== 'normal' && (
            <TButton
              class={p.reduceClasses.value}
              disabled={p.tDisabled.value}
              onClick={p.handleReduce}
              variant="outline"
              shape="square"
              icon={() => reduceIcon}
            />
          )}
          <TInput
            ref={inputRef}
            disabled={p.tDisabled.value}
            readonly={p.isReadonly.value}
            autocomplete="off"
            placeholder={props.placeholder}
            unselectable={p.isReadonly.value ? 'on' : 'off'}
            autoWidth={props.autoWidth}
            align={props.align || (props.theme === 'row' ? 'center' : undefined)}
            status={status}
            label={props.label}
            suffix={props.suffix}
            tips={props.tips}
            {...p.listeners}
            {...props.inputProps}
            v-slots={context.slots}
            value={p.userInput.value}
            onChange={p.onInnerInputChange}
          />
          {props.theme !== 'normal' && (
            <TButton
              class={p.addClasses.value}
              disabled={p.tDisabled.value}
              onClick={p.handleAdd}
              variant="outline"
              shape="square"
              icon={() => addIcon}
            />
          )}
        </div>
      );
    };
  },
});
