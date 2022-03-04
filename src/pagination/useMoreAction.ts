import { computed, ref } from 'vue';
import { TdPaginationProps } from './type';

export default function useMoreAction(props: TdPaginationProps, pageCount: any) {
  const prevMore = ref(false);

  const nextMore = ref(false);

  const curPageLeftCount = computed(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));

  const curPageRightCount = computed(() => Math.ceil((props.foldedMaxPageBtn - 1) / 2));

  const isPrevMoreShow = computed(() => 2 + curPageLeftCount.value < props.current);

  const isNextMoreShow = computed(() => pageCount.value - 1 - curPageRightCount.value > props.current);

  return {
    prevMore,
    nextMore,
    curPageLeftCount,
    curPageRightCount,
    isPrevMoreShow,
    isNextMoreShow,
  };
}
