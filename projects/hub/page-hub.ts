import {type Tasks, type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import {makeGramId, NativeHubModule, TableIdGramInfo} from 'types/native-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {hctColor} from 'types/htc-color';
import {type View} from 'types/view';

const color = '26';
const spaceInner = 8;
const spaceOutter = 12;
const base = 360 * Math.random();

export function onChangeGrams(argument: Argument): Tasks {
  const grams = argument.stateInfo['grams'] as Array<Record<string, unknown>>;
  const subviews: View[] = Array.from(grams, gram => {
    const value = gram['value'] as Record<string, unknown>;
    const name = value['name'] as string;
    const id = value['id'] as string;
    const x = Math.random() - 0.5;
    const y = base + (240 * x);
    const z = y % 360;
    const background = hctColor(z, 20, 90);
    return {
      type: 'touch',
      userInfo: id,
      onTap: '#onTapGram',
      dimension: {
        top: spaceInner,
        bottom: spaceInner,
        left: spaceInner,
        right: spaceInner,
        ratio: 1,
      },
      style: {
        background,
        radius: spaceInner * 2,
      },
      subviews: [
        {
          type: 'touchFade',
          userInfo: id,
          onTap: '#onTapEditGram',
          dimension: {
            top: 0,
            width: 48,
            height: 48,
            right: 0,
          },
          subviews: {
            type: 'symbol',
            dimension: {
              centerX: 0,
              centerY: 0,
            },
            symbol: {
              name: 'equal',
              color,
              size: 14,
              weight: 500,
            },
          },
        },
        {
          type: 'label',
          dimension: {
            left: 18,
            bottom: 18,
            right: 18,
          },
          text: {
            content: name,
            size: 12,
            color,
            design: 'monospaced',
            weight: 500,
          },
        },
      ],
    };
  });
  return {
    type: 'view',
    view: {
      gramMatrix: {
        matrix: {
          content: subviews,
        },
      },
    },
  };
}

export async function reloadHub(_: Argument): Promise<Tasks> {
  const res = NativeHubModule.table(TableIdGramInfo);
  return {
    type: 'state',
    state: {
      grams: res,
    },
  };
}

export function onTapGram(argument: Argument): Tasks {
  const gramId = argument.userInfo as string;
  return {
    type: 'hub',
    action: 'open',
    gramId,
  };
}

export function onTapAddGram(_: Argument): Tasks {
  return [
    {
      type: 'state',
      state: {
        focusedGram: {
          isNew: true,
          id: makeGramId(),
        },
      },
    },
    {
      type: 'navigation',
      navigation: 'full',
      pageName: 'PageAddGramInNav',
    },
  ];
}

export async function onTapEditGram(argument: Argument): Promise<Tasks> {
  const gramId = argument.userInfo as string;
  const focusedGram = NativeHubModule.data(TableIdGramInfo, gramId) as Record<string, unknown>;
  focusedGram['bundle'] = NativeHubModule.bundle(gramId);
  return [
    {
      type: 'state',
      state: {
        focusedGram,
      },
    },
    {
      type: 'navigation',
      navigation: 'full',
      pageName: 'PageAddGramInNav',
    },
  ];
}

export const PageHub: Page = {
  stateMap: {
    grams: {
      type: 'bind',
      onChange: '#onChangeGrams',
    },
    focusedGram: {
      type: 'bind',
    },
  },
  subviews: {
    type: 'scroll',
    style: {
      background: hctColor(0, 0, 100),
    },
    alwaysBounceVertical: true,
    dimension: edge,
    subviews: {
      type: 'matrix',
      id: 'gramMatrix',
      dimension: {
        top: spaceOutter,
        bottom: spaceOutter,
        leftSafe: spaceOutter,
        rightSafe: spaceOutter,
      },
      matrix: {
        itemSize: {
          width: '1/2',
        },
      },
    },
  },
};

export async function fetchHubBundle(): Promise<Tasks> {
  // 更新自己，保存bundle
  // 例如ios的更新，如果发生更新，app会被杀掉重新打开的
  // 所以强制更新，就是一个dismiss的app task，然后一个open的app task
  // app没有权限打开别人，但是有权限打开自己
  return NativeModule.fetch('https://raw.githubusercontent.com/maundytime/PagegramJS/refs/heads/main/projects/hub/bundle/bundle.js')
    .then(res => {
      NativeHubModule.saveBundle('hub', res);
      return undefined;
    });
}

export const PageHubInNav: NavPage = {
  type: 'nav',
  onLoad: ['#reloadHub'],
  stateMap: {
    grams: {
      type: 'state',
      value: [],
    },
    focusedGram: {
      type: 'state',
      value: null,
    },
  },
  eventMap: {
    reloadHub: '#reloadHub',
  },
  subpages: ['PageHub'],
  subviews: [
    // {
    //   type: 'blur',
    //   dimension: {
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     unsafeAt: 'top',
    //   },
    //   style: {
    //     background: 'fffc',
    //   },
    //   subviews: {
    //     dimension: {
    //       left: 0,
    //       right: 0,
    //       height: 60,
    //       bottom: 0,
    //       topSafe: 0,
    //     },
    //     subviews: [
    //       {
    //         type: 'image',
    //         image: {
    //           svg: logo,
    //           mode: 'center',
    //         },
    //         dimension: edge,
    //       },
    //     ],
    //   },
    // },
    {
      type: 'touchFade',
      onTap: '#onTapAddGram',
      dimension: {
        bottomSafe: 14,
        height: 42,
        width: 42,
        centerX: 0,
        // rightSafe: 32,
        unsafeAt: 'bottom',
      },
      style: {
        background: color,
        radius: 21,
      },
      subviews: {
        type: 'symbol',
        symbol: {
          name: 'plus',
          weight: 500,
          color: 'f',
        },
        dimension: edge,
      },
    },
  ],
};
