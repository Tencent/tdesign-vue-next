import { buildTypes } from './build-types';
import { buildComponents } from './build-components';

async function build() {
  await buildComponents();
  // 暂时跳过类型生成，因为有很多类型错误需要修复
  // 等后续修复了类型问题后再启用
  await buildTypes();
}

build();
