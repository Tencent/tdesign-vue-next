import Button from '@src/button/index';
import 'tdesign-vue-next/style/index.js';

describe('<base />', () => {
  it('renders', () => {
    const themes = ['danger', 'primary', 'warning'];
    for (const theme of themes) {
      cy.mount(<Button theme={theme}>测试</Button>);
    }
    cy.screenshot({
      overwrite: true,
    });
  });
});
