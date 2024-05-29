import { mount } from '@vue/test-utils';
import { BaseTable, EnhancedTable, PrimaryTable, Table } from 'tdesign-vue-next';

const data = Array.from({ length: 5 }).fill(null).map((item, index) => ({
  id: index + 100,
  index: index + 100,
  instance: `JQTest${index + 1}`,
  status: index % 2,
  owner: 'jenny;peter',
  description: 'test',
}));

const SIMPLE_COLUMNS = [
  { title: 'Index', colKey: 'index' },
  { title: 'Instance', colKey: 'instance' },
];

// 4 类表格组件同时测试
const TABLES = [Table, BaseTable, PrimaryTable, EnhancedTable];

// 每一种表格组件都需要单独测试，避免出现组件之间属性或事件透传不成功的情况
TABLES.forEach((TTable) => {
  describe(TTable.name, () => {
    // 测试边框
    describe(':props.bordered', () => {
      it('bordered default value is true', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" bordered data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table--bordered').exists()).toBeTruthy();
      });
      it('bordered={true} works fine', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" bordered={true} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table--bordered').exists()).toBeTruthy();
      });
      it('bordered={false} works fine', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" bordered={false} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table--bordered').exists()).toBeFalsy();
      });
    });

    // 测试边框
    describe(':props.rowAttributes', () => {
      it('props.rowAttributes could be an object', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                rowKey="index"
                rowAttributes={{ 'data-level': 'level-1' }}
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.attributes('data-level')).toBe('level-1');
      });

      it('props.rowAttributes could be an Array<object>', () => {
        const wrapper = mount({
          render() {
            const rowAttrs = [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }];
            return <TTable rowKey="index" rowAttributes={rowAttrs} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.attributes('data-level')).toBe('level-1');
        expect(trWrapper.attributes('data-name')).toBe('tdesign');
      });

      it('props.rowAttributes could be a function', () => {
        const wrapper = mount({
          render() {
            const rowAttrs = () => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }];
            return <TTable rowKey="index" rowAttributes={rowAttrs} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.attributes('data-level')).toBe('level-1');
        expect(trWrapper.attributes('data-name')).toBe('tdesign');
      });

      it('props.rowAttributes could be a Array<Function>', () => {
        const wrapper = mount({
          render() {
            const rowAttrs = [() => [{ 'data-level': 'level-1' }, { 'data-name': 'tdesign' }]];
            return <TTable rowKey="index" rowAttributes={rowAttrs} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.attributes('data-level')).toBe('level-1');
        expect(trWrapper.attributes('data-name')).toBe('tdesign');
      });
    });

    describe(':props.rowClassName', () => {
      it('props.rowClassName could be a string', () => {
        const rowClassName = 'tdesign-class';
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" rowClassName={rowClassName} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.classes(rowClassName)).toBeTruthy();
      });

      it('props.rowClassName could be an object ', () => {
        const rowClassName = {
          'tdesign-class': true,
          'tdesign-class-next': false,
        };
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" rowClassName={rowClassName} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.classes('tdesign-class')).toBe(true);
        expect(trWrapper.classes('tdesign-class-next')).toBe(false);
      });

      it('props.rowClassName could be an Array ', () => {
        const rowClassName = [
          'tdesign-class-default',
          {
            'tdesign-class': true,
            'tdesign-class-next': false,
          },
        ];
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" rowClassName={rowClassName} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.classes('tdesign-class-default')).toBe(true);
        expect(trWrapper.classes('tdesign-class')).toBe(true);
        expect(trWrapper.classes('tdesign-class-next')).toBe(false);
      });

      it('props.rowClassName could be a function ', () => {
        const rowClassName = () => ({
          'tdesign-class': true,
          'tdesign-class-next': false,
        });
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" rowClassName={rowClassName} data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        const trWrapper = wrapper.find('tbody').find('tr');
        expect(trWrapper.classes('tdesign-class')).toBe(true);
        expect(trWrapper.classes('tdesign-class-next')).toBe(false);
      });
    });

    // 测试空数据
    describe(':props.empty', () => {
      it('empty default value is 暂无数据', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={[]} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__empty').text()).toBe('暂无数据');
      });

      it('props.empty=Empty Data', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={[]} empty="Empty Data" columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__empty').text()).toBe('Empty Data');
      });

      it('props.empty works fine as a function', () => {
        const emptyText = 'Empty Data Rendered By Function';
        const wrapper = mount({
          render() {
            return (
              <TTable
                rowKey="index"
                data={[]}
                empty={() => <div class="render-function-class">{emptyText}</div>}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
        expect(wrapper.find('.render-function-class').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__empty').text()).toBe(emptyText);
      });

      it('slots.empty works fine', () => {
        const emptyText = 'Empty Data Rendered By Slots';
        const wrapper = mount({
          render() {
            return (
              <TTable
                rowKey="index"
                data={[]}
                v-slots={{ empty: () => <div class="slots-empty-class">{emptyText}</div> }}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
        expect(wrapper.find('.slots-empty-class').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__empty').text()).toBe(emptyText);
      });
    });

    // 测试第一行通栏
    describe(':props.firstFullRow', () => {
      it('props.firstFullRow could be string', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                firstFullRow="This is a full row at first."
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
      });

      it('props.firstFullRow works fine as a function', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                firstFullRow={() => <span>This is a full row at first.</span>}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
      });

      // 支持插槽驼峰
      it('slots.firstFullRow works fine', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ firstFullRow: () => <span>This is a full row at first.</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
      });

      // 支持插槽中划线
      it('slots[first-full-row] works fine', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ 'first-full-row': () => <span>This is a full row at first.</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__first-full-row').exists()).toBeTruthy();
      });
    });

    // 测试最后一行通栏
    describe(':props.lastFullRow', () => {
      it('props.lastFullRow could be string', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                lastFullRow="This is a full row at last."
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
      });
      it('props.lastFullRow works fine as a function', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                lastFullRow={() => <span>This is a full row at last.</span>}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
      });
      // 支持插槽驼峰
      it('slots.lastFullRow works fine', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ lastFullRow: () => <span>This is a full row at last.</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
      });
      // 支持插槽中划线
      it('slots[last-full-row] works fine', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ 'last-full-row': () => <span>This is a full row at last.</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__row--full').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__last-full-row').exists()).toBeTruthy();
      });
    });

    describe(':props.loading', () => {
      it('props.loading = true works fine', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} loading={true}></TTable>;
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').exists()).toBeFalsy();
      });

      it('props.loading works fine as a function', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} loading={() => 'function loading'}></TTable>
            );
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').text()).toBe('function loading');
      });

      it('props.loading hide loading icon with `loadingProps`', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
                loading={() => 'function loading'}
                loadingProps={{ indicator: false }}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
        expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').text()).toBe('function loading');
      });

      it('slots.loading works fine', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                loading={true}
                rowKey="index"
                data={[]}
                columns={SIMPLE_COLUMNS}
                v-slots={{ loading: () => <span>slots loading</span> }}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').text()).toBe('slots loading');
      });

      it('slots.loading hide indicator(loading icon) with `loadingProps`', () => {
        const wrapper = mount({
          render() {
            return (
              <TTable
                loading={true}
                loadingProps={{ indicator: false }}
                rowKey="index"
                data={[]}
                columns={SIMPLE_COLUMNS}
                v-slots={{ loading: () => <span>slots loading</span> }}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBeTruthy();
        expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
        expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
        expect(wrapper.find('.t-loading__text').text()).toBe('slots loading');
      });
    });

    describe(':props.verticalAlign', () => {
      it('props.verticalAlign default value is middle, do not need t-vertical-align-middle', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} verticalAlign="middle"></TTable>;
          },
        });
        // 垂直居中对齐不需要 t-vertical-align-middle
        expect(wrapper.classes('t-vertical-align-middle')).toBeFalsy();
      });

      it('props.verticalAlign = bottom', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} verticalAlign="bottom"></TTable>;
          },
        });
        expect(wrapper.classes('t-vertical-align-bottom')).toBe(true);
      });
      it('props.verticalAlign = top', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} verticalAlign="top"></TTable>;
          },
        });
        expect(wrapper.classes('t-vertical-align-top')).toBe(true);
      });
      it('props.verticalAlign = middle, do not need t-vertical-align-middle', () => {
        const wrapper = mount({
          render() {
            return <TTable rowKey="index" data={data} columns={SIMPLE_COLUMNS} verticalAlign="middle"></TTable>;
          },
        });
        // 垂直居中对齐不需要 t-vertical-align-middle
        expect(wrapper.classes('t-vertical-align-middle')).toBeFalsy();
      });
    });

    describe(':props.topContent', () => {
      it('props.topContent could be a string', () => {
        const topContentText = 'This is top content';
        const wrapper = mount({
          render() {
            return <TTable topContent={topContentText} rowKey="index" data={data} columns={SIMPLE_COLUMNS}></TTable>;
          },
        });
        expect(wrapper.find('.t-table__top-content').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__top-content').text()).toBe(topContentText);
      });

      it('props.topContent could be a function', () => {
        const topContentText = 'This is top content';
        const wrapper = mount({
          render() {
            return (
              <TTable
                topContent={() => <span>{topContentText}</span>}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__top-content').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__top-content').text()).toBe(topContentText);
      });

      it('slots.topContent works fine', () => {
        const topContentText = 'This is top content';
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ topContent: () => <span>{topContentText}</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__top-content').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__top-content').text()).toBe(topContentText);
      });

      it('slots.top-content works fine', () => {
        const topContentText = 'This is top content';
        const wrapper = mount({
          render() {
            return (
              <TTable
                v-slots={{ 'top-content': () => <span>{topContentText}</span> }}
                rowKey="index"
                data={data}
                columns={SIMPLE_COLUMNS}
              >
              </TTable>
            );
          },
        });
        expect(wrapper.find('.t-table__top-content').exists()).toBeTruthy();
        expect(wrapper.find('.t-table__top-content').text()).toBe(topContentText);
      });
    });
  });
});
