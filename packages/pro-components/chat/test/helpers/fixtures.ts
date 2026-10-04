import type { TdChatItemMeta } from '../../type';

/**
 * chat 测试通用数据。
 * 数据形态与对外文档描述的 ChatMessagesData / TdChatItemMeta 保持一致，
 * 迁移后只要公开数据结构不变，这里就无需改动。
 */

export const textContent = (data: string) => ({ type: 'text', data });

/** ChatList / Chatbot 使用的 messages 数据 */
export const messages = [
  {
    id: 'msg-1',
    role: 'user',
    content: [textContent('你好，帮我介绍一下 TDesign')],
    datetime: '2024-01-01 10:00:00',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: [textContent('TDesign 是腾讯企业级设计体系。')],
    datetime: '2024-01-01 10:00:01',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: [textContent('支持 Vue Next / React / 小程序等多端。')],
    datetime: '2024-01-01 10:00:02',
  },
];

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

/** 附件数据（ChatSender attachmentsProps.items） */
export const attachmentItems = [
  {
    name: 'design.png',
    size: 10240,
    type: 'image/png',
    url: 'https://example.com/design.png',
  },
];

export const markdownText = '# 标题\n\n```js\nconst a = 1;\n```';
