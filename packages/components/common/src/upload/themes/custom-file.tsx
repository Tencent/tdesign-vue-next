import type { PropType } from '@td/adapter-vue';
import { defineComponent, toRefs } from '@td/adapter-vue';
import type { TdUploadProps } from '@td/intel/upload/type';
import { useContent } from '@td/adapter-hooks';
import type { UploadDragEvents } from '../hooks/useDrag';
import useDrag from '../hooks/useDrag';
import type { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';

export interface CustomFileProps extends CommonDisplayFileProps {
  dragEvents: UploadDragEvents;
  draggable?: boolean;
  // 拖拽区域
  dragContent?: TdUploadProps['dragContent'];
  trigger?: TdUploadProps['trigger'];
  triggerUpload?: (e: MouseEvent) => void;
  childrenNode?: any;
}

export default defineComponent({
  name: 'UploadCustomFile',

  props: {
    ...commonProps,
    dragEvents: Object as PropType<CustomFileProps['dragEvents']>,
    draggable: Boolean,
    // 拖拽区域
    dragContent: Function as PropType<CustomFileProps['dragContent']>,
    trigger: Function as PropType<CustomFileProps['trigger']>,
    triggerUpload: Function as PropType<CustomFileProps['triggerUpload']>,
    childrenNode: [String, Function] as PropType<CustomFileProps['childrenNode']>,
  },

  setup(props, { slots }) {
    const { classPrefix, displayFiles, accept } = toRefs(props);
    const drag = useDrag(props.dragEvents, accept);
    const { dragActive } = drag;

    const renderContent = useContent();

    const renderDragContent = () => {
      const params = { dragActive: dragActive.value || false, files: displayFiles.value };
      return (
        <div
          class={`${classPrefix.value}-upload__dragger ${classPrefix.value}-upload__dragger-center`}
          onDrop={drag.handleDrop}
          onDragenter={drag.handleDragenter}
          onDragover={drag.handleDragover}
          onDragleave={drag.handleDragleave}
          onClick={props.triggerUpload}
        >
          <div class={`${classPrefix.value}-upload__trigger`}>
            {renderContent('dragContent', 'trigger', { params }) || props.childrenNode?.(params)}
          </div>
        </div>
      );
    };

    return () => (
      <>
        {props.draggable
          ? (
              renderDragContent()
            )
          : (
            <div class={`${classPrefix.value}-upload__trigger`} onClick={props.triggerUpload}>
              {props.childrenNode?.({ files: displayFiles.value }) || slots.default?.()}
            </div>
            )}
      </>
    );
  },
});
