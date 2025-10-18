# World Weather - 全球天气查询

一个美观的 React 天气应用，支持查询世界各地的实时天气信息，并根据不同天气状况展示相应的视觉效果。

## ✨ 功能特点

- 🌍 **全球天气查询** - 输入任意城市名称，查询世界各地实时天气
- 🎨 **动态视觉效果** - 根据天气状况（晴天、雨天、雪天、雷暴等）显示对应的动画效果
- 📊 **详细气象数据** - 温度、体感温度、湿度、风速、昼夜状态等
- 📅 **五日天气预报** - 查看未来五天的天气趋势
- 💫 **流畅动画** - 下雨、下雪、闪电、云朵飘动等真实天气效果
- 📱 **响应式设计** - 完美适配桌面、平板和移动设备
- 🚀 **零 API Key** - 使用免费的 Open-Meteo API，无需申请密钥

## 🌦️ 天气视觉效果

应用根据实时天气代码，自动切换背景主题和动画效果：

- ☀️ **晴空万里** - 金色太阳、渐变天空、飘动的白云
- ⛅ **多云/阴天** - 多层云朵飘过、柔和背景
- 🌧️ **雨天** - 雨滴降落动画、深蓝背景
- ❄️ **雪天** - 雪花飘落、冬日氛围
- ⛈️ **雷暴** - 闪电特效、暴雨动画
- 🌫️ **雾天** - 雾气弥漫效果

## 📁 文件结构

```
.
├── index.html                 # 主页面
├── assets/
│   ├── css/
│   │   └── weather.css        # 天气应用样式和动画
│   └── js/
│       └── weather.jsx        # React 天气应用主程序
└── README.md                  # 项目说明
```

## 🚀 使用方法

### 本地预览

无需安装任何依赖，直接使用浏览器或简单的 HTTP 服务器即可运行：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

### 部署到静态托管服务

这个应用可以轻松部署到各种静态托管平台：

#### GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库 **Settings → Pages** 中设置发布源
3. 选择主分支，点击保存
4. 几分钟后即可通过 GitHub Pages URL 访问

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Netlify

直接拖拽整个文件夹到 [Netlify 网站](https://app.netlify.com/)，或使用 CLI：

```bash
npm install -g netlify-cli
netlify deploy
```

## 🎯 使用说明

1. **查询天气**
   - 在搜索框中输入城市名称（支持中文和英文）
   - 例如：北京、Tokyo、New York、Paris、Sydney
   - 点击"查询天气"按钮或按回车

2. **查看详情**
   - 查看当前温度、体感温度
   - 了解湿度、风速等气象数据
   - 查看未来五天的天气预报

3. **体验视觉效果**
   - 背景会根据当前天气自动变化
   - 晴天能看到太阳和飘动的云朵
   - 雨天会有雨滴降落效果
   - 雪天能看到雪花飘落
   - 雷暴天气会有闪电效果

## 🔧 技术栈

- **React 18** - 使用 CDN 方式引入，无需构建工具
- **Babel Standalone** - 浏览器端 JSX 转换
- **Open-Meteo API** - 免费的天气数据 API
  - 天气数据 API: `api.open-meteo.com`
  - 地理编码 API: `geocoding-api.open-meteo.com`
- **纯 CSS 动画** - 所有视觉效果使用 CSS 实现，性能优异

## 🎨 自定义配置

### 修改默认城市

编辑 `assets/js/weather.jsx` 第 4 行：

```javascript
const DEFAULT_CITY = "上海";  // 改为你想要的默认城市
```

### 调整天气效果

在 `assets/js/weather.jsx` 中的 `WEATHER_CONDITIONS` 数组中修改天气状况映射：

```javascript
{
  codes: [0],
  label: "晴空万里",
  icon: "☀️",
  theme: "clear-sky",
}
```

### 修改颜色主题

编辑 `assets/css/weather.css` 中的背景渐变：

```css
.clear-sky {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🌐 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📝 许可证

MIT License - 可自由使用和修改

## 🙏 致谢

- [Open-Meteo](https://open-meteo.com/) - 提供免费的天气 API
- [React](https://react.dev/) - 强大的 UI 框架
- 所有贡献者和使用者

---

**Enjoy the weather! 🌈**
