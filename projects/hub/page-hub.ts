import {type Tasks, type Argument, type AppInfo} from 'types/event';
import {NativeModule} from 'types/native';
import {makeAppId, NativeHubModule, TableIdAppInfo} from 'types/native-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {type View} from 'types/view';

const palette: string[] = [
  'e7ced3',
  'e9ced0',
  'eacecc',
  'eacec8',
  'eacfc5',
  'e9cfc2',
  'e7d0bf',
  'e5d1be',
  'e2d2bc',
  'dfd3bd',
  'dbd4bd',
  'd8d5bf',
  'd5d6c1',
  'd2d6c3',
  'cfd7c6',
  'cdd7c9',
  'cbd8cc',
  'cad8cf',
  'c9d8d2',
  'c9d8d5',
  'c9d7d7',
  'c9d7da',
  'cad6db',
  'cad6dd',
  'ccd5df',
  'ced5e0',
  'd0d4e0',
  'd1d3e1',
  'd4d3e1',
  'd6d2e1',
  'd9d1e0',
  'dcd1df',
  'ded0de',
  'e0d0dc',
  'e3cfda',
  'e5cfd7',
];

export function onChangeApps(argument: Argument): Tasks {
  const apps = argument.stateInfo['apps'] as Array<Record<string, unknown>>;
  const subviews: View[] = Array.from(apps, app => {
    const value = app['value'] as Record<string, unknown>;
    const name = value['name'] as string;
    const id = value['id'] as string;
    return {
      type: 'touch',
      userInfo: id,
      onTap: 'onTapApp',
      dimension: {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
        ratio: 1.618,
      },
      style: {
        background: palette[Math.floor(Math.random() * palette.length)],
        border: {
          radius: 24,
        },
      },
      subviews: [
        {
          type: 'touchFade',
          userInfo: id,
          onTap: 'onTapEditApp',
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
              color: '333',
              size: 14,
              weight: '500',
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
            color: '333',
            design: 'monospaced',
            weight: '600',
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
  const focusedApp: AppInfo = {id: makeAppId()};
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
      onChange: 'onChangeApps',
    },
  },
  eventMap: {
    onChangeApps: 'onChangeApps',
  },
  subviews: {
    type: 'scroll',
    style: {
      background: 'eee',
    },
    dimension: edge,
    subviews: {
      type: 'matrix',
      id: 'appMatrix',
      dimension: {
        top: 0,
        bottom: 0,
        leftSafe: 8,
        rightSafe: 8,
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
  onLoad: ['reloadHub', 'fetchHubBundle'],
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
    fetchHubBundle: 'fetchHubBundle',
    onTapEditApp: 'onTapEditApp',
    onTapApp: 'onTapApp',
    onTapAddApp: 'onTapAddApp',
    reloadHub: 'reloadHub',
  },
  subpages: ['PageHub'],
  subviews: {
    type: 'blur',
    dimension: {
      topSafe: 10,
      width: 60,
      height: 60,
      rightSafe: 10,
      unsafeAt: 'top',
    },
    style: {
      background: 'eeec',
      border: {
        radius: 30,
      },
      overflow: 'hidden',
    },
    subviews: {
      type: 'touchFade',
      onTap: 'onTapAddApp',
      dimension: edge,
      subviews: {
        type: 'symbol',
        symbol: {
          name: 'plus',
          weight: '500',
          color: '000',
        },
        dimension: edge,
      },
    },
  },
};
