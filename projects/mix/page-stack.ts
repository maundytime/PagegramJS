import type {Page} from 'types/page';
import {edge} from 'types/util';
import {numbers, texts} from 'types/test';
import {makePageNav} from './page-nav';

export function PageStackInNav(): Page {
  return makePageNav(['PageStack']);
}
export function PageStack1InNav(): Page {
  return makePageNav(['PageStack1']);
}

export function PageStack(): Page {
  return {
    subviews: {
      type: 'scroll',
      dimension: edge,
      style: {background: 'f003'},
      subviews: {
        type: 'stack',
        dimension: {
          top: 0,
          leftSafe: 0,
          rightSafe: 0,
          bottom: 0,
        },
        style: {background: 'f00', opacity: 1},
        stack: {
          direction: 'vertical',
          distribution: 'fill',
        },
        subviews: [
          {
            style: {background: 'f003'},
            type: 'label',
            text: {
              content: texts[0],
              design: 'monospaced',
            },
            dimension: {
              width: '100%',
            },
          },
          {
            type: 'stack',
            style: {background: '0002'},
            stack: {
              direction: 'horizontal',
              distribution: 'fillEqually',
              alignment: 'leading',
            },
            dimension: {
            // width: 150,
            },
            subviews: [
              {
                type: 'label',
                text: {
                  content: texts[1],
                  design: 'monospaced',
                },
                style: {background: '00f3'},
              },
              {
                type: 'label',
                text: {
                  content: texts[2],
                  design: 'monospaced',
                },
                style: {background: '0f03'},
              },
            ],
          },
          {
            type: 'label',
            text: {
              content: texts[3],
              design: 'monospaced',
            },
            style: {background: '0f03'},
          },
        // spacer,
        ],
      },
    },
  };
}

export function PageStack1(): Page {
  return {
    subviews: [
      {
        type: 'stack',
        dimension: {
          top: 200,
          left: 0,
          width: 300,
          height: 200,
        },
        style: {background: '0008', opacity: 1},
        stack: {
          distribution: 'fill',
          direction: 'vertical',
        },
        subviews: [
          {
            type: 'label',
            text: {
              content: numbers[0],
              design: 'monospaced',
            },
            style: {background: '00f3'},
          },
          {
            type: 'stack',
            style: {background: 'f003'},
            stack: {
              direction: 'horizontal',
              distribution: 'fill',
            },
            subviews: [
              {
                type: 'label',
                text: {
                  content: numbers[1],
                  design: 'monospaced',
                },
                style: {background: '00f3'},
              },
              {
                type: 'label',
                text: {
                  content: numbers[2],
                  design: 'monospaced',
                },
                style: {background: '0f03'},
              },
            ],
          },
          {
            type: 'label',
            text: {
              content: numbers[3],
              design: 'monospaced',
            },
            style: {background: '0f03'},
          },
        ],
      },
      {
        dimension: {
          top: 500,
          left: 0,
          width: 300,
        },
        type: 'stack',
        style: {background: '0008', opacity: 1},
        stack: {
          direction: 'horizontal',
          distribution: 'fill',
        },
        subviews: [
          {
            type: 'label',
            text: {
              content: numbers[1],
              design: 'monospaced',
            },
            style: {background: '00f3'},
          },
          {
            type: 'label',
            text: {
              content: numbers[2],
              design: 'monospaced',
            },
            style: {background: '0f03'},
          },
        ],
      },
    ],
  };
}
