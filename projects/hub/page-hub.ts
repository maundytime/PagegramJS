import {type Tasks, type Argument, type AppInfo} from 'types/event';
import {NativeModule} from 'types/native';
import {makeAppId, NativeHubModule, TableIdAppInfo} from 'types/native-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {type View} from 'types/view';

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
        top: 12,
        bottom: 12,
        left: 12,
        right: 12,
      },
      style: {
        background: 'fff',
        border: {
          radius: 8,
        },
        overflow: 'hidden',
      },
      subviews: [
        {
          type: 'touchFade',
          userInfo: id,
          onTap: 'onTapEditApp',
          dimension: {
            top: 0,
            width: 40,
            height: 40,
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
              size: 14,
            },
          },
        },
        {
          type: 'label',
          dimension: {
            centerX: 0,
            centerY: 0,
          },
          text: {
            content: name,
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
      background: '#f5f5f5',
    },
    dimension: edge,
    subviews: {
      type: 'matrix',
      id: 'appMatrix',
      dimension: {
        top: 12,
        bottom: 0,
        leftSafe: 12,
        rightSafe: 12,
      },
      matrix: {
        itemSize: {
          width: {
            max: '50%',
            min: 150,
          },
          height: 100 + 24,
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
      top: 0,
      left: 0,
      right: 0,
      unsafeAt: 'top',
    },
    style: {
      background: '#fffe',
    },
    subviews: {
      dimension: {
        left: 0,
        right: 0,
        height: 44,
        bottom: 0,
        topSafe: 0,
      },
      subviews: [
        {
          type: 'touchFade',
          onTap: 'onTapAddApp',
          dimension: {
            bottom: 0,
            width: 44,
            top: 0,
            rightSafe: 16,
          },
          subviews: {
            type: 'symbol',
            symbol: {
              name: 'plus',
              weight: '500',
              color: '#000',
            },
            dimension: edge,
          },
        },
        {
          type: 'label',
          text: {
            content: 'Hub',
            weight: '600',
          },
          dimension: {
            centerX: 0,
            centerY: 0,
          },
        },
      ],
    },
  },
};
