import {type Tasks, type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import {NativeHubModule, TableIdAppInfo} from 'types/native-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {hctColor} from 'types/htc-color';
import {type View} from 'types/view';

const color = hctColor(0, 0, 15);
const halfSpace = 9;

export function onChangeApps(argument: Argument): Tasks {
  const apps = argument.stateInfo['apps'] as Array<Record<string, unknown>>;
  const subviews: View[] = Array.from(apps, app => {
    const value = app['value'] as Record<string, unknown>;
    const name = value['name'] as string;
    const id = value['id'] as string;
    const background = hctColor(360 * Math.random(), 20, 90);
    return {
      type: 'touch',
      userInfo: id,
      onTap: '#onTapApp',
      dimension: {
        top: halfSpace,
        bottom: halfSpace,
        left: halfSpace,
        right: halfSpace,
        ratio: 1,
      },
      style: {
        background,
        radius: halfSpace * 2,
      },
      subviews: [
        {
          type: 'touchFade',
          userInfo: id,
          onTap: '#onTapEditApp',
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
            bottom: 16,
            right: 16,
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
      appMatrix: {
        matrix: {
          content: subviews,
        },
      },
    },
  };
}

export async function reloadHub(_: Argument): Promise<Tasks> {
  const res = NativeHubModule.table(TableIdAppInfo);
  return {
    type: 'state',
    state: {
      apps: res,
    },
  };
}

export function onTapApp(argument: Argument): Tasks {
  const appId = argument.userInfo as string;
  return {
    type: 'hub',
    action: 'open',
    appId,
  };
}

export function onTapAddApp(_: Argument): Tasks {
  return [
    {
      type: 'state',
      state: {
        focusedApp: {},
      },
    },
    {
      type: 'navigation',
      navigation: 'full',
      pageName: 'PageAddAppInNav',
    },
  ];
}

export async function onTapEditApp(argument: Argument): Promise<Tasks> {
  const appId = argument.userInfo as string;
  const focusedApp = NativeHubModule.data(TableIdAppInfo, appId) as Record<string, unknown>;
  focusedApp['bundle'] = NativeHubModule.bundle(appId);
  return [
    {
      type: 'state',
      state: {
        focusedApp,
      },
    },
    {
      type: 'navigation',
      navigation: 'full',
      pageName: 'PageAddAppInNav',
    },
  ];
}

export const PageHub: Page = {
  stateMap: {
    apps: {
      type: 'bind',
      onChange: '#onChangeApps',
    },
    focusedApp: {
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
      id: 'appMatrix',
      dimension: {
        top: halfSpace,
        bottom: halfSpace,
        leftSafe: halfSpace,
        rightSafe: halfSpace,
      },
      matrix: {
        itemSize: {
          width: {
            max: '50%',
            min: 150,
          },
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
  onLoad: ['#reloadHub', '#fetchHubBundle'],
  stateMap: {
    apps: {
      type: 'state',
      value: [],
    },
    focusedApp: {
      type: 'state',
      value: null,
    },
  },
  eventMap: {
    reloadHub: '#reloadHub',
  },
  subpages: ['PageHub'],
  subviews: [
    {
      type: 'blur',
      dimension: {
        top: 0,
        left: 0,
        right: 0,
        unsafeAt: 'top',
      },
      style: {
        background: 'fffc',
      },
      subviews: {
        dimension: {
          left: 0,
          right: 0,
          height: 54,
          bottom: 0,
          topSafe: 0,
        },
        subviews: [
          {
            type: 'image',
            image: {
              url: 'logo.svg',
              mode: 'center',
            },
            dimension: edge,
          },
        ],
      },
    },
    {
      type: 'touchFade',
      onTap: '#onTapAddApp',
      dimension: {
        centerX: 0,
        bottomSafe: 0,
        height: 54,
        width: 54,
        unsafeAt: 'bottom',
      },
      style: {
        background: color,
        radius: 27,
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
