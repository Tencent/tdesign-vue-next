import { defineComponent, ref, watch } from 'vue';
import props from './file-card-props';
import {
  FileExcelIcon,
  FileWordIcon,
  FileImageIcon,
  FilePdfIcon,
  FilePowerpointIcon,
  VideoIcon,
  FileMusicIcon,
  FileZipIcon,
  FileCode1Icon,
  LoadingIcon,
  CloseCircleFilledIcon,
  FileIcon,
} from 'tdesign-icons-vue-next';
import Image from '../image';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TFileCard',
  props,
  emits: ['remove', 'file-click'],
  setup(props, { emit }) {
    const previewVisible = ref(false);
    const namePrefix = ref('');
    const nameSuffix = ref('');
    const desc = ref('');
    const icon = ref(null);
    const iconColor = ref(null);

    const EMPTY = '\u00A0';
    const DEFAULT_ICON_COLOR = '#8c8c8c';
    const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];

    const PRESET_FILE_ICONS = [
      {
        icon: <FileExcelIcon size="24px" />,
        color: '#2BA471',
        ext: ['xlsx', 'xls'],
      },
      {
        icon: <FileImageIcon size="24px" />,
        // color: DEFAULT_ICON_COLOR,
        ext: IMG_EXTS,
      },
      {
        icon: <FileCode1Icon size="24px" />,
        ext: ['md', 'mdx'],
      },
      {
        icon: <FilePdfIcon size="24px" />,
        color: '#D54941',
        ext: ['pdf'],
      },
      {
        icon: <FilePowerpointIcon size="24px" />,
        color: '#E37318',
        ext: ['ppt', 'pptx'],
      },
      {
        icon: <FileWordIcon size="24px" />,
        color: '#0052D9',
        ext: ['doc', 'docx'],
      },
      {
        icon: <FileZipIcon size="24px" />,
        color: '#E37318',
        ext: ['zip', 'rar', '7z', 'tar', 'gz'],
      },
      {
        icon: <VideoIcon size="24px" />,
        color: '#D54941',
        ext: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
      },
      {
        icon: <FileMusicIcon size="24px" />,
        color: '#D54941',
        ext: ['mp3', 'wav', 'flac', 'ape', 'aac', 'ogg'],
      },
    ];

    const COMPONENT_NAME = usePrefixClass('chat');

    // 处理文件名
    const processFileName = () => {
      const { name = '' } = props.item;
      const match = name.match(/^(.*)\.[^.]+$/);
      const [prefix, suffix] = match ? [match[1], name.slice(match[1].length)] : [name, ''];
      namePrefix.value = prefix;
      nameSuffix.value = suffix;
    };

    // 处理描述信息
    const processDescription = () => {
      const { item } = props;
      const { status = 'done', description, size, percent } = item;

      let newDesc = description;
      if (!newDesc) {
        if (status === 'progress') {
          newDesc = `上传中...${percent || 0}%`;
        } else if (status === 'fail') {
          newDesc = typeof item?.response === 'string' ? item.response : EMPTY;
        } else {
          newDesc = size ? getSize(size) : EMPTY;
        }
      }

      desc.value = newDesc;
    };

    // 获取文件大小
    const getSize = (size: number) => {
      let retSize = size;
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
      let unitIndex = 0;

      while (retSize >= 1024 && unitIndex < units.length - 1) {
        retSize /= 1024;
        unitIndex += 1;
      }

      return `${retSize.toFixed(0)} ${units[unitIndex]}`;
    };

    // 处理图标
    const processIcon = () => {
      const { item } = props;
      const { status = 'done', extension } = item;
      if (status === 'progress') {
        icon.value = <LoadingIcon size="24px" />;
        return;
      }
      for (const { ext, icon: presetIcon, color } of PRESET_FILE_ICONS) {
        if (matchExt(extension || nameSuffix.value, ext)) {
          icon.value = presetIcon;
          iconColor.value = color;
          return;
        }
      }
      icon.value = <FileIcon size="24px" />;
    };

    // 匹配文件扩展名
    const matchExt = (suffix: string, ext: string[]) => {
      return ext.some((e) => suffix.toLowerCase() === `.${e}`);
    };

    // 切换预览状态
    const togglePreview = () => {
      const { item, imageViewer = true } = props;
      if (!imageViewer) return;
      const ext = item.extension || nameSuffix.value;
      if (IMG_EXTS.some((e) => ext.toLowerCase().includes(e))) {
        previewVisible.value = !previewVisible.value;
      }
    };

    // 关闭预览
    const closePreview = (e: Event) => {
      e.stopPropagation();
      previewVisible.value = false;
    };

    // 初始化处理
    watch(
      () => props.item,
      () => {
        processFileName();
        processDescription();
        processIcon();
      },
      { immediate: true, deep: true },
    );

    // 渲染文件概览
    const renderFileOverview = () => {
      const { cardType = 'file', item, style = {} } = props;
      if (cardType === 'image') {
        const newstyle = {
          ...{ width: 'var(--t-attachment-image-width, 52px)', height: 'var(--t-attachment-image-width, 52px)' },
          ...style,
        };
        return item.url ? (
          <Image
            src={item.url}
            shape="round"
            fit="cover"
            class={`${COMPONENT_NAME.value}-image`}
            style={newstyle}
          ></Image>
        ) : (
          <div
            class={`${COMPONENT_NAME.value}-icon ${COMPONENT_NAME.value}-icon__progress`}
            style={{ flex: 1, ...newstyle }}
          >
            <LoadingIcon size="24px" />
          </div>
        );
      }
      return (
        <>
          <div
            class={`${COMPONENT_NAME.value}-icon ${COMPONENT_NAME.value}-icon__${item.status}`}
            style={{ color: iconColor.value }}
          >
            {icon.value}
          </div>
          <div class={`${COMPONENT_NAME.value}-content`}>
            <div class={`${COMPONENT_NAME.value}-name`}>
              <span class={`${COMPONENT_NAME.value}-name-prefix`}>{namePrefix.value || EMPTY}</span>
              <span class={`${COMPONENT_NAME.value}-name-suffix`}>{nameSuffix.value}</span>
            </div>
            <div class={`${COMPONENT_NAME.value}-desc`}>{desc.value}</div>
          </div>
        </>
      );
    };

    return () => {
      const { item, disabled, removable, cardType = 'file' } = props;
      if (!item) return null;
      const { status = 'done' } = item;

      return (
        <div
          class={[
            `${COMPONENT_NAME.value}-overview`,
            {
              [`${COMPONENT_NAME.value}-overview-image`]: cardType === 'image',
              [`${COMPONENT_NAME.value}-status-uploading`]: status === 'progress',
              [`${COMPONENT_NAME.value}-status-error`]: status === 'fail',
            },
          ]}
          onClick={(e: Event) => {
            e.stopPropagation();
            emit('file-click', item);
            togglePreview();
          }}
        >
          {/* 图片预览蒙层 */}
          {previewVisible.value && (
            <div class={`${COMPONENT_NAME.value}-preview`}>
              <div class={`${COMPONENT_NAME.value}-preview-mask`}></div>
              <div class={`${COMPONENT_NAME.value}-preview-content`}>
                <img src={item.url} alt={item.name} />
                <CloseCircleFilledIcon
                  class={`${COMPONENT_NAME.value}-preview-close`}
                  size="24px"
                  onClick={closePreview}
                />
              </div>
            </div>
          )}
          {renderFileOverview()}
          {!disabled && removable && (
            <div
              class={`${COMPONENT_NAME.value}-remove`}
              onClick={(e: Event) => {
                e.stopPropagation();
                emit('remove', item);
              }}
            >
              <CloseCircleFilledIcon size="15px" />
            </div>
          )}
        </div>
      );
    };
  },
});
