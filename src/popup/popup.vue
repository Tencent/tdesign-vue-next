<template>
  <div :class="name+'-reference'" ref="reference">
    <transition :name="`${name}_animation`" appear >
      <div
        :class="name"
        ref="popper"
        v-show="!disabled && showPopper"
        role="tooltip"
        :aria-hidden="(disabled || !showPopper) ? 'true' : 'false'"
      >
        <div :class="_class" :style="overlayStyle">
          <slot name="content">
            <template v-if="typeof content === 'string'">{{content}}</template>
            <render-component :render='content' v-else-if="typeof content === 'function'" />
          </slot>
          <div v-if="showArrow" :class="name+'__arrow'" data-popper-arrow></div>
        </div>
      </div>
    </transition>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import config from '../config';
import CLASSNAMES from '../utils/classnames';
import { on, off, addClass, removeClass, getAttach } from '../utils/dom';
import RenderComponent from '../utils/render-component';
import props from '@TdTypes/popup/props';

const stop = (e: MouseEvent): void => e.stopPropagation();
const { prefix } = config;
const name = `${prefix}-popup`;
const placementMap = {
  top: 'top',
  'top-left': 'top-start',
  'top-right': 'top-end',
  bottom: 'bottom',
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
  left: 'left',
  'left-top': 'left-start',
  'left-bottom': 'left-end',
  right: 'right',
  'right-top': 'right-start',
  'right-bottom': 'right-end',
};

export default Vue.extend({
  name,

  components: {
    RenderComponent,
  },

  props: { ...props },

  data() {
    return {
      name,
      showPopper: false,
      currentPlacement: '',
      popperElm: null,
      referenceElm: null,
      resizeSensor: null,
      popperJS: null,
    };
  },
  computed: {
    _class(): ClassName {
      return [
        `${name}-content`,
        {
          [`${name}-content--arrow`]: this.showArrow,
          [CLASSNAMES.STATUS.disabled]: this.disabled,
        },
      ].concat(this.overlayClassName);
    },
    manualTrigger(): boolean {
      return this.trigger.indexOf('manual') > -1;
    },
    hoverTrigger(): boolean {
      return this.trigger.indexOf('hover') > -1;
    },
    clickTrigger(): boolean {
      return this.trigger.indexOf('click') > -1;
    },
    focusTrigger(): boolean {
      return this.trigger.indexOf('focus') > -1;
    },
    contextMenuTrigger(): boolean {
      return this.trigger.indexOf('context-menu') > -1;
    },
  },
  watch: {
    showPopper(val): void {
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
    visible(val): void {
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

    this.createPopperJS();
    const reference = this.referenceElm;
    const popper = this.popperElm;

    if (!this.clickTrigger) {
      on(reference, 'focusin', this.handleFocus);
      on(popper, 'focusin', this.handleFocus);
      on(reference, 'focusout', this.handleBlur);
      on(popper, 'focusout', this.handleBlur);
    }
    on(reference, 'keydown', this.handleKeydown);
    on(reference, 'click', this.handleClick);

    if (this.clickTrigger) {
      on(reference, 'click', this.doToggle);
      on(document, 'click', this.handleDocumentClick);
    }
    if (this.hoverTrigger) {
      on(reference, 'mouseenter', this.doShow);
      on(popper, 'mouseenter', this.doShow);
      on(reference, 'mouseleave', this.doClose);
      on(popper, 'mouseleave', this.doClose);
    }
    if (this.focusTrigger) {
      if (reference.querySelector('input, textarea')) {
        on(reference, 'focusin', this.doShow);
        on(reference, 'focusout', this.doClose);
      } else {
        on(reference, 'mousedown', this.doShow);
        on(reference, 'mouseup', this.doClose);
      }
    }
    if (this.contextMenuTrigger) {
      reference.oncontextmenu = (): boolean => false;
      on(reference, 'mousedown', this.handleRightClick);
      on(document, 'click', this.handleDocumentClick);
    }
    if (this.manualTrigger) {
      this.showPopper = !!this.visible;
    }
  },
  beforeDestroy(): void {
    this.doDestroy(true);
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },
  destroyed(): void {
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
    createPopperJS(): void {
      const overlayContainer = getAttach(this.attach);

      overlayContainer.appendChild(this.popperElm);

      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      this.popperJS = createPopper(this.referenceElm, this.popperElm, {
        placement: placementMap[this.currentPlacement],
        onFirstUpdate: () => {
          this.$nextTick(this.updatePopper);
        },
        modifiers: [
          {
            name: 'arrow',
            options: {
              padding: 5, // 5px from the edges of the popper
            },
          },
        ],
      });
      this.popperElm.addEventListener('click', stop);

      // 监听trigger元素尺寸变化
      this.resizeSensor = new ResizeSensor(this.referenceElm, () => {
        this.popperJS.update();
      });
    },

    updatePopper(): void {
      if (this.popperJS) {
        this.popperJS.update();
      } else {
        this.createPopperJS();
      }
    },

    doDestroy(forceDestroy: boolean): void {
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },

    destroyPopper(): void {
      if (this.popperJS) {
        if (this.destroyOnHide) {
          this.popperJS.destroy();
          this.popperJS = null;
          this.popperElm.parentNode.removeChild(this.popperElm);
        }
      }
    },

    doToggle(): void {
      this.showPopper = !this.showPopper;
    },
    doShow(): void {
      this.showPopper = true;
    },
    doClose(): void {
      this.showPopper = false;
    },
    handleFocus(): void {
      addClass(this.referenceElm, 'focusing');
      if (this.clickTrigger || this.focusTrigger) this.showPopper = true;
    },
    handleClick(): void {
      removeClass(this.referenceElm, 'focusing');
    },
    handleBlur(): void {
      removeClass(this.referenceElm, 'focusing');
      if (this.clickTrigger || this.focusTrigger) this.showPopper = false;
    },
    handleKeydown(ev: KeyboardEvent): void {
      if (ev.keyCode === 27 && this.manualTrigger) { // esc
        this.doClose();
      }
    },
    handleDocumentClick(e: Event): void {
      const reference = this.referenceElm;
      const popper = this.popperElm;
      if (!this.$el || !reference
        || this.$el.contains(e.target as Element)
        || reference.contains(e.target as Node)
        || !popper
        || popper.contains(e.target as Node)) return;
      this.showPopper = false;
    },
    handleRightClick(e: MouseEvent): void {
      if (e.button === 2) {
        this.doToggle();
      }
    },
  },
});

</script>

