module.exports = {
  button: {
    renderCode: `<t-button ____pointerProps____>确定</t-button>`,
  },
  divider: {
    renderCode: `<div :style="{ width: '200px' }">
  <span>正直</span>
  <t-divider __pointerProps__>TDesign</t-divider>
  <span>进取</span>
  <t-divider __pointerProps__>TDesign</t-divider>
  <span>合作</span>
  <t-divider __pointerProps__>TDesign</t-divider>
  <span>创新</span>
</div>`,
  },
  alert: {
    renderCode: `<t-alert message="这是一条信息" __pointerProps__ />`,
  },
  anchor: {
    renderCode: `<t-anchor __pointerProps__>
  <t-anchor-item href="#锚点一" title="基础锚点" />
  <t-anchor-item href="#锚点二" title="多级锚点" />
  <t-anchor-item href="#锚点三" title="指定容器锚点" />
</t-anchor>`,
  },
  calendar: {
    renderCode: `<t-calendar __pointerProps__ />`,
  },
  'date-picker': {
    renderCode: `<t-date-picker __pointerProps__ />`,
  },
  dropdown: {
    renderCode: `<t-dropdown options="[{ content: '操作一', value: 1 }, { content: '操作二', value: 2 }]" __pointerProps__>
  <t-button>更多...</t-button>
</t-dropdown>`,
  },
  menu: {
    importStr: `
          import { CodeIcon, AppIcon, FileIcon } from 'tdesign-icons-vue';\n
        `,
    renderCode: `
          const defaultProps = {
            :style: { marginBottom: '20px' },
            logo: <img src="https://www.tencent.com/img/index/menu_logo_hover.png" width="136" />,
          };
          
            <div :style="{{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }}">
              <t-head-menu {...defaultProps} __pointerProps__>
                <t-menu-item value="0">
                  <span>菜单1</span>
                </t-menu-item>
                <t-menu-item value="1">
                  <span>菜单2</span>
                </t-menu-item>
              </t-head-menu>

              <t-menu __pointerProps__>
                <t-menu-item value="0" icon={<t-appIcon />}>
                  仪表盘
                </t-menu-item>
                <t-menu-sub value="1" title={<span>资源列表</span>} icon={<t-codeIcon />}>
                  <t-menu-item value="1-1" disabled>
                    <span>菜单二</span>
                  </t-menu-item>
                </t-menu-sub>
                <t-menu-sub value="2" title={<span>调度平台</span>} icon={<t-fileIcon />}>
                  <t-menu-sub value="2-1" title="二级菜单-1">
                    <t-menu-item value="3-1">三级菜单-1</t-menu-item>
                    <t-menu-item value="3-2">三级菜单-2</t-menu-item>
                    <t-menu-item value="3-3">三级菜单-3</t-menu-item>
                  </t-menu-sub>
                  <t-menu-item value="2-2">
                    <span>二级菜单-2</span>
                  </t-menu-item>
                </t-menu-sub>
              </t-menu>
            </div>
          `,
  },
  pagination: {
    renderCode: `<div>
  <t-pagination total="30" __pointerProps__ />
</div>`,
  },
  steps: {
    renderCode: `<t-steps current="1" __pointerProps__>
  <t-step :title="步骤1" :content="提示文字" />
  <t-step :title="步骤2" :content="提示文字" />
  <t-step :title="步骤3" :content="提示文字" />
</t-steps>`,
  },
  tabs: {
    renderCode: `
          <div :style="{{ padding: 24, background: 'var(--bg-color-page)', borderRadius: 3 }}">
            <t-tabs defaultValue="1" __pointerProps__>
              <t-tabs-panel value="1" label="选项卡1">
                <div :style="{{ margin: '20px' }}">
                  选项卡1内容区
                </div>
              </t-tabs-panel>
              <t-tabs-panel value="2" label="选项卡2">
                <div :style="{{ margin: '20px' }}">
                  选项卡2内容区
                </div>
              </t-tabs-panel>
              <t-tabs-panel value="3" label="选项卡3">
                <div :style="{{ margin: '20px' }}">
                  选项卡3内容区
                </div>
              </t-tabs-panel>
            </t-tabs>
          </div>
        `,
  },
  cascader: {
    renderCode: `<t-cascader options="{[
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
        ]}" __pointerProps__ />`,
  },
  checkbox: {
    renderCode: `<t-checkbox __pointerProps__>基础多选框</t-checkbox>`,
  },
  form: {
    renderCode: `
          <t-form __pointerProps__>
            <t-form-item label="姓名" name="name" initialData="TDesign">
              <t-input placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="手机号码" name="tel" initialData="123456">
              <t-input placeholder="请输入内容" />
            </t-form-item>
            <t-form-item label="课程" name="course" initialData={['1']}>
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
  input: {
    renderCode: `<t-input __pointerProps__ />`,
  },
  'input-number': {
    renderCode: `<t-inputNumber __pointerProps__ />`,
  },
  radio: {
    renderCode: `<t-radio __pointerProps__>单选框</t-radio>`,
  },
  select: {
    renderCode: `
          <t-select __pointerProps__>
            <t-select-option key="apple" label="Apple" value="apple" />
            <t-select-option key="orange" value="orange">Orange</t-select-option>
            <t-select-option key="banana" label="Banana" value="banana" />
          </t-select>
        `,
  },
  'select-input': {
    renderCode: `<t-selectInput panel="暂无数据" tips="这是 tips 文本信息" __pointerProps__ />`,
  },
  slider: {
    renderCode: `<t-slider __pointerProps__ />`,
  },
  switch: {
    renderCode: `<t-switch __pointerProps__ />`,
  },
  'tag-input': {
    renderCode: `<t-tagInput __pointerProps__ />`,
  },
  textarea: {
    renderCode: `<t-textarea placeholder="请输入内容" __pointerProps__ />`,
  },
  'tree-select': {
    renderCode: `
        <t-treeSelect data="{[{
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
          }]}"
         __pointerProps__ />`,
  },
  transfer: {
    renderCode: `
        <t-transfer data="{new Array(20).fill({
          value: 100*Math.random().toFixed(2),
          label: '内容' + 100*Math.random().toFixed(2),
          disabled: Math.random() > 0.5
        })}" __pointerProps__ />`,
  },
  'time-picker': {
    renderCode: `<t-timePicker __pointerProps__ />`,
  },
  upload: {
    renderCode: `<t-upload action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" __pointerProps__ />`,
  },
  avatar: {
    renderCode: `
        <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" __pointerProps__ />`,
  },
  badge: {
    renderCode: `
          <t-badge count="100"  __pointerProps__>
            <t-button>按钮</t-button>
          </t-badge>
        `,
  },
  list: {
    renderCode: `
          <t-list __pointerProps__>
              <t-cell><span>列表内容列表内容列表内容1</span></t-cell>
              <t-cell><span>列表内容列表内容列表内容2</span></t-cell>
              <t-cell><span>列表内容列表内容列表内容2</span></t-cell>
          </t-list>
        )`,
  },
  loading: {
    renderCode: `
          <t-loading __pointerProps__ />
        `,
  },
  progress: {
    renderCode: `
          <div :style="{{ width: '200px' }}">
            <t-progress percentage="50"  __pointerProps__ />
          </div>
        `,
  },
  swiper: {
    renderCode: `<div :style="{{ width: 500 }}">
            <t-swiper duration="300" interval="2000" __pointerProps__>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-success-color-7)' }}"></div>
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-warning-color-7)' }}"></div>
              </t-swiper-item>
              <t-swiper-item>
                <div :style="{{ height: 200, background: 'var(--td-error-color-7)' }}"></div>
              </t-swiper-item>
            </t-swiper>
          </div>`,
  },
  skeleton: {
    renderCode: `<t-skeleton __pointerProps__>
            <div>内容</div>
          </t-skeleton>`,
  },
  tag: {
    renderCode: `<t-tag __pointerProps__>标签</t-tag>`,
  },
  tooltip: {
    renderCode: `<t-tooltip content="这是Tooltip内容" __pointerProps__>
            <t-button>hover me</t-button>
          </t-tooltip>`,
  },
  tree: {
    renderCode: `<t-tree data="[
            {
              label: '第一段',
              children: [ { label: '第二段' }, { label: '第二段' } ],
            },
            {
              label: '第一段',
              children: [ { label: '第二段' }, { label: '第二段' } ],
            },
            {
              label: '第一段',
              children: [ { label: '第二段' }, { label: '第二段' } ],
            },
          ]" __pointerProps__ />`,
  },
  //   dialog: {
  //     importStr: `import { Dialog, Button } from 'tdesign-vue-next';\n`,
  //     renderCode: `
  //       const [visible, setVisible] = React.useState(false);
  //       const defaultProps = { onClose: () => setVisible(false) };
  //       React.useEffect(() => {
  //         if (changedProps.visible) setVisible(true);
  //       }, [changedProps, visible]);
  //
  //         <div>
  //           <t-button onClick={() => setVisible(true)}>Open Modal</t-button>
  //           <t-dialog {...defaultProps} __pointerProps__ visible={visible}>
  //             <p>This is a dialog</p>
  //           </t-dialog>
  //         </div>
  //       `,
  //   },
  // drawer: {
  //   renderCode: `
  //       const [visible, setVisible] = React.useState(false);
  //       const defaultProps = { onClose: () => setVisible(false) };
  //       React.useEffect(() => {
  //         if (changedProps.visible) setVisible(true);
  //       }, [changedProps, visible]);
  //
  //         <div>
  //           <t-button onClick={() => setVisible(true)}>Open Drawer</t-button>
  //           <t-drawer __pointerProps__ visible={visible}>
  //             <p>This is a Drawer</p>
  //           </t-drawer>
  //         </div>
  //       `,
  // },
  message: {
    renderCode: `<t-message duration="0" content="这里是 Message 信息"  __pointerProps__ />
        `,
  },
  notification: {
    renderCode: `<t-notification duration="0" title="标题名称" content="这是一条消息通知" __pointerProps__ />)`,
  },
  popconfirm: {
    renderCode: `
            <t-pop-confirm content="确认删除吗" __pointerProps__>
              <t-button>删除</t-button>
            </t-pop-confirm>
        `,
  },
  popup: {
    renderCode: `<t-popup content="这是一个弹出框" __pointerProps__>
  <t-button>按钮</t-button>
</t-popup>`,
  },
};
