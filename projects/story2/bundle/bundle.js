var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// projects/story2/index.ts
var story2_exports = {};
__export(story2_exports, {
  PageTest: () => PageTest,
  onLoad: () => onLoad,
  onLoad2: () => onLoad2,
  root: () => PageTest
});

// types/native.ts
var NativeModule = NativeModuleManager;

// types/util.ts
var edge = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

// projects/story2/page.ts
async function onLoad(_) {
  console.log("to save");
  NativeModule.saveData("key1", "113");
  console.log("saved");
}
async function onLoad2(_) {
  console.log("to get");
  const x = NativeModule.data("key1");
  console.log("got", x);
}
var PageTest = {
  onLoad: ["onLoad", "onLoad2"],
  eventMap: {
    onLoad: "onLoad",
    onLoad2: "onLoad2"
  },
  subviews: {
    type: "label",
    text: {
      content: "\u4F60\u597D",
      alignment: "center"
    },
    dimension: edge,
    style: {
      background: "#fff"
    }
  }
};
var pagegram=story2_exports;
