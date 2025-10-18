# 静态网站

一个现代化、响应式的静态网站，使用纯 HTML、CSS 和 JavaScript 构建。

## 功能特点

- 🎨 现代化设计，支持深色主题
- 📱 完全响应式布局，适配各种设备
- ⚡ 纯静态文件，加载速度快
- 🚀 动画效果和交互功能
- 🔧 易于定制和扩展

## 文件结构

```
.
├── index.html          # 主页面
├── assets/
│   ├── css/
│   │   └── style.css   # 样式文件
│   └── js/
│       └── main.js     # JavaScript 脚本
└── README.md           # 项目说明
```

## 使用方法

### 本地预览

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用简单的 HTTP 服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要先安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

### 部署到静态托管服务

这个网站可以轻松部署到各种静态托管平台：

#### GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择分支（通常是 main 或 gh-pages）
4. 网站将在 `https://username.github.io/repository-name` 上线

#### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify

1. 拖拽整个文件夹到 Netlify 网站
2. 或使用 Netlify CLI：

```bash
npm install -g netlify-cli
netlify deploy
```

#### Cloudflare Pages

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 设置构建配置（无需构建命令）
3. 发布目录设置为根目录

## 定制说明

### 修改颜色主题

编辑 `assets/css/style.css` 文件中的 CSS 变量：

```css
:root {
    --primary: #5A67D8;        /* 主色调 */
    --accent: #FBBF24;         /* 强调色 */
    --background: #0F172A;     /* 背景色 */
    /* ... 更多颜色变量 */
}
```

### 修改内容

直接编辑 `index.html` 文件中的文本内容、标题、链接等。

### 添加功能

在 `assets/js/main.js` 文件中添加自定义 JavaScript 功能。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License - 可自由使用和修改

## 贡献

欢迎提交 Issue 和 Pull Request！
