describe('测试单选框组件', () => {
  beforeEach(() => {
    cy.visit('/#/components/radio');
  });
  it('测试基础示例', () => {
    cy.get('.tdesign-radio-base')
      .find('.t-radio')
      .first()
      .should((ele) => {
        expect(ele).not.to.have.class('t-radio-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-radio-checked');
      });
  });
  it('测试初始选中与否', () => {
    cy.get('.tdesign-radio-default-checked')
      .find('.t-radio')
      .first()
      .should((ele) => {
        expect(ele).to.have.class('t-radio-checked');
      })
      .next()
      .next()
      .should((ele) => {
        expect(ele).not.to.have.class('t-radio-checked');
      });
  });
  it('测试单选组件不可用状态', () => {
    cy.get('.tdesign-radio-disabled')
      .find('.t-radio')
      .first()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).to.have.class('t-radio-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).to.have.class('t-radio-checked');
      })
      .next()
      .next()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).not.to.have.class('t-radio-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).not.to.have.class('t-radio-checked');
      });
  });
  it('测试Radio组', () => {
    const options = [
      { value: 'bj', label: '北京' },
      { value: 'sh', label: '上海' },
      { value: 'gz', label: '广州' },
      { value: 'sz', label: '深圳' },
    ];
    cy.get('.tdesign-radio-group')
      .find('.t-radio-group')
      .first()
      .find('.t-radio input')
      .each((ele, index) => {
        expect(ele).to.have.value(options[index].value);
        expect(ele).to.have.attr('name', 'city');
      });
    cy.get('.tdesign-radio-group')
      .find('.t-radio-group')
      .eq(1)
      .find('.t-radio')
      .each((ele, index) => {
        if (index === 3) {
          expect(ele).to.have.class('t-radio-checked');
        } else {
          expect(ele).not.to.have.class('t-radio-checked');
        }
      });
    cy.get('.tdesign-radio-group')
      .find('.t-radio-group')
      .eq(2)
      .find('.t-radio')
      .each((ele, index) => {
        if (index === 2) {
          expect(ele).to.have.class('t-radio-checked');
        } else {
          expect(ele).not.to.have.class('t-radio-checked');
        }
        if (index === 2 || index === 3) {
          expect(ele).not.to.have.class('t-is-disabled');
        } else {
          expect(ele).to.have.class('t-is-disabled');
        }
      });
    cy.get('.tdesign-radio-group')
      .find('.t-radio-group')
      .eq(3)
      .find('.t-radio')
      .each((ele, index) => {
        if (index === 2) {
          expect(ele).to.have.class('t-radio-checked');
        } else {
          expect(ele).not.to.have.class('t-radio-checked');
        }
        if (index === 3) {
          expect(ele).to.have.class('t-is-disabled');
        } else {
          expect(ele).not.to.have.class('t-is-disabled');
        }
      });
  });
});
