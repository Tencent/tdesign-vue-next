import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './avatar-group-props';
import { TNodeReturnValue } from '../common';
import Avatar from './avatar';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-avatar-group`;

export default defineComponent({
  name: 'TAvatarGroup',
  components: {
    Avatar,
  },

  provide(): Record<string, any> {
    return {
      avatarGroup: this,
    };
  },

  props: {
    ...props,
  },

  methods: {
    renderEllipsisAvatar(children: Array<TNodeReturnValue>): Array<TNodeReturnValue> {
      if (children?.length > this.max) {
        const content = this.setEllipsisContent(children);
        const outAvatar = children.slice(0, this.max);
        outAvatar.push(<Avatar size={this.size} icon={this.isIcon() && typeof this.collapseAvatar !== 'string' ? this.collapseAvatar : null}>{content}</Avatar>);
        return [outAvatar];
      }
      return [children];
    },
    setEllipsisContent(children: Array<TNodeReturnValue>) {
      let content: any = '';
      if (this.collapseAvatar) {
        if (!this.isIcon()) {
          content = renderContent(this, 'collapseAvatar', 'content');
        }
      } else {
        content = `+${children.length - this.max}`;
      }
      return content;
    },
    isIcon() {
      const content = renderTNodeJSX(this, 'collapseAvatar');
      return content;
    },
  },
  render() {
    const { $slots } = this;
    const children: TNodeReturnValue = $slots.default && $slots.default(null);
    const { cascading, max } = this.$props;
    const groupClass = [
      `${name}`,
      {
        [`${prefix}-avatar--offset-right`]: cascading === 'right-up',
        [`${prefix}-avatar--offset-left`]: cascading === 'left-up',
      },
    ];
    let content = [children];

    if (max && max >= 0) {
      content = [this.renderEllipsisAvatar(children)];
    }
    return <div class={groupClass}>
      {content}
    </div>;
  },

});
