<template>
  <t-tooltip content="在 CodeSandbox 中打开">
    <form
      ref="codeformRef"
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      @click="submit"
    >
      <input type="hidden" name="parameters" :value="params" />

      <div class="action-online">
        <svg
          focusable="false"
          data-icon="code-sandbox"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M709.6 210l.4-.2h.2L512 96 313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z"
          ></path>
        </svg>
      </div>
    </form>
  </t-tooltip>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { getCodeSandboxParams } from './getCodeSandboxParams';

export default defineComponent({
  name: 'Stackblitz',
  props: {
    demoName: String,
    componentName: String,
  },
  setup(props) {
    const code = ref('');
    const params = computed(() => {
      return getCodeSandboxParams(code.value, {
        title: `${props.demoName} - ${props.componentName}`,
      });
    });
    const codeformRef = ref(null);

    const submit = () => {
      code.value = document.querySelector(`td-doc-demo[demo-name='${props.demoName}']`).currentRenderCode;
      setTimeout(() => {
        codeformRef.value.submit();
      });
    };
    return {
      params,
      codeformRef,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped></style>
