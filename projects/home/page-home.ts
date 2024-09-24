import {type Tasks, type Argument, type AppInfo} from 'types/event';
import {makeAppId, NativeHomeModule} from 'types/native-home';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {type View} from 'types/view';

export function onChangeApps(argument: Argument): Tasks {
  const apps = argument.stateInfo['apps'] as Array<Record<string, unknown>>;
  const subviews: View[] = Array.from(apps, app => {
    const value = app['value'] as Record<string, unknown>;
    const name = value['name'] as string;
    return {
      type: 'touchFade',
      userInfo: value,
      onTap: 'onTapApp',
      onLongPress: 'onLongPressApp',
      subviews: {
        type: 'label',
        dimension: {
          top: 0,
          bottom: 0,
          left: 16,
          right: 16,
          height: 44,
        },
        text: {
          content: name,
        },
      },
    };
  });
  return {
    type: 'view',
    view: {
      appStack: {
        subviews,
      },
    },
  };
}

export async function reloadHome(_: Argument): Promise<Tasks> {
  const res = NativeHomeModule.table('app_info');
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

export async function onLongPressApp(argument: Argument): Promise<Tasks> {
  const appInfo = argument.userInfo as Record<string, unknown>;
  const appId = appInfo['id'] as string;
  const bundle = NativeHomeModule.data('app_bundle', appId);
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
      type: 'stack',
      id: 'appStack',
      stack: {
        alignment: 'fill',
      },
      style: {
        background: '#fff',
      },
      dimension: {
        top: 24,
        bottom: 0,
        leftSafe: 0,
        rightSafe: 0,
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
    onLongPressApp: 'onLongPressApp',
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
