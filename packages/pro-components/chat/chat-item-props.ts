/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatItemProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义的操作内容 */
  actions: {
    type: [String, Function] as PropType<TdChatItemProps['actions']>,
  },
  /** 动画效果，支持「渐变加载动画」,「闪烁加载动画」, 「骨架屏」三种 */
  animation: {
    type: String as PropType<TdChatItemProps['animation']>,
    default: 'skeleton' as TdChatItemProps['animation'],
    validator(val: TdChatItemProps['animation']): boolean {
      if (!val) return true;
      return ['skeleton', 'moving', 'gradient'].includes(val);
    },
  },
  /** 自定义的头像配置 */
  avatar: {
    type: [String, Object, Function] as PropType<TdChatItemProps['avatar']>,
  },
  /** 对话单元的内容 */
  content: {
    type: [String, Function] as PropType<TdChatItemProps['content']>,
  },
  /** 对话单元的时间配置 */
  datetime: {
    type: [String, Function] as PropType<TdChatItemProps['datetime']>,
  },
  /** 自定义的昵称 */
  name: {
    type: [String, Function] as PropType<TdChatItemProps['name']>,
  },
  /** 值为false不显示思维链，为对象则单独配置思维链内容 */
  reasoning: {
    type: [String, Object, Boolean] as PropType<TdChatItemProps['reasoning']>,
    default: false as TdChatItemProps['reasoning'],
  },
  /** 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息 */
  role: {
    type: String as PropType<TdChatItemProps['role']>,
    validator(val: TdChatItemProps['role']): boolean {
      if (!val) return true;
      return ['user', 'assistant', 'error', 'model-change', 'system'].includes(val);
    },
  },
  /** 新消息是否处于加载状态，加载状态默认显示骨架屏，接口请求返回数据时请将新消息加载状态置为false */
  textLoading: Boolean,
  /** 气泡框样式，支持基础、线框、文字三种类型 */
  variant: {
    type: String as PropType<TdChatItemProps['variant']>,
    default: 'text' as TdChatItemProps['variant'],
    validator(val: TdChatItemProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'text'].includes(val);
    },
  },
};
