import { Ref, ref } from 'vue';
import { getFileList } from '@tdesign/common/js/upload/utils';
import { TdUploadProps } from '../type';

export interface UploadDragEvents {
  onDragFileChange?: (files: File[]) => void;
  onDragenter?: TdUploadProps['onDragenter'];
  onDragleave?: TdUploadProps['onDragleave'];
  onDrop?: TdUploadProps['onDrop'];
}

export default function useDrag(props: UploadDragEvents, accept: Ref<string>) {
  const target = ref(null);
  const dragActive = ref(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    dragActive.value = false;

    const { files } = event.dataTransfer;
    const dragFiles: File[] = getFileList(files, accept.value);
    props.onDrop?.({ e: event });
    if (dragFiles?.length) {
      props.onDragFileChange?.(dragFiles);
    }
  };

  const handleDragenter = (event: DragEvent) => {
    event.preventDefault();
    target.value = event.target;
    props.onDragenter?.({ e: event });
    dragActive.value = true;
  };

  const handleDragleave = (event: DragEvent) => {
    if (event.target !== target.value) return;
    event.preventDefault();
    props.onDragleave?.({ e: event });
    dragActive.value = false;
  };

  const handleDragover = (event: DragEvent) => {
    event.preventDefault();
  };

  return {
    target,
    dragActive,
    handleDrop,
    handleDragenter,
    handleDragleave,
    handleDragover,
  };
}
