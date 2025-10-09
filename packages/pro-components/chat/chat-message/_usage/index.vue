<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }">
      <div style="width: 560px">
        <t-chat-message
          avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
          datetime="今天16:38"
          name="TDesignAI"
          role="user"
          :content="[
            {
              type: 'text',
              data: '牛顿第一定律是否适用于所有参考系？',
            },
          ]"
          v-bind="configProps"
        />
        <t-chat-message
          avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
          datetime="今天16:38"
          name="TDesignAI"
          role="assistant"
          status="pending"
          v-bind="configProps"
        />
      </div>
    </template>
  </base-usage>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import configJson from './props.json';
const configList = ref(configJson);
// labe:组件名  value:chat （不用chat渲染不出来todo）
const panelList = [{ label: 'ChatMessage', value: 'chat' }];
const usageCodeMap = {
  chat: ` 
  <div style="width: 560px">
  <t-chat-message
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:38"
        name="TDesignAI"
        role="user"
          :content="[
            {
              type: 'text',
              data: '牛顿第一定律是否适用于所有参考系？',
            },
          ]"
        v-bind="configProps"
      />
      <t-chat-message
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:38"
        name="TDesignAI"
        role="assistant"
        status="pending"
        v-bind="configProps"
      />
       </div>
      `,
};

const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);
function onPanelChange(panel) {
  usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
}
</script>
