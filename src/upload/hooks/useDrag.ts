import { Ref, ref } from 'vue';
import { TdUploadProps } from '../type';

export interface UploadDragEvents {
  onDragFileChange?: (files: File[]) => void;
  onDragenter?: TdUploadProps['onDragenter'];
  onDragleave?: TdUploadProps['onDragleave'];
  onDrop?: TdUploadProps['onDrop'];
}

/**
 * use getFileList in common
 * @deprecated
 */
export function getFileList(files: FileList, accept?: string) {
  const fileList: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const regExp = new RegExp(accept);
    if (regExp.test(files[i].type)) {
      fileList.push(files[i]);
    }
  }
  return fileList;
}

export default function useDrag(props: UploadDragEvents, accept: Ref<string>) {
  const target = ref(null);
  const dragActive = ref(false);

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    dragActive.value = false;

    const { files } = event.dataTransfer;
    const dragFiles: File[] = getFileList(files, accept.value);
    if (!dragFiles.length) return;

    props.onDragFileChange?.(dragFiles);
    props.onDrop?.({ e: event });
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
