<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      <t-check-tag
        v-for="(tag, index) in tags"
        :key="index"
        :defaultChecked="tag.defaultChecked"
        @click="handleClick(tag, index)"
        @change="handleChange"
      >
        {{ tag.name }}
      </t-check-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: '选中1',
          defaultChecked: true,
        },
        {
          name: '选中2',
          defaultChecked: true,
        },
        {
          name: '未选3',
        },
        {
          name: '未选4',
        },
      ],
    };
  },
  methods: {
    handleClick(tag, index) {
      console.log(tag, index);
    },
    handleChange(isChecked) {
      console.log(isChecked);
    },
  },
};
</script>

<style scoped>
.tag-demo .tdesign-demo-block {
  width: 500px;
  display: flex;
  justify-content: space-around;
}
</style>

