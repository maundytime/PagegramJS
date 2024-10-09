import {br} from 'types/event';
import type {Page} from 'types/page';
import {edge} from 'types/util';
import {makePageNav} from './page-nav';

export const PageAnimation: Page = {
  subviews: {
    dimension: edge,
    style: {
      background: 'fff',
    },
    subviews: {
      dimension: {
        topSafe: 0,
        bottomSafe: 0,
        left: 0,
        right: 0,
      },
      style: {
        background: '0003',
      },
      subviews: [
        {
          id: 'symbol1',
          type: 'symbol',
          symbol: {
            name: 'square',
            size: 50,
            color: '000',
          },
          style: {
            background: '3333',
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 50,
            height: 50,
          },
        },
        {
          id: 'removeView',
          dimension: {
            height: 60,
            left: 0,
            right: 120,
            bottom: 0,
          },
          subviews: {
            id: 'text1',
            type: 'label',
            text: {content: 'text test'},
            dimension: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            },
          },
          style: {
            background: 'f00',
          },
        },
        {
          type: 'touchFade',
          onTap: 'sizeTo100',
          dimension: {
            height: 60,
            width: 60,
            right: 0,
            bottom: 0,
          },
          style: {
            background: '0003',
          },
        },
        {
          type: 'touchFade',
          onTap: 'sizeTo200',
          dimension: {
            height: 60,
            width: 60,
            right: 60,
            bottom: 0,
          },
          style: {
            background: '3333',
          },
        },
      ],
    },
  },
  eventMap: {
    dismissButtonDidTap: {
      type: 'navigation',
      navigation: 'dismiss',
    },
    sizeTo100: [
      {
        type: 'view',
        duration: 0.5,
        view: {
          removeView: {
            style: {opacity: 0},
          },
        },
      },
      br,
      {
        type: 'view',
        duration: 2,
        view: {
          removeView: {
            style: {opacity: 1},
          },
          text1: {
            id: 'text1',
            type: 'label',
            text: {content: 'CHANGE'},
          },
          symbol1: {
            symbol: {
              name: 'square',
              size: 100,
              color: '000',
            },
            style: {
              transform: {
                rotate: 30,
              },
            },
            dimension: {
              centerX: 0,
              centerY: 0,
              width: 100,
              height: 100,
            },
          },
        },
      },
    ],
    sizeTo200: {
      type: 'view',
      view: {
        symbol1: {
          symbol: {
            name: 'square',
            size: 200,
            color: '00f',
          },
          dimension: {
            centerX: 0,
            centerY: 0,
            width: 200,
            height: 200,
          },
          style: {
            transform: {
              rotate: 0,
            },
          },
        },
        text1: {
          text: {content: 'text1'},
          style: {
            background: '0003',
          },
        },
      },
      duration: 2,
    },
  },
};

export const PageAnimationInNav = makePageNav(['PageAnimation']);

export const PagePresentInNav = makePageNav(['PagePresent']);

export const PagePresent: Page = {
  subviews: {
    dimension: edge,
    style: {
      background: 'fff',
    },
    subviews: {
      type: 'touchFade',
      onTap: 'present',
      dimension: {
        height: 100,
        width: 100,
        centerX: 0,
        centerY: 0,
      },
      style: {
        background: '0003',
      },
    },
  },
  eventMap: {
    present: {
      type: 'navigation',
      navigation: 'overlay',
      pageName: 'PageAnimationInNav',
    },
  },
};
