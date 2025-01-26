import { computed, ref, Ref } from 'vue';
import { TdPaginationProps } from './type';

export default function useMoreAction(props: TdPaginationProps, pageCount: Ref<number>, innerCurrent: Ref<number>) {
  const prevMore = ref(false);

  const nextMore = ref(false);

  const curPageLeftCount = computed(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));

  const curPageRightCount = computed(() => Math.floor((props.foldedMaxPageBtn - 1) / 2));

  const isPrevMoreShow = computed(() => 2 + curPageLeftCount.value < innerCurrent.value);

  const isNextMoreShow = computed(() => pageCount.value - 1 - curPageRightCount.value > innerCurrent.value);

  return {
    prevMore,
    nextMore,
    curPageLeftCount,
    curPageRightCount,
    isPrevMoreShow,
    isNextMoreShow,
  };
}
