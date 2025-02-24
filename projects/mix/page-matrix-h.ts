import type {Page} from 'types/page';
import {edge, spacer} from 'types/util';
import {texts} from 'types/test';
import {makePageNav} from './page-nav';

export function PageMatrixHInNav(): Page {
  return makePageNav(['PageMatrixH']);
}

export function PageMatrixH(): Page {
  return {
    subviews: {
      type: 'scroll',
      dimension: edge,
      subviews: {
        type: 'matrix',
        dimension: {
          topSafe: 0,
          bottomSafe: 0,
          left: 0,
          right: 0,
        },
        style: {
          background: 'e',
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
}

