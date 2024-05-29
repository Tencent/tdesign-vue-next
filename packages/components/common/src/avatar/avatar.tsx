import { computed, defineComponent, inject, nextTick, onMounted, onUpdated, ref } from '@td/adapter-vue';
import props from '@td/components/avatar/props';
import type { TdAvatarProps } from '@td/components/avatar/type';
import { useCommonClassName, useContent, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import type { ImageProps } from '../image';
import Image from '../image';

export default defineComponent({
  name: 'TAvatar',
  props,
  setup(props: TdAvatarProps) {
    const COMPONENT_NAME = usePrefixClass('avatar');
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const { SIZE } = useCommonClassName();
    const avatarGroup = inject('avatarGroup', undefined);
    const avatar = ref<HTMLElement | null>(null);
    const avatarChild = ref<HTMLElement | null>(null);
    const isImgExist = ref(true);
    // 内容区在左右两边的间距保持为4
    const gap = ref(4);
    const scale = ref('');

    const sizeValue = computed(() => props.size || avatarGroup?.size);
    const isCustomSize = computed(() => sizeValue.value && !SIZE.value[sizeValue.value]);

    const customAvatarSize = computed(() => {
      return isCustomSize.value
        ? {
            'width': sizeValue.value,
            'height': sizeValue.value,
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

    const handleImgLoadError: ImageProps['onError'] = ({ e }) => {
      const { hideOnLoadFailed } = props;
      isImgExist.value = !hideOnLoadFailed;
      props.onError?.({ e });
    };
    // 设置字符头像大小自适应
    const setScaleParams = () => {
      const $avatar = avatar.value as HTMLElement;
      const $avatarChild = avatarChild.value as HTMLElement;
      const avatarWidth = $avatar?.offsetWidth;
      const avatarChildWidth = $avatarChild?.offsetWidth;
      if (gap.value * 2 < avatarWidth) {
        scale.value
          = avatarChildWidth > avatarWidth - gap.value * 2
            ? `scale(${(avatarWidth - gap.value * 2) / avatarChildWidth})`
            : 'scale(1)';
      }
    };

    onMounted(() => {
      nextTick(() => {
        setScaleParams();
      });
    });

    onUpdated(() => {
      nextTick(() => {
        setScaleParams();
      });
    });

    return () => {
      let content = renderContent('default', 'content');
      const icon = renderTNodeJSX('icon');
      const isIconOnly = icon && !content;
      const { shape, image, alt } = props;
      const avatarClass = [
        `${COMPONENT_NAME.value}`,
        SIZE.value[sizeValue.value],
        {
          [`${COMPONENT_NAME.value}--circle`]: shape === 'circle',
          [`${COMPONENT_NAME.value}--round`]: shape === 'round',
          [`${COMPONENT_NAME.value}__icon`]: !!isIconOnly,
        },
      ];
      content = (
        <span ref={avatarChild} style={{ ...customCharacterSize.value }}>
          {content}
        </span>
      );
      if (icon) {
        content = [icon, !isIconOnly ? content : ''];
      }

      if (image && isImgExist.value) {
        content = (
          <Image
            style={{ ...customImageSize.value }}
            src={image}
            alt={alt}
            onError={handleImgLoadError}
            {...props.imageProps}
          >
          </Image>
        );
      }
      return (
        <div ref={avatar} class={avatarClass} style={{ ...customAvatarSize.value }}>
          {content}
        </div>
      );
    };
  },
});
