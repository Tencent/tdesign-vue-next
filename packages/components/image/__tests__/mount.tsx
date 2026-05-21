import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import Image from '@tdesign/components/image';
import ConfigProvider from '@tdesign/components/config-provider';
import type { TdImageProps } from '@tdesign/components/image';
import type { VNode } from 'vue';

const DEFAULT_SRC = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

/** 基础挂载 — Image 级别 props */
function mountImage(
  imageProps: Partial<TdImageProps> & { onClick?: (context: { e: MouseEvent }) => void } = {},
  slots?: Record<string, (...args: never[]) => VNode>,
): VueWrapper {
  return mount(
    {
      render() {
        return <Image src={DEFAULT_SRC} {...imageProps} v-slots={slots} />;
      },
    },
    { attachTo: document.body },
  );
}

/** 无 src 挂载 — 用于 loading/placeholder 等场景 */
function mountImageWithoutSrc(
  imageProps: Partial<TdImageProps> = {},
  slots?: Record<string, (...args: never[]) => VNode>,
): VueWrapper {
  return mount(
    {
      render() {
        return <Image {...imageProps} v-slots={slots} />;
      },
    },
    { attachTo: document.body },
  );
}

/** 带 overlay 挂载 — 预设 overlayContent */
function mountOverlayImage(
  imageProps: Partial<TdImageProps> & { onClick?: (context: { e: MouseEvent }) => void } = {},
  slots?: Record<string, (...args: never[]) => VNode>,
): VueWrapper {
  return mount(
    {
      render() {
        return (
          <Image
            src={DEFAULT_SRC}
            overlayContent={() => <div class="custom-preview-node">预览</div>}
            {...imageProps}
            v-slots={slots}
          />
        );
      },
    },
    { attachTo: document.body },
  );
}

/** 带 ConfigProvider 挂载 */
function mountImageWithConfig(
  globalConfig: Record<string, unknown>,
  imageProps: Partial<TdImageProps> = {},
): VueWrapper {
  return mount(
    {
      render() {
        return (
          <ConfigProvider globalConfig={{ image: globalConfig }}>
            <Image src={DEFAULT_SRC} {...imageProps} />
          </ConfigProvider>
        );
      },
    },
    { attachTo: document.body },
  );
}

export { DEFAULT_SRC, mountImage, mountImageWithoutSrc, mountOverlayImage, mountImageWithConfig };
