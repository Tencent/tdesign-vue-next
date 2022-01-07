import { computed, defineComponent, inject, nextTick, onMounted, onUpdated, ref } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { Styles } from '../common';

const name = `${prefix}-avatar`;

export default defineComponent({
  name: 'TAvatar',
  props,
  emits: ['error'],
  setup(props, { emit }) {
    const avatarGroup = inject('avatarGroup', undefined);
    const avatar = ref(null);
    const avatarChild = ref(null);
    const isImgExist = ref(true);
    // 内容区在左右两边的间距保持为4
    const gap = ref(4);
    const sizeValue = ref('');
    const scale = ref('');

    const customAvatarSize = computed<Styles>(() => {
      return isCustomSize()
        ? {
            width: sizeValue.value,
            height: sizeValue.value,
            'font-size': `${Number.parseInt(sizeValue.value, 10) / 2}px`,
          }
        : {};
    });
    const customImageSize = computed<Styles>(() => {
      return isCustomSize()
        ? {
            height: sizeValue.value,
            width: sizeValue.value,
          }
        : {};
    });
    const customCharaSize = computed<Styles>(() => {
      return {
        transform: scale.value,
      };
    });

    const handleImgLoadError = () => {
      const { onError, hideOnLoadFailed } = props;
      isImgExist.value = !hideOnLoadFailed;
      onError && onError();
      emit('error');
    };
    // 设置字符头像大小自适应
    const setScaleParams = () => {
      const $avatar = avatar.value as HTMLElement;
      const $avatarChild = avatarChild.value as HTMLElement;
      const avatarWidth = $avatar?.offsetWidth;
      const avatarChildWidth = $avatarChild?.offsetWidth;
      if (gap.value * 2 < avatarWidth) {
        scale.value =
          avatarChildWidth > avatarWidth - gap.value * 2
            ? `scale(${(avatarWidth - gap.value * 2) / avatarChildWidth})`
            : 'scale(1)';
      }
    };
    const isCustomSize = () => {
      return sizeValue.value && !CLASSNAMES.SIZE[sizeValue.value];
    };

    onMounted(() => {
      sizeValue.value = props.size || avatarGroup?.size;
      nextTick(() => {
        setScaleParams();
      });
    });

    onUpdated(() => {
      nextTick(() => {
        setScaleParams();
      });
    });

    return {
      avatar,
      avatarChild,
      isImgExist,
      gap,
      sizeValue,
      scale,
      customAvatarSize,
      customImageSize,
      customCharaSize,
      handleImgLoadError,
      setScaleParams,
      isCustomSize,
    };
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
    content = (
      <span ref="avatarChild" style={{ ...this.customCharaSize }}>
        {content}
      </span>
    );
    if (icon) {
      content = [icon, !isIconOnly ? content : ''];
    }

    if (image && this.isImgExist) {
      content = <img style={{ ...this.customImageSize }} src={image} alt={alt} onError={this.handleImgLoadError}></img>;
    }
    return (
      <div ref="avatar" class={avatarClass} style={{ ...this.customAvatarSize }}>
        {content}
      </div>
    );
  },
});
