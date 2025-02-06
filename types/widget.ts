export type Widget = {
  size?: 'small' | 'medium' | 'large';
  subviews?: WidgetView | WidgetView[];
};

export type ZStackWidget = {
  subviews?: WidgetView | WidgetView[];
};

type WidgetViewProperties = {
  id?: string;
  // style?: Style;
  dimension?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    width?: number | string;
    height?: number | string;
  };
};

export type WidgetView = Record<string, unknown>;

/*
## 支持
Spacer
ZStack
VStack
HStack
Group
GeometryReader
GridItem
LazyVGrid
LazyHGrid
ForEach (支持使用，但建议限制数量以保持性能)

Text
Label
Image (仅支持 Assets 中的图片和 SF Symbols)
Shape 及其派生:
	Rectangle
	RoundedRectangle
	Circle
	Capsule
	Ellipse
	Path
Color
Divider
Symbols (SF Symbols)

Button (Intent)
Link
Toggle (Intent)
Gauge
ProgressView

修饰符
widgetURL
padding
frame
background
foregroundColor
font
opacity
blur
cornerRadius
shadow
overlay
mask
clipped
offset
rotationEffect
scaleEffect
aspectRatio
layoutPriority
minimumScaleFactor
lineLimit

* widgetURL Link都是打开主app处理

## 不支持
ScrollView
TextField
TextEditor
NavigationView/NavigationStack
TabView
List
Picker
DatePicker
Slider
Stepper
Menu
ContextMenu
Alert
Sheet
Popover
VideoPlayer
Map
WebView
UIViewRepresentable
任何需要用户输入的组件
任何导航相关的组件
任何动画相关的组件（虽然支持基础动画但不建议使用）

不支持任何用户交互（除了点击打开 App）
不支持动画（虽然语法支持但实际上不会执行）
不支持手势
不支持声音播放
不支持直接网络请求（需要通过 Timeline Provider 提前获取数据）
不支持本地通知
不支持定位服务

Widget 的内存限制约为 30MB（可能随系统版本变化）
渲染时间限制约为 400ms（过长可能导致 Widget 被系统终止）
更新频率有限制（最频繁 5 分钟一次）
图片资源必须在 App Bundle 中
不支持动态加载网络图片
不支持 UserDefaults（需要使用 App Groups）
*/
