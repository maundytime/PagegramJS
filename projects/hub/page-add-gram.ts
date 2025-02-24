import {type Tasks, type Argument} from 'types/event';
import {PagegramHub, TableIdGramInfo} from 'types/pagegram-hub';
import type {Page, NavPage} from 'types/page';
import {edge} from 'types/util';
import {Pagegram} from 'types/pagegram';

export function onSaveGram(argument: Argument): Tasks {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  const gramId = focusedGram['id'] as string;
  const gramName = focusedGram['name'] as string;
  const gramBundle = focusedGram['bundle'] as string;
  const gramType = focusedGram['type'] as string;
  if (!gramName || !gramBundle || !gramId) {
    return;
  }
  delete focusedGram['bundle'];
  const gramInfo = focusedGram;
  PagegramHub.saveData(TableIdGramInfo, gramId, gramInfo);
  PagegramHub.saveBundle(gramId, gramBundle);
  PagegramHub.createTable(gramId);
  if (gramType === 'widget') {
    PagegramHub.reloadWidgets();
  }
  return {
    type: 'navigation',
    navigation: 'dismiss',
  };
}

export function onDeleteGram(argument: Argument): Tasks {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  const gramId = focusedGram['id'] as string;
  const gramType = focusedGram['type'] as string;
  PagegramHub.deleteData(TableIdGramInfo, gramId);
  PagegramHub.deleteBundle(gramId);
  PagegramHub.dropTable(gramId);
  if (gramType === 'widget') {
    PagegramHub.reloadWidgets();
  }
  return {
    type: 'navigation',
    navigation: 'dismiss',
  };
}

export function onCopyId(argument: Argument) {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  const gramId = focusedGram['id'] as string;
  Pagegram.copy(gramId);
}

export function onInputGramName(argument: Argument): Tasks {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  focusedGram['name'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedGram,
    },
    // skipOnChange: true,
  };
}

export function onInputGramBundle(argument: Argument): Tasks {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  focusedGram['bundle'] = (argument.systemInfo as any).text as string;
  return {
    type: 'state',
    state: {
      focusedGram,
    },
    // skipOnChange: true,
  };
}

export function onChangeFocusGram(argument: Argument): Tasks {
  const focusedGram = argument.stateInfo['focusedGram'] as Record<string, unknown>;
  const bundle = focusedGram['bundle'] as string;
  const name = focusedGram['name'] as string;
  const isNew = focusedGram['isNew'];
  return {
    type: 'view',
    view: {
      gramNameTextView: {
        text: name,
      },
      gramBundleTextView: {
        text: bundle,
      },
      deleteButton: {
        style: {
          opacity: isNew ? 1 : 0,
        },
      },
    },
  };
}

const background = 'f1';
const color = '26';

export function PageAddGram(): Page {
  return {
    stateMap: {
      focusedGram: {
        type: 'bind',
        onChange: '#onChangeFocusGram',
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
            id: 'gramNameTextView',
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
            onInput: '#onInputGramName',
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
            id: 'gramBundleTextView',
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
            onInput: '#onInputGramBundle',
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
            id: 'copyIdButton',
            type: 'touchFade',
            style: {
              background: 'f',
            },
            dimension: {
              height: 44,
            },
            onTap: ['#onCopyId'],
            subviews: {
              type: 'label',
              text: {
                design: 'monospaced',
                size: 12,
                content: 'COPY ID',
                color,
                weight: 500,
              },
              dimension: {
                centerX: 0,
                centerY: 0,
              },
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
            onLongPress: ['#onDeleteGram', '@reloadHub'],
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
}

export function PageAddGramInNav(): NavPage {
  return {
    type: 'nav',
    stateMap: {
      focusedGram: {
        type: 'bind',
      },
    },
    subpages: ['PageAddGram'],
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
            onTap: ['#onSaveGram', '@reloadHub'],
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
}
