<template>
  <router-view />
  <reload-prompt />
</template>
<script>
import { defineComponent } from 'vue';
import ReloadPrompt from './components/ReloadPrompt.vue';

export default defineComponent({
  components: {
    ReloadPrompt,
  },
});
</script>
