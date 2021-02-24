import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-list-item__meta`;

export default Vue.extend({
  name,
  props: {
    avatar: String,
    title: String,
    description: String,
  },
  components: {
    RenderComponent,
  },
  methods: {
    renderPropContent(h: CreateElement, propName: 'title' | 'description' | 'avatar') {
      const propsContent = this[propName];
      if (typeof propsContent === 'string') {
        if (propName === 'title') {
          return <h3 class={`${name}-title`}>{propsContent}</h3>;
        }
        if (propName === 'description') {
          return <p class={`${name}-description`}>{propsContent}</p>;
        }
        if (propName === 'avatar') {
          return (
            <div class={`${name}-avatar`}>
              <img src={this.avatar} alt=""></img>
            </div>
          );
        }
      }
      if (this.$slots[propName]) {
        if (propName === 'title') {
          return <h3 class={`${name}-title`}>{this.$slots[propName]}</h3>;
        }
        if (propName === 'description') {
          return <p class={`${name}-description`}>{this.$slots[propName]}</p>;
        }
        if (propName === 'avatar') {
          return <div class={`${name}-avatar`}>{this.$slots.avatar}</div>;
        }
      }
      return undefined;
    },
  },
  render(h: CreateElement): VNode {
    const propsTitleContent = this.renderPropContent(h, 'title');
    const propsDescContent = this.renderPropContent(h, 'description');
    const propsAvatarContent = this.renderPropContent(h, 'avatar');

    const listItemMetaContent: JsxNode = [
      propsAvatarContent,
      <div class={`${name}-content`}>{[propsTitleContent, propsDescContent]}</div>,
    ];

    return <div class={name}>{listItemMetaContent}</div>;
  },
});
