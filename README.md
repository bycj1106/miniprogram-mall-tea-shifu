# 拾福茶仓 - 私域茶叶销售小程序

<p align="center">
  <img src="https://img.shields.io/badge/WeChat-%232019F?style=flat-square&logo=wechat&labelColor=#ffffff" alt="WeChat">
  <img src="https://img.shields.io/badge/Cloud-Development-%2324B8F5?style=flat-square&logo=cloudflare&labelColor=#ffffff" alt="WeChat Cloud">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version">
</p>

> 品好茶，享人生 — 专注优质中国茶的原产地直供平台

## 📖 项目简介

拾福茶仓是一款基于微信小程序开发的私域茶叶销售平台，致力于为用户提供优质、原产地的中国名茶。平台涵盖绿茶、红茶、乌龙茶、普洱、白茶等多个品类，支持产品浏览、详情查看、收藏、购物车、门店导航等核心功能。

本项目采用 **微信小程序 + 微信云开发** 架构，无需搭建独立服务器，即可快速上线运营。

---

## ✨ 功能特性

### 核心功能

| 功能模块 | 功能描述 |
|---------|---------|
| 🔄 首页展示 | 轮播图 banner、分类快捷入口、热销/新品产品列表 |
| 📦 产品浏览 | 分类筛选（绿茶/红茶/乌龙茶/普洱/白茶）、标签筛选（大师甄选/礼盒专区/新茶尝鲜） |
| 🍵 产品详情 | 产品图片轮播、口感雷达图、价格优惠信息、收藏/加入购物车 |
| ❤️ 收藏管理 | 收藏喜欢的茶叶产品、收藏列表管理 |
| 🛒 购物车 | 添加商品到购物车、数量管理 |
| 📍 门店导航 | 门店列表展示、地图导航、一键拨打电话 |
| 👤 用户中心 | 微信授权登录、会员信息展示、订单/收藏/地址管理 |

### 技术特性

- 🏗️ **云端一体**：前后端均使用微信云开发，无需自建服务器
- 🎨 **原生体验**：原生小程序开发，性能优异，用户体验流畅
- 📱 **响应式布局**：适配各种手机屏幕尺寸
- 🛡️ **完善的错误处理**：统一请求封装，优雅的错误提示
- 📦 **模块化架构**：服务层、工具层、常量层分离，易于维护扩展

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                      微信小程序客户端                         │
├─────────────────────────────────────────────────────────────┤
│  页面层 (Pages)                                             │
│  ├── home/          首页                                     │
│  ├── products/      产品列表                                  │
│  ├── product-detail/ 产品详情                                │
│  ├── stores/       门店                                      │
│  └── profile/      我的                                      │
├─────────────────────────────────────────────────────────────┤
│  服务层 (Services)                                           │
│  ├── productService.js    产品服务                           │
│  ├── userService.js      用户服务                           │
│  ├── storeService.js     门店服务                           │
│  ├── cartService.js      购物车服务                         │
│  └── collectionService.js 收藏服务                          │
├─────────────────────────────────────────────────────────────┤
│  工具层 (Utils)                                              │
│  ├── request.js        统一请求封装 + 错误处理               │
│  └── util.js          工具函数                              │
├─────────────────────────────────────────────────────────────┤
│  常量层 (Constants)                                          │
│  └── index.js         数据库集合名、状态码、配置等           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    微信云开发后台                            │
├─────────────────────────────────────────────────────────────┤
│  云数据库                                                    │
│  ├── products     产品集合                                   │
│  ├── banners      轮播图集合                                 │
│  ├── stores      门店集合                                    │
│  ├── users       用户集合                                    │
│  ├── cart        购物车集合                                  │
│  └── collections 收藏集合                                    │
├─────────────────────────────────────────────────────────────┤
│  云函数                                                      │
│  ├── login       获取用户 openid                             │
│  └── getProducts 产品查询（支持复杂筛选）                     │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈详情

| 层级 | 技术选型 | 说明 |
|-----|---------|------|
| 前端框架 | 微信小程序原生框架 | WXML + WXSS + JavaScript |
| 后端服务 | 微信云开发 | 云数据库 + 云函数 |
| 状态管理 | 原生 Page.data | 轻量级状态管理 |
| 样式方案 | WXSS | CSS 超集，支持 rpx 响应式单位 |
| 构建工具 | 微信开发者工具 | 官方 IDE |

---

## 🚀 快速开始

### 环境要求

| 环境 | 版本要求 | 说明 |
|-----|---------|------|
| Node.js | ≥ 14.0.0 | 本地开发可选 |
| 微信开发者工具 | ≥ 1.02.1903250 | 必装 |
| 微信小程序基础库 | ≥ 2.2.3 | 云开发支持 |
| 微信公众号 AppID | 已注册 | 用于真机调试和发布 |

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/your-repo/miniprogram-mall-tea-shifu.git
cd miniprogram-mall-tea-shifu
```

#### 2. 配置云开发环境

1. 打开 **微信开发者工具**
2. 点击「导入项目」，选择 `miniprogram` 目录
3. 在「详情」→「本地设置」中，勾选「不校验合法域名」
4. 在「云开发控制台」中创建环境（注意：环境 ID 需要与 `app.js` 中的配置一致）

#### 3. 初始化云数据库

在云开发控制台中创建以下集合：

```javascript
// 集合名称（按此顺序创建）
products      // 产品数据
banners       // 轮播图数据
stores        // 门店数据
users         // 用户数据
cart          // 购物车数据
collections   // 收藏数据
```

#### 4. 配置 AppID

1. 打开 `project.config.json`
2. 修改 `appid` 为您的小程序 AppID

```json
{
  "appid": "wx1234567890abcdef"
}
```

### 运行项目

1. 在微信开发者工具中打开项目
2. 点击「编译」按钮即可预览
3. 使用真机调试体验完整功能

---

## 📖 使用示例

### 示例 1：产品列表查询

```javascript
const { productService } = require('./services');

// 获取热销产品
async function getHotProducts() {
  try {
    const products = await productService.getHotProducts(6);
    console.log('热销产品:', products);
  } catch (err) {
    console.error('获取失败:', err);
  }
}

// 根据标签获取产品
async function getProductsByTag() {
  const newProducts = await productService.getProductsByTag('new');
  const masterProducts = await productService.getProductsByTag('master');
}
```

### 示例 2：用户收藏功能

```javascript
const { collectionService } = require('./services');

// 检查是否已收藏
async function checkCollected(productId) {
  const isCollected = await collectionService.checkIsCollected(productId);
  console.log('是否已收藏:', isCollected);
}

// 添加收藏
async function addToCollection(productId) {
  try {
    await collectionService.addCollection(productId);
    wx.showToast({ title: '收藏成功', icon: 'success' });
  } catch (err) {
    wx.showToast({ title: '收藏失败', icon: 'none' });
  }
}

// 取消收藏
async function removeFromCollection(productId) {
  try {
    await collectionService.removeCollection(productId);
    wx.showToast({ title: '已取消收藏', icon: 'none' });
  } catch (err) {
    wx.showToast({ title: '操作失败', icon: 'none' });
  }
}
```

### 示例 3：统一请求封装使用

```javascript
const { queryCollection, showLoading, hideLoading, showError } = require('./utils/request');

// 带加载状态的请求
async function fetchProducts() {
  showLoading('加载中...');
  
  try {
    const products = await queryCollection('products', { isHot: true }, {
      orderBy: { field: 'sales', order: 'desc' },
      limit: 10
    });
    
    this.setData({ products });
  } catch (err) {
    console.error('请求失败:', err);
    showError('加载失败，请重试');
  } finally {
    hideLoading();
  }
}
```

---

## ⚙️ 配置选项

### 常量配置 (`constants/index.js`)

```javascript
module.exports = {
  // 数据库集合名称
  DB_COLLECTIONS: {
    PRODUCTS: 'products',
    BANNERS: 'banners',
    STORES: 'stores',
    USERS: 'users',
    CART: 'cart',
    COLLECTIONS: 'collections'
  },

  // 用户等级
  USER_LEVEL: {
    BRONZE: 'bronze',   // 铜叶会员
    SILVER: 'silver',   // 银叶会员
    GOLD: 'gold'       // 金叶会员
  },

  // 错误提示信息
  ERROR_MESSAGES: {
    NETWORK_ERROR: '网络错误，请检查网络后重试',
    LOAD_FAILED: '加载失败，请点击重试',
    OPERATION_FAILED: '操作失败，请重试',
    PLEASE_LOGIN: '请先登录后再操作'
  }
};
```

### 云开发环境配置 (`app.js`)

```javascript
App({
  onLaunch() {
    wx.cloud.init({
      env: 'your-env-id',  // 替换为您的云开发环境 ID
      traceUser: true      // 自动获取用户信息
    });
  }
});
```

---

## 📁 目录结构

```
miniprogram-mall-tea-shifu/
├── miniprogram/                 # 小程序主目录
│   ├── app.js                   # 小程序入口
│   ├── app.json                 # 小程序配置
│   ├── app.wxss                 # 全局样式
│   ├── constants/               # 常量定义
│   │   └── index.js
│   ├── utils/                   # 工具函数
│   │   ├── request.js           # 统一请求封装
│   │   └── util.js              # 工具函数
│   ├── services/                # 服务层
│   │   ├── index.js             # 服务入口
│   │   ├── productService.js    # 产品服务
│   │   ├── userService.js       # 用户服务
│   │   ├── storeService.js      # 门店服务
│   │   ├── cartService.js       # 购物车服务
│   │   └── collectionService.js # 收藏服务
│   ├── pages/                   # 页面目录
│   │   ├── home/                # 首页
│   │   ├── products/            # 产品列表
│   │   ├── product-detail/      # 产品详情
│   │   ├── stores/              # 门店
│   │   └── profile/             # 我的
│   └── images/                  # 图片资源
│       └── tab-*.png            # TabBar 图标
├── cloudfunctions/              # 云函数目录
│   ├── login/                   # 登录云函数
│   └── getProducts/             # 产品查询云函数
├── project.config.json          # 项目配置
├── README.md                    # 项目文档
└── .gitignore                   # Git 忽略配置
```

---

## ❓ 常见问题

### Q1: 如何添加新产品？

**答**：在云开发控制台的 `products` 集合中添加记录，字段说明：

| 字段 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 产品名称 |
| category | string | 是 | 分类（绿茶/红茶/乌龙茶/普洱/白茶） |
| images | array | 是 | 产品图片数组 |
| priceRetail | number | 是 | 零售价 |
| priceDiscount | number | 是 | 优惠价 |
| tags | array | 否 | 口感标签 |
| isHot | boolean | 否 | 是否热销 |
| isNew | boolean | 否 | 是否新品 |
| sales | number | 否 | 销量 |

### Q2: 云函数如何部署？

```bash
# 在微信开发者工具中右键云函数目录
# 选择「上传并部署：云端安装依赖」
```

### Q3: 如何修改小程序名称？

1. 修改 `app.json` 中的 `navigationBarTitleText`
2. 修改 `project.config.json` 中的 `projectname`

### Q4: 轮播图如何配置？

在云开发控制台 `banners` 集合中添加：

```javascript
{
  "image": "https://example.com/banner.jpg",
  "title": "春茶特惠",
  "link": "/pages/product-detail/product-detail?id=1",
  "isActive": true,
  "sort": 1
}
```

### Q5: 真机调试时提示域名不合法？

在微信开发者工具「详情」→「本地设置」中勾选「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 Issue

请提供以下信息：
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息（微信版本、基础库版本）

### 提交 Pull Request

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 2 空格缩进
- 使用单引号
- 异步操作使用 async/await
- 错误处理使用 try-catch
- 添加必要的 JSDoc 注释

---

## 📅 版本历史

| 版本 | 日期 | 更新内容 |
|-----|------|---------|
| v1.0.0 | 2024-03 | 初始版本发布 |
| | | - 首页 banner + 产品展示 |
| | | - 产品列表 + 分类筛选 |
| | | - 产品详情 + 雷达图 |
| | | - 收藏 + 购物车功能 |
| | | - 门店导航 |
| | | - 用户中心 |
| | | - 统一请求封装 |
| | | - 服务层模块化 |

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

---

## 📞 联系方式

- 邮箱：service@shifutea.com
- 微信：shifu-tea888

---

<p align="center">
  <strong>品好茶 · 选拾福</strong><br>
  感谢您的支持与信任 ❤️
</p>
