import { defineComponent, computed, provide, Fragment } from 'vue';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';

import { usePrefixClass, useTNodeJSX } from '@tdesign/shared-hooks';

import props from './chat-item-props';
import { isString, isObject } from 'lodash-es';
import { Skeleton } from 'tdesign-vue-next';
import Text from './chat-content';
import { CheckCircleIcon } from 'tdesign-icons-vue-next';
import ChatLoading from './chat-loading';
import ChatReasoning from './chat-reasoning';

export default defineComponent({
  name: 'TChatItem',
  props: {
    ...props,
    reasoningLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['operation'],
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const renderTNodeJSX = useTNodeJSX();
    const role = computed(() => renderTNodeJSX('role'));
    const variant = computed(() => renderTNodeJSX('variant'));
    // content为default时给子组件注入,模型切换时不注入数据，否则variant样式混乱
    provide('role', role);
    return () => {
      // 因为外层的role不能拿到实时更新的值，但是又要给子组件注入，所以这里单独另存了个变量
      const roleValue = renderTNodeJSX('role');
      // props和同名slot同时存在优先取slot的值
      const name = renderTNodeJSX('name', { slotFirst: true }) || props.name;
      const datetime = renderTNodeJSX('datetime', { slotFirst: true }) || props.datetime;
      const avatar = renderTNodeJSX('avatar', { slotFirst: true }) || props.avatar;
      const showNameDatetime = computed(() => name || datetime);
      const content = renderTNodeJSX('content', { slotFirst: true }) || props.content;
      // showNameDatetime存在时，contentClasses有个padding-top
      const contentClasses = computed(() => {
        return showNameDatetime.value
          ? [`${COMPONENT_NAME.value}__content`]
          : [`${COMPONENT_NAME.value}__content`, `${COMPONENT_NAME.value}__content--base`];
      });
      const avatarDom = avatar ? (
        <div class={`${COMPONENT_NAME.value}__avatar`}>
          <div class={`${COMPONENT_NAME.value}__avatar__box`}>
            {isString(avatar) ? <img src={avatar} alt="" class={`${COMPONENT_NAME.value}__avatar-image`} /> : avatar}
          </div>
        </div>
      ) : null;
      const nameDatetimeDom = showNameDatetime.value && (
        <div class={`${COMPONENT_NAME.value}__base`}>
          {name && <span class={`${COMPONENT_NAME.value}__name`}>{name}</span>}
          {datetime && <span class={`${COMPONENT_NAME.value}__time`}>{datetime}</span>}
        </div>
      );
      const textLoading = props.textLoading;
      const reasoningLoading = props.reasoningLoading;
      // 内置操作按钮，assistantActions和插槽判断 t-chat注入的属性获取不到默认为false
      const showActions = computed(() => renderTNodeJSX('actions'));
      const renderHeader = () => {
        if (reasoningLoading) {
          return <ChatLoading text={globalConfig.value.loadingText} />;
        }
        return (
          <div style="display:flex;align-items:center">
            <CheckCircleIcon
              style={{
                color: 'var(--td-success-color-5)',
                fontSize: '20px',
                marginRight: '8px',
              }}
            />
            <span>{globalConfig.value.loadingEndText}</span>
          </div>
        );
      };
      const contentDom = (
        <Fragment>
          {role.value !== 'model-change' && avatarDom}
          <div class={contentClasses.value}>
            {role.value !== 'model-change' && nameDatetimeDom}
            {textLoading &&
              (props.animation === 'skeleton' ? (
                <Skeleton loading={textLoading} animation={'gradient'}></Skeleton>
              ) : (
                <ChatLoading loading={textLoading} animation={props.animation}></ChatLoading>
              ))}
            {!textLoading && (
              <div class={`${COMPONENT_NAME.value}__detail`}>
                {isObject(props.reasoning) && role.value === 'assistant' && (
                  <ChatReasoning
                    role={role.value}
                    expandIconPlacement={(props.reasoning as Record<string, any>).expandIconPlacement}
                    onExpandChange={(props.reasoning as Record<string, any>).onExpandChange}
                    collapse-panel-props={{
                      ...(props.reasoning as Record<string, any>).collapsePanelProps,
                    }}
                  ></ChatReasoning>
                )}
                {/* 适配t-chat传入data */}
                {isString(props.reasoning) && role.value === 'assistant' && (
                  <ChatReasoning
                    role={role.value}
                    expandIconPlacement={'right'}
                    collapse-panel-props={{
                      header: renderHeader(),
                      content: <Text isNormalText={false} content={props.reasoning} role={role.value} />,
                    }}
                  ></ChatReasoning>
                )}
                {isString(content) ? <Text isNormalText={false} content={content} role={role.value} /> : content}
              </div>
            )}
            {role.value === 'assistant' && showActions.value && (
              <div class={`${COMPONENT_NAME.value}__actions-margin`}>{renderTNodeJSX('actions')}</div>
            )}
          </div>
        </Fragment>
      );
      return (
        <div
          class={`${COMPONENT_NAME.value}__inner ${roleValue} ${COMPONENT_NAME.value}__text--variant--${variant.value}`}
        >
          {contentDom}
        </div>
      );
    };
  },
});
