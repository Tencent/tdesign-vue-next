import { defineComponent, VNode, PropType } from 'vue';
import { prefix } from '../../config';
import { SearchOption } from '../interface';
import TIconSearch from '../../icon/search';
import TInput from '../../input';

const name = `${prefix}-transfer-search`;

export default defineComponent({
  name,
  props: {
    value: {
      type: String,
      default: '',
    },
    search: {
      type: [Boolean, Object] as PropType<SearchOption>,
    },
    placeholder: String,
  },
  emits: ['change'],
  methods: {
    handleChange(value: string, changeCtx: any) {
      this.$emit('change', {
        value,
        e: changeCtx.e,
      });
    },
  },
  render(): VNode {
    const { value, search, placeholder } = this;
    const inputProps = typeof search === 'object' ? search : {
      clearable: true,
    };

    return (
      <div class="t-transfer-list-search-wrapper" >
        <TInput
          { ...inputProps }
          defaultValue={value}
          onChange={this.handleChange}
          placeholder={placeholder}
        >
          <TIconSearch slot="suffix-icon" />
        </TInput>
      </div>
    );
  },
});
