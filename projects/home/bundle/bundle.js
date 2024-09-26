var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// projects/home/index.ts
var home_exports = {};
__export(home_exports, {
  PageAddApp: () => PageAddApp,
  PageAddAppInNav: () => PageAddAppInNav,
  PageHome: () => PageHome,
  PageHomeInNav: () => PageHomeInNav,
  onChangeApps: () => onChangeApps,
  onChangeFocusApp: () => onChangeFocusApp,
  onDeleteApp: () => onDeleteApp,
  onInputAppBundle: () => onInputAppBundle,
  onInputAppName: () => onInputAppName,
  onSaveApp: () => onSaveApp,
  onTapAddApp: () => onTapAddApp,
  onTapApp: () => onTapApp,
  onTapEditApp: () => onTapEditApp,
  reloadHome: () => reloadHome,
  root: () => PageHomeInNav
});

// types/native-home.ts
var TableIdAppInfo = "app_info";
var NativeHomeModule = NativeHomeModuleManager;
function makeAppId() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// types/util.ts
var edge = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

// projects/home/page-add-app.ts
function onSaveApp(argument) {
  const focusedApp = argument.stateInfo["focusedApp"];
  const appId = focusedApp["id"];
  const appName = focusedApp["name"];
  const appBundle = focusedApp["bundle"];
  if (!appName || !appBundle || !appId) {
    return;
  }
  const appInfo = {
    id: appId,
    name: appName
  };
  NativeHomeModule.saveData(TableIdAppInfo, appId, appInfo);
  NativeHomeModule.saveBundle(appId, appBundle);
  NativeHomeModule.createTable(appId);
  return {
    type: "navigation",
    navigation: "dismiss"
  };
}
function onDeleteApp(argument) {
  const focusedApp = argument.stateInfo["focusedApp"];
  const appId = focusedApp["id"];
  NativeHomeModule.deleteData(TableIdAppInfo, appId);
  NativeHomeModule.deleteBundle(appId);
  NativeHomeModule.dropTable(appId);
  return {
    type: "navigation",
    navigation: "dismiss"
  };
}
function onInputAppName(argument) {
  const focusedApp = argument.stateInfo["focusedApp"];
  focusedApp["name"] = argument.systemInfo.text;
  return {
    type: "state",
    state: {
      focusedApp
    }
  };
}
function onInputAppBundle(argument) {
  const focusedApp = argument.stateInfo["focusedApp"];
  focusedApp["bundle"] = argument.systemInfo.text;
  return {
    type: "state",
    state: {
      focusedApp
    }
  };
}
function onChangeFocusApp(argument) {
  const focusedApp = argument.stateInfo["focusedApp"];
  const bundle = focusedApp["bundle"];
  const name = focusedApp["name"];
  return {
    type: "view",
    view: {
      appNameTextView: {
        text: {
          content: name
        }
      },
      appBundleTextView: {
        text: {
          content: bundle
        }
      }
    }
  };
}
var PageAddApp = {
  stateMap: {
    focusedApp: {
      type: "bind",
      onChange: "onChangeFocusApp"
    }
  },
  eventMap: {
    onChangeFocusApp: "onChangeFocusApp"
  },
  subviews: {
    type: "scroll",
    style: {
      background: "#f5f5f5"
    },
    dimension: edge,
    subviews: {
      type: "stack",
      stack: {
        spacing: 24,
        alignment: "fill"
      },
      dimension: {
        top: 24,
        bottom: 0,
        leftSafe: 0,
        rightSafe: 0
      },
      subviews: [
        {
          style: {
            background: "#fff"
          },
          subviews: [
            {
              type: "label",
              text: {
                content: "Name"
              },
              dimension: {
                height: 44,
                left: 16
              }
            },
            {
              id: "appNameTextView",
              type: "text",
              text: {
                editable: true,
                lines: 1
              },
              onInput: "onInputAppName",
              dimension: {
                left: 100,
                top: 12,
                bottom: 12,
                right: 0,
                height: 44 - 24
              }
            }
          ]
        },
        {
          style: {
            background: "#fff"
          },
          subviews: [
            {
              type: "label",
              text: {
                content: "Bundle"
              },
              dimension: {
                height: 44,
                left: 16
              }
            },
            {
              id: "appBundleTextView",
              type: "text",
              text: {
                editable: true,
                scrollable: true
              },
              onInput: "onInputAppBundle",
              dimension: {
                left: 100,
                top: 12,
                bottom: 10,
                right: 0,
                height: 224
              }
            }
          ]
        },
        {
          type: "touchFade",
          style: {
            background: "#fff"
          },
          onLongPress: ["onDeleteApp", "reloadHome"],
          subviews: {
            type: "label",
            text: {
              content: "Long press to delete"
            },
            dimension: {
              right: 16,
              left: 16,
              top: 0,
              bottom: 0,
              height: 44
            }
          }
        }
      ]
    }
  }
};
var PageAddAppInNav = {
  type: "nav",
  stateMap: {
    focusedApp: {
      type: "bind"
    }
  },
  eventMap: {
    onInputAppName: "onInputAppName",
    onInputAppBundle: "onInputAppBundle",
    onSaveApp: "onSaveApp",
    onDeleteApp: "onDeleteApp",
    onDismissTap: {
      type: "navigation",
      navigation: "dismiss"
    }
  },
  subpages: ["PageAddApp"],
  subviews: {
    type: "blur",
    dimension: {
      top: 0,
      left: 0,
      right: 0,
      unsafeAt: "top"
    },
    style: {
      background: "#fffe"
    },
    subviews: {
      dimension: {
        left: 0,
        right: 0,
        height: 44,
        bottom: 0,
        topSafe: 0
      },
      subviews: [
        {
          type: "touchFade",
          onTap: "onDismissTap",
          dimension: {
            bottom: 0,
            top: 0,
            leftSafe: 16
          },
          subviews: {
            type: "label",
            text: {
              content: "Dismiss"
            },
            dimension: edge
          }
        },
        {
          type: "touchFade",
          onTap: ["onSaveApp", "reloadHome"],
          dimension: {
            bottom: 0,
            top: 0,
            rightSafe: 16
          },
          subviews: {
            type: "label",
            text: {
              content: "Done"
            },
            dimension: edge
          }
        },
        {
          type: "label",
          text: {
            content: "Project",
            weight: "600"
          },
          dimension: {
            centerX: 0,
            centerY: 0
          }
        }
      ]
    }
  }
};

// projects/home/page-home.ts
function onChangeApps(argument) {
  const apps = argument.stateInfo["apps"];
  const subviews = Array.from(apps, (app) => {
    const value = app["value"];
    const name = value["name"];
    return {
      type: "touch",
      userInfo: value,
      onTap: "onTapApp",
      dimension: {
        top: 12,
        bottom: 12,
        left: 12,
        right: 12
      },
      style: {
        background: "fff",
        border: {
          radius: 8
        },
        overflow: "hidden"
      },
      subviews: [
        {
          type: "touchFade",
          userInfo: value,
          onTap: "onTapEditApp",
          dimension: {
            top: 0,
            width: 40,
            height: 40,
            right: 0
          },
          subviews: {
            type: "symbol",
            dimension: {
              centerX: 0,
              centerY: 0
            },
            symbol: {
              name: "equal",
              size: 14
            }
          }
        },
        {
          type: "label",
          dimension: {
            centerX: 0,
            centerY: 0
          },
          text: {
            content: name
          }
        }
      ]
    };
  });
  return {
    type: "view",
    view: {
      appMatrix: {
        matrix: {
          content: subviews
        }
      }
    }
  };
}
async function reloadHome(_) {
  const res = NativeHomeModule.table(TableIdAppInfo);
  return {
    type: "state",
    state: {
      apps: res
    }
  };
}
function onTapApp(argument) {
  return {
    type: "app",
    appInfo: argument.userInfo
  };
}
function onTapAddApp(_) {
  const focusedApp = {
    bundle: "",
    name: "",
    id: makeAppId(),
    navigation: "overlay"
  };
  return [
    {
      type: "state",
      state: {
        focusedApp
      }
    },
    {
      type: "navigation",
      navigation: "full",
      pageName: "PageAddAppInNav"
    }
  ];
}
async function onTapEditApp(argument) {
  const appInfo = argument.userInfo;
  const appId = appInfo["id"];
  const bundle = NativeHomeModule.bundle(appId);
  return [
    {
      type: "state",
      state: {
        focusedApp: {
          ...appInfo,
          bundle
        }
      }
    },
    {
      type: "navigation",
      navigation: "full",
      pageName: "PageAddAppInNav"
    }
  ];
}
var PageHome = {
  stateMap: {
    apps: {
      type: "bind",
      onChange: "onChangeApps"
    }
  },
  eventMap: {
    onChangeApps: "onChangeApps"
  },
  subviews: {
    type: "scroll",
    style: {
      background: "#f5f5f5"
    },
    dimension: edge,
    subviews: {
      type: "matrix",
      id: "appMatrix",
      dimension: {
        top: 12,
        bottom: 0,
        leftSafe: 12,
        rightSafe: 12
      },
      matrix: {
        itemSize: {
          width: {
            max: "50%",
            min: 150
          },
          height: 100 + 24
        }
      }
    }
  }
};
var PageHomeInNav = {
  type: "nav",
  onLoad: "reloadHome",
  stateMap: {
    apps: {
      type: "state",
      value: []
    },
    focusedApp: {
      type: "state",
      value: null
    }
  },
  eventMap: {
    onTapEditApp: "onTapEditApp",
    onTapApp: "onTapApp",
    onTapAddApp: "onTapAddApp",
    reloadHome: "reloadHome"
  },
  subpages: ["PageHome"],
  subviews: {
    type: "blur",
    dimension: {
      top: 0,
      left: 0,
      right: 0,
      unsafeAt: "top"
    },
    style: {
      background: "#fffe"
    },
    subviews: {
      dimension: {
        left: 0,
        right: 0,
        height: 44,
        bottom: 0,
        topSafe: 0
      },
      subviews: [
        {
          type: "touchFade",
          onTap: "onTapAddApp",
          dimension: {
            bottom: 0,
            width: 44,
            top: 0,
            rightSafe: 16
          },
          subviews: {
            type: "symbol",
            symbol: {
              name: "plus",
              size: 20,
              color: "#000"
            },
            dimension: edge
          }
        },
        {
          type: "label",
          text: {
            content: "Home",
            weight: "600"
          },
          dimension: {
            centerX: 0,
            centerY: 0
          }
        }
      ]
    }
  }
};
var pagegram=home_exports;
