import { defineComponent, PropType } from 'vue';
import { SearchIcon as TdSearchIcon } from 'tdesign-icons-vue-next';

import { SearchOption, TdTransferProps } from '../types';
import TInput from '../../input';
import { useEventForward, useGlobalIcon, usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TTransferSearch',
  props: {
    value: {
      type: String,
      default: '',
    },
    search: {
      type: [Boolean, Object] as PropType<SearchOption>,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    onChange: Function,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const { SearchIcon } = useGlobalIcon({ SearchIcon: TdSearchIcon });
    const handleChange = (value: string, changeCtx: any) => {
      const { e, trigger } = changeCtx;
      props.onChange?.({
        value,
        e,
        trigger,
      });
    };
    const inputProps: TdTransferProps['search'] = typeof props.search === 'object' ? props.search : { clearable: true };

    const inputEvents = useEventForward(inputProps, {
      onChange: handleChange,
    });

    return () => (
      <div class={`${classPrefix.value}-transfer__search-wrapper`}>
        <TInput defaultValue={props.value} placeholder={props.placeholder} {...inputEvents.value}>
          <SearchIcon slot="suffix-icon" />
        </TInput>
      </div>
    );
  },
});
