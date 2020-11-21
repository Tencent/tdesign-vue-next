import Vue from 'vue'; // , { CreateElement, VNode }
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
// import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';

import { CommonProps } from './interface';
import TransferList from './TransferList';
import TransferOperations from './TransferOperations';
import { TransferItem } from './type/transfer';

const name = `${prefix}-transfer`;

export default Vue.extend({
  name,

  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },

  props: {
    ...CommonProps,
  },

  data() {
    return {
      // 源数据被选中的key
      sourceCheckedValue: this.checkedValue.filter(key => this.targetValue.indexOf(key) === -1),
      // 目标数据被选中的key
      targetCheckedValue: this.checkedValue.filter(key => this.targetValue.indexOf(key) !== -1),
    };
  },

  computed: {
    sourceDataSource(): Array<TransferItem> {
      // todo 左边源数据列要保留全部数据还是保留未选数据
      return this.data.filter(({ key }) => this.targetValue.indexOf(key) === -1);
    },
    targetDataSource(): Array<TransferItem> {
      if (this.targetOrder === 'original') {
        // ({ key }) 相当于item.key
        return this.data.filter(({ key }) => this.targetValue.indexOf(key) !== -1);
      }
      const arr: Array<TransferItem> = [];
      this.targetValue.forEach((str: string|number|symbol) => {
        const val = this.data[str] as TransferItem;
        if (val) {
          arr.push(val);
        }
      });
      return arr;
    },
  },

  watch: {},

  render() {
    const { sourceDataSource, targetDataSource, sourceCheckedValue, targetCheckedValue } = this;
    const { titles, disabled, search } = this.$props;
    return (
            <div class='t-transfer'>
                <TransferList
                    key='leftList'
                    title={titles[0]}
                    datasource={sourceDataSource}
                    checkedValue={sourceCheckedValue}
                    disabled={disabled}
                    search={search}
                />
                <TransferOperations/>
                <TransferList
                    key='rightList'
                    title={titles[1]}
                    datasource={targetDataSource}
                    checkedValue={targetCheckedValue}
                    disabled={disabled}
                    search={search}
                />
            </div>
    );
  },
});
