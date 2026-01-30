<template>
  <t-tooltip content="在 Stackblitz 中打开">
    <form
      ref="formRef"
      method="post"
      action="https://stackblitz.com/run?file=package.json,src%2Fdemo.vue"
      target="_blank"
      @click="submit"
    >
      <input type="hidden" name="project[files][src/demo.vue]" :value="code" />
      <input type="hidden" name="project[files][src/index.css]" :value="styleContent" />
      <input type="hidden" name="project[files][src/main.js]" :value="mainJsContent" />
      <input type="hidden" name="project[files][src/mock-data/sseRequest.ts]" :value="mockDataContent" />
      <input type="hidden" name="project[files][src/mock-data/sseRequest-reasoning.ts]" :value="mockDataContent" />

      <input type="hidden" name="project[files][index.html]" :value="htmlContent" />
      <input type="hidden" name="project[files][package.json]" :value="packageJSONContent" />
      <input type="hidden" name="project[files][vite.config.js]" :value="viteConfigContent" />
      <input type="hidden" name="project[files][.stackblitzrc]" :value="stackblitzRc" />
      <input type="hidden" name="project[template]" value="node" />

      <div class="action-online">
        <svg viewBox="0 0 28 28" height="20">
          <path
            fill="currentColor"
            d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z"
          ></path>
        </svg>
      </div>
    </form>
  </t-tooltip>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
  htmlContent,
  mainJsContent,
  styleContent,
  packageJSONContent,
  stackblitzRc,
  viteConfigContent,
  mockDataContent,
  mockDataReasoningContent,
} from './content';

export default defineComponent({
  name: 'Stackblitz',
  props: {
    demoName: String,
    componentName: String,
  },

  setup(props) {
    const data = {
      htmlContent,
      mainJsContent,
      styleContent,
      stackblitzRc,
      viteConfigContent,
      packageJSONContent,
      mockDataContent,
      mockDataReasoningContent,
    };
    const match = window.location.hostname.match(/preview-pr-(\d+)-tdesign-vue-next-chat.surge.sh/);
    if (match) {
      const packageJSON = JSON.parse(packageJSONContent);
      packageJSON.dependencies[
        '@tdesign-vue-next/chat'
      ] = `https://pkg.pr.new/Tencent/tdesign-vue-next/@tdesign-vue-next/chat@${match[1]}`;
      data.packageJSONContent = JSON.stringify(packageJSON, null, 2);
    }
    const code = ref('');

    const formRef = ref(null);

    const submit = () => {
      code.value = document.querySelector(`td-doc-demo[demo-name='${props.demoName}']`).currentRenderCode;
      setTimeout(() => {
        formRef.value.submit();
      });
    };

    return { ...data, formRef, submit, code };
  },
});
</script>
