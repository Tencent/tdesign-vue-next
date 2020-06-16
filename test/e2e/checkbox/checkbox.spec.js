describe('测试多选框组件', () => {
  beforeEach(() => {
    cy.visit('/#/components/checkbox');
  });
  it('测试基础示例', () => {
    cy.get('.tdesign-checkbox-base')
      .find('.t-checkbox')
      .first()
      .should((ele) => {
        expect(ele).not.to.have.class('t-checkbox-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-checkbox-checked');
      });
  });
  it('测试初始选中与否', () => {
    cy.get('.tdesign-checkbox-default-checked')
      .find('.t-checkbox')
      .first()
      .should((ele) => {
        expect(ele).to.have.class('t-checkbox-checked');
      })
      .next()
      .next()
      .should((ele) => {
        expect(ele).not.to.have.class('t-checkbox-checked');
      });
  });
  it('测试多选框不可用', () => {
    cy.get('.tdesign-checkbox-disabled')
      .find('.t-checkbox')
      .first()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).to.have.class('t-checkbox-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).to.have.class('t-checkbox-checked');
      })
      .next()
      .next()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).not.to.have.class('t-checkbox-checked');
      })
      .click()
      .should((ele) => {
        expect(ele).to.have.class('t-is-disabled');
        expect(ele).not.to.have.class('t-checkbox-checked');
      });
  });
  it('测试多选框组', () => {
    const options = [
      { value: 'bj', label: '北京' },
      { value: 'sh', label: '上海' },
      { value: 'gz', label: '广州' },
      { value: 'sz', label: '深圳' },
    ];
    cy.get('.tdesign-checkbox-group')
      .find('.t-checkbox-group')
      .first()
      .find('.t-checkbox input')
      .each((ele, index) => {
        expect(ele).to.have.value(options[index].value);
        expect(ele).to.have.attr('name', 'city');
      });
    cy.get('.tdesign-checkbox-group')
      .find('.t-checkbox-group')
      .eq(1)
      .find('.t-checkbox')
      .each((ele, index) => {
        if (index === 0 || index === 3) {
          expect(ele).to.have.class('t-checkbox-checked');
        } else {
          expect(ele).not.to.have.class('t-checkbox-checked');
        }
      });
    cy.get('.tdesign-checkbox-group')
      .find('.t-checkbox-group')
      .eq(2)
      .find('.t-checkbox')
      .each((ele, index) => {
        if (index === 2) {
          expect(ele).to.have.class('t-checkbox-checked');
        } else {
          expect(ele).not.to.have.class('t-checkbox-checked');
        }
        if (index === 3) {
          expect(ele).not.to.have.class('t-is-disabled');
        } else {
          expect(ele).to.have.class('t-is-disabled');
        }
      });
    cy.get('.tdesign-checkbox-group')
      .find('.t-checkbox-group')
      .eq(3)
      .find('.t-checkbox')
      .each((ele, index) => {
        if (index === 3) {
          expect(ele).to.have.class('t-checkbox-checked');
          expect(ele).to.have.class('t-is-disabled');
        } else {
          expect(ele).not.to.have.class('t-checkbox-checked');
          expect(ele).not.to.have.class('t-is-disabled');
        }
      });
  });
});
