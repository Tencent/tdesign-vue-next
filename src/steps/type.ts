/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode } from '../common';

export interface TdStepsProps {
  /**
   * 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成
   */
  current?: string | number;
  /**
   * 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成，非受控属性
   */
  defaultCurrent?: string | number;
  /**
   * 步骤条方向，有两种：横向和纵向
   * @default horizontal
   * @deprecated
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 步骤条方向，有两种：横向和纵向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 步骤条数据列表（作用和 StepItem 效果一样）
   */
  options?: Array<TdStepItemProps>;
  /**
   * 步骤条顺序，纵向步骤有效（direction = horizontal）
   * @default positive
   */
  sequence?: 'positive' | 'reverse';
  /**
   * 步骤条风格
   * @default default
   */
  theme?: 'default' | 'dot';
  /**
   * 当前步骤发生变化时触发
   */
  onChange?: (current: string | number, previous: string | number, context?: { e?: MouseEvent }) => void;
};

export interface TdStepItemProps {
  /**
   * 步骤描述
   * @default ''
   */
  content?: string | TNode;
  /**
   * 步骤描述，同 content
   */
  default?: string | TNode;
  /**
   * 显示在步骤描述下方的额外内容，比如：操作项
   */
  extra?: string | TNode;
  /**
   * 图标，默认显示内置图标，也可以自定义图标，值为 false 则不显示图标。优先级大于 `status` 定义的图标
   * @default true
   */
  icon?: boolean | TNode;
  /**
   * 当前步骤的状态
   * @default default
   */
  status?: StepStatus;
  /**
   * 标题
   * @default ''
   */
  title?: string | TNode;
  /**
   * 当前步骤标识
   */
  value?: string | number;
};

export type StepStatus = 'default' | 'process' | 'finish' | 'error';
