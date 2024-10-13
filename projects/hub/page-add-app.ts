import {type Tasks, type Argument} from 'types/event';
import {NativeHubModule, TableIdAppInfo} from 'types/native-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';

export function onSaveApp(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  const appId = focusedApp['id'] as string;
  const appName = focusedApp['name'] as string;
  const appBundle = focusedApp['bundle'] as string;
  if (!appName || !appBundle || !appId) {
    return;
  }
  const appInfo = {
    id: appId,
    name: appName,
  };
  // todo 验证app bundle是否能跑通
  NativeHubModule.saveData(TableIdAppInfo, appId, appInfo);
  NativeHubModule.saveBundle(appId, appBundle);
  NativeHubModule.createTable(appId);
  return {
    type: 'navigation',
    navigation: 'dismiss',
  };
}

export function onDeleteApp(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  const appId = focusedApp['id'] as string;
  NativeHubModule.deleteData(TableIdAppInfo, appId);
  NativeHubModule.deleteBundle(appId);
  NativeHubModule.dropTable(appId);
  return {
    type: 'navigation',
    navigation: 'dismiss',
  };
}

export function onInputAppName(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  focusedApp['name'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedApp,
    },
  };
}

export function onInputAppBundle(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  focusedApp['bundle'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedApp,
    },
  };
}

export function onChangeFocusApp(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  const bundle = focusedApp['bundle'] as string;
  const name = focusedApp['name'] as string;
  return {
    type: 'view',
    view: {
      appNameTextView: {
        text: {
          content: name,
        },
      },
      appBundleTextView: {
        text: {
          content: bundle,
        },
      },
    },
  };
}

export const PageAddApp: Page = {
  stateMap: {
    focusedApp: {
      type: 'bind',
      onChange: '#onChangeFocusApp',
    },
  },
  subviews: {
    type: 'scroll',
    style: {
      background: 'f5f5f5',
    },
    dimension: edge,
    subviews: {
      type: 'stack',
      stack: {
        spacing: 24,
        alignment: 'fill',
      },
      dimension: {
        top: 24,
        bottom: 0,
        leftSafe: 0,
        rightSafe: 0,
      },
      subviews: [
        {
          style: {
            background: 'fff',
          },
          subviews: [
            {
              type: 'label',
              text: {
                content: 'Name',
              },
              dimension: {
                height: 44,
                left: 16,
              },
            },
            {
              id: 'appNameTextView',
              type: 'text',
              text: {
                editable: true,
                lines: 1,
              },
              onInput: '#onInputAppName',
              dimension: {
                left: 100,
                top: 12,
                bottom: 12,
                right: 0,
                height: 44 - 24,
              },
            },
          ],
        },
        {
          style: {
            background: 'fff',
          },
          subviews: [
            {
              type: 'label',
              text: {
                content: 'Bundle',
              },
              dimension: {
                height: 44,
                left: 16,
              },
            },
            {
              id: 'appBundleTextView',
              type: 'text',
              text: {
                editable: true,
                scrollable: true,
              },
              onInput: '#onInputAppBundle',
              dimension: {
                left: 100,
                top: 12,
                bottom: 10,
                right: 0,
                height: 224,
              },
            },
          ],
        },
        {
          type: 'touchFade',
          style: {
            background: 'fff',
          },
          onLongPress: ['#onDeleteApp', 'reloadHub'],
          subviews: {
            type: 'label',
            text: {
              content: 'Long press to delete',
            },
            dimension: {
              right: 16,
              left: 16,
              top: 0,
              bottom: 0,
              height: 44,
            },
          },
        },
      ],
    },
  },
};

export const PageAddAppInNav: NavPage = {
  type: 'nav',
  // stateMap: {
  //   focusedApp: {
  //     type: 'bind',
  //   },
  // },
  subpages: ['PageAddApp'],
  subviews: {
    type: 'blur',
    dimension: {
      top: 0,
      left: 0,
      right: 0,
      unsafeAt: 'top',
    },
    style: {
      background: 'fffe',
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
          onTap: {
            type: 'navigation',
            navigation: 'dismiss',
          },
          dimension: {
            bottom: 0,
            top: 0,
            leftSafe: 16,
          },
          subviews: {
            type: 'label',
            text: {
              content: 'Dismiss',
            },
            dimension: edge,
          },
        },
        {
          type: 'touchFade',
          onTap: ['#onSaveApp', 'reloadHub'],
          dimension: {
            bottom: 0,
            top: 0,
            rightSafe: 16,
          },
          subviews: {
            type: 'label',
            text: {
              content: 'Done',
            },
            dimension: edge,
          },
        },
        {
          type: 'label',
          text: {
            content: 'Project',
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
