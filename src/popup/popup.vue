<template>
  <span>
    <div
      class="el-popover el-popper"
      :class="[popperClass, content && 'el-popover--plain']"
      ref="popper"
      v-show="!disabled && showPopper"
      :style="{ width: width + 'px' }"
      role="tooltip"
      :id="tooltipId"
      :aria-hidden="(disabled || !showPopper) ? 'true' : 'false'"
    >
      <div class="el-popover__title" v-if="title" v-text="title"></div>
      <slot>{{ content }}</slot>
    </div>
    <slot name="reference"></slot>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import config from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import { on, off, addClass, removeClass } from '../utils/dom';

const { prefix } = config;
const name = `${prefix}-popup`;

export default Vue.extend({
  name,
  components: {
    // RenderComponent,
  },
  props: {
    reference: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value: string): boolean {
        return ['hover', 'click', 'focus', 'contextMenu', 'manual'].indexOf(value) > -1;
      },
    },
    content: [String, Function, RenderComponent],
    visibleArrow: {
      type: Boolean,
      default: true,
    },
    getOverlayContainer: {
      type: Function,
      default: (): Node => document.body,
    },
    overlayStyle: Object,
    overlayClassName: String,
    destroyOnHide: {
      type: Boolean,
      default: false,
    },
  },
  data: (): any => ({
    onshowPopper: false,
  }),
  computed: {
    _class(): ClassName {
      return [
        `${name}`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ];
    },
  },
  watch: {
    showPopper(val): any {
      if (this.disabled) {
        return;
      }
      val ? this.$emit('show') : this.$emit('hide');
    },
  },
  mounted() {
    let reference: any = this.reference || this.$refs.reference;
    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
      reference = this.$slots.reference[0].elm;
    }
    // 可访问性
    if (reference) {
      if (this.trigger !== 'click') {
        on(reference, 'focusin', () => {
          this.handleFocus();
          const instance = reference.__vue__;
          if (instance && typeof instance.focus === 'function') {
            instance.focus();
          }
        });
        on(reference, 'focusout', this.handleBlur);
      }
      on(reference, 'keydown', this.handleKeydown);
      on(reference, 'click', this.handleClick);
    }
    if (this.trigger === 'click') {
      on(reference, 'click', this.doToggle);
      on(document, 'click', this.handleDocumentClick);
    } else if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.handleMouseEnter);
      on(reference, 'mouseleave', this.handleMouseLeave);
    } else if (this.trigger === 'focus') {
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', this.doShow);
        on(reference, 'focusout', this.doClose);
      } else {
        on(reference, 'mousedown', this.doShow);
        on(reference, 'mouseup', this.doClose);
      }
    } else if (this.trigger === 'contextMenu') {
      reference.oncontextmenu = (): boolean => false;
      on(reference, 'mousedown', this.handleRightClick);
      on(document, 'click', this.handleDocumentClick);
    }
  },
  beforeDestroy() {
    this.cleanup();
  },
  deactivated() {
    this.cleanup();
  },
  destroyed(): any {
    const reference = this.reference;
    off(reference, 'click', this.doToggle);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'focusin', this.doShow);
    off(reference, 'focusout', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mouseleave', this.handleMouseLeave);
    off(reference, 'mouseenter', this.handleMouseEnter);
    off(document, 'click', this.handleDocumentClick);
  },
  methods: {
    doToggle(): any {
      this.showPopper = !this.showPopper;
    },
    doShow(): any {
      this.showPopper = true;
    },
    doClose(): any {
      this.showPopper = false;
    },
    handleFocus(): any {
      addClass(this.referenceElm, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = true;
    },
    handleClick(): any {
      removeClass(this.referenceElm, 'focusing');
    },
    handleBlur(): any {
      removeClass(this.referenceElm, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') this.showPopper = false;
    },
    handleMouseEnter(): any {
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = true;
        }, this.openDelay);
      } else {
        this.showPopper = true;
      }
    },
    handleKeydown(ev: any): any {
      if (ev.keyCode === 27 && this.trigger !== 'manual') { // esc
        this.doClose();
      }
    },
    handleMouseLeave(): any {
      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.closeDelay);
      } else {
        this.showPopper = false;
      }
    },
    handleDocumentClick(e: Event): any {
      let reference = this.reference || this.$refs.reference;
      const popper = this.popper || this.$refs.popper;
      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.$slots.reference[0].elm;
      }
      if (!this.$el ||
        !reference ||
        this.$el.contains(e.target) ||
        reference.contains(e.target) ||
        !popper ||
        popper.contains(e.target)) return;
      this.showPopper = false;
    },
    handleRightClick(e: Event): any {
      if ((e as any).button === 2) {
        this.showPopper = false;
      }
    },
    handleAfterEnter(): any {
      this.$emit('after-enter');
    },
    handleAfterLeave(): any {
      this.$emit('after-leave');
      this.doDestroy();
    },
    cleanup(): any {
      if (this.openDelay || this.closeDelay) {
        clearTimeout(this._timer);
      }
    },
  },
});

</script>
