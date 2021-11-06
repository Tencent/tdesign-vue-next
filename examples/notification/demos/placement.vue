<template>
  <div>
    <div class="t-message-offset">
      <t-input placeholder='请输入横向偏移量' v-model="offsetX"></t-input>
      <t-input placeholder='请输入纵向偏移量' v-model="offsetY"></t-input>
    </div>
    <t-button variant="outline" @click="$notify.info(infoList[0])">左上角</t-button>
    <t-button variant="outline" @click="$notify.info(infoList[1])">右上角</t-button>
    <br /><br />
    <t-button variant="outline" @click="$notify.info(infoList[2])">左下角</t-button>
    <t-button variant="outline" @click="$notify.info(infoList[3])">右下角</t-button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const offsetX = ref('');
    const offsetY = ref('');
    
    const infoList = computed(() => {
      return [
        { placement: 'top-left' },
        { placement: 'top-right' },
        { placement: 'bottom-left' },
        { placement: 'bottom-right' },
      ].map((item) => ({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
        offset: [offsetX.value, offsetY.value],
        ...item,
      }));
    })

    return {
      infoList,
      offsetX,
      offsetY
    }
  },
  data() {
    return {
      offsetX: '',
      offsetY: '',
    };
  },
  computed: {
    infoList() {
      return [
        { placement: 'top-left' },
        { placement: 'top-right' },
        { placement: 'bottom-left' },
        { placement: 'bottom-right' },
      ].map((item) => ({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
        offset: [this.offsetX, this.offsetY],
        ...item,
      }));
    },
  },
});
</script>

<style scoped>
  .t-button {
    margin-right: 16px;
    margin-bottom: 16px;
  }

  .t-message-offset .t-input {
    width: 130px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 36px;
  }

  .t-button + .t-button{
    margin-left: 10px;
  }
</style>
