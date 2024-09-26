import {type Tasks, type Argument, type AppInfo} from 'types/event';
import {makeAppId, NativeHomeModule, TableIdAppInfo} from 'types/native-home';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {type View} from 'types/view';

export function onChangeApps(argument: Argument): Tasks {
  const apps = argument.stateInfo['apps'] as Array<Record<string, unknown>>;
  const subviews: View[] = Array.from(apps, app => {
    const value = app['value'] as Record<string, unknown>;
    const name = value['name'] as string;
    return {
      type: 'touch',
      userInfo: value,
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
          userInfo: value,
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

export async function reloadHome(_: Argument): Promise<Tasks> {
  const res = NativeHomeModule.table(TableIdAppInfo);
  return {
    type: 'state',
    state: {
      apps: res,
    },
  };
}

export function onTapApp(argument: Argument): Tasks {
  return {
    type: 'app',
    appInfo: argument.userInfo as AppInfo,
  };
}

export function onTapAddApp(_: Argument): Tasks {
  const focusedApp: AppInfo = {
    bundle: '',
    name: '',
    id: makeAppId(),
    navigation: 'overlay',
  };
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
  const appInfo = argument.userInfo as Record<string, unknown>;
  const appId = appInfo['id'] as string;
  const bundle = NativeHomeModule.bundle(appId);
  return [
    {
      type: 'state',
      state: {
        focusedApp: {
          ...appInfo,
          bundle,
        },
      },
    },
    {
      type: 'navigation',
      navigation: 'full',
      pageName: 'PageAddAppInNav',
    },
  ];
}

export const PageHome: Page = {
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

export const PageHomeInNav: NavPage = {
  type: 'nav',
  onLoad: 'reloadHome',
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
    onTapEditApp: 'onTapEditApp',
    onTapApp: 'onTapApp',
    onTapAddApp: 'onTapAddApp',
    reloadHome: 'reloadHome',
  },
  subpages: ['PageHome'],
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
              size: 20,
              color: '#000',
            },
            dimension: edge,
          },
        },
        {
          type: 'label',
          text: {
            content: 'Home',
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
