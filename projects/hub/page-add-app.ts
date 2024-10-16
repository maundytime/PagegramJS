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
    skipOnChange: true,
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
        spacing: 16,
        alignment: 'fill',
      },
      dimension: {
        top: 16,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
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
                size: 16,
                design: 'monospaced',
                weight: 500,
                content: 'Name',
              },
              dimension: {
                left: 16,
                top: 0,
                height: 44,
              },
            },
            {
              id: 'appNameTextView',
              type: 'text',
              editable: true,
              lines: 1,
              inset: {
                top: 12,
                right: 16,
                bottom: 12,
              },
              text: {
                design: 'monospaced',
                size: 16,
              },
              onInput: '#onInputAppName',
              dimension: {
                left: 100,
                top: 0,
                bottom: 0,
                right: 0,
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
                design: 'monospaced',
                weight: 500,
                size: 16,
                content: 'Bundle',
              },
              dimension: {
                left: 16,
                top: 0,
                height: 44,
              },
            },
            {
              id: 'appBundleTextView',
              type: 'text',
              scrollable: true,
              editable: true,
              inset: {
                top: 12,
                bottom: 12,
                right: 16,
              },
              text: {
                design: 'monospaced',
                size: 16,
              },
              onInput: '#onInputAppBundle',
              dimension: {
                left: 100,
                top: 0,
                bottom: 0,
                right: 0,
                height: 240,
              },
            },
          ],
        },
        {
          type: 'touchFade',
          style: {
            background: 'fff',
          },
          onLongPress: ['#onDeleteApp', '@reloadHub'],
          subviews: {
            type: 'label',
            text: {
              design: 'monospaced',
              size: 16,
              content: 'Long Press To Delete',
              weight: 500,
            },
            dimension: {
              right: 16,
              left: 16,
              top: 12,
              bottom: 12,
            },
          },
        },
      ],
    },
  },
};

export const PageAddAppInNav: NavPage = {
  type: 'nav',
  stateMap: {
    focusedApp: {
      type: 'bind',
    },
  },
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
              design: 'monospaced',
              size: 16,
              content: 'Dismiss',
            },
            dimension: edge,
          },
        },
        {
          type: 'touchFade',
          onTap: ['#onSaveApp', '@reloadHub'],
          dimension: {
            bottom: 0,
            top: 0,
            rightSafe: 16,
          },
          subviews: {
            type: 'label',
            text: {
              design: 'monospaced',
              size: 16,
              weight: 500,
              content: 'Done',
            },
            dimension: edge,
          },
        },
        {
          type: 'label',
          text: {
            content: 'Project',
            design: 'monospaced',
            size: 16,
            weight: 600,
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
