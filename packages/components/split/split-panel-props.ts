/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSplitPanelProps } from '../split/type';
import { PropType } from 'vue';

export default {
  /** 初始面板大小，支持数字 px 或者文字 '百分比%' 类型 */
  defaultSize: {
    type: [String, Number] as PropType<TdSplitPanelProps['defaultSize']>,
  },
  /** 当前面板的最大尺寸,支持数字 px 或者文字 '百分比%' 类型-继承父级 panelSize.max */
  max: {
    type: [String, Number] as PropType<TdSplitPanelProps['max']>,
  },
  /** 当前面板的最小尺寸,支持数字 px 或者文字 '百分比%' 类型-继承父级 panelSize.min */
  min: {
    type: [String, Number] as PropType<TdSplitPanelProps['min']>,
  },
  /** 是否开启拖拽伸缩 */
  resizable: {
    type: Boolean,
    default: true,
  },
};
