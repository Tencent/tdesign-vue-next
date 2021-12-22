import { defineComponent } from 'vue';
import siteConfig from '../../site.config.js';
import packageJson from '@/package.json';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

const historyVersion = [];
const registryUrl = 'https://mirrors.tencent.com/npm/tdesign-vue-next';

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
    this.initHistoryVersions();
  },

  methods: {
    initHistoryVersions() {
      fetch(registryUrl)
        .then((res) => res.json())
        .then((res) => {
          const options = [];
          Object.keys(res.versions).forEach((v) => {
            if (v === packageJson.version) return false;
            const nums = v.split('.');
            if (nums[0] === '0' && nums[1] < 5) return false;
            options.push({ label: v, value: v });
          });
          this.options.push(...options);
        });
    },

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
      const historyUrl = `//preview-${version}-tdesign-vue-next.surge.sh`;
      window.open(historyUrl, '_blank');
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
            options={this.options}
          />
        </td-doc-aside>
        <router-view style={this.contentStyle} onLoaded={this.contentLoaded} />
      </td-doc-layout>
    );
  },
});
