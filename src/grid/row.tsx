import Vue, { CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import responsiveObserver from './responsive-observer';

const name = prefix + '-row';

export default Vue.extend({
  name,
 
  components: {
    RenderComponent,
  },
 
  props: {
    align: {
      type: String,
      // default: 'top',
      validator(v: string): boolean {
        return (
          [
            'top',
            'middle',
            'bottom',
          ].indexOf(v) > -1
        );
      },
    },
    gutter: {
      type: [Number, Object, Array],
      default: 0,
    },
    justify: {
      type: String,
      // default: 'start',
      validator(v: string): boolean {
        return (
          [
            'start',
            'end',
            'center',
            'space-around',
            'space-between',
          ].indexOf(v) > -1
        );
      },
    },
    tag: {
      type: String,
      default: 'div'
    },
  },

  data() {
    return {
      screenSize: '',
      respHanlerToken: -1,
    };
  },

  provide(): { rowContext: any } {
    return {
      rowContext: {
        getGutter: this.getGutter,
      }
    };
  },

  computed: {
    classes(): ClassName {
      const { justify, align } = this
      return [
        name,
        {
          [`${name}-${justify}`]: justify,
          [`${name}-${align}`]: align,
        }
      ]
    },
    styles() {
      const gutter = this.getGutter();
      let margin: any = {};
      if (gutter[0] > 0) {
        margin.marginLeft = `${gutter[0] / -2}px`;
        margin.marginRight = `${gutter[0] / -2}px`;
      }
      if (gutter[1] > 0) {
        margin.marginTop= `${gutter[1] / -2}px`;
        margin.marginBottom = `${gutter[1] / -2}px`;
      }
      return margin;
    }
  },

  watch: {},

  // created() {
  //   this.$provide.rowContext.getGutter = this.getGutter;
  // },

  mounted() {
    this.respHanlerToken = responsiveObserver.subscribe((screenSize: string) => {
      this.screenSize = screenSize;
    });
  },

  beforeDestroy() {
    responsiveObserver.unsubscribe(this.respHanlerToken);
  },

  methods: {
    renderContent() {
      return this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    },
    
    getGutter() {
      const results = [0, 0];
      const { gutter, screenSize } = this;
      const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
      normalizedGutter.forEach((g, index) => {
        if (typeof g === 'object') {
          if (g[screenSize] !== undefined) {
            results[index] = g[screenSize];
          }
        } else {
          results[index] = g || 0;
        }
      });
      return results;
    },
  },
 
  render(h: CreateElement) {
    const component =  this.tag;
    return (
      <component class={this.classes} style={this.styles}>
        {this.renderContent()}
      </component>
    )
  }
 
});
