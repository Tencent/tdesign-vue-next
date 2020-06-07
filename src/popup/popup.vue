<template>
  <span>
    <div
      :class="overlayClassName"
      ref="popper"
      v-show="!disabled && showPopper"
      :style="overlayStyle"
      role="tooltip"
      :aria-hidden="(disabled || !showPopper) ? 'true' : 'false'"
    >
      {{ content }}
    </div>
    <div ref="reference">
      <slot />
    </div>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import config from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import { on, off, addClass, removeClass } from '../utils/dom';

const stop = (e: Event): any => e.stopPropagation();
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
    showPopper: false,
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
    visible(val): any {
      if (this.trigger === 'manual') {
        this.showPopper = val;
      }
    },
  },
  mounted() {
    this.currentPlacement = this.currentPlacement || this.placement;
    this.popperElm = this.popperElm || this.$refs.popper;
    this.referenceElm = this.referenceElm || this.$refs.reference;
    if (!this.popperElm || !this.referenceElm) return;

    if (this.visibleArrow) this.appendArrow(this.popperElm);

    this.createPopperJS();
    const reference = this.referenceElm;
    const popper = this.popperElm;

    if (this.trigger !== 'click') {
      on(reference, 'focusin', this.handleFocus);
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
  beforeDestroy(): any {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },
  destroyed(): any {
    const reference = this.referenceElm;
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
    createPopperJS(): any {
      const overlayContainer = this.getOverlayContainer();
      overlayContainer.appendChild(this.popperElm);

      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      this.popperJS = createPopper(this.referenceElm, this.popperElm, {
        placement: this.currentPlacement,
        onFirstUpdate: () => {
          this.resetTransformOrigin();
          this.$nextTick(this.updatePopper);
        },
      });
      this.popperElm.addEventListener('click', stop);
    },

    updatePopper(): any {
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
      } else {
        this.createPopperJS();
      }
    },

    doDestroy(forceDestroy: boolean): any {
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper(): any {
      if (this.popperJS) {
        this.resetTransformOrigin();
        if (this.destroyOnHide) {
          this.popperJS.destroy();
          this.popperJS = null;
          this.popperElm.parentNode.removeChild(this.popperElm);
        }
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
      const reference = this.referenceElm;
      const popper = this.popperElm;
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
        this.doToggle();
      }
    },
  },
});

</script>
