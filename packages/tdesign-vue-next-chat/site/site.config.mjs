const componentDocs = [
  {
    title: 'Chat',
    titleEn: 'Chat',
    name: 'chat',
    path: '/chat/components/chat',
    component: () => import('tdesign-vue-chat/chat/chat.md'),
    // componentEn: () => import('tdesign-vue-chat/chat/chat.en-US.md'),
  },
  {
    title: 'ChatItem',
    titleEn: 'ChatItem',
    name: 'ChatItem',
    path: '/chat/components/chat-item',
    component: () => import('tdesign-vue-chat/chat/chat-item.md'),
    // componentEn: () => import('tdesign-vue-chat/config-provider/config-provider.en-US.md'),
  },
  {
    title: 'ChatContent',
    titleEn: 'ChatContent',
    name: 'ChatContent',
    path: '/chat/components/chat-content',
    component: () => import('tdesign-vue-chat/chat/chat-content.md'),
  },
  {
    title: 'ChatReasoning',
    titleEn: 'ChatReasoning',
    name: 'ChatReasoning',
    path: '/chat/components/chat-reasoning',
    component: () => import('tdesign-vue-chat/chat/chat-reasoning.md'),
  },
  {
    title: 'ChatInput',
    titleEn: 'ChatInput',
    name: 'ChatInput',
    path: '/chat/components/chat-input',
    component: () => import('tdesign-vue-chat/chat/chat-input.md'),
  },
  {
    title: 'ChatSender',
    titleEn: 'ChatSender',
    name: 'ChatSender',
    path: '/chat/components/chat-sender',
    component: () => import('tdesign-vue-chat/chat/chat-sender.md'),
  },
  {
    title: 'ChatAction',
    titleEn: 'ChatAction',
    name: 'ChatAction',
    path: '/chat/components/chat-action',
    component: () => import('tdesign-vue-chat/chat/chat-action.md'),
  },
  {
    title: 'ChatLoading',
    titleEn: 'ChatLoading',
    name: 'ChatLoading',
    path: '/chat/components/chat-loading',
    component: () => import('tdesign-vue-chat/chat/chat-loading.md'),
  },
];

const modePage = {
  title: '模型案例',
  titleEn: '模型案例',
  name: 'model',
  path: '/chat/model',
  component: () => import('tdesign-vue-chat/chat/chat-ai.md'),
};

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
        component: () => import('@/site/docs/getting-started.md'),
      },
      {
        title: '更新日志',
        titleEn: 'CHANGELOG',
        name: 'changelog',
        path: '/chat/changelog',
        component: () => import('@/CHANGELOG.md'),
      },
      {
        title: '什么是流式输出',
        name: 'sse',
        path: '/chat/sse',
        component: () => import('@/site/docs/sse.md'),
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
        component: () => import('@common/theme.md'),
        componentEn: () => import('@common/theme.en-US.md'),
      },
      {
        title: '暗黑模式',
        titleEn: 'Dark Mode',
        name: 'dark-mode',
        path: '/chat/dark-mode',
        component: () => import('@common/dark-mode.md'),
        componentEn: () => import('@common/dark-mode.en-US.md'),
      },
    ],
  },
  {
    title: '数据展示',
    titleEn: 'Data Display',
    type: 'component', // 组件文档
    children: componentDocs,
  },
];

export default { docs };
