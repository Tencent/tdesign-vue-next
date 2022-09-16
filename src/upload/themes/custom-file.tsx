import { defineComponent, PropType, h, toRefs } from 'vue';
import useDrag, { UploadDragEvents } from '../hooks/useDrag';
import { CommonDisplayFileProps, commonProps } from '../interface';
import { useContent } from '../../hooks/tnode';
import { TdUploadProps } from '../type';
import { TNode } from '../../common';

export interface CustomFileProps extends CommonDisplayFileProps {
  dragEvents: UploadDragEvents;
  draggable?: boolean;
  // 拖拽区域
  dragContent?: TdUploadProps['dragContent'];
  trigger?: TdUploadProps['trigger'];
  triggerUpload?: () => void;
  childrenNode?: string | TdUploadProps['dragContent'];
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

  setup(props: CustomFileProps, { slots }) {
    const { classPrefix, displayFiles } = toRefs(props);
    const drag = useDrag(props.dragEvents);
    const { dragActive } = drag;

    const renderContent = useContent();

    const dragEvents = props.draggable
      ? {
          onDrop: drag.handleDrop,
          onDragEnter: drag.handleDragenter,
          onDragOver: drag.handleDragover,
          onDragLeave: drag.handleDragleave,
        }
      : {};

    const renderDragContent = () => {
      const params = { dragActive: dragActive.value, displayFiles: displayFiles.value };
      return (
        <div
          class={`${classPrefix.value}-upload__dragger ${classPrefix.value}-upload__dragger-center`}
          onClick={props.triggerUpload}
        >
          <div class={`${classPrefix.value}-upload__trigger`}>
            {renderContent('dragContent', 'trigger', { params }) || props.childrenNode?.(h, params)}
          </div>
        </div>
      );
    };

    return () => (
      <>
        {props.draggable ? (
          renderDragContent()
        ) : (
          <div class={`${classPrefix.value}-upload__trigger`} onClick={props.triggerUpload}>
            {props.childrenNode?.(h, { displayFiles: displayFiles.value }) || slots.default?.()}
          </div>
        )}
        {props.tips && <small class={props.tipsClasses}>{props.tips}</small>}
      </>
    );
  },
});
