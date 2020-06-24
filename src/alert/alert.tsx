import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import { on, off, addClass } from '../utils/dom';
import RenderComponent from '../utils/render-component';
import IconPromptFill from '../icon/prompt-fill';
import IconSuccessFill from '../icon/success-fill';
import IconWarningFill from '../icon/warning-fill';
import IconClose from '../icon/close';

const name = `${prefix}-alert`;
// const isArray = (o: any): boolean => Object.prototype.toString.call(o) === '[object Array]';
// const isString = (o: any): boolean => Object.prototype.toString.call(o) === '[object String]';

export default Vue.extend({
  name,
  components: {
    RenderComponent,
  },
  props: {
    title: [String, Object, Function],
    message: [String, Object, Array, Function],
    operation: [Object, Function],
    theme: {
      type: String,
      default: 'info',
      validator(v: string): boolean {
        return ['success', 'info', 'warning', 'error'].includes(v)
      }
    },
    icon: {
      type: [Boolean, Object, Function],
      default: false
    },
    close: {
      type: [Boolean, String, Object, Function],
      default: false
    },
    maxLine: {
      type: Number,
      default: 0
    },
    beforeClose: {
      type: Function,
      default: ():Function => ((): boolean | Promise<boolean> => true)
    }
  },
  data () {
    return {
      visible: true,
      swiperIndex: 0
    }
  },
  render(h: CreateElement): VNode {
    const _class = [
      `${name}`,
      `${name}--${this.theme}`,
      {
        [`${name}--hidden`] : !this.visible
      }
    ];
    return (
      <div class={ _class }>
        { this.renderIcon() }
        { this.renderContent() }
        { this.renderClose() }
      </div>
    );
  },
  mounted () {
    on(this.$el, 'transitionend', this.handleCloseEnd)
  },
  beforeDestroy () {
    off(this.$el, 'transitionend', this.handleCloseEnd)
  },
  methods: {
    renderIcon () : VNode {
      let iconContent: VNode;
      if (typeof this.icon === 'function') {
        iconContent = this.icon();
      } else if (this.icon === true) {
        const component = ({
          info: IconPromptFill,
          success: IconSuccessFill,
          warning: IconWarningFill,
          error: IconWarningFill
        })[this.theme]
        iconContent = <component></component>;
      } else {
        iconContent = this.$scopedSlots.icon && this.$scopedSlots.icon(null)[0];
      }
      return iconContent ? <div class={`${name}__icon`}>{ iconContent }</div> : null;
    },

    renderClose () : VNode {
      let closeContent: VNode | string;
      if (typeof this.close === 'string') {
        closeContent = this.close;
      } else if (typeof this.close === 'function') {
        closeContent = this.close();
      } else if (this.close === true) {
        closeContent = <IconClose></IconClose>
      } else {
        closeContent = this.$scopedSlots.close && this.$scopedSlots.close(null)[0];
      }
      return closeContent ? <div class={`${name}__close`} onClick={this.handleClose}> { closeContent}</div> : null;
    },

    renderContent () : VNode {
      return (
        <div class={`${name}__content`}>
          { this.renderTitle() }
          { this.renderMessage() }
        </div>
      )
    },

    renderTitle () : VNode {
      let titleContent: VNode | String;
      if (typeof this.title === 'string') {
        titleContent = this.title;
      } else if (typeof this.title === 'function') {
        titleContent = this.title();
      } else {
        titleContent = this.$scopedSlots.title && this.$scopedSlots.title(null)[0];
      }
      return titleContent ? <div class={`${name}__title`}> { titleContent }</div> : null;
    },

    renderMessage () : VNode {
      let messageContent: VNode | String | VNode[];
      if (typeof this.message === 'string') {
        messageContent = this.message;
      } else if (typeof this.message === 'function') {
        messageContent = this.message();
      } else {
        messageContent = (this.$scopedSlots.message && this.$scopedSlots.message(null)) || (this.$scopedSlots.default && this.$scopedSlots.default(null));
      }

      let operationContent: VNode = this.$scopedSlots.operation && this.$scopedSlots.operation(null)[0];
      return (
        <div class={`${name}__message`}>
          <div class={`${name}__description`}>
            { messageContent }
          </div>
          { operationContent ? (
            <div class={`${name}__operation`}>
              { operationContent }
            </div>
          ) : null }
        </div>
      );
    },

    handleClose () {
      Promise.resolve(this.beforeClose())
        .then(close => {
          if (close === false) return;
          addClass(this.$el, `${name}--closing`);
        })
    },
    handleCloseEnd () {
      this.visible = false;
      this.$emit('closed');
    }
  }
});
