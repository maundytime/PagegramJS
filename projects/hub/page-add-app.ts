import {type Tasks, type Argument} from 'types/event';
import {makeAppId, NativeHubModule, TableIdAppInfo} from 'types/native-hub';
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
  focusedApp['id'] ||= makeAppId();
  focusedApp['name'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedApp,
    },
    // skipOnChange: true,
  };
}

export function onInputAppBundle(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  focusedApp['id'] ||= makeAppId();
  focusedApp['bundle'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedApp,
    },
    // skipOnChange: true,
  };
}

export function onChangeFocusApp(argument: Argument): Tasks {
  const focusedApp = argument.stateInfo['focusedApp'] as Record<string, unknown>;
  const bundle = focusedApp['bundle'] as string;
  const name = focusedApp['name'] as string;
  const id = focusedApp['id'] as string;
  return {
    type: 'view',
    view: {
      appNameTextView: {
        text: name,
      },
      appBundleTextView: {
        text: bundle,
      },
      deleteButton: {
        style: {
          opacity: id ? 1 : 0,
        },
      },
    },
  };
}

const background = 'f1';
const color = '26';

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
      background,
    },
    dimension: edge,
    subviews: {
      type: 'stack',
      stack: {
        alignment: 'fill',
      },
      dimension: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
      },
      subviews: [
        {
          dimension: {
            height: 44,
          },
          subviews: {
            type: 'label',
            text: {
              size: 12,
              design: 'monospaced',
              color,
              content: 'NAME',
            },
            dimension: {
              left: 16,
              centerY: 4,
            },
          },
        },
        {
          id: 'appNameTextView',
          type: 'text',
          editable: true,
          lines: 1,
          inset: {
            top: 13,
            left: 16,
            right: 16,
            bottom: 13,
          },
          design: 'monospaced',
          size: 12,
          color,
          style: {
            background: 'f',
          },
          onInput: '#onInputAppName',
          dimension: {
            height: 44,
          },
        },
        {
          dimension: {
            height: 44,
          },
          subviews: {
            type: 'label',
            text: {
              size: 12,
              design: 'monospaced',
              color,
              content: 'BUNDLE',
            },
            dimension: {
              left: 16,
              centerY: 4,
            },
          },
        },
        {
          id: 'appBundleTextView',
          type: 'text',
          scrollable: true,
          editable: true,
          inset: 16,
          style: {
            background: 'f',
          },
          design: 'monospaced',
          color,
          size: 12,
          onInput: '#onInputAppBundle',
          dimension: {
            left: 0,
            right: 0,
            height: 240,
          },
        },
        {
          dimension: {
            height: 24,
          },
        },
        {
          id: 'deleteButton',
          type: 'touchFade',
          style: {
            background: 'f',
          },
          dimension: {
            height: 44,
          },
          onLongPress: ['#onDeleteApp', '@reloadHub'],
          subviews: {
            type: 'label',
            text: {
              design: 'monospaced',
              size: 12,
              content: 'LONG PRESS TO DELETE',
              color,
              weight: 500,
            },
            dimension: {
              centerX: 0,
              centerY: 0,
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
              size: 12,
              content: 'CANCEL',
              color,
              weight: 600,
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
              size: 12,
              weight: 600,
              color,
              content: 'SAVE',
            },
            dimension: edge,
          },
        },
        {
          type: 'label',
          text: {
            content: 'PROJECT',
            design: 'monospaced',
            size: 14,
            color,
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
