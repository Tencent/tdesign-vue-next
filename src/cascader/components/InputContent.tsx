import { defineComponent, Transition, PropType } from 'vue';
import isFunction from 'lodash/isFunction';
import { prefix } from '../../config';
import CLASSNAMES from '../../utils/classnames';
import getLocalRecevierMixins from '../../locale/local-receiver';
import mixins from '../../utils/mixins';

// component
import Tag from '../../tag';
import Input from '../../input';
import CloseCircleFilledIcon from '../../icon/close-circle-filled';
import FakeArrow from '../../common-components/fake-arrow';

// common logic
import {
  getIconClass,
  getCascaderInnerClasses,
  getCloseShow,
  getPlaceholderShow,
  getSingleContent,
  getMultipleContent,
  outerClickListenerEffect,
  closeIconClickEffect,
  handleRemoveTagEffect,
  innerContentClickEffect,
} from '../utils/inputContent';

// type
import { ClassName } from '../../common';
import {
  TreeNode, CascaderContextType, InputContentProps,
} from '../interface';
import CascaderProps from '../props';

const name = `${prefix}-cascader`;

export default defineComponent({
  ...mixins(getLocalRecevierMixins('cascader')),

  name: `${name}-input-content`,
  components: {
    Tag,
    Input,
    CloseCircleFilledIcon,
  },
  props: {
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
    placeholder: CascaderProps.placeholder,
    listeners: {
      type: Object as PropType<InputContentProps['listeners']>,
    },
  },
  emits: ['change'],
  data() {
    return {
      isHover: false,
      inputVal: '',
    };
  },
  computed: {
    iconClass(): ClassName {
      return getIconClass(prefix, CLASSNAMES, this.cascaderContext);
    },
    cascaderInnerClasses(): ClassName {
      return getCascaderInnerClasses(prefix, CLASSNAMES, this.cascaderContext);
    },
    closeShow() {
      return getCloseShow(this.isHover, this.cascaderContext);
    },
    singleContent() {
      return getSingleContent(this.cascaderContext);
    },
    multipleContent() {
      return getMultipleContent((this.cascaderContext));
    },
    showPlaceholder() {
      return getPlaceholderShow(this.cascaderContext, this.singleContent, this.multipleContent);
    },
  },
  mounted() {
    document.addEventListener('click', (event) => { this.outerClickListenerFn(event); });
  },
  unmounted() {
    document.removeEventListener('click', (event) => { this.outerClickListenerFn(event); });
  },
  methods: {
    outerClickListenerFn(event: MouseEvent | TouchEvent) {
      return outerClickListenerEffect(this.$refs.inputContent as HTMLElement, this.cascaderContext, event);
    },
    renderContent() {
      const {
        placeholder, showPlaceholder,
      } = this;
      const content = !showPlaceholder ? (
        this.InnerContent()
      ) : (
        <span className={`${prefix}-cascader-placeholder`}>{placeholder || this.t(this.locale.placeholderText)}</span>
      );
      return content;
    },
    InnerContent() {
      const {
        cascaderContext,
        placeholder, singleContent, multipleContent,
        listeners,
      } = this;

      const {
        multiple,
        size,
        disabled,
        filterable,
        setFilterActive,
        visible,
        inputVal,
        setInputVal,
        collapseTags,
      } = cascaderContext;

      const { onFocus, onBlur } = listeners as InputContentProps['listeners'];

      const renderSelfTag = (node: TreeNode, index: number) => <Tag
          closable
          key={index}
          disabled={disabled}
          onClose={(ctx) => {
            ctx.e.stopPropagation();
            handleRemoveTagEffect(cascaderContext, node);
          }}
          size={size}
        >
          {node.label}
        </Tag>;

      const generalContent = !multiple ? (
        <span className={`${prefix}-cascader-content`}>{singleContent}</span>
      ) : (
        <>
          {collapseTags && multipleContent.length > 1 ? (
            <>
              {renderSelfTag(multipleContent[0], 0)}
              <Tag size={size} disabled={disabled}>
                +{multipleContent.length - 1}
              </Tag>
            </>
          ) : (
            multipleContent.map((node: TreeNode, index) => (
              renderSelfTag(node, index)
            ))
          )}
        </>
      );

      const inputPlaceholder = multiple ? multipleContent.map((node) => node.label).join('、') : singleContent;

      const filterContent = (
        <Input
          size={size}
          placeholder={ inputPlaceholder || placeholder || this.t(this.locale.placeholderText)}
          value={inputVal}
          onChange={(value: string) => {
            setInputVal(value);
            setFilterActive(!!value);
          }}
          onFocus={(v, context) => isFunction(onFocus) && onFocus({ inputVal, e: context?.e })}
        onBlur={(v, context) => isFunction(onBlur) && onBlur({ inputVal, e: context?.e })}
          autofocus={visible}
        />
      );

      return filterable && visible ? filterContent : generalContent;
    },
    renderSuffixIcon() {
      const {
        closeShow,
        iconClass,
        cascaderContext: {
          multiple, size, visible, disabled,
        },
        listeners,
      } = this;
      const { onChange } = listeners as InputContentProps['listeners'];

      const closeIconClick = (context: { e: MouseEvent }) => {
        context.e.stopPropagation();

        closeIconClickEffect(this.cascaderContext);

        if (onChange && isFunction(onChange)) {
          onChange(multiple ? [] : '', { e: MouseEvent });
        }
      };

      if (closeShow) {
        return <Transition name={`${prefix}-cascader-close-icon-fade`} appear>
          <CloseCircleFilledIcon class={iconClass} size={size} onClick={closeIconClick}/>
        </Transition>;
      }

      return <FakeArrow overlayClassName={`${name}-icon`} isActive={visible} disabled={disabled} />;
    },
  },
  render() {
    const {
      $attrs, cascaderContext,
    } = this;

    return <div
      ref='inputContent'
      class={this.cascaderInnerClasses}
      {...$attrs}
      onMouseenter={() => {
        this.isHover = true;
      }}
      onMouseleave={() => {
        this.isHover = false;
      }}
      onClick={(e: MouseEvent) => {
        e.preventDefault();
        innerContentClickEffect(cascaderContext);
      }}
    >
      {this.renderContent()}
      {this.renderSuffixIcon()}
    </div>;
  },
});
