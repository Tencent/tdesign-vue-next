import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { joinWorkspaceRoot, tdesignVueNextPackageJson } from '@tdesign/internal-utils';
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
              'tdesign-vue-next': tdesignVueNextPackageJson.version,
              'tdesign-icons-vue-next': documents.catalogs.tdesign['tdesign-icons-vue-next'],
              dayjs: documents.catalogs.deps.dayjs,
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
