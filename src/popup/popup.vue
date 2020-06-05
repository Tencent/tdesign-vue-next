<template>
  <span>
    <div
      :class="popperClass"
      ref="popper"
      v-show="!disabled && showPopper"
      :style="{ width: width + 'px' }"
      role="tooltip"
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
import { createPopper } from '@popperjs/core';
import config from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import { on, off, addClass, removeClass } from '../utils/dom';


const { prefix } = config;
const name = `${prefix}-popup`;
const placementMap = {
  top: 'center bottom',
  bottom: 'center top',
  left: 'right center',
  right: 'left center',
  topLeft: 'right bottom',
  topRight: 'left bottom',
  bottomLeft: 'right top',
  bottomRight: 'left top',
  leftTop: 'bottom right',
  leftBottom: 'top right',
  rightTop: 'bottom left',
  rightBottom: 'top left',
};

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
      default: 'top',
      validator(value: string): boolean {
        return Object.keys(placementMap).indexOf(value) > -1;
      },
    },
    visible: {
      type: Boolean,
      default: true,
    },
    trigger: {
      type: String,
      default: 'hover',
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
    currentPlacement: '',
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
      if (val) {
        this.updatePopper();
      } else {
        this.destroyPopper();
      }
      this.$emit('visibleChange', val);
    },
  },
  mounted() {
    this.currentPlacement = this.currentPlacement || this.placement;

    let reference: any = this.reference || this.$refs.reference;
    const popper = this.popper || this.$refs.popper;
    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
      reference = this.$slots.reference[0].elm;
    }
    // 可访问性
    if (reference) {
      return;
    }
    if (this.trigger !== 'click') {
      on(reference, 'focusin', () => {
        this.handleFocus();
        const instance = reference.__vue__;
        if (instance && typeof instance.focus === 'function') {
          instance.focus();
        }
      });
      on(popper, 'focusin', this.handleFocus);
      on(reference, 'focusout', this.handleBlur);
      on(popper, 'focusout', this.handleBlur);
    }
    on(reference, 'keydown', this.handleKeydown);
    on(reference, 'click', this.handleClick);

    if (this.trigger === 'click') {
      on(reference, 'click', this.doToggle);
      on(document, 'click', this.handleDocumentClick);
    } else if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.doShow);
      on(popper, 'mouseenter', this.doShow);
      on(reference, 'mouseleave', this.doClose);
      on(popper, 'mouseleave', this.doClose);
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
  destroyed(): any {
    const reference = this.reference;
    off(reference, 'click', this.doToggle);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'focusin', this.doShow);
    off(reference, 'focusout', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mouseleave', this.doClose);
    off(reference, 'mouseenter', this.doShow);
    off(document, 'click', this.handleDocumentClick);
  },
  methods: {
    createPopper(): any {
      if (this.$isServer) return;
      this.currentPlacement = this.currentPlacement || this.placement;

      const options = this.popperOptions;
      this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

      if (!this.referenceElm &&
        this.$slots.reference &&
        this.$slots.reference[0]) {
        this.referenceElm = this.$slots.reference[0].elm;
      }

      if (!this.popperElm || !this.referenceElm) return;
      if (this.visibleArrow) this.appendArrow(this.popperElm);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      options.placement = this.currentPlacement;
      options.offset = this.offset;
      options.arrowOffset = this.arrowOffset;
      this.popperJS = createPopper(this.referenceElm, this.popperElm, options);
      this.popperJS.onCreate(() => {
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperElm.addEventListener('click', stop);
    },

    updatePopper(): any {
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
      } else {
        this.createPopper();
      }
    },

    doDestroy(forceDestroy: boolean): any {
      /* istanbul ignore if */
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper(): any {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },

    resetTransformOrigin(): any {
      if (!this.transformOrigin) return;

      const placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      const originPlacement = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === 'string'
        ? this.transformOrigin : originPlacement;
    },

    appendArrow(element: Element): any {
      if (this.appended) {
        return;
      }

      this.appended = true;

      const arrow = document.createElement('div');

      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    },

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
    handleKeydown(ev: any): any {
      if (ev.keyCode === 27 && this.trigger !== 'manual') { // esc
        this.doClose();
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
  },
});

</script>
