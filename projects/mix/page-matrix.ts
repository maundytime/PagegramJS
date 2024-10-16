import type {Page} from 'types/page';
import {edge, spacer} from 'types/util';
import {texts} from 'types/test';
import {makePageNav} from './page-nav';

export const PageMatrixInNav = makePageNav(['PageMatrix']);

export const PageMatrix: Page = {
  subviews: {
    type: 'scroll',
    dimension: edge,
    subviews: {
      type: 'matrix',
      dimension: {
        top: 0,
        bottom: 0,
        leftSafe: 0,
        rightSafe: 0,
      },
      style: {
        background: 'eee',
      },
      matrix: {
        content: Array.from(texts, content => (
          {
            type: 'stack',
            dimension: edge,
            stack: {
              direction: 'vertical',
            },
            subviews: [
              {
                type: 'label',
                text: {
                  content,
                  design: 'monospaced',
                },
                dimension: {
                  left: 0,
                  right: 0,
                },
              },
              spacer,
            ],
          }
        )),
        itemSize: {
          width: '50%',
        },
        direction: 'vertical',
      },
    },
  },
};

