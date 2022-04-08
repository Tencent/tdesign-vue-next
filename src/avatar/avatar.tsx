import { computed, defineComponent, inject, nextTick, onMounted, onUpdated, ref } from 'vue';
import props from './props';
import { TdAvatarProps } from './type';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAvatar',
  props,
  setup(props: TdAvatarProps) {
    const COMPONENT_NAME = usePrefixClass('avatar');
    const { SIZE } = useCommonClassName();
    const avatarGroup = inject('avatarGroup', undefined);
    const avatar = ref<HTMLElement | null>(null);
    const avatarChild = ref<HTMLElement | null>(null);
    const isImgExist = ref(true);
    // 内容区在左右两边的间距保持为4
    const gap = ref(4);
    const sizeValue = ref('');
    const scale = ref('');

    const isCustomSize = computed(() => sizeValue.value && !SIZE.value[sizeValue.value]);

    const customAvatarSize = computed(() => {
      return isCustomSize.value
        ? {
            width: sizeValue.value,
            height: sizeValue.value,
            'font-size': `${Number.parseInt(sizeValue.value, 10) / 2}px`,
          }
        : {};
    });
    const customImageSize = computed(() => {
      return isCustomSize.value
        ? {
            height: sizeValue.value,
            width: sizeValue.value,
          }
        : {};
    });
    const customCharacterSize = computed(() => {
      return {
        transform: scale.value,
      };
    });

    const handleImgLoadError = () => {
      const { hideOnLoadFailed } = props;
      isImgExist.value = !hideOnLoadFailed;
      props.onError?.();
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
      COMPONENT_NAME,
      SIZE,
      avatar,
      avatarChild,
      isImgExist,
      gap,
      sizeValue,
      scale,
      customAvatarSize,
      customImageSize,
      customCharacterSize,
      isCustomSize,
      handleImgLoadError,
      setScaleParams,
    };
  },

  render() {
    const { COMPONENT_NAME, SIZE } = this;
    let content = renderContent(this, 'default', 'content');
    const icon = renderTNodeJSX(this, 'icon');
    const isIconOnly = icon && !content;
    const { shape, image, alt } = this.$props;
    const avatarClass = [
      `${COMPONENT_NAME}`,
      SIZE[this.sizeValue],
      {
        [`${COMPONENT_NAME}--circle`]: shape === 'circle',
        [`${COMPONENT_NAME}--round`]: shape === 'round',
        [`${COMPONENT_NAME}__icon`]: !!isIconOnly,
      },
    ];
    content = (
      <span ref="avatarChild" style={{ ...this.customCharacterSize }}>
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
