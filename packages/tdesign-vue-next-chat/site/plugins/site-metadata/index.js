import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { joinWorkspaceRoot, tdesignVueNextPackageJson, tdesignVueNextChatPackageJson } from '@tdesign/internal-utils';
export default function siteMetadata() {
  const sourcePath = joinWorkspaceRoot('pnpm-workspace.yaml');
  const yamlContent = readFileSync(sourcePath, 'utf-8');
  const documents = parse(yamlContent);
  return {
    name: 'site-metadata',
    config() {
      return {
        define: {
          TD_SITE_METADATA: JSON.stringify({
            dependencies: {
              vue: documents.catalogs.deps.vue,
              less: documents.catalogs.bundle.less,
              clipboard: documents.catalogs.deps.clipboard,
              marked: documents.catalogs.deps.marked,
              'tdesign-vue-next': tdesignVueNextPackageJson.version,
              'tdesign-icons-vue-next': documents.catalogs.tdesign['tdesign-icons-vue-next'],
              '@tdesign-vue-next/chat': tdesignVueNextChatPackageJson.version,
              'highlight.js': documents.catalogs.deps['highlight.js'],
              'marked-highlight': documents.catalogs.docs['marked-highlight'],
            },
            devDependencies: {
              vite: documents.catalogs.bundle.vite,
              '@vue/compiler-sfc': documents.catalogs.bundle['@vue/compiler-sfc'],
              '@vitejs/plugin-vue': documents.catalogs.bundle['@vitejs/plugin-vue'],
              '@vitejs/plugin-vue-jsx': documents.catalogs.bundle['@vitejs/plugin-vue-jsx'],
            },
          }),
        },
      };
    },
  };
}
