<template>
  <t-space direction="vertical">
    <!-- 选项过多时，可折叠 -->
    <t-select v-model="value" placeholder="请选择" multiple :minCollapsedNum="minCollapsedNum" :options="options" />

    <!-- 自定义折叠项内容，collapsedItems 为渲染函数 (value, count, collapsedSelectedItems) -->
    <t-select
      v-model="value"
      placeholder="请选择"
      multiple
      :minCollapsedNum="minCollapsedNum"
      :collapsedItems="collapsedItems"
      :options="options"
    />

    <!-- 自定义折叠项内容，collapsedItems 为 插槽(slot) { value, count, collapsedSelectedItems }-->
    <t-select v-model="value" placeholder="请选择" multiple :minCollapsedNum="minCollapsedNum" :options="options">
      <!-- hover展示折叠部分的已选项 -->
      <template #collapsedItems="{ collapsedSelectedItems, count }">
        <t-popup>
          <template #content>
            <p v-for="(item, index) in collapsedSelectedItems" :key="index" style="padding: 8px">
              {{ item.label }}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00a870; margin-left: 8px">+{{ count }}</span>
        </t-popup>
      </template>
    </t-select>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
        { label: '选项四', value: '4' },
        { label: '选项五', value: '5' },
        { label: '选项六', value: '6' },
        { label: '选项七', value: '7' },
        { label: '选项八', value: '8' },
        { label: '选项九', value: '9' },
      ],
      value: ['1', '3', '9'],
      minCollapsedNum: 1,
    };
  },
  methods: {
    collapsedItems(h, {
      value, count, collapsedSelectedItems, onClose,
    }) {
      console.log('collapsedItems: ', value, collapsedSelectedItems, count, onClose);
      if (!count) return;
      // hover展示全部已选项
      return (
        <t-popup>
          <div slot="content">
            {collapsedSelectedItems.map((item, index) => (
              <p style="padding: 2px;">
                <t-tag
                  closable={true}
                  onClick={() => {
                    onClose(index + 1);
                  }}
                >
                  {item.label}
                </t-tag>
              </p>
            ))}
          </div>
          <span v-show={count > 0} style="color: #ED7B2F; margin-left: 8px">
            +{count}
          </span>
        </t-popup>
      );
    },
  },
};
</script>
