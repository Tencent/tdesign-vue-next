import path from 'path';

export default function renderDemo(md: any, container: any) {
  md.use(container, 'demo', {
    validate(params: any) {
      return params.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
    },
    render(tokens: any, idx: any) {
      if (tokens[idx].nesting === 1) {
        const match = tokens[idx].info.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
        const [, demoPath, componentName = ''] = match;
        const demoPathOnlyLetters = demoPath.replace(/[^a-zA-Z\d]/g, '');
        const demoName = path.basename(demoPath);
        const demoDefName = `Demo${demoPathOnlyLetters}`;
        const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
        const demoTSCodeDefName = `Demo${demoPathOnlyLetters}TsCode`; // ts示例

        const tpl = `
          <td-doc-demo component-name="${componentName.trim()}" demo-name="${demoName}" language="markup" languages="JavaScript,TypeScript" :data-JavaScript="${demoCodeDefName}" :data-TypeScript="${demoTSCodeDefName}">
            <div slot="action">
              <Stackblitz demo-name="${demoName}" component-name="${componentName.trim()}" :code=${demoCodeDefName} />
              <CodeSandbox demo-name="${demoName}" component-name="${componentName.trim()}" :code=${demoCodeDefName} />
            </div>
            <div class="tdesign-demo-item__body">
              <${demoDefName} />  
            </div>
          </td-doc-demo>
        `;

        tokens.tttpl = tpl;

        return `<div class="tdesign-demo-wrapper tdesign-demo-item--${componentName.trim()}-${demoName} tdesign-demo-item--${componentName.trim()}">`;
      }
      if (tokens.tttpl) {
        return `${tokens.tttpl || ''}</div>`;
      }
      return '';
    },
  });
}
