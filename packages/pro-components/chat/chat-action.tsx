import { defineComponent, toRefs } from 'vue';
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
} from 'tdesign-icons-vue-next';
// TODO: need refactor packages/components/typography/utils/copy-to-clipboard/index.ts???
import Clipboard from 'clipboard';
import props from './chat-action-props';
import { MessagePluginSingleton } from './utils';

export default defineComponent({
  name: 'TChatAction',
  props,
  emits: ['operation'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const renderTNodeJSX = useTNodeJSX();
    const messagePluginInstance = MessagePluginSingleton.getInstance();
    const { globalConfig } = useConfig('chat');
    const { copyTipText, likeTipText, dislikeTipText, refreshTipText, copyTextSuccess, copyTextFail } = toRefs(
      globalConfig.value,
    );
    return () => {
      // textLoading更新后要传给子组件和孙组件
      const content = renderTNodeJSX('content');
      // 内置操作按钮，assistantActions和插槽判断 t-chat注入的属性获取不到默认为false
      const disabled = props.disabled;
      const copyAnswer = () => {
        // 根据e获取当前按钮选择器
        const copyBtn = new Clipboard(`.copy-btn`);
        copyBtn.on('success', () => {
          messagePluginInstance.showSuccess(copyTextSuccess.value);
        });
        copyBtn.on('error', () => {
          messagePluginInstance.showError(copyTextFail.value);
        });
      };
      const handleClick = (e: MouseEvent, type: string) => {
        if (type === 'copy') {
          copyAnswer();
        }
        // 如果通过default传入的chat-item 组件，如何获取index值todo
        emit('operation', type, {
          e,
        });
      };
      const replayButton = props.operationBtn.includes('replay') ? (
        <Space>
          <div class={`${COMPONENT_NAME.value}__refresh`}>
            <Tooltip content={refreshTipText.value}>
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
      const copyButton = props.operationBtn.includes('copy') ? (
        <Space>
          <Tooltip content={copyTipText.value}>
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
      const goodButton = props.operationBtn.includes('good') ? (
        <Space>
          <Tooltip content={likeTipText.value}>
            <Button
              theme="default"
              size="small"
              class={props.isGood && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'good')}
            >
              {props.isGood ? <ThumbUpFilledIcon /> : <ThumbUpIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      const badButton = props.operationBtn.includes('bad') ? (
        <Space>
          <Tooltip content={dislikeTipText.value}>
            <Button
              theme="default"
              size="small"
              class={props.isBad && `${COMPONENT_NAME.value}-button--active`}
              disabled={disabled}
              onClick={(e: MouseEvent) => handleClick(e, 'bad')}
            >
              {props.isBad ? <ThumbDownFilledIcon /> : <ThumbDownIcon />}
            </Button>
          </Tooltip>
        </Space>
      ) : null;
      // 按钮组件的映射
      const buttonComponents = {
        replay: replayButton,
        copy: copyButton,
        good: goodButton,
        bad: badButton,
      };
      return (
        <div class={`${COMPONENT_NAME.value}__actions`}>
          {props.operationBtn.map((btnKey) => {
            return buttonComponents[btnKey];
          })}
        </div>
      );
    };
  },
});
