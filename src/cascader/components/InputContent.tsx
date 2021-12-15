import { defineComponent, PropType } from 'vue';
import isFunction from 'lodash/isFunction';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../../config';
import CLASSNAMES from '../../utils/classnames';
import getConfigReceiverMixins, { CascaderConfig } from '../../config-provider/config-receiver';
import mixins from '../../utils/mixins';
import { renderTNodeJSX } from '../../utils/render-tnode';

// component
import Tag from '../../tag';
import TLoading from '../../loading';
import Input, { InputValue } from '../../input';
import FakeArrow from '../../common-components/fake-arrow';

// common logic
import {
  getCloseIconClass,
  getFakeArrowIconClass,
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
import { TreeNode, InputContentProps } from '../interface';
import CascaderProps from '../props';

const name = `${prefix}-cascader`;

export default defineComponent({
  ...mixins(getConfigReceiverMixins<CascaderConfig>('cascader')),

  name: `${name}-input-content`,
  components: {
    Tag,
    Input,
    CloseCircleFilledIcon,
  },
  props: {
    cascaderContext: {
      type: Object as PropType<InputContentProps['cascaderContext']>,
    },
    placeholder: CascaderProps.placeholder,
    listeners: {
      type: Object as PropType<InputContentProps['listeners']>,
    },
    collapsedItems: CascaderProps.collapsedItems,
  },
  emits: ['change'],
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    closeIconClass(): ClassName {
      return getCloseIconClass(prefix, CLASSNAMES, this.cascaderContext);
    },
    fakeArrowIconClass(): ClassName {
      return getFakeArrowIconClass(prefix, CLASSNAMES, this.cascaderContext);
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
      return getMultipleContent(this.cascaderContext);
    },
    showPlaceholder() {
      return getPlaceholderShow(this.cascaderContext, this.singleContent, this.multipleContent);
    },
  },
  mounted() {
    document.addEventListener('click', (event) => {
      this.outerClickListenerFn(event);
    });
    this.getInputWidth();
  },
  unmounted() {
    document.removeEventListener('click', (event) => {
      this.outerClickListenerFn(event);
    });
  },
  methods: {
    getInputWidth() {
      const { width } = (this.$refs.inputContent as HTMLElement).getBoundingClientRect();
      const {
        cascaderContext: { setInputWidth },
      } = this;
      setInputWidth(width);
    },
    outerClickListenerFn(event: MouseEvent | TouchEvent) {
      return outerClickListenerEffect(this.$refs.inputContent as HTMLElement, this.cascaderContext, event);
    },
    renderContent() {
      const { placeholder, showPlaceholder } = this;
      const content = !showPlaceholder ? (
        this.InnerContent()
      ) : (
        <span class={`${prefix}-cascader__placeholder`}>{placeholder || this.t(this.global.placeholder)}</span>
      );
      return content;
    },
    InnerContent() {
      const { cascaderContext, placeholder, singleContent, multipleContent, listeners, collapsedItems } = this;

      const {
        multiple,
        size,
        disabled,
        filterable,
        setFilterActive,
        visible,
        inputVal,
        setInputVal,
        minCollapsedNum,
        value,
      } = cascaderContext;

      const { onFocus, onBlur, onRemove } = listeners as InputContentProps['listeners'];

      const renderSelfTag = (node: TreeNode, index: number) => (
        <Tag
          closable={!disabled}
          key={index}
          disabled={disabled}
          onClose={(ctx) => {
            ctx.e.stopPropagation();
            handleRemoveTagEffect(cascaderContext, node, onRemove);
          }}
          size={size}
        >
          {node.label}
        </Tag>
      );
      const renderCollItems = () => {
        const tempList: object[] = [];
        multipleContent.forEach((node: TreeNode) => {
          tempList.push(node.data);
        });
        return tempList;
      };

      const generalContent = !multiple ? (
        <span class={`${prefix}-cascader__content`}>{singleContent}</span>
      ) : (
        <span>
          {minCollapsedNum > 0 && multipleContent.length > minCollapsedNum ? (
            <span>
              {multipleContent
                .slice(0, minCollapsedNum)
                .map((node: TreeNode, index: number) => renderSelfTag(node, index))}

              {collapsedItems || this.$slots.collapsedItems ? (
                renderTNodeJSX(this, 'collapsedItems', {
                  params: {
                    value: renderCollItems(),
                    collapsedSelectedItems: renderCollItems().slice(minCollapsedNum),
                    count: renderCollItems().length - minCollapsedNum,
                  },
                })
              ) : (
                <Tag size={size} disabled={disabled}>
                  +{multipleContent.length - minCollapsedNum}
                </Tag>
              )}
            </span>
          ) : (
            multipleContent.map((node: TreeNode, index: number) => renderSelfTag(node, index))
          )}
        </span>
      );

      const inputPlaceholder = multiple
        ? multipleContent.map((node: TreeNode) => node.label).join('、')
        : singleContent;

      const filterContent = () => (
        <Input
          size={size}
          placeholder={inputPlaceholder || placeholder || this.t(this.locale.placeholderText)}
          value={inputVal}
          onChange={(value: string) => {
            setInputVal(value);
            setFilterActive(!!value);
          }}
          onFocus={(v: InputValue, context: { e: FocusEvent }) =>
            isFunction(onFocus) && onFocus({ value, e: context?.e })
          }
          onBlur={(v: InputValue, context: { e: FocusEvent }) => isFunction(onBlur) && onBlur({ value, e: context?.e })}
          autofocus={visible}
        />
      );

      return filterable && visible ? filterContent() : generalContent;
    },
    renderSuffixIcon() {
      const {
        closeShow,
        closeIconClass,
        fakeArrowIconClass,
        cascaderContext: { size, visible, disabled, loading },
      } = this;

      const closeIconClick = (context: { e: MouseEvent }) => {
        context.e.stopPropagation();

        closeIconClickEffect(this.cascaderContext);
      };

      if (loading) {
        return (
          <span class={`${prefix}-cascader__icon`}>
            <TLoading size="small" />
          </span>
        );
      }
      if (closeShow) {
        return <CloseCircleFilledIcon class={closeIconClass} size={size} onClick={closeIconClick} />;
      }

      return <FakeArrow overlayClassName={fakeArrowIconClass} isActive={visible} disabled={disabled} />;
    },
  },
  render() {
    const { $attrs, cascaderContext } = this;

    return (
      <div
        ref="inputContent"
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
      </div>
    );
  },
});
