import { defineComponent } from 'vue';
import semver from 'semver';
import siteConfig from '../../site.config';
import packageJson from '@/package.json';

const { docs, enDocs } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

const docsMap = {
  zh: docs,
  en: enDocs,
};

const currentVersion = packageJson.version.replace(/\./g, '_');
const registryUrl = 'https://service-edbzjd6y-1257786608.hk.apigw.tencentcs.com/release/npm/versions/tdesign-vue-next';

// 过滤小版本号
function getVersions(versions = []) {
  const versionMap = new Map();

  versions.forEach((v) => {
    if (v.includes('alpha') || v.includes('patch')) return false;
    const nums = v.split('.');
    versionMap.set(`${nums[0]}.${nums[1]}`, v);
  });

  return [...versionMap.values()].sort((a, b) => {
    return semver.gt(b, a) ? -1 : 1;
  });
}

export default defineComponent({
  data() {
    return {
      loaded: false,
      version: packageJson.version,
      options: [],
    };
  },

  computed: {
    contentStyle() {
      const { loaded } = this;
      return { visibility: loaded ? 'visible' : 'hidden' };
    },
    lang() {
      return this.$route?.meta?.lang || 'zh';
    },
  },

  mounted() {
    this.$refs.tdHeader.framework = 'vue-next';
    this.$refs.tdDocAside.routerList = docsMap[this.lang];
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
          const versions = getVersions(Object.keys(res.versions));
          versions.forEach((v) => {
            const nums = v.split('.');
            if (nums[0] === '0' && nums[1] < 6) return false;
            options.unshift({ label: v, value: v.replace(/\./g, '_') });
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
      if (version === currentVersion) return;
      const historyUrl = `//${version}-tdesign-vue-next.surge.sh`;
      window.open(historyUrl, '_blank');
      this.$nextTick(() => {
        this.version = packageJson.version;
      });
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
            value={this.version.replace(/\./g, '_')}
            popupProps={{ zIndex: 500, attach: this.getAttach }}
            onChange={this.changeVersion}
            options={this.options}
          />
        </td-doc-aside>
        <router-view style={this.contentStyle} onLoaded={this.contentLoaded} />
        <td-theme-generator />
      </td-doc-layout>
    );
  },
});
