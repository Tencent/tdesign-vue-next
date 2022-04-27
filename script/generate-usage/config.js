/* eslint-disable */
module.exports = {
  button: {
    panelStr: `const panelList = [{label: 'button', value: 'button'}];`,
    render: {
      button: `<t-button v-bind="configProps">确定</t-button>`,
    },
  },
  divider: {
    panelStr: `const panelList = [{label: 'divider', value: 'divider'}];`,
    render: {
      divider: `
        <div :style="{ width: '200px' }">
          <span>正直</span>
          <t-divider v-bind="configProps">TDesign</t-divider>
          <span>进取</span>
          <t-divider v-bind="configProps">TDesign</t-divider>
          <span>合作</span>
          <t-divider v-bind="configProps">TDesign</t-divider>
          <span>创新</span>
        </div>
      `,
    },
  },
  alert: {
    panelStr: `const panelList = [{label: 'alert', value: 'alert'}];`,
    render: {
      alert: `<t-alert message="这是一条信息" v-bind="configProps" />`,
    },
  },
  anchor: {
    panelStr: `const panelList = [{label: 'anchor', value: 'anchor'}];`,
    render: {
      anchor: `
        <t-anchor v-bind="configProps">
          <t-anchor-item href="#锚点一" title="基础锚点" />
          <t-anchor-item href="#锚点二" title="多级锚点" />
          <t-anchor-item href="#锚点三" title="指定容器锚点" />
        </t-anchor>
      `,
    },
  },
  'color-picker': {
    panelStr: `const panelList = [{label: 'colorPicker', value: 'colorPicker'}];`,
    render: {
      colorPicker: `<t-color-picker-panel v-bind="configProps"/>`,
    },
  },
  calendar: {
    panelStr: `const panelList = [{label: 'calendar', value: 'calendar'}];`,
    render: {
      calendar: `<t-calendar v-bind="configProps" />`,
    },
  },
  'date-picker': {
    panelStr: `const panelList = [{label: 'datePicker', value: 'datePicker'}];`,
    render: {
      datePicker: `<t-date-picker v-bind="configProps" />`,
    },
  },
  dropdown: {
    panelStr: `const panelList = [{label: 'dropdown', value: 'dropdown'}];`,
    render: {
      dropdown: `
        <t-dropdown :options="[{ content: '操作一', value: 1 }, { content: '操作二', value: 2 }]" v-bind="configProps">
          <t-button>更多...</t-button>
        </t-dropdown>
      `,
    },
  },
  menu: {
    panelStr: `const panelList = [{label: 'menu', value: 'menu'}, {label: 'headMenu', value: 'headMenu'}];`,
    render: {
      menu: `
        <div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
          <t-menu v-bind="configProps">
            <t-menu-item value="0">
              <template #icon>
                <t-icon name="app" />
              </template>
              仪表盘
            </t-menu-item>
      
            <t-submenu value="1" title="资源列表">
              <template #icon>
                <t-icon name="code" />
              </template>
              <t-menu-item value="1-1" disabled>
                <span>菜单二</span>
              </t-menu-item>
            </t-submenu>
            <t-submenu value="2" title="调度平台">
              <template #icon>
                <t-icon name="file" />
              </template>
              <t-submenu value="2-1" title="二级菜单-1">
                <t-menu-item value="3-1">三级菜单-1</t-menu-item>
                <t-menu-item value="3-2">三级菜单-2</t-menu-item>
                <t-menu-item value="3-3">三级菜单-3</t-menu-item>
              </t-submenu>
              <t-menu-item value="2-2">
                <span>二级菜单-2</span>
              </t-menu-item>
            </t-submenu>
          </t-menu>
        </div>
      `,
      headMenu: `
        <div :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }">
          <t-head-menu style="marginBottom: 20px" v-bind="configProps">
            <template #logo>
              <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />
            </template>
            <t-menu-item value="0">
              <span>菜单1</span>
            </t-menu-item>
            <t-menu-item value="1">
              <span>菜单2</span>
            </t-menu-item>
          </t-head-menu>
        </div>
      `,
    },
  },
  pagination: {
    panelStr: `const panelList = [{label: 'pagination', value: 'pagination'}];`,
    render: {
      pagination: `<t-pagination :total="30" v-bind="configProps" />`,
    },
  },
  steps: {
    panelStr: `const panelList = [{label: 'steps', value: 'steps'}];`,
    render: {
      steps: `
        <t-steps :current="1" v-bind="configProps">
          <t-step-item title="步骤1" content="提示文字" />
          <t-step-item title="步骤2" content="提示文字" />
          <t-step-item title="步骤3" content="提示文字" />
        </t-steps>
      `,
    },
  },
  table: {
    panelStr: `const panelList = [{label: 'table', value: 'table'}];`,
    render: {
      table: `<t-table
        v-bind="configProps"
        row-key="index"
        :data="[{index:1,platform:'公用'},{index:2,platform:'私有'}]"
        :columns="[{
          align: 'center',
          width: '100',
          colKey: 'index',
          title: '序号',
        },
        {
          width: 100,
          colKey: 'platform',
          title: '平台',
        }]"
      />`,
    },
  },
  tabs: {
    panelStr: `const panelList = [{label: 'tabs', value: 'tabs'}];`,
    render: {
      tabs: `
        <t-tabs v-bind="configProps">
          <t-tab-panel :value="1" label="选项卡1">
            <p style="margin: 20px">选项卡1内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="2" label="选项卡2">
            <p style="margin: 20px">选项卡2内容区</p>
          </t-tab-panel>
          <t-tab-panel :value="3" label="选项卡3">
            <p style="margin: 20px">选项卡3内容区</p>
          </t-tab-panel>
        </t-tabs>
      `,
    },
  },
  cascader: {
    panelStr: `const panelList = [{label: 'cascader', value: 'cascader'}];`,
    render: {
      cascader: `
        <t-cascader :options="[
          {
            label: '选项一',
            value: '1',
            children: [
              { label: '子选项一', value: '1.1' },
              { label: '子选项二', value: '1.2' },
            ],
          },
          {
            label: '选项二',
            value: '2',
            children: [
              { label: '子选项一', value: '2.1' },
              { label: '子选项二', value: '2.2' },
            ],
          },
        ]" v-bind="configProps" />
      `,
    },
  },
  checkbox: {
    panelStr: `const panelList = [{label: 'checkbox', value: 'checkbox'}];`,
    render: {
      checkbox: `<t-checkbox v-bind="configProps">基础多选框</t-checkbox>`,
    },
  },
  form: {
    panelStr: `const panelList = [{label: 'form', value: 'form'}];`,
    render: {
      form: `
        <t-form v-bind="configProps">
          <t-form-item label="姓名" name="name" initialData="TDesign">
            <t-input placeholder="请输入内容" />
          </t-form-item>
          <t-form-item label="手机号码" name="tel" initialData="123456">
            <t-input placeholder="请输入内容" />
          </t-form-item>
          <t-form-item label="课程" name="course" initialData="['1']">
            <t-checkbox-group>
              <t-checkbox value="1">语文</t-checkbox>
              <t-checkbox value="2">数学</t-checkbox>
              <t-checkbox value="3">英语</t-checkbox>
              <t-checkbox value="4">体育</t-checkbox>
            </t-checkbox-group>
          </t-form-item>
        </t-form>
      `,
    },
  },
  input: {
    panelStr: `const panelList = [{label: 'input', value: 'input'}];`,
    render: {
      input: `<t-input v-bind="configProps" />`,
    },
  },
  'input-number': {
    panelStr: `const panelList = [{label: 'inputNumber', value: 'inputNumber'}];`,
    render: {
      inputNumber: `<t-input-number v-bind="configProps"/>`,
    },
  },
  radio: {
    panelStr: `const panelList = [{label: 'radio', value: 'radio'}];`,
    render: {
      radio: `<t-radio v-bind="configProps">单选框</t-radio>`,
    },
  },
  select: {
    panelStr: `const panelList = [{label: 'select', value: 'select'}];`,
    render: {
      select: `
        <t-select v-bind="configProps">
          <t-option key="apple" label="Apple" value="apple" />
          <t-option key="orange" value="orange">Orange</t-option>
          <t-option key="banana" label="Banana" value="banana" />
        </t-select>
      `,
    },
  },
  'select-input': {
    panelStr: `const panelList = [{label: 'selectInput', value: 'selectInput'}];`,
    render: {
      selectInput: `<t-select-input panel="暂无数据" tips="这是 tips 文本信息" v-bind="configProps" />`,
    },
  },
  slider: {
    panelStr: `const panelList = [{label: 'slider', value: 'slider'}];`,
    render: {
      slider: `<t-slider v-bind="configProps" />`,
    },
  },
  switch: {
    panelStr: `const panelList = [{label: 'switch', value: 'switch'}];`,
    render: {
      switch: `<t-switch v-bind="configProps" />`,
    },
  },
  'tag-input': {
    panelStr: `const panelList = [{label: 'tagInput', value: 'tagInput'}];`,
    render: {
      tagInput: `<t-tagInput v-bind="configProps" />`,
    },
  },
  textarea: {
    panelStr: `const panelList = [{label: 'textarea', value: 'textarea'}];`,
    render: {
      textarea: `<t-textarea placeholder="请输入内容" v-bind="configProps" />`,
    },
  },
  'tree-select': {
    panelStr: `const panelList = [{label: 'treeSelect', value: 'treeSelect'}];`,
    render: {
      treeSelect: `
        <t-tree-select v-bind="configProps"
          :data="[{
              label: '广东省',
              value: 'guangdong',
              children: [{
                label: '广州市',
                value: 'guangzhou',
              }, {
                label: '深圳市',
                value: 'shenzhen',
              }],
            }, {
              label: '江苏省',
              value: 'jiangsu',
              children: [{
                label: '南京市',
                value: 'nanjing',
              }, {
                label: '苏州市',
                value: 'suzhou',
              }],
            }]"
        placeholder="请选择"
        />
      `,
    },
  },
  transfer: {
    panelStr: `const panelList = [{label: 'transfer', value: 'transfer'}];`,
    render: {
      transfer: `
        <t-transfer :data="[{
          value: 1,
          label: '内容1',
          disabled: false
        },{
          value: 2,
          label: '内容2',
          disabled: true
        },{
          value: 3,
          label: '内容3',
          disabled: false
        },]" v-bind="configProps" />
      `,
    },
  },
  'time-picker': {
    panelStr: `const panelList = [{label: 'timePicker', value: 'timePicker'}];`,
    render: {
      timePicker: `<t-timePicker v-bind="configProps" />`,
    },
  },
  upload: {
    panelStr: `const panelList = [{label: 'upload', value: 'upload'}];`,
    render: {
      upload: `<t-upload action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" v-bind="configProps" />`,
    },
  },
  avatar: {
    panelStr: `const panelList = [{label: 'avatar', value: 'avatar'}];`,
    render: {
      avatar: `<t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" v-bind="configProps" />`,
    },
  },
  badge: {
    panelStr: `const panelList = [{label: 'badge', value: 'badge'}];`,
    render: {
      badge: `
        <t-badge count="100" v-bind="configProps">
          <t-button>按钮</t-button>
        </t-badge>
      `,
    },
  },
  list: {
    panelStr: `const panelList = [{label: 'list', value: 'list'}];`,
    render: {
      list: `
        <t-list v-bind="configProps">
          <t-list-item>
            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
          </t-list-item>
          <t-list-item>
            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
          </t-list-item>
          <t-list-item>
            <t-list-item-meta title="列表主内容" description="列表内容列表内容" />
          </t-list-item>
        </t-list>
      `,
    },
  },
  loading: {
    panelStr: `const panelList = [{label: 'loading', value: 'loading'}];`,
    render: {
      loading: `<t-loading v-bind="configProps" />`,
    },
  },
  progress: {
    panelStr: `const panelList = [{label: 'progress', value: 'progress'}];`,
    render: {
      progress: `
        <div style="width:200px">
          <t-progress :percentage="50"  v-bind="configProps" />
        </div>
      `,
    },
  },
  swiper: {
    panelStr: `const panelList = [{label: 'swiper', value: 'swiper'}];`,
    render: {
      swiper: `
        <div :style="{ width: '500px' }">
          <t-swiper duration="300" interval="2000" v-bind="configProps">
            <t-swiper-item>
              <div :style="{ height: '200px', background: 'var(--td-success-color-7)' }" />
            </t-swiper-item>
            <t-swiper-item>
              <div :style="{ height: '200px', background: 'var(--td-warning-color-7)' }" />
            </t-swiper-item>
            <t-swiper-item>
              <div :style="{ height: '200px', background: 'var(--td-error-color-7)' }" />
            </t-swiper-item>
          </t-swiper>
        </div>
      `,
    },
  },
  skeleton: {
    panelStr: `const panelList = [{label: 'skeleton', value: 'skeleton'}];`,
    render: {
      skeleton: `
        <t-skeleton v-bind="configProps">
          <div class="t-skeleton-demo-paragraph">
            <p>
              骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
              一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
            </p>
          </div>
        </t-skeleton>
      `,
    },
  },
  tag: {
    panelStr: `const panelList = [{label: 'tag', value: 'tag'}];`,
    render: {
      tag: `<t-tag v-bind="configProps">标签</t-tag>`,
    },
  },
  tooltip: {
    panelStr: `const panelList = [{label: 'tooltip', value: 'tooltip'}];`,
    render: {
      tooltip: `
        <t-tooltip content="这是Tooltip内容" v-bind="configProps">
          <t-button>hover me</t-button>
        </t-tooltip>
      `,
    },
  },
  tree: {
    panelStr: `const panelList = [{label: 'tree', value: 'tree'}];`,
    render: {
      tree: `
        <t-tree :data="[{ label: '第一段',
          children: [ { label: '第二段' }, { label: '第二段' } ],
        },{
          label: '第一段',
          children: [ { label: '第二段' }, { label: '第二段' } ],
        },{
          label: '第一段',
          children: [ { label: '第二段' }, { label: '第二段' } ],
        }]" v-bind="configProps" />
      `,
    },
  },
  dialog: {
    panelStr: `const panelList = [{label: 'dialog', value: 'dialog'}];`,
    script: `
      const visible = ref(false);
      const handleClick = () => {
        visible.value = !visible.value;
      };
    `,
    render: {
      dialog: `
        <div>
          <t-button @click="visible = true">Open Modal</t-button>
          <t-dialog v-bind="configProps" v-model:visible="visible">
            <p>This is a dialog</p>
          </t-dialog>
        </div>
      `,
    },
  },
  drawer: {
    panelStr: `const panelList = [{label: 'drawer', value: 'drawer'}];`,
    script: `
      const visible = ref(false);
      const handleClick = () => {
        visible.value = true;
      };
    `,
    render: {
      drawer: `
        <div>
          <t-button @click="handleClick">Open Drawer</t-button>
          <t-drawer v-bind="configProps" v-model:visible="visible" header="header" :close-btn="true">
            <p>This is a Drawer</p>
          </t-drawer>
        </div>
      `,
    },
  },
  message: {
    panelStr: `const panelList = [{label: 'message', value: 'message'}];`,
    render: {
      message: `<t-message v-bind="configProps" duration="0" content="这里是 Message 信息"  :closeBtn="true" />`,
    },
  },
  notification: {
    panelStr: `const panelList = [{label: 'notification', value: 'notification'}];`,
    render: {
      notification: `<t-notification v-bind="configProps" duration="0" title="标题名称" content="这是一条消息通知" :closeBtn="true" />`,
    },
  },
  popconfirm: {
    panelStr: `const panelList = [{label: 'popconfirm', value: 'popconfirm'}];`,
    render: {
      popconfirm: `
        <t-popconfirm v-bind="configProps" content="确认删除吗">
          <t-button>删除</t-button>
        </t-popconfirm>
      `,
    },
  },
  popup: {
    panelStr: `const panelList = [{label: 'popup', value: 'popup'}];`,
    render: {
      popup: `
        <t-popup content="这是一个弹出框" v-bind="configProps">
          <t-button>按钮</t-button>
        </t-popup>
      `,
    },
  },
};
