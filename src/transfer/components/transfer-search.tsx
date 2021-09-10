import { defineComponent, VNode, PropType } from 'vue';
import { prefix } from '../../config';
import { SearchOption } from '../interface';
import TIconSearch from '../../icon/search';
import TInput from '../../input';

const name = `${prefix}-transfer-search`;

export default defineComponent({
  name,
  props: {
    searchValue: {
      type: String,
      default: '',
    },
    search: {
      type: [Boolean, Object] as PropType<SearchOption>,
    },
    placeholder: String,
  },
  emits: ['input', 'search'],
  methods: {
    handleChange(value: string, changeCtx: any) {
      this.$emit('input', {
        value,
        e: changeCtx.e,
      });
    },
    handleEnter(value: string, changeCtx: any) {
      this.$emit('search', {
        value,
        e: changeCtx.e,
      });
    },
  },
  render(): VNode {
    const { searchValue, search, placeholder } = this;
    const inputProps = typeof search === 'object' ? search : {
      clearable: true,
    };

    return (
      <div class="t-transfer-list-search-wrapper" >
        <TInput
          { ...inputProps }
          value={searchValue}
          onChange={this.handleChange}
          on-enter={this.handleEnter}
          placeholder={placeholder}
        >
          <TIconSearch slot="suffix-icon" />
        </TInput>
      </div>
    );
  },
});
