import { defineComponent } from 'vue';
import { usePrefixClass, useConfig, useTNodeJSX } from '@tdesign/hooks';
import props from './chat-action-props';
import { Button, Space, Tooltip } from 'tdesign-vue-next';
import {
  ThumbUpIcon,
  ThumbUpFilledIcon,
  ThumbDownIcon,
  ThumbDownFilledIcon,
  RefreshIcon,
  CopyIcon,
  Share1Icon,
} from 'tdesign-icons-vue-next';
// TODO: need refactor
import Clipboard from 'clipboard';
import { MessagePluginSingleton } from '../utils';

export default defineComponent({
  name: 'TChatAction',
  props,
  emits: ['actions'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const renderTNodeJSX = useTNodeJSX();
    const messagePluginInstance = MessagePluginSingleton.getInstance();
    const { globalConfig } = useConfig('chat');
    const { copyTipText, likeTipText, dislikeTipText, refreshTipText, copyTextSuccess, copyTextFail, shareTipText } =
      globalConfig.value;
    return () => {
      // textLoading更新后要传给子组件和孙组件
      const content = renderTNodeJSX('content');
      // 内置操作按钮，assistantActions和插槽判断 t-chat注入的属性获取不到默认为false
      const disabled = props.disabled;
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
      };
      const replayButton = props.actionBar.includes('replay') ? (
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
      const copyButton = props.actionBar.includes('copy') ? (
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
      const goodButton = props.actionBar.includes('good') ? (
        <Space>
          <Tooltip content={likeTipText}>
            <Button
              theme="default"
              size="small"
              class={props.comment === 'good' && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'good')}
            >
              {props.comment === 'good' ? <ThumbUpFilledIcon /> : <ThumbUpIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const badButton = props.actionBar.includes('bad') ? (
        <Space>
          <Tooltip content={dislikeTipText}>
            <Button
              theme="default"
              size="small"
              class={props.comment === 'bad' && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'bad')}
            >
              {props.comment === 'bad' ? <ThumbDownFilledIcon /> : <ThumbDownIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const shareButton = props.actionBar.includes('replay') ? (
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
            <span class={`${COMPONENT_NAME.value}__refresh-line`}></span>
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
          {props.actionBar.map((btnKey) => {
            return buttonComponents[btnKey];
          })}
        </div>
      );
    };
  },
});
