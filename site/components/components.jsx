import { defineComponent } from 'vue';
import siteConfig from '../site.config.js';
import packageJson from '@/package.json';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

const historyVersion = ['0.4.3'];

export default defineComponent({
  data() {
    return {
      loaded: false,
      version: packageJson.version,
      options: [
        { value: packageJson.version, label: packageJson.version },
        ...historyVersion.map((v) => ({ value: v, label: v })),
      ],
    };
  },

  computed: {
    contentStyle() {
      const { loaded } = this;
      return { visibility: loaded ? 'visible' : 'hidden' };
    },
  },

  mounted() {
    this.$refs.tdHeader.framework = 'vue-next';
    this.$refs.tdDocAside.routerList = routerList;
    this.$refs.tdDocAside.onchange = ({ detail }) => {
      if (this.$route.path === detail) return;
      this.loaded = false;
      this.$router.push(detail);
      window.scrollTo(0, 0);
    };
    this.$refs.tdDocSearch.docsearchInfo = { indexName: 'tdesign_doc_vue_next' };
  },

  methods: {
    getAttach() {
      return document.querySelector('#historyVersion');
    },
    contentLoaded(callback) {
      requestAnimationFrame(() => {
        this.loaded = true;
        callback();
      });
    },
    changeVersion(version) {
      this.version = version;
      if (version === packageJson.version) return;
      location.href = `https://tdesign.cdn-go.cn/tdesign-web-vue-next/${version}/`;
    },
  },

  render() {
    return (
      <td-doc-layout>
        <td-header ref="tdHeader" slot="header">
          <td-doc-search slot="search" ref="tdDocSearch" />
        </td-header>
        <td-doc-aside ref="tdDocAside" title="Vue Next for Web">
          <t-select
            id="historyVersion"
            slot="extra"
            value={this.version}
            popupProps={{ zIndex: 500, attach: this.getAttach }}
            onChange={this.changeVersion}
          >
            {this.options.map((item, index) => (
              <t-option key={index} value={item.value} label={item.label}>
                {item.label}
              </t-option>
            ))}
          </t-select>
        </td-doc-aside>
        <router-view style={this.contentStyle} onLoaded={this.contentLoaded} />
      </td-doc-layout>
    );
  },
});
