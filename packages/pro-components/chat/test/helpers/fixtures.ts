import type { TdChatItemMeta } from '../../type';

/**
 * chat 测试通用数据。
 * 数据形态与对外文档描述的 ChatMessagesData / TdChatItemMeta 保持一致，
 * 迁移后只要公开数据结构不变，这里就无需改动。
 */

export const textContent = (data: string) => ({ type: 'text' as const, data });

/** ChatList 单条数据（TdChatItemMeta 形态） */
export const chatItemMetaList: TdChatItemMeta[] = [
  {
    role: 'user',
    name: '张三',
    datetime: '2024-01-01 10:00:00',
    content: [textContent('你好')],
  },
  {
    role: 'assistant',
    name: 'TDesign Bot',
    datetime: '2024-01-01 10:00:01',
    content: [textContent('你好，有什么可以帮你？')],
  },
] as TdChatItemMeta[];
