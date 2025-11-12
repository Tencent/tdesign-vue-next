import { defineComponent } from 'vue';
import siteConfig from '../../site.config';
import { tdesignVueNextChatPackageJson } from '@tdesign/internal-utils/package-json';

const { docs, enDocs } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

const docsMap = {
  zh: docs,
  en: enDocs,
};

const currentVersion = tdesignVueNextChatPackageJson.version;

export default defineComponent({
  data() {
    return {
      loaded: false,
      version: tdesignVueNextChatPackageJson.version,
      options: [{ label: '0.4.5', value: '0_4_5' }],
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
      if (version === currentVersion) return;
      const historyUrl = `//${version}-tdesign-vue-next-chat.surge.sh`;
      window.open(historyUrl, '_blank');
      this.$nextTick(() => {
        this.version = tdesignVueNextChatPackageJson.version;
      });
    },
  },

  render() {
    return (
      <td-doc-layout>
        <td-header ref="tdHeader" slot="header" disabledLocale={true} />
        <td-doc-aside ref="tdDocAside" title="TDesign Chat for Vue">
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
        <td-theme-generator />
      </td-doc-layout>
    );
  },
});
