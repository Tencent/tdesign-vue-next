<template>
  <div style="width: 100%">
    <t-tag-input :value="tags" :min-collapsed-num="1" @change="onChange" />
    <br /><br />
    <t-tag-input :value="tags" :min-collapsed-num="3" @change="onChange">
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TTagInputCollapsed',
  data() {
    return {
      tags: ['Vue', 'React', 'Miniprogram', 'Angular', 'Flutter'],
    };
  },
  methods: {
    onChange(val) {
      this.tags = val;
    },
  },
});
</script>
