import { defineComponent } from '@td/adapter-vue';
import type { SetupContext } from '@td/adapter-vue';
import {
  AddIcon as TdAddIcon,
  ChevronDownIcon as TdChevronDownIcon,
  ChevronUpIcon as TdChevronUpIcon,
  RemoveIcon as TdRemoveIcon,
} from 'tdesign-icons-vue-next';
import { Button as TButton } from '@td/component';
import props from '@td/intel/components/input-number/props';
import type { TdInputNumberProps } from '@td/intel/components/input-number/type';
import { useGlobalIcon, useTNodeJSX } from '@td/adapter-hooks';
import TInput from '../input';
import useInputNumber from './hooks/useInputNumber';

export default defineComponent({
  name: 'TInputNumber',
  props,
  // 保持纯净（逻辑和节点渲染分开）
  setup(props: TdInputNumberProps, context: SetupContext) {
    const renderTNodeJSX = useTNodeJSX();
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
      const reduceIcon
        = props.theme === 'column' ? <ChevronDownIcon size={props.size} /> : <RemoveIcon size={props.size} />;
      const addIcon = props.theme === 'column' ? <ChevronUpIcon size={props.size} /> : <AddIcon size={props.size} />;
      const status = p.isError.value ? 'error' : props.status;
      const classPrefix = p.classPrefix.value;
      const tipsNode = renderTNodeJSX('tips');

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
            readonly={props.readonly}
            autocomplete="off"
            placeholder={props.placeholder}
            unselectable={props.readonly ? 'on' : 'off'}
            autoWidth={props.autoWidth}
            align={props.align || (props.theme === 'row' ? 'center' : undefined)}
            status={status}
            label={props.label}
            suffix={props.suffix}
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
          {tipsNode && (
            <div class={`${classPrefix}-input__tips ${classPrefix}-tips ${classPrefix}-is-${status}`}>{tipsNode}</div>
          )}
        </div>
      );
    };
  },
});
