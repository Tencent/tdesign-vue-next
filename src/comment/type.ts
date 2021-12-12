/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { AvatarProps } from '../avatar';
import { TNode } from '../common';

export interface TdCommentProps {
  /**
   * 操作
   */
  actions?: Array<TNode>;
  /**
   * 作者
   */
  author?: string | TNode;
  /**
   * 头像
   */
  avatar?: string | AvatarProps | TNode;
  /**
   * 内容
   */
  content?: string | TNode;
  /**
   * 时间
   */
  datetime?: string | TNode;
  /**
   * 引用
   */
  quote?: string | TNode;
  /**
   * 回复
   */
  reply?: string | TNode;
};
