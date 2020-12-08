import Vue from 'vue';
import Icon from '../icon';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import bus from './bus';

const name = `${prefix}-dropdown__item`;

export default Vue.extend({
  name,
  props: {
    busId: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    topSplit: {
      type: Boolean,
      default: false,
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: '',
    },
    maxItemWidth: Number,
    minItemWidth: Number,
  },
  data() {
    return {
      focused: false,
    };
  },
  methods: {
    renderIcon(): JsxNode {
      return this.iconName ? <Icon name={this.iconName} /> : '';
    },
    renderSuffix(): JsxNode {
      return this.hasChildren ? <Icon class="children-suffix" name="chevron-right" /> : '';
    },
    handleItemClick(): void {
      if (!this.hasChildren && !this.disabled) {
        bus.$emit(`${this.busId}item-click`, {
          id: this.id,
          path: this.path,
          text: this.text,
        });
      }
    },
    handleMouseover(): void {
      this.focused = true;
      bus.$emit(`${this.busId}submenuShow`, this.path);
    },
    handleMouseleave(): void {
      this.focused = false;
    },
  },
  render() {
    const classes = {
      [`${name}`]: true,
      'has-suffix': this.hasChildren,
      [CLASSNAMES.STATUS.disabled]: this.disabled,
      [CLASSNAMES.STATUS.focused]: this.focused,
      [CLASSNAMES.STATUS.active]: this.active,
      'top-split': this.topSplit,
    };

    return (
      <div class={classes}
        onClick={this.handleItemClick}
        onMouseover={this.handleMouseover}
        onMouseleave={this.handleMouseleave}
      >
        <div class={`${name}__content`} title={this.text}>
          {this.renderIcon()}
          <span class={`${name}__content__text`} style={{
            maxWidth: `${this.maxItemWidth}px`,
            minWidth: `${this.minItemWidth}px`,
          }}>
            {this.text}
          </span>
        </div>
        { this.renderSuffix()}
      </div>
    );
  },
});
