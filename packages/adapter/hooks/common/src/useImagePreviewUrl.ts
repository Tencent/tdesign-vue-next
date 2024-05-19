import { ref, watch } from '@td/adapter-vue';
import type { ComputedRef, Ref } from '@td/adapter-vue';
import { getFileUrlByFileRaw } from '@td/shared/_common/js/upload/utils';

export function useImagePreviewUrl(imgUrl: Ref<string | File> | ComputedRef<string | File>) {
  const previewUrl = ref('');

  watch(
    [imgUrl],
    ([imgUrl], [preImgUrl]) => {
      if (preImgUrl === imgUrl) {
        return;
      }
      if (typeof imgUrl === 'string') {
        previewUrl.value = imgUrl;
        return;
      }
      getFileUrlByFileRaw(imgUrl).then((url) => {
        previewUrl.value = url;
      });
    },
    { immediate: true },
  );

  return { previewUrl };
}
