<template>
  <div>
    <t-switch v-model="loading" class="mb-20"></t-switch>

    <div>
      <t-skeleton :loading="loading" class="mb-20">
        <div class="t-skeleton-demo-paragraph">
          <p style="line-height: 20px">
            明月几时有，把酒问青天。 不知天上宫阙，今夕是何年？ 我欲乘风归去，又恐琼楼玉宇， 高处不胜寒。
            起舞弄清影，何似在人间！
          </p>
          <p>
            转朱阁，低绮户，照无眠。 不应有恨，何事长向别时圆？ 人有悲欢离合，月有阴晴圆缺， 此事古难全。
            但愿人长久，千里共婵娟。
          </p>
        </div>
      </t-skeleton>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(true);
    return {
      loading,
    };
  },
});
</script>

<style scoped>
.mb-20 {
  margin-bottom: 20px;
}
.t-skeleton-demo-paragraph {
  line-height: 25px;
}
</style>
