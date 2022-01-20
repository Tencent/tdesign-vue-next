<template>
  <div class="tdesign-demo-block-column" style="width: 80%">
    <t-tag-input v-model="tags" :min-collapsed-num="1" />
    <t-tag-input v-model="tags" :min-collapsed-num="3">
      <template #collapsedItems="{ collapsedTags }">
        <t-popup>
          <t-tag>More({{ collapsedTags?.length }})</t-tag>
          <template #content>
            <t-tag v-for="item in collapsedTags" :key="item" style="margin-right: 4px">
              {{ item }}
            </t-tag>
          </template>
        </t-popup>
      </template>
    </t-tag-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TTagInputCollapsed',
  setup() {
    const tags = ref(['Vue', 'React', 'Miniprogram', 'Angular', 'Flutter']);
    return { tags };
  },
});
</script>
