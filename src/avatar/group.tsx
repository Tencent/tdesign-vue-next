import { ComponentPublicInstance, defineComponent, provide } from 'vue';
import { prefix } from '../config';
import props from './avatar-group-props';
import { SlotReturnValue, TNodeReturnValue } from '../common';
import Avatar from './avatar';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-avatar-group`;

export default defineComponent({
  name: 'TAvatarGroup',
  components: {
    Avatar,
  },
  props,

  setup(props) {
    provide('avatarGroup', { ...props });

    const renderEllipsisAvatar = (
      context: ComponentPublicInstance,
      children: Array<TNodeReturnValue>,
    ): Array<TNodeReturnValue> => {
      if (children?.length > props.max) {
        const content = setEllipsisContent(context, children);
        const outAvatar = children.slice(0, props.max);
        outAvatar.push(
          <Avatar
            size={props.size}
            icon={isIcon(context) && typeof props.collapseAvatar !== 'string' ? props.collapseAvatar : null}
          >
            {content}
          </Avatar>,
        );
        return [outAvatar];
      }
      return [children];
    };

    const setEllipsisContent = (context: ComponentPublicInstance, children: Array<TNodeReturnValue>) => {
      let content = '';
      if (props.collapseAvatar) {
        if (!isIcon(context)) {
          content = renderContent(context, 'collapseAvatar', 'content');
        }
      } else {
        content = `+${children.length - props.max}`;
      }
      return content;
    };

    const isIcon = (context: ComponentPublicInstance) => {
      const content = renderTNodeJSX(context, 'collapseAvatar');
      return content;
    };

    return {
      renderEllipsisAvatar,
      isIcon,
      setEllipsisContent,
    };
  },
  render() {
    const children: TNodeReturnValue = renderTNodeJSX(this, 'default');
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
      content = [this.renderEllipsisAvatar(this, children as SlotReturnValue[])];
    }
    return <div class={groupClass}>{content}</div>;
  },
});
