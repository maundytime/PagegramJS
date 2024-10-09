import type {Page} from 'types/page';
import {edge, spacer, texts} from 'types/util';
import {makePageNav} from './page-nav';

export const PageMatrixHInNav = makePageNav(['PageMatrixH']);

export const PageMatrixH: Page = {
  subviews: {
    type: 'scroll',
    dimension: edge,
    subviews: {
      type: 'matrix',
      dimension: {
        heightSafe: '100%',
        topSafe: 0,
        bottom: 0,
        left: 0,
        right: 0,
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
          height: '50%',
          width: 200,
        },
        direction: 'horizontal',
      },
    },
  },
};

