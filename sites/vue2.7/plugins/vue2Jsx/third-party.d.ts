declare module '@vue/babel-preset-jsx' {
  import type { PluginItem } from "@babel/core"

  const preset: PluginItem
  export default preset

  export type VueJSXPresetOptions = {
    functional?: boolean
    injectH?: boolean
    vModel?: boolean
    vOn?: boolean

    compositionAPI?: 'auto' | 'native' | 'plugin' | boolean | 'naruto'
  }
}
