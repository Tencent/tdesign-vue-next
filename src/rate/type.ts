/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

export interface TdRateProps {
  /**
   * 是否允许半选
   * @default false
   */
  allowHalf?: boolean;
  /**
   * 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，两个值表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色。示例：['#ED7B2F', '#999999']
   */
  color?: string | Array<string>;
  /**
   * 评分的数量
   * @default 5
   */
  count?: number;
  /**
   * 是否禁用评分
   * @default false
   */
  disabled?: boolean;
  /**
   * 评分图标的间距
   * @default 6
   */
  gap?: number;
  /**
   * 是否显示对应的辅助文字
   * @default false
   */
  showText?: boolean;
  /**
   * 评分图标的大小，示例：`20`
   * @default ''
   */
  size?: string;
  /**
   * 自定义评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分']
   */
  texts?: Array<string>;
  /**
   * 选择评分的值
   * @default 0
   */
  value: number;
  /**
   * 选择评分的值，非受控属性
   * @default 0
   */
  defaultValue: number;
  /**
   * 形状类型，有描边类型和填充类型两种
   * @default outline
   */
  variant?: 'outline' | 'filled';
  /**
   * 评分数改变时触发
   */
  onChange?: (value: number) => void;
};
