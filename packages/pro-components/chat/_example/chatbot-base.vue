/* eslint-disable no-await-in-loop */
import 'tdesign-web-components/chatbot';

import MarkdownIt from 'markdown-it';
import { Component, createRef } from 'omi';
import { findTargetElement, type TdChatMessageConfig } from 'tdesign-web-components/chatbot';

import type { Attachment } from '../../filecard';
import Chatbot from '../chat';
import type { AIMessageContent, ChatMessage, SSEChunkData } from '../core/type';

// 天气扩展类型定义
declare module '../core/type' {
  interface AIContentTypeOverrides {
    weather: BaseContent<
      'weather',
      {
        temp: number;
        city: string;
        conditions?: string;
      }
    >;
  }
}

// function extractMarkdownLinks(msg: string): Array<{ title: string; url?: string }> {
//   const linkRegex = /\[(.*?)\]\(#prompt:(.*?)\)/g;
//   const matches = [];
//   let match;

//   while ((match = linkRegex.exec(msg)) !== null) {
//     matches.push({
//       title: match[1].trim(),
//       prompt: match[2].trim(),
//     });
//   }

//   return matches;
// }

const mockData: ChatMessage[] = [
  {
    id: 's1123',
    role: 'system',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '系统通知：初始化完成，样式看看怎么搞',
      },
    ],
  },
  {
    id: '223',
    role: 'user',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '南极的自动提款机叫什么名字？',
      },
    ],
  },
  {
    id: '123',
    role: 'assistant',
    status: 'complete',
    content: [
      {
        type: 'search',
        status: 'complete',
        data: {
          title: '共找到10个相关内容',
          references: [
            {
              title: '10本高口碑悬疑推理小说,情节高能刺激,看得让人汗毛直立!',
              url: 'http://mp.weixin.qq.com/s?src=11&timestamp=1742897036&ver=5890&signature=USoIrxrKY*KWNmBLZTGo-**yUaxdhqowiMPr0wsVhH*dOUB3GUjYcBVG86Dyg7-TkQVrr0efPvrqSa1GJFjUQgQMtZFX5wxjbf8TcWkoUxOrTA7NsjfNQQoVY5CckmJj&new=1',
              type: 'mp',
            },
            {
              title: '悬疑小说下载:免费畅读最新悬疑大作!',
              url: 'http://mp.weixin.qq.com/s?src=11&timestamp=1742897036&ver=5890&signature=UCc6xbIGsYEyfytL2IC6b3vXlaBcbEJCi98ZVK38vdoFEEulJ3J-95bNkE8Fiv5-pJ5iH75DfJAz6kGX2TSscSisBNW1u6nCPbP-Ue4HxCAfjU8DpUwaOXkFz3*T71rU&new=1',
              type: 'mp',
            },
            {
              title: '悬疑推理类小说五本 22',
              url: 'http://mp.weixin.qq.com/s?src=11&timestamp=1742897036&ver=5890&signature=Fh*UdzlSG9IgB8U4n9t5qSWHA73Xat54ReUUgCZ5hUgW8QyEwPwoBFQzrfsWP9UCN0T6Zpfg5rMYSqKvrkP6Njp-ggxnym8YOSbDYLFB4uqMH14FDcq7*aAmN*8C3aSL&new=1',
              type: 'mp',
            },
            {
              title: '悬疑推理类小说五本 25',
              url: 'http://mp.weixin.qq.com/s?src=11&timestamp=1742897036&ver=5890&signature=Fh*UdzlSG9IgB8U4n9t5qSWHA73Xat54ReUUgCZ5hUiBG0KD-41hoa2HJm1CC7*ueTzp3loaKojnUO1JR3KD7bh1EgWwTmOIDum3aYtrN1EYDXF9jTh1KNJsalAXHeQI&new=1',
              type: 'mp',
            },

            // {
            //   title: '百度',
            //   icon: 'https://vfiles.gtimg.cn/wupload/creator_center.assets/45d68c02_u7V4BL0GqFgDFAwvzR345RxrLo3Gdv5m.png',
            // },
            // {
            //   title: '1点',
            //   icon: 'https://vfiles.gtimg.cn/wupload/creator_center.assets/45d68c02_LMDUO7DWP3cXGdOauIE8adfCwYWtvIqJ.png',
            // },
            // {
            //   title: '搜狐',
            //   icon: 'https://vfiles.gtimg.cn/wupload/creator_center.assets/45d68c02_GZEZ-r0UNhXci32OHT4BVjork53AlucQ.png',
            // },
          ],
        },
      },
      {
        type: 'thinking',
        status: 'complete',
        data: {
          title: '思考完成（耗时3s）',
          text: 'mock分析语境，首先，Omi是一个基于Web Components的前端框架，和Vue的用法可能不太一样。Vue里的v-html指令用于将字符串作为HTML渲染，防止XSS攻击的话需要信任内容。Omi有没有类似的功能呢？mock分析语境，首先，Omi是一个基于Web Components的前端框架，和Vue的用法可能不太一样。Vue里的v-html指令用于将字符串作为HTML渲染，防止XSS攻击的话需要信任内容。Omi有没有类似的功能呢？',
        },
      },
      {
        type: 'text',
        data: '它叫 [McMurdo Station ATM](#promptId=atm)，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
      },
      {
        type: 'suggestion',
        status: 'complete',
        data: [
          {
            title: '《六姊妹》中有哪些观众喜欢的剧情点？',
            prompt: '《六姊妹》中有哪些观众喜欢的剧情点？',
          },
          {
            title: '两部剧在演员表现上有什么不同？',
            prompt: '两部剧在演员表现上有什么不同？',
          },
          {
            title: '《六姊妹》有哪些负面的评价？',
            prompt: '《六姊妹》有哪些负面的评价？',
          },
        ],
      },
    ],
  },
  {
    id: '789',
    role: 'user',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '分析下以下内容，总结一篇广告策划方案',
      },
      {
        type: 'attachment',
        data: [
          {
            fileType: 'doc',
            name: 'demo.docx',
            url: 'https://tdesign.gtimg.com/site/demo.docx',
            size: 12312,
          },
          {
            fileType: 'pdf',
            name: 'demo2.pdf',
            url: 'https://tdesign.gtimg.com/site/demo.pdf',
            size: 34333,
          },
        ],
      },
    ],
  },
  {
    id: '34234',
    status: 'error',
    role: 'assistant',
    content: [
      {
        type: 'text',
        data: '出错了',
      },
    ],
  },
  {
    id: '7389',
    role: 'user',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '这张图里的帅哥是谁',
      },
      {
        type: 'attachment',
        data: [
          {
            fileType: 'image',
            name: 'avatar.jpg',
            size: 234234,
            url: 'https://tdesign.gtimg.com/site/avatar.jpg',
          },
        ],
      },
    ],
  },
  {
    id: '3242',
    role: 'assistant',
    status: 'complete',
    comment: 'good',
    content: [
      {
        type: 'markdown',
        data: '**tdesign** 团队的 *核心开发者*  `uyarnchen` 是也。',
      },
    ],
  },
];

const defaultChunkParser = (chunk): AIMessageContent => {
  try {
    return handleStructuredData(chunk);
  } catch (err) {
    console.error('Parsing error:', err);
    return {
      type: 'text',
      data: '内容解析错误',
    };
  }
};

function handleStructuredData(chunk: SSEChunkData): AIMessageContent {
  if (!chunk?.data || typeof chunk === 'string') {
    return {
      type: 'markdown',
      data: String(chunk),
    };
  }

  const { type, ...rest } = chunk.data;
  switch (type) {
    case 'error':
      return {
        type: 'text',
        status: 'error',
        data: rest.content,
      };
    case 'think':
      return {
        type: 'thinking',
        data: {
          title: rest.title || '思考中...',
          text: rest.content || '',
        },
      };

    case 'text': {
      return {
        type: 'markdown',
        data: rest?.msg || '',
      };
    }

    case 'image': {
      return {
        type: 'image',
        data: { ...JSON.parse(chunk.data.content) },
      };
    }

    // case 'suggestion':
    //   return {
    //     type: 'suggestion',
    //     // title: '是不是想提问：',
    //     data: extractMarkdownLinks(rest.content),
    //   };

    case 'weather': {
      return {
        type: 'weather',
        data: {
          temp: 1,
          city: '北京',
          conditions: '多云',
        },
      };
    }

    default:
      return {
        type: 'text',
        data: chunk?.event === 'complete' ? '' : JSON.stringify(chunk.data),
      };
  }
}

const mockModels = {
  endpoint: 'http://localhost:3000/sse/normal',
  stream: true,
  onComplete: () => {
    console.log('onComplete');
  },
  onError: (err) => {
    console.log('onError', err);
  },
  onMessage: defaultChunkParser,
  onRequest: (params) => {
    const { prompt, messageID, attachments = [] } = params;
    return {
      headers: {
        'X-Mock-Key': 'test123',
        'Content-Type': 'text/event-stream',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        session_id: 'session_123456789',
        question: [
          {
            id: messageID,
            content: prompt,
            create_at: Date.now(),
            role: 'user',
          },
        ],
        attachments,
        is_search_net: 1,
      }),
    };
  },
};

const attachmentProps = {
  onFileSelect: async (files: File[]): Promise<Attachment[]> => {
    const attachments: Attachment[] = [];

    // 串行处理每个文件
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        // 上传单个文件
        const response = await fetch(`http://localhost:3000/file/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) continue; // 跳过失败文件

        const data = await response.json();

        // 构造附件对象
        const { name, size, type } = file;
        attachments.push({
          url: data.result.cdnurl,
          status: 'success',
          name,
          type,
          size,
          raw: file,
        });
      } catch (error) {
        console.error(`${file.name} 上传失败:`, error);
        // 可选：记录失败文件信息到错误日志
      }
    }

    return attachments;
  },
  onFileRemove: () => {},
};

const resourceLinkPlugin = (md: MarkdownIt) => {
  // 保存原始链接渲染函数
  const defaultRender = md.renderer.rules.link_open?.bind(md.renderer);

  // 覆盖链接渲染规则
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const href = token.attrGet('href') || '';
    const id = href.split('#promptId=')[1];
    // 识别特殊资源链接
    if (href.startsWith('#promptId')) {
      // 返回自定义DOM结构
      // return `<a part="resource-link"
      //   onclick="this.dispatchEvent(new CustomEvent('resource-link-click', {
      //     bubbles: true,
      //     composed: true,
      //     detail: { resourceId: '${id}'}
      //   }))">`;
      return `<a part="resource-link" data-resource="${id}">`;
    }

    // 普通链接保持默认渲染
    return defaultRender(tokens, idx, options, env, self);
  };
};

export default class BasicChat extends Component {
  chatRef = createRef<Chatbot>();

  clickHandler?: (e: MouseEvent) => void;

  messageProps: TdChatMessageConfig = {
    // user: {
    //   avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    // },
    assistant: {
      // avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
      // actions: (preset) => {
      //   return preset.filter(({ name }) => name !== 'share');
      // },
      onActions: {
        replay: (data, callback) => {
          console.log('自定义重新回复', data);
          callback?.();
        },
        good: (data) => {
          console.log('点赞', data);
        },
        suggestion: ({ prompt }) => {
          this.chatRef.current.addPrompt(prompt);
        },
        searchItem: ({ content, event }) => {
          event.preventDefault();
          event.stopPropagation();
          console.log('searchItem', content);
        },
      },
      chatContentProps: {
        search: {
          expandable: true,
        },
        thinking: {
          height: 100,
        },
        markdown: {
          pluginConfig: [resourceLinkPlugin],
        },
      },
    },
  };

  ready() {
    this.chatRef.current.addEventListener('message_action', (e: CustomEvent) => {
      console.log('message_action', e.detail);
    });
    this.clickHandler = (e) => {
      const target = findTargetElement(e, 'a[data-resource]');
      if (target) {
        console.log('捕获资源链接点击:', target.dataset);
      }
    };
    document.addEventListener('mousedown', this.clickHandler);
  }

  uninstall(): void {
    // 移除全局点击监听
    if (this.clickHandler) {
      document.removeEventListener('mousedown', this.clickHandler);
    }
  }

  render() {
    return (
      <t-chatbot
        ref={this.chatRef}
        style={{ display: 'block', height: '80vh' }}
        messages={mockData}
        // autoSendPrompt="自动发送问题"
        messageProps={this.messageProps}
        senderProps={{
          actions: true,
          attachmentProps,
          placeholder: '请输入问题',
        }}
        chatServiceConfig={mockModels}
      ></t-chatbot>
    );
  }
}
