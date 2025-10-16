import { defineComponent } from 'vue';
import { usePrefixClass, useTNodeJSX } from '@tdesign/shared-hooks';
import { Button, Space, Tooltip } from 'tdesign-vue-next';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import {
  ThumbUpIcon,
  ThumbUpFilledIcon,
  ThumbDownIcon,
  ThumbDownFilledIcon,
  RefreshIcon,
  CopyIcon,
  Share1Icon,
} from 'tdesign-icons-vue-next';
import Clipboard from 'clipboard';
import { MessagePluginSingleton } from '../utils';
import props from './chat-actionbar-props';

export default defineComponent({
  name: 'TChatActionbar',
  props,
  emits: ['actions', 'operation'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const renderTNodeJSX = useTNodeJSX();
    const messagePluginInstance = MessagePluginSingleton.getInstance();
    const { globalConfig } = useConfig('chat');
    return () => {
      // textLoading更新后要传给子组件和孙组件
      const content = renderTNodeJSX('content');
      const { copyTipText, likeTipText, dislikeTipText, refreshTipText, copyTextSuccess, copyTextFail, shareTipText } =
        globalConfig.value;

      // 内置操作按钮，assistantActions和插槽判断 t-chat注入的属性获取不到默认为false
      const disabled = props.disabled;
      // 向后兼容：优先使用 actionBar，如果没有则使用 operationBtn
      const actionButtons = props.actionBar || props.operationBtn;
      // 向后兼容：优先使用 comment，如果没有则根据 isGood/isBad 计算
      const commentValue = props.comment || (props.isGood ? 'good' : props.isBad ? 'bad' : '');
      const copyAnswer = () => {
        // 根据e获取当前按钮选择器
        const copyBtn = new Clipboard(`.copy-btn`);
        copyBtn.on('success', () => {
          messagePluginInstance.showSuccess(copyTextSuccess);
        });
        copyBtn.on('error', () => {
          messagePluginInstance.showError(copyTextFail);
        });
      };
      const handleClick = (e: MouseEvent, type: string) => {
        if (type === 'copy') {
          copyAnswer();
        }
        // 如果通过default传入的chat-item 组件，如何获取index值todo
        emit('actions', type, {
          e,
        });
        // 向后兼容：同时触发 operation 事件
        emit('operation', type, {
          e,
        });
      };
      const replayButton = actionButtons.includes('replay') ? (
        <Space>
          <div class={`${COMPONENT_NAME.value}__refresh`}>
            <Tooltip content={refreshTipText}>
              <Button
                theme="default"
                size="small"
                disabled={disabled}
                onClick={(e: MouseEvent) => handleClick(e, 'replay')}
              >
                <RefreshIcon />
              </Button>
            </Tooltip>
            <span class={`${COMPONENT_NAME.value}__refresh-line`}></span>
          </div>
        </Space>
      ) : null;
      const copyButton = actionButtons.includes('copy') ? (
        <Space>
          <Tooltip content={copyTipText}>
            <Button
              theme="default"
              size="small"
              class="copy-btn"
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'copy')}
              data-clipboard-text={content}
            >
              <CopyIcon />
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const goodButton = actionButtons.includes('good') ? (
        <Space>
          <Tooltip content={likeTipText}>
            <Button
              theme="default"
              size="small"
              class={commentValue === 'good' && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'good')}
            >
              {commentValue === 'good' ? <ThumbUpFilledIcon /> : <ThumbUpIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const badButton = actionButtons.includes('bad') ? (
        <Space>
          <Tooltip content={dislikeTipText}>
            <Button
              theme="default"
              size="small"
              class={commentValue === 'bad' && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'bad')}
            >
              {commentValue === 'bad' ? <ThumbDownFilledIcon /> : <ThumbDownIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const shareButton = actionButtons.includes('share') ? (
        <Space>
          <div class={`${COMPONENT_NAME.value}__refresh`}>
            <Tooltip content={shareTipText}>
              <Button
                theme="default"
                size="small"
                disabled={disabled}
                onClick={(e: MouseEvent) => handleClick(e, 'share')}
              >
                <Share1Icon />
              </Button>
            </Tooltip>
            {/* <span class={`${COMPONENT_NAME.value}__refresh-line`}></span> */}
          </div>
        </Space>
      ) : null;
      // 按钮组件的映射
      const buttonComponents = {
        replay: replayButton,
        copy: copyButton,
        good: goodButton,
        bad: badButton,
        share: shareButton,
      };
      return (
        <div class={`${COMPONENT_NAME.value}__actions`}>
          {actionButtons.map((btnKey) => {
            return buttonComponents[btnKey];
          })}
        </div>
      );
    };
  },
});
