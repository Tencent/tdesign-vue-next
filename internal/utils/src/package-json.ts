// import { workspaceRoot, resolveWorkSpaceRoot } from './paths';
// const rootPackageJson = require(resolveWorkSpaceRoot('package.json'));

// TODO 这样写的好处是有类型，用 require 的写法是不是也可以手动指定类型呀，就是有点麻烦
import rootPackageJson from '../../../package.json';
import tdesignVueNextPackageJson from 'tdesign-vue-next/package.json';
import tdesignVueNextSitePackageJson from 'tdesign-vue-next/site/package.json';

export { rootPackageJson, tdesignVueNextPackageJson, tdesignVueNextSitePackageJson };
