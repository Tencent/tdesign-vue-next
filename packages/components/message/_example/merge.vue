<template>
  <t-space direction="vertical" size="large">
    <t-space direction="vertical" size="small">
      <p>基础合并功能</p>
      <t-space>
        <t-button theme="primary" variant="outline" @click="showBasicMerge"> 触发相同消息（会合并） </t-button>
        <t-button theme="success" variant="outline" @click="showDifferentTheme">
          不同主题相同内容（不会合并）
        </t-button>
        <t-button theme="warning" variant="outline" @click="showCustomMergeKey"> 自定义合并标识 </t-button>
      </t-space>
    </t-space>

    <t-space direction="vertical" size="small">
      <p>合并配置选项</p>
      <t-space>
        <t-button theme="primary" variant="outline" @click="showWithoutCount"> 不显示合并计数 </t-button>
        <t-button theme="success" variant="outline" @click="showCustomFormat"> 自定义计数格式 </t-button>
        <t-button theme="warning" variant="outline" @click="showCustomWindow"> 自定义合并窗口 </t-button>
      </t-space>
    </t-space>

    <t-space direction="vertical" size="small">
      <p>全局配置</p>
      <t-space>
        <t-button theme="primary" variant="outline" @click="enableGlobalMerge"> 启用全局合并 </t-button>
        <t-button theme="success" variant="outline" @click="testGlobalMerge"> 测试全局合并 </t-button>
        <t-button theme="default" variant="outline" @click="disableGlobalMerge"> 禁用全局合并 </t-button>
      </t-space>
    </t-space>

    <t-space direction="vertical" size="small">
      <p>管理功能</p>
      <t-space>
        <t-button theme="warning" variant="outline" @click="clearByKey"> 清除特定类型消息 </t-button>
        <t-button theme="danger" variant="outline" @click="$message.closeAll()"> 清除所有消息 </t-button>
      </t-space>
    </t-space>

    <t-space direction="vertical" size="small">
      <p>压力测试</p>
      <t-space>
        <t-button theme="primary" variant="outline" @click="stressTest"> 快速触发多个相同消息 </t-button>
        <t-button theme="success" variant="outline" @click="mixedTest"> 混合消息测试 </t-button>
      </t-space>
    </t-space>
  </t-space>
</template>

<script setup>
import { MessagePlugin } from 'tdesign-vue-next';

// 基础合并功能
const showBasicMerge = () => {
  // 连续触发相同消息，会自动合并
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      MessagePlugin.info({
        content: '这是一条会被合并的消息',
        mergeIdentical: true,
        mergeWindow: 2000, // 设置2秒的合并窗口，确保所有消息都能合并
      });
    }, i * 50); // 减少时间间隔到50ms，确保在合并窗口内
  }
};

// 不同主题相同内容
const showDifferentTheme = () => {
  MessagePlugin.info({
    content: '相同内容不同主题',
    mergeIdentical: true,
  });
  MessagePlugin.error({
    content: '相同内容不同主题',
    mergeIdentical: true,
  });
};

// 自定义合并标识
const showCustomMergeKey = () => {
  MessagePlugin.info({
    content: '消息内容1',
    mergeKey: 'custom-key',
    mergeIdentical: true,
  });
  MessagePlugin.warning({
    content: '消息内容2',
    mergeKey: 'custom-key',
    mergeIdentical: true,
  });
};

// 不显示合并计数
const showWithoutCount = () => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      MessagePlugin.success({
        content: '不显示计数的合并消息',
        mergeIdentical: true,
        showMergeCount: false,
        mergeWindow: 1000, // 设置合并窗口，确保所有消息都能合并
      });
    }, i * 50); // 减少时间间隔到50ms，确保在合并窗口内
  }
};

// 自定义计数格式
const showCustomFormat = () => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      MessagePlugin.warning({
        content: '自定义格式的合并消息',
        mergeIdentical: true,
        mergeCountFormat: ' [重复{count}次]',
        mergeWindow: 1000, // 设置合并窗口，确保所有消息都能合并
      });
    }, i * 50); // 减少时间间隔到50ms，确保在合并窗口内
  }
};

// 自定义合并窗口
const showCustomWindow = () => {
  MessagePlugin.info({
    content: '长合并窗口消息',
    mergeIdentical: true,
    mergeWindow: 2000, // 2秒内的相同消息会合并
  });

  // 1.5秒后再发送相同消息，应该会合并
  setTimeout(() => {
    MessagePlugin.info({
      content: '长合并窗口消息',
      mergeIdentical: true,
      mergeWindow: 2000,
    });
  }, 1500);
};

// 启用全局合并
const enableGlobalMerge = () => {
  MessagePlugin.configMerge({
    mergeIdentical: true,
    mergeWindow: 2000, // 增加全局合并窗口到2秒
    maxMergeCount: 50,
    showMergeCount: true,
    mergeCountFormat: ' (×{count})',
  });
  MessagePlugin.success('已启用全局合并配置');
};

// 测试全局合并
const testGlobalMerge = () => {
  // 不需要设置 mergeIdentical，会使用全局配置
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      MessagePlugin.info('全局合并测试消息');
    }, i * 50); // 减少时间间隔，确保在合并窗口内
  }
};

// 禁用全局合并
const disableGlobalMerge = () => {
  MessagePlugin.configMerge({
    mergeIdentical: false,
  });
  MessagePlugin.warning('已禁用全局合并配置');
};

// 清除特定类型消息
const clearByKey = () => {
  // 先创建一些带有特定 mergeKey 的消息
  MessagePlugin.error({
    content: '错误消息1',
    mergeKey: 'error-type',
    mergeIdentical: true,
  });
  MessagePlugin.error({
    content: '错误消息2',
    mergeKey: 'error-type',
    mergeIdentical: true,
  });

  // 2秒后清除特定类型的消息
  setTimeout(() => {
    MessagePlugin.clearByKey('error-type');
    MessagePlugin.success('已清除错误类型的消息');
  }, 2000);
};

// 压力测试
const stressTest = () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      MessagePlugin.info({
        content: '压力测试消息',
        mergeIdentical: true,
        mergeWindow: 2000, // 设置2秒合并窗口，确保所有10条消息都能合并
      });
    }, i * 50);
  }
};

// 混合消息测试
const mixedTest = () => {
  const messages = [
    { theme: 'info', content: '信息消息' },
    { theme: 'success', content: '成功消息' },
    { theme: 'warning', content: '警告消息' },
    { theme: 'error', content: '错误消息' },
  ];

  messages.forEach((msg, index) => {
    // 每种消息发送3次
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        MessagePlugin[msg.theme]({
          content: msg.content,
          mergeIdentical: true,
          mergeWindow: 2000, // 设置2秒合并窗口，确保相同类型消息能合并
        });
      }, (index * 3 + i) * 50); // 减少时间间隔，确保在合并窗口内
    }
  });
};
</script>
