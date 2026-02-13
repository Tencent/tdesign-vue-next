import { createRegistryManager } from '../shared';
import type { ActivityConfig, ActivityComponentProps } from './types';

/** Activity 注册事件名称 */
export const ACTIVITY_REGISTERED_EVENT = 'activity-registered';

/** Activity 注册事件 detail 键名 */
export const ACTIVITY_EVENT_DETAIL_KEY = 'activityType';

/**
 * Activity 注册表管理器
 * 业务方注册具体的 activityType（如 json-render-main-card），精确匹配
 */
export const activityRegistry = createRegistryManager<ActivityConfig, ActivityComponentProps>({
  getKey: (config) => config.activityType,
  eventName: ACTIVITY_REGISTERED_EVENT,
  eventDetailKey: ACTIVITY_EVENT_DETAIL_KEY,
});
