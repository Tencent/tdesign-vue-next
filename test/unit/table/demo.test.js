/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import asyncLoadingVue from '@/examples/table/demos/async-loading.vue';
import baseVue from '@/examples/table/demos/base.vue';
import customCellVue from '@/examples/table/demos/custom-cell.vue';
import customColButtonVue from '@/examples/table/demos/custom-col-button.vue';
import customColVue from '@/examples/table/demos/custom-col.vue';
import customFooterVue from '@/examples/table/demos/custom-footer.vue';
import customHeaderVue from '@/examples/table/demos/custom-header.vue';
import dataSortVue from '@/examples/table/demos/data-sort.vue';
import dragColSortVue from '@/examples/table/demos/drag-col-sort.vue';
import dragSortVue from '@/examples/table/demos/drag-sort.vue';
import emptyVue from '@/examples/table/demos/empty.vue';
import expandableVue from '@/examples/table/demos/expandable.vue';
import filterControlledVue from '@/examples/table/demos/filter-controlled.vue';
import fixedColumnVue from '@/examples/table/demos/fixed-column.vue';
import fixedHeaderColVue from '@/examples/table/demos/fixed-header-col.vue';
import fixedHeaderVue from '@/examples/table/demos/fixed-header.vue';
import lazyVue from '@/examples/table/demos/lazy.vue';
import loadingVue from '@/examples/table/demos/loading.vue';
import mergeCellsVue from '@/examples/table/demos/merge-cells.vue';
import multiHeaderVue from '@/examples/table/demos/multi-header.vue';
import multipleSortVue from '@/examples/table/demos/multiple-sort.vue';
import paginationAjaxVue from '@/examples/table/demos/pagination-ajax.vue';
import paginationVue from '@/examples/table/demos/pagination.vue';
import selectMultipleVue from '@/examples/table/demos/select-multiple.vue';
import selectSingleVue from '@/examples/table/demos/select-single.vue';
import showColumnsVue from '@/examples/table/demos/show-columns.vue';
import singleSortVue from '@/examples/table/demos/single-sort.vue';
import treeSelectVue from '@/examples/table/demos/tree-select.vue';
import treeVue from '@/examples/table/demos/tree.vue';

MockDate.set('2020-12-28');

const mapper = {
  asyncLoadingVue,
  baseVue,
  customCellVue,
  customColButtonVue,
  customColVue,
  customFooterVue,
  customHeaderVue,
  dataSortVue,
  dragColSortVue,
  dragSortVue,
  emptyVue,
  expandableVue,
  filterControlledVue,
  fixedColumnVue,
  fixedHeaderColVue,
  fixedHeaderVue,
  lazyVue,
  loadingVue,
  mergeCellsVue,
  multiHeaderVue,
  multipleSortVue,
  paginationAjaxVue,
  paginationVue,
  selectMultipleVue,
  selectSingleVue,
  showColumnsVue,
  singleSortVue,
  treeSelectVue,
  treeVue,
};

describe('Table', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Table ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
