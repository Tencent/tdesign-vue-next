import { ComputedRef, ref, Ref, watch } from 'vue';
import { getFileUrlByFileRaw } from '../_common/js/upload/utils';

export function useImagePreviewUrl(imgUrl: Ref<string | File> | ComputedRef<string | File>) {
  const previewUrl = ref('');
  const loading = ref(true);

  watch(
    [imgUrl],
    ([imgUrl], [preImgUrl]) => {
      if (preImgUrl === imgUrl) return;
      if (typeof imgUrl === 'string') {
        loading.value = false;
        previewUrl.value = imgUrl;
        return;
      }
      getFileUrlByFileRaw(imgUrl).then((url) => {
        loading.value = false;
        previewUrl.value = url;
      });
    },
    { immediate: true },
  );

  return { loading, previewUrl };
}
