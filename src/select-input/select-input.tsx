import { computed, defineComponent, ref, toRefs } from 'vue';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';
import Popup, { PopupVisibleChangeContext } from '../popup';
import { prefix } from '../config';
import TagInput, { TagInputValue } from '../tag-input';
import Input from '../input';
import props from './props';
import { TdSelectInputProps, SelectInputKeys, SelectInputChangeContext } from './type';
import { renderTNodeJSX } from '../utils/render-tnode';
import { SelectInputCommonProperties } from './interface';

const DEFAULT_KEYS = {
  label: 'label',
  key: 'key',
  children: 'children',
};

const NAME_CLASS = `${prefix}-select-input`;

const COMMON_PROPERTIES = [
  'clearable',
  'disabled',
  'label',
  'placeholder',
  'readonly',
  'suffix',
  'suffixIcon',
  'onPaste',
];

export default defineComponent({
  name: 'TSelectInput',

  props: { ...props },

  setup(props: TdSelectInputProps) {
    const { onChange } = toRefs(props);
    const iKeys = computed<SelectInputKeys>(() => ({ ...DEFAULT_KEYS, ...props.keys }));
    const tags = computed<TagInputValue>(() => {
      if (!(props.value instanceof Array)) {
        return isObject(props.value) ? [props.value[iKeys.value.label]] : [props.value];
      }
      return props.value.map((item) => {
        return isObject(item) ? item[iKeys.value.label] : item;
      });
    });
    const commonInputProps = computed<SelectInputCommonProperties>(() => pick(props, COMMON_PROPERTIES));
    const tOverlayStyle = computed(() => {
      return (triggerElement: HTMLElement) => ({ width: `${triggerElement.offsetWidth}px` });
    });

    const onTagInputChange = (val: TagInputValue, context: SelectInputChangeContext) => {
      onChange.value?.(val, context);
    };

    return {
      tags,
      commonInputProps,
      tOverlayStyle,
      onTagInputChange,
    };
  },

  render() {
    return (
      <Popup
        trigger={'focus'}
        placement="bottom"
        content={() => renderTNodeJSX(this, 'content')}
        class={NAME_CLASS}
        overlayStyle={this.tOverlayStyle}
        {...this.popupProps}
      >
        {this.variant === 'tag' && (
          <TagInput
            {...this.commonInputProps}
            value={this.tags}
            onChange={this.onTagInputChange}
            onRemove={this.onRemove}
          />
        )}
        {this.variant === 'text' && <Input {...this.commonInputProps} value={this.tags.join()} />}
      </Popup>
    );
  },
});
