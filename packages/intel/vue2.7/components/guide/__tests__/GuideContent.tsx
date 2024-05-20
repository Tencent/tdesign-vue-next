import { defineComponent } from '@vue/composition-api';
import Input from '../../input';
import Button from '../../button';
import { Row } from '../../grid';

export default defineComponent({
  name: 'GuideContent',
  render() {
    return (
      <div class="guide-container">
        <div class="main-title-base">
          <div class="title-major">Guide 用户引导</div>
          <div class="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
        </div>
        <div class="field label-field-base">
          <div class="label">Label</div>
          <Input placeholder="请输入内容" />
        </div>
        <div class="field">
          <div class="label">Label</div>
          <Input placeholder="请输入内容" />
        </div>
        <Row class="action action-base">
          <Button>确定</Button>
          <Button theme="default" variant="base">
            取消
          </Button>
        </Row>
      </div>
    );
  },
});
