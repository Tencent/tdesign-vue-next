import Vue from 'vue';
import { prefix } from '../config';
import { VNode } from 'vue/types/umd';

const name = `${prefix}-upload-dragger`;

export default Vue.extend({
  name,

  props: {

  },

  data() {
    return {
      target: null,
      dragActive: false,
    };
  },

  methods: {
    handleDrop(event: DragEvent): void {
      event.preventDefault();
      this.$emit('change', event.dataTransfer.files);
      this.$emit('dragleave');
      this.dragActive = false;
    },

    handleDragenter(event: DragEvent): void {
      this.target = event.target;
      event.preventDefault();
      this.$emit('dragenter');
      this.dragActive = true;
    },

    handleDragleave(event: DragEvent): void {
      if (this.target !== event.target) return;
      event.preventDefault();
      this.$emit('dragleave');
      this.dragActive = false;
    },

    handleDragover(): void {
      event.preventDefault();
    },

    renderDefaultDragElement(): VNode {
      const unActiveElement = (
        <div>
          <span class={`${prefix}-upload--dragable--highlight`}>点击上传</span>
          <span>&nbsp;&nbsp;/&nbsp;&nbsp;拖拽到此区域</span>
        </div>
      );
      const activeElement = <div>释放鼠标</div>;
      return (
        <div class={`${prefix}-upload--dragable`}>
          {this.dragActive ? activeElement : unActiveElement}
        </div>
      );
    },
  },

  render(): VNode {
    return (
      <div onDrop={this.handleDrop}
        onDragenter={this.handleDragenter}
        onDragover={this.handleDragover}
        onDragleave={this.handleDragleave}
        style="display: inline-block;">
        {this.$slots.default || this.renderDefaultDragElement()}
      </div>
    );
  },
});
