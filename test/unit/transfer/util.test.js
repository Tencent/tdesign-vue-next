import { getDataValues, cloneTreeWithFilter, getLeefCount } from '@/src/transfer/utils';

describe('Transfer', () => {
  describe('utils', () => {
    describe('getDataValues', () => {
      it('isTreeMode:false', async () => {
        const list = [];
        for (let i = 0; i < 20; i++) {
          list.push({
            value: i.toString(),
            label: `内容${i + 1}`,
            disabled: i % 4 < 1,
          });
        }

        const checked = ['1', '1.2.2.2', '1.1', '100', '200', '3', '5'];
        const result = getDataValues(list, checked);
        expect(result).toEqual(['1', '3', '5']);
      });

      it('isTreeMode:true', async () => {
        const list = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const checked = ['1', '100', '200', '3', '5', '2.1', '1.2.2.2'];
        const result = getDataValues(list, checked, { isTreeMode: true });
        expect(result).toEqual(['1.2.2.2', '2.1']);
      });

      it('isTreeMode:true keep:false', async () => {
        const list = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const checked = ['1.1', '1.1.2', '100', '200', '3', '5', '2.1', '1.2.2.2'];
        const result = getDataValues(list, checked, { isTreeMode: true, include: false });
        expect(result).toEqual(['1.2.1.1', '1.2.1.2', '1.2.2.1', '2.2']);
      });
    });

    // cloneTreeWithFilter result test1
    describe('cloneTreeWithFilter', () => {
      it('needMatch:true result test1', () => {
        const sourceTree = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const filterValues = ['1.2.1.1', '1.2.2.1', '2.1'];

        const result = [];
        cloneTreeWithFilter(sourceTree, result, filterValues, true);

        expect(result).toEqual(
          [{
            value: '1',
            label: '1',
            children: [{
              value: '1.2',
              label: '1.2',
              children: [{
                value: '1.2.1',
                label: '1.2.1',
                children: [{
                  value: '1.2.1.1',
                  label: '1.2.1.1',
                }],
              }, {
                value: '1.2.2',
                label: '1.2.2',
                children: [{
                  value: '1.2.2.1',
                  label: '1.2.2.1',
                }],
              }],
            }],
          }, {
            value: '2',
            label: '2',
            children: [{
              value: '2.1',
              label: '2.1',
            }],
          }],
        );
      });

      // result test 2
      it('needMatch:true result test2', () => {
        const sourceTree = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const filterValues = ['1.1', '1.2.2.1', '2.1'];

        const result = [];
        cloneTreeWithFilter(sourceTree, result, filterValues, true);

        expect(result).toEqual(
          [{
            value: '1',
            label: '1',
            children: [
              {
                value: '1.1',
                label: '1.1',
                children: [{
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [{
                    value: '1.1.1.1',
                    label: '1.1.1.1',
                  }, {
                    value: '1.1.1.2',
                    label: '1.1.1.2',
                  }],
                }, {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [{
                    value: '1.1.2.1',
                    label: '1.1.2.1',
                  }, {
                    value: '1.1.2.2',
                    label: '1.1.2.2',
                  }],
                }],
              },
              {
                value: '1.2',
                label: '1.2',
                children: [{
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [{
                    value: '1.2.2.1',
                    label: '1.2.2.1',
                  }],
                }],
              }],
          }, {
            value: '2',
            label: '2',
            children: [{
              value: '2.1',
              label: '2.1',
            }],
          }],
        );
      });

      it('needMatch:false result test1', () => {
        const sourceTree = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const filterValues = ['1.2.1.1', '1.2.2.1', '2.1'];

        const result = [];
        cloneTreeWithFilter(sourceTree, result, filterValues, false);

        expect(result).toEqual(
          [{
            value: '1',
            label: '1',
            children: [{
              value: '1.1',
              label: '1.1',
              children: [{
                value: '1.1.1',
                label: '1.1.1',
                children: [{
                  value: '1.1.1.1',
                  label: '1.1.1.1',
                }, {
                  value: '1.1.1.2',
                  label: '1.1.1.2',
                }],
              }, {
                value: '1.1.2',
                label: '1.1.2',
                children: [{
                  value: '1.1.2.1',
                  label: '1.1.2.1',
                }, {
                  value: '1.1.2.2',
                  label: '1.1.2.2',
                }],
              }],
            }, {
              value: '1.2',
              label: '1.2',
              children: [{
                value: '1.2.1',
                label: '1.2.1',
                children: [{
                  value: '1.2.1.2',
                  label: '1.2.1.2',
                }],
              }, {
                value: '1.2.2',
                label: '1.2.2',
                children: [{
                  value: '1.2.2.2',
                  label: '1.2.2.2',
                }],
              }],
            }],
          }, {
            value: '2',
            label: '2',
            children: [{
              value: '2.2',
              label: '2.2',
            }],
          }],
        );
      });

      it('needMatch:false result test2', () => {
        const sourceTree = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        const filterValues = ['1.1.1.1', '1.2.2', '2'];

        const result = [];
        cloneTreeWithFilter(sourceTree, result, filterValues, false);

        expect(result).toEqual(
          [{
            value: '1',
            label: '1',
            children: [{
              value: '1.1',
              label: '1.1',
              children: [{
                value: '1.1.1',
                label: '1.1.1',
                children: [{
                  value: '1.1.1.2',
                  label: '1.1.1.2',
                }],
              }, {
                value: '1.1.2',
                label: '1.1.2',
                children: [{
                  value: '1.1.2.1',
                  label: '1.1.2.1',
                }, {
                  value: '1.1.2.2',
                  label: '1.1.2.2',
                }],
              }],
            }, {
              value: '1.2',
              label: '1.2',
              children: [{
                value: '1.2.1',
                label: '1.2.1',
                children: [{
                  value: '1.2.1.1',
                  label: '1.2.1.1',
                }, {
                  value: '1.2.1.2',
                  label: '1.2.1.2',
                }],
              }],
            }],
          }],
        );
      });
    });

    describe('getLeefCount', () => {
      it('result test 1', () => {
        const data = [
          {
            value: '1',
            children: [
              { value: '1.1' },
              { value: '1.2' },
              { value: '1.3' },
            ],
          }, {
            value: '2',
            children: [
              {
                value: '2.1',
                children: [{
                  value: '2.1.1',
                }],
              },
            ],
          },
        ];
        expect(getLeefCount(data)).toEqual(4);
      });

      it('result test 2', () => {
        const sourceTree = [{
          value: '1',
          label: '1',
          children: [{
            value: '1.1',
            label: '1.1',
            children: [{
              value: '1.1.1',
              label: '1.1.1',
              children: [{
                value: '1.1.1.1',
                label: '1.1.1.1',
              }, {
                value: '1.1.1.2',
                label: '1.1.1.2',
              }],
            }, {
              value: '1.1.2',
              label: '1.1.2',
              children: [{
                value: '1.1.2.1',
                label: '1.1.2.1',
              }, {
                value: '1.1.2.2',
                label: '1.1.2.2',
              }],
            }],
          }, {
            value: '1.2',
            label: '1.2',
            children: [{
              value: '1.2.1',
              label: '1.2.1',
              children: [{
                value: '1.2.1.1',
                label: '1.2.1.1',
              }, {
                value: '1.2.1.2',
                label: '1.2.1.2',
              }],
            }, {
              value: '1.2.2',
              label: '1.2.2',
              children: [{
                value: '1.2.2.1',
                label: '1.2.2.1',
              }, {
                value: '1.2.2.2',
                label: '1.2.2.2',
              }],
            }],
          }],
        }, {
          value: '2',
          label: '2',
          children: [{
            value: '2.1',
            label: '2.1',
          }, {
            value: '2.2',
            label: '2.2',
          }],
        }];

        expect(getLeefCount(sourceTree)).toEqual(10);
      });
    });
  });
});
