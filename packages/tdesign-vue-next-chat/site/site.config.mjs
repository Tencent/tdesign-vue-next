const componentDocs = [
  {
    title: 'Chat 对话',
    titleEn: 'Chat',
    name: 'chat',
    path: '/chat/components/chat',
    component: () => import('@tdesign/pro-components-chat/chat.md'),
  },
  {
    title: 'ChatItem 对话单元',
    titleEn: 'ChatItem',
    name: 'ChatItem',
    path: '/chat/components/chat-item',
    component: () => import('@tdesign/pro-components-chat/chat-item.md'),
  },
  {
    title: 'ChatContent 对话内容',
    titleEn: 'ChatContent',
    name: 'ChatContent',
    path: '/chat/components/chat-content',
    component: () => import('@tdesign/pro-components-chat/chat-content.md'),
  },
  {
    title: 'ChatReasoning 思考过程',
    titleEn: 'ChatReasoning',
    name: 'ChatReasoning',
    path: '/chat/components/chat-reasoning',
    component: () => import('@tdesign/pro-components-chat/chat-reasoning.md'),
  },
  {
    title: 'ChatInput 对话输入',
    titleEn: 'ChatInput',
    name: 'ChatInput',
    path: '/chat/components/chat-input',
    component: () => import('@tdesign/pro-components-chat/chat-input.md'),
  },
  {
    title: 'ChatSender 对话输入框',
    titleEn: 'ChatSender',
    name: 'ChatSender',
    path: '/chat/components/chat-sender',
    component: () => import('@tdesign/pro-components-chat/chat-sender.md'),
  },
  {
    title: 'ChatAction 对话操作',
    titleEn: 'ChatAction',
    name: 'ChatAction',
    path: '/chat/components/chat-action',
    component: () => import('@tdesign/pro-components-chat/chat-action.md'),
  },
  {
    title: 'ChatLoading 对话加载',
    titleEn: 'ChatLoading',
    name: 'ChatLoading',
    path: '/chat/components/chat-loading',
    component: () => import('@tdesign/pro-components-chat/chat-loading.md'),
  },
];

export const docs = [
  {
    title: '开始',
    titleEn: 'Start',
    type: 'doc',
    children: [
      {
        title: '快速开始',
        titleEn: 'Getting Started',
        name: 'getting-started',
        path: '/chat/getting-started',
        component: () => import('./docs/getting-started.md'),
      },
      {
        title: '更新日志',
        titleEn: 'CHANGELOG',
        name: 'changelog',
        path: '/chat/changelog',
        component: () => import('../CHANGELOG.md'),
      },
      {
        title: '什么是流式输出',
        name: 'sse',
        path: '/chat/sse',
        component: () => import('./docs/sse.md'),
      },
    ],
  },
  {
    title: '全局配置',
    titleEn: 'Global Config',
    type: 'doc',
    children: [
      {
        title: '自定义主题',
        titleEn: 'Theme Customization',
        name: 'custom-theme',
        path: '/chat/custom-theme',
        component: () => import('@tdesign/common-docs/web/theme.md'),
        componentEn: () => import('@tdesign/common-docs/web/theme.en-US.md'),
      },
      {
        title: '深色模式',
        titleEn: 'Dark Mode',
        name: 'dark-mode',
        path: '/chat/dark-mode',
        component: () => import('@tdesign/common-docs/dark-mode.md'),
        componentEn: () => import('@tdesign/common-docs/dark-mode.en-US.md'),
      },
    ],
  },
  {
    title: '数据展示',
    titleEn: 'Data Display',
    type: 'component',
    children: componentDocs,
  },
];

export default { docs };
