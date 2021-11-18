import { defineComponent } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { Styles } from '../common';

const name = `${prefix}-avatar`;

export default defineComponent({
  name: 'TAvatar',
  inject: {
    avatarGroup: {
      default: undefined,
    },
  },

  props: {
    ...props,
  },
  emits: ['error'],

  data() {
    return {
      isImgExist: true,
      gap: 4,
      sizeValue: '',
      scale: '',
    };
  },
  computed: {
    customAvatarSize(): Styles {
      return this.isCustomSize() ? {
        width: this.sizeValue,
        height: this.sizeValue,
        'font-size': `${Number.parseInt(this.sizeValue, 10) / 2}px`,
      } : {};
    },
    customImageSize(): Styles {
      return this.isCustomSize() ? {
        height: this.sizeValue,
        width: this.sizeValue,
      } : {};
    },
    customCharaSize(): Styles {
      return {
        transform: this.scale,
      };
    },
  },

  mounted() {
    const { avatarGroup } = this;
    this.sizeValue = this.size || avatarGroup?.size;
    this.$nextTick(() => {
      this.setScaleParams();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.setScaleParams();
    });
  },

  methods: {
    handleImgLoadError() {
      const { onError, hideOnLoadFailed } = this.$props;
      this.isImgExist = !hideOnLoadFailed;
      onError && onError();
      this.$emit('error');
    },
    setScaleParams() {
      const avater = this.$refs.avatar as HTMLElement;
      const avaterChild = this.$refs.avatarChild as HTMLElement;
      const avaterWidth = avater?.offsetWidth;
      const avaterChildWidth = avaterChild?.offsetWidth;
      if (this.gap * 2 < avaterWidth) {
        this.scale = avaterChildWidth > avaterWidth - this.gap * 2 ? `scale(${(avaterWidth - this.gap * 2) / avaterChildWidth})` : 'scale(1)';
      }
    },
    isCustomSize() {
      return this.sizeValue && !CLASSNAMES.SIZE[this.sizeValue];
    },
  },
  render() {
    let content = renderContent(this, 'default', 'content');
    const icon = renderTNodeJSX(this, 'icon');
    const isIconOnly = icon && !content;
    const { shape, image, alt } = this.$props;
    const avatarClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.sizeValue],
      {
        [`${name}--circle`]: shape === 'circle',
        [`${name}--round`]: shape === 'round',
        [`${name}__icon`]: !!isIconOnly,
      },
    ];
    content = <span ref='avatarChild' style={{ ...this.customCharaSize }}>{ content }</span>;
    if (icon) {
      content = [
        icon,
        !isIconOnly ? content : '',
      ];
    }

    if (image && this.isImgExist) {
      content = <img style={{ ...this.customImageSize }} src={image} alt={alt} onError={this.handleImgLoadError}></img>;
    }
    return (<div ref='avatar' class={avatarClass} style={{ ...this.customAvatarSize }}>
      {content}
    </div>);
  },

});
