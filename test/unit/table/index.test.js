import { mount } from '@vue/test-utils';
import Table from '@/src/table/index.ts';

const data = [
  {
    id: 1,
    type: 'Number',
    value: '1',
  },
  {
    id: 2,
    type: 'Number',
    value: '2',
  },
  {
    id: 3,
    type: 'Number',
    value: '3',
  },
];
const columns = [
  {
    title: 'id',
    colKey: 'id',
  },
  {
    title: '类型',
    colKey: 'type',
  },
  {
    title: '取值',
    colKey: 'value',
  },
];
const pagination = {
  pageSize: 10,
  total: 120,
  visibleWithOnePage: true,
};
// every component needs four parts: props/events/slots/functions.
describe('Table', () => {
  // test props api
  describe(':props', () => {
    describe(':prop.data', () => {
      it('`data` is not undefined', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper.vm.$el.getElementsByTagName('tr').length).toBe(data.length + 1);
      });
      it('`data` is undefined', () => {
        const empty = (h) =>
          h({
            template: `<div slot="empty" id="empty-container">
            暂无数据
            </div>`,
          });
        const wrapper = mount({
          render() {
            return <Table rowKey="id" columns={columns} empty={empty}></Table>;
          },
        });
        expect(wrapper.find('#empty-container').exists()).toBe(true);
      });
    });
    describe(':props.columns', () => {
      it('`columns` is undefined', () => {
        const wrapper = mount({
          render() {
            return <Table></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('`columns` with children', () => {
        const data = [
          {
            platform: '公有',
            property: 'data',
            type: 'any[]',
            default: '[]',
            needed: 'Y',
            description: '数据源',
          },
          {
            platform: '公有',
            property: 'rowkey',
            type: 'String',
            default: '-1',
            needed: 'Y',
            description: '指定rowkey',
          },
        ];
        const columns = [
          {
            title: '汇总属性',
            children: [
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'test',
                ellipsis: true,
                colKey: 'platform',
                title: '平台',
              },
              {
                title: '类型及默认值',
                children: [
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'row',
                    ellipsis: true,
                    colKey: 'type',
                    title: '类型',
                  },
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'test4',
                    ellipsis: true,
                    colKey: 'default',
                    title: '默认值',
                  },
                  {
                    align: 'left',
                    width: '100',
                    minWidth: '100',
                    className: 'test3',
                    ellipsis: true,
                    colKey: 'needed',
                    title: '是否必传',
                  },
                ],
              },
            ],
          },
          {
            title: '属性及说明',
            children: [
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'test2',
                ellipsis: true,
                colKey: 'property',
                title: '属性',
              },
              {
                align: 'left',
                width: '100',
                minWidth: '100',
                className: 'row',
                ellipsis: true,
                colKey: 'description',
                title: '说明',
              },
            ],
          },
        ];
        const wrapper = mount({
          render() {
            return <Table rowKey="id" data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('`columns` with fixed column', () => {
        const columns = [
          {
            title: 'id',
            colKey: 'id',
            fixed: 'left',
          },
          {
            title: '类型',
            colKey: 'type',
          },
          {
            title: '取值',
            colKey: 'value',
          },
        ];
        const wrapper = mount({
          render() {
            return <Table rowKey="id" columns={columns} data={data}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('`columns` with align, width, minWidth and ellipsis', () => {
        const columns = [
          {
            title: 'id',
            colKey: 'id',
            width: 100,
            align: 'left',
            ellipsis: true,
            minWidth: 200,
          },
          {
            title: '类型',
            colKey: 'type',
          },
          {
            title: '取值',
            colKey: 'value',
          },
        ];
        const wrapper = mount({
          render() {
            return <Table rowKey="id" columns={columns} data={data}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
    describe(':props.pagination', () => {
      it('`pagination` visibleWithOnePage is true', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" data={data} columns={columns} pagination={pagination}></Table>;
          },
        });
        expect(wrapper.find('.t-table-pagination').exists()).toBe(true);
      });
    });
    describe(':props.empty', () => {
      it('`empty` is undefined', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" columns={columns}></Table>;
          },
        });
        expect(wrapper.find('.t-table--empty').exists()).toBe(true);
      });
      it('`empty` is a Function', () => {
        const empty = jest.fn(() => {
          /* */
        });
        mount({
          render() {
            return <Table rowKey="id" columns={columns} empty={empty}></Table>;
          },
        });
        expect(empty.mock.calls.length).toBe(1);
      });
    });
    describe(':props.loading', () => {
      it('`loading` is synchronous', () => {
        const loading = true;
        const wrapper = mount({
          render() {
            return <Table rowKey="id" columns={columns} loading={loading}></Table>;
          },
        });
        expect(wrapper.find('.t-loading').exists()).toBe(true);
      });
      it('`loading` is rendered with `slot`', () => {
        const loading = (h) =>
          h({
            template: '<div class="loading__container">loading</div>',
          });
        const wrapper = mount({
          render() {
            return <Table rowKey="id" loading={loading}></Table>;
          },
        });
        expect(wrapper.find('.loading__container').exists()).toBe(true);
      });
      // it('`loading` is asynchronous', () => {
      //   const loading = {
      //     async: true,
      //   };
      //   const wrapper = mount({
      //     render() {
      //       return <Table rowKey='id' columns={columns} loading={loading}></Table>;
      //     },
      //   });
      //   expect(wrapper.find('.t-table--loading-async').exists()).toBe(true);
      // });
    });
    describe(':props.bordered, :props:hover, :props.stripe, :props.size, :props.verticalAlign, :props.height', () => {
      it('size = "small", verticalAlign="middle"', () => {
        const wrapper = mount({
          render() {
            return (
              <Table
                data={data}
                columns={columns}
                bordered={true}
                stripe={true}
                size={'small'}
                hover={true}
                verticalAlign={'middle'}
              ></Table>
            );
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('size = "large", verticalAlign="top"', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" size={'large'} verticalAlign={'top'}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('size = "medium", verticalAlign="bottom"', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" size={'medium'} verticalAlign={'bottom'}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
      it('height = 100', () => {
        const wrapper = mount({
          render() {
            return <Table rowKey="id" height={100} data={data} columns={columns}></Table>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  // test slots
  describe(':slots', () => {
    it('Use slot to customize cell', async () => {
      const slotColumns = columns.slice(0);
      slotColumns[0] = {
        colKey: 'id',
        title: 'id',
        cell: 'idcell',
      };
    });
    it('Use slot to customize empty content', async () => {
      const empty = (h) =>
        h({
          template: '<div class="empty__container">empty</div>',
        });
      const wrapper = await mount({
        render() {
          return <Table rowKey="id" empty={empty} columns={columns}></Table>;
        },
      });
      expect(wrapper.find('.empty__container').exists()).toBe(true);
    });
  });

  // filters
  describe(':filters', () => {
    let wrapper;
    const data = [
      {
        key: '1',
        firstName: 'Eric',
        lastName: 'Spinke',
        email: 'espinke0@apache.org',
      },
      {
        key: '2',
        firstName: 'Gilberta',
        lastName: 'Purves',
        email: 'gpurves1@issuu.com',
      },
      {
        key: '3',
        firstName: 'Heriberto',
        lastName: 'Kment',
        email: 'hkment2@nsw.gov.au',
      },
      {
        key: '4',
        firstName: 'Lazarus',
        lastName: 'Skures',
        email: 'lskures3@apache.org',
      },
      {
        key: '5',
        firstName: 'Zandra',
        lastName: 'Croson',
        email: 'zcroson5@virginia.edu',
      },
    ];

    it('controlled filters', async () => {
      wrapper = await mount({
        data() {
          return {
            data,
            filteredInfo: null,
          };
        },
        computed: {
          columns() {
            let { filteredInfo } = this;
            filteredInfo = filteredInfo || {};
            const columns = [
              {
                title: 'FirstName',
                colKey: 'firstName',
                key: 'firstName',
                filters: [
                  { label: 'Heriberto', value: 'Heriberto' },
                  { label: 'Eric', value: 'Eric' },
                ],
                filteredValue: filteredInfo.firstName || null,
                onFilter: (value, record) => record.firstName.includes(value),
                filterMultiple: true,
              },
              {
                title: 'LastName',
                colKey: 'lastName',
                key: 'lastName',
              },
              {
                title: 'Email',
                colKey: 'email',
                key: 'email',
                filters: [
                  { label: 'hkment2@nsw.gov.au', value: 'hkment2@nsw.gov.au' },
                  { label: 'lskures3@apache.org', value: 'lskures3@apache.org' },
                ],
                filteredValue: filteredInfo.email || null,
                onFilter: (value, record) => record.email.includes(value),
              },
            ];
            return columns;
          },
        },
        render() {
          const { data, columns } = this;
          return <Table rowKey="id" data={data} columns={columns} />;
        },
      });
      expect(wrapper.findAll('.table-body tr').length).toBe(data.length);
      await wrapper.setData({ filteredInfo: { firstName: ['Jim'] } });
      await wrapper.setData({ filteredInfo: null });
      expect(wrapper.findAll('.table-body tr').length).toBe(data.length);
    });
  });
});
