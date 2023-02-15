import { defineComponent } from 'vue';
import Input from '../../input';
import Button from '../../button';
import { Row } from '../../grid';

export default defineComponent({
  name: 'GuideContent',
  setup() {
    return () => {
      return (
        <div className="guide-container">
          <div className="main-title-base">
            <div className="title-major">Guide 用户引导</div>
            <div className="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
          </div>
          <div className="field label-field-base">
            <div className="label">Label</div>
            <Input placeholder="请输入内容" />
          </div>
          <div className="field">
            <div className="label">Label</div>
            <Input placeholder="请输入内容" />
          </div>
          <Row className="action action-base">
            <Button>确定</Button>
            <Button theme="default" variant="base">
              取消
            </Button>
          </Row>
        </div>
      );
    };
  },
});
