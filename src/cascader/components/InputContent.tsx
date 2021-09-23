import { defineComponent, Transition } from 'vue';
import { prefix } from '../../config';
import CLASSNAMES from '../../utils/classnames';

// component
import Tag from '../../tag';
import Input from '../../input';
import CloseCircleFilledIcon from '../../icon/close-circle-filled';

// type
import { ClassName } from '../../common';
import { TreeNodeValue } from '../../_common/js/tree/types';
import {
  CascaderContextType,
  InputContentProps,
  InnerContentProps,
  ContentProps,
  SuffixIconProps,
  TreeNode,
} from '../interface';
import CascaderProps from '../props';

const name = `${prefix}-cascader`;

export default defineComponent({
  name: `${name}-input-content`,
  components: {
    Tag,
    Input,
    CloseCircleFilledIcon,
  },
  props: {
    cascaderContext: {
      type: Object,
    },
    placeholder: CascaderProps.placeholder,
    listeners: {
      type: Object,
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
      const {
        visible,
      } = this.cascaderContext;
      return [
        `${name}-icon`,
        {
          [CLASSNAMES.STATUS.visible]: visible,
        },
      ];
    },
    arrowClass(): ClassName {
      const { visible } = this.cascaderContext;
      return [
        `${name}-icon`,
        `${prefix}-fake-arrow`,
        {
          [`${prefix}-fake-arrow--active`]: visible,
        }];
    },
    cascaderInnerClasses(): ClassName {
      const {
        disabled,
        visible,
        size,
        multiple,
      } = this.cascaderContext;
      return [
        `${name}`,
        {
          [CLASSNAMES.STATUS.disabled]: disabled,
          [CLASSNAMES.STATUS.active]: visible,
          [CLASSNAMES.SIZE[size]]: size,
          [`${name}-is-multiple`]: multiple,
        },
      ];
    },
    showClose() {
      const {
        isHover,
        cascaderContext: {
          multiple, model, disabled, clearable,
        },
      } = this;
      return !!(
        clearable
        && isHover
        && !disabled
        && ((!multiple && model) || (multiple && (model as TreeNodeValue[]).length))
      );
    },
    showPlaceholder() {
      const { cascaderContext: { model, filterable, visible } } = this;
      const valEmpty = (typeof model === 'string' && model === '') || (Array.isArray(model) && !model.length) || model === null;
      if (filterable) {
        return valEmpty && !visible;
      }
      return valEmpty;
    },
    singleContent() {
      const {
        cascaderContext: {
          model, multiple, treeStore, showAllLevels,
        },
      } = this;
      if (multiple || !model) return;
      const node = treeStore && treeStore.getNodes(model as TreeNodeValue | TreeNode);
      if (!(node && node.length)) {
        return;
      }
      const path = node && node[0].getPath();
      if (path && path.length) {
        return showAllLevels ? path.map((node: TreeNode) => node.label).join(' / ') : path[path.length - 1].label;
      }
      return model as string;
    },
    multipleContent() {
      const {
        cascaderContext: {
          model, multiple, treeStore,
        },
      } = this;
      if (!multiple) return;
      const node = treeStore && treeStore.getNodes(model as TreeNodeValue | TreeNode);
      if (!node) return [];
      const path = (model as TreeNodeValue[]).map((item: TreeNodeValue) => {
        const node = treeStore.getNodes(item);
        return node[0];
      });
      if (model && (model as TreeNodeValue[]).length) {
        return path && path.length ? path : (model as TreeNode[]);
      }
      return [];
    },
  },
  methods: {
    renderContent() {
      const {
        placeholder, cascaderContext, listeners, showPlaceholder,
      } = this;

      const content = !showPlaceholder ? (
        this.InnerContent()
      ) : (
      <span className={`${prefix}-cascader-placeholder`}>{placeholder || '请选择'}</span>
      );
      return content;
    },
    InnerContent() {
      const {
        cascaderContext, listeners, placeholder, singleContent, multipleContent, inputVal,
      } = this;
      const {
        multiple,
        model,
        treeStore,
        size,
        showAllLevels,
        disabled,
        setModel,
        filterable,
        setTreeNodes,
        filterActive,
        setFilterActive,
        visible,
      } = cascaderContext;

      const handleRemoveTag = (e: Event, node: TreeNode) => {
        if (disabled) return;
        e.stopPropagation && e.stopPropagation();
        const checked = node.setChecked(!node.isChecked());
        setModel(checked);
      };

      const generalContent = !multiple ? (
        <span className={`${prefix}-cascader-content`}>{singleContent}</span>
      ) : (
        <>
          {multipleContent.map((node: TreeNode, index) => (
            <Tag
              key={index}
              closable
              disabled={disabled}
              onClose={(ctx) => {
                const { e } = ctx;
                handleRemoveTag(e, node);
              }}
              size={size}
            >
              {node.label}
            </Tag>
          ))}
        </>
      );

      const filterContent = (
        <Input
          placeholder={singleContent || placeholder}
          value={inputVal}
          onChange={(value: string) => {
            this.inputVal = value;
            setFilterActive(!!value);
          }}
          autofocus
        />
      );

      return filterable && visible ? filterContent : generalContent;
    },
    renderSuffixIcon() {
      const {
        showClose,
        iconClass,
        cascaderContext: {
          setVisible, setModel, treeStore, multiple, size,
        },
      } = this;

      const closeIconClick = (e: Event) => {
        e.stopPropagation();
        setModel(multiple ? [] : '');
        treeStore.resetChecked();
        treeStore.resetExpanded();
        setVisible(false);

        this.$emit('change', multiple ? [] : '', { e });
      };

      if (showClose) {
        return <transition name={`${prefix}-cascader-close-icon-fade`} appear>
          <CloseCircleFilledIcon class={iconClass} size={size} onClick={closeIconClick} />
        </transition>;
      }

      return (
        <svg class={this.arrowClass} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 5.7998L7.99274 10.0425L12.2361 5.79921" stroke="black" stroke-opacity="0.9" stroke-width="1.3"/>
        </svg>
      );
    },
    onInputClick(e: Event) {
      const {
        cascaderContext: {
          visible, disabled, filterable, filterActive,
        },
      } = this;
      e.preventDefault();
    },
  },
  render() {
    const { $attrs } = this;

    return <div
      class={this.cascaderInnerClasses}
      {...$attrs}
      onMouseEnter={() => {
        this.isHover = true;
      }}
      onMouseLeave={() => {
        this.isHover = false;
      }}
      onClick={this.onInputClick}
    >
      {this.renderContent()}
      {this.renderSuffixIcon()}
    </div>;
  },
});
