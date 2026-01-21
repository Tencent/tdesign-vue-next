import { tdesignVueNextChatPackageJson, tdesignVueNextPackageJson } from '@tdesign/internal-utils/package-json';
import { catalogs } from '@tdesign/internal-utils/catalogs';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
`;

export const mainJsContent = `
  import { createApp } from 'vue';
  import TDesign from 'tdesign-vue-next';
  import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件
  import Demo from './demo.vue';

  // 引入组件库全局样式资源
  import 'tdesign-vue-next/es/style/index.css';
  import './index.css';

  const app = createApp(Demo);

  app.use(TDesign).use(TDesignChat).mount('#app');
`;

export const styleContent = `
  /* 竖排展示 demo 行间距 16px */
  .tdesign-demo-block-column {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  /* 竖排展示 demo 行间距 32px */
  .tdesign-demo-block-column-large {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  /* 横排排展示 demo 列间距 16px */
  .tdesign-demo-block-row {
    display: flex;
    column-gap: 16px;
    align-items: center;
  }
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "pnpm install && pnpm dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import vueJsx from '@vitejs/plugin-vue-jsx';

  export default defineConfig({
    plugins: [vue(), vueJsx()],
  });
`;

export const packageJSONContent = JSON.stringify(
  {
    name: 'tdesign-vue-next-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      vue: catalogs.deps.vue,
      less: catalogs.bundle.less,
      clipboard: catalogs.deps.clipboard,
      marked: catalogs.deps.marked,
      'tdesign-vue-next': tdesignVueNextPackageJson.version,
      'tdesign-icons-vue-next': catalogs.tdesign['tdesign-icons-vue-next'],
      '@tdesign-vue-next/chat': tdesignVueNextChatPackageJson.version,
      'highlight.js': catalogs.deps['highlight.js'],
      'marked-highlight': catalogs.docs['marked-highlight'],
    },
    devDependencies: {
      vite: catalogs.bundle.vite,
      '@vue/compiler-sfc': catalogs.bundle['@vue/compiler-sfc'],
      '@vitejs/plugin-vue': catalogs.bundle['@vitejs/plugin-vue'],
      '@vitejs/plugin-vue-jsx': catalogs.bundle['@vitejs/plugin-vue-jsx'],
      'tdesign-web-components': '1.1.18',
      'omi-vueify': '^0.0.12',
      'tvision-charts-vue-next': '^3.3.13',
    },
  },
  null,
  2,
);

export const mockDataContent = `export class MockSSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();
  private stream: ReadableStream<Uint8Array>;
  private error: boolean;

  constructor(
    private data: string,
    private delay: number = 300,
    error = false, // 新增参数，默认为false
  ) {
    this.error = error;

    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        if (!this.error) {
          // 如果不是错误情况，则开始推送数据
          setTimeout(() => this.pushData(), this.delay); // 延迟开始推送数据
        }
      },
      cancel(reason) {
        console.log('Stream canceled', reason);
      },
    });
  }

  private pushData() {
    if (this.data.length === 0) {
      this.controller.close();
      return;
    }
    try {
      const chunk = this.data.slice(0, 1);
      this.data = this.data.slice(1);

      this.controller.enqueue(this.encoder.encode(chunk));

      if (this.data.length > 0) {
        setTimeout(() => this.pushData(), this.delay);
      } else {
        // 数据全部发送完毕后关闭流
        setTimeout(() => this.controller.close(), this.delay);
      }
    } catch {}
  }

  getResponse(): Promise<Response> {
    return new Promise((resolve) => {
      // 使用setTimeout来模拟网络延迟
      setTimeout(() => {
        if (this.error) {
          const errorResponseOptions = { status: 500, statusText: 'Internal Server Error' };

          // 返回模拟的网络错误响应，这里我们使用500状态码作为示例
          resolve(new Response(null, errorResponseOptions));
        } else {
          resolve(new Response(this.stream));
        }
      }, this.delay); // 使用构造函数中设置的delay值作为延迟时间
    });
  }
}
`;

export const mockDataReasoningContent = `export class MockSSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();
  private stream: ReadableStream<Uint8Array>;
  private error: boolean;
  private currentPhase: 'reasoning' | 'content' = 'reasoning';

  constructor(
    private data: {
      reasoning: string; // 推理内容
      content: string; // 正式内容
    },
    private delay: number = 100,
    error = false,
  ) {
    this.error = error;

    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        if (!this.error) {
          // 如果不是错误情况，则开始推送数据
          setTimeout(() => this.pushData(), this.delay); // 延迟开始推送数据
        }
      },
      cancel() {},
    });
  }

  private pushData() {
    try {
      if (this.currentPhase === 'reasoning') {
        // 推送推理内容
        if (this.data.reasoning.length > 0) {
          const chunk = JSON.stringify({
            delta: {
              reasoning_content: this.data.reasoning.slice(0, 1),
              content: '',
            },
            finished: false,
          });
          this.controller.enqueue(this.encoder.encode(chunk));
          this.data.reasoning = this.data.reasoning.slice(1);
          // 设置下次推送
          setTimeout(() => this.pushData(), this.delay);
        } else {
          // 推理内容推送完成，切换到正式内容
          this.currentPhase = 'content';
          setTimeout(() => this.pushData(), this.delay); // 立即开始推送正式内容
          return;
        }
      }

      if (this.currentPhase === 'content') {
        // 推送正式内容
        if (this.data.content.length > 0) {
          const chunk = JSON.stringify({
            delta: {
              reasoning_content: '',
              content: this.data.content.slice(0, 1),
            },
            finished: this.data.content.length === 1, // 最后一个字符时标记完成
          });
          this.controller.enqueue(this.encoder.encode(chunk));
          this.data.content = this.data.content.slice(1);

          // 设置下次推送
          setTimeout(() => this.pushData(), this.delay);
        } else {
          setTimeout(() => this.controller.close(), this.delay);
          return;
        }
      }
    } catch {}
  }

  getResponse(): Promise<Response> {
    return new Promise((resolve) => {
      // 使用setTimeout来模拟网络延迟
      setTimeout(() => {
        if (this.error) {
          const errorResponseOptions = { status: 500, statusText: 'Internal Server Error' };

          // 返回模拟的网络错误响应，这里我们使用500状态码作为示例
          resolve(new Response(null, errorResponseOptions));
        } else {
          resolve(new Response(this.stream));
        }
      }, this.delay); // 使用构造函数中设置的delay值作为延迟时间
    });
  }
}
`;

export const componentToolcallDemoContent = `<template>
  <t-collapse style="margin: 8px 0">
    <t-collapse-panel :header="panelHeader" :header-right-content="() => renderStatusTag(status)">
      <!-- 搜索工具的特殊渲染 -->
      <div v-if="toolCallName === 'search' && searchResult">
        <div style="font-size: 13px; color: #666; margin-bottom: 8px">
          {{ searchResult.title }}
        </div>
        <div v-if="searchResult.references && searchResult.references.length > 0">
          <div
            v-for="(ref, idx) in searchResult.references"
            :key="idx"
            style="font-size: 12px; margin-bottom: 2px; padding-left: 8px"
          >
            <a :href="ref.url" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: none">
              📄 {{ ref.title }}
            </a>
          </div>
        </div>
      </div>

      <!-- 默认工具调用渲染 -->
      <div v-else>
        <div v-if="args" style="font-size: 12px; color: #666; margin-bottom: 4px">
          参数: {{ typeof args === 'string' ? args : JSON.stringify(args) }}
        </div>
        <div v-if="result" style="font-size: 12px; color: #333">
          结果: {{ typeof result === 'string' ? result : JSON.stringify(result) }}
        </div>
      </div>
    </t-collapse-panel>
  </t-collapse>
</template>

<script setup lang="tsx">
import { computed } from 'vue';
import { Collapse as TCollapse, CollapsePanel as TCollapsePanel, Tag } from 'tdesign-vue-next';

// 定义 props
interface ToolCall {
  toolCallName?: string;
  args?: any;
  result?: any;
}

interface Props {
  toolCall: ToolCall;
  status?: 'pending' | 'streaming' | 'complete';
}

const props = withDefaults(defineProps<Props>(), {
  status: 'complete',
});

// 状态配置
const statusConfig = {
  pending: { color: 'warning', text: '处理中' },
  streaming: { color: 'processing', text: '执行中' },
  complete: { color: 'success', text: '已完成' },
};

// 状态渲染函数
const renderStatusTag = (status: 'pending' | 'streaming' | 'complete') => {
  const config = statusConfig[status] || statusConfig.complete;

  return (
    <Tag theme={config.color} size="small">
      {config.text}
    </Tag>
  );
};

// 使用 computed 监听 props.toolCall 的变化
const toolCallName = computed(() => props.toolCall?.toolCallName);
const args = computed(() => props.toolCall?.args);
const result = computed(() => props.toolCall?.result);

// 计算面板标题
const panelHeader = computed(() => {
  if (toolCallName.value === 'search') {
    return '🔍 搜索工具调用';
  }
  return '🔧 工具调用';
});

// 解析搜索结果
const searchResult = computed(() => {
  if (toolCallName.value !== 'search') return null;

  try {
    return typeof result.value === 'string' ? JSON.parse(result.value) : result.value;
  } catch (e) {
    return { title: '解析错误', references: [] };
  }
});
</script>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style>
`;

export const componentLoginDemoContent = `<template>
  <div :style="{ width: '350px' }">
    <t-form status-icon :colon="true" :label-width="0" @submit="onSubmit" @reset="onReset">
      <t-form-item name="account">
        <t-input clearable :prefix-icon="DesktopIcon" placeholder="请输入账户名" />
      </t-form-item>
      <t-form-item name="password">
        <t-input type="password" :prefix-icon="LockOnIcon" clearable placeholder="请输入密码" />
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const onSubmit: Parameters<typeof Form>[0]['onSubmit'] = (e) => {
      if (e.validateResult === true) {
        MessagePlugin.info('提交成功');
      }
    };

    const onReset: Parameters<typeof Form>[0]['onReset'] = (e) => {
      MessagePlugin.info('重置成功');
    };

    return {
      onSubmit,
      onReset,
      DesktopIcon,
      LockOnIcon,
    };
  },
});
</script>
`;
