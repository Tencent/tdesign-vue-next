/**
 * Activity 组件的标准 Props 接口
 */
export interface ActivityComponentProps<TContent = any> {
  /** Activity 类型 */
  activityType: string;
  /** Activity 内容数据 */
  content: TContent;
  /** 关联的消息 ID */
  messageId: string;
}

/**
 * Activity 配置接口
 */
export interface ActivityConfig<TContent = any> {
  /** Activity 类型标识符 */
  activityType: string;
  /** 渲染组件 */
  component: (props: ActivityComponentProps<TContent>) => any;
  /** 描述信息（可选） */
  description?: string;
}

/**
 * Activity 注册表接口
 */
export interface ActivityRegistry {
  [activityType: string]: ActivityConfig;
}
