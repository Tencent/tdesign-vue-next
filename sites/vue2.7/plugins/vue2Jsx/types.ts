import type { VueJSXPresetOptions } from '@vue/babel-preset-jsx'
import type { FilterPattern } from '@rollup/pluginutils'

export interface FilterOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export type Options = VueJSXPresetOptions &
  FilterOptions & { babelPlugins?: any[] }
