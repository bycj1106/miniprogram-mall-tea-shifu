/**
 * 首页逻辑
 */
const { productService } = require('../../services');
const { showLoading, hideLoading, showError } = require('../../utils/request');
const { isEmpty } = require('../../utils/util');

Page({
  data: {
    banners: [],
    categories: [
      { id: 1, name: '大师甄选', icon: 'crown', url: '/pages/products/products?tag=master' },
      { id: 2, name: '礼盒专区', icon: 'gift', url: '/pages/products/products?tag=gift' },
      { id: 3, name: '新茶尝鲜', icon: 'leaf', url: '/pages/products/products?tag=new' }
    ],
    hotProducts: [],
    newProducts: [],
    activeTab: 'hot'
  },

  onLoad() {
    this.loadBanners();
    this.loadProducts();
    this.loadNewProducts();
  },

  onShow() {
    this.setData({ activeTab: 'hot' });
  },

  async loadBanners() {
    try {
      const banners = await productService.getBanners();
      if (!isEmpty(banners)) {
        this.setData({ banners });
      } else {
        this.setData({ banners: this.getMockBanners() });
      }
    } catch (err) {
      console.error('[Home] Load banners failed:', err);
      this.setData({ banners: this.getMockBanners() });
    }
  },

  async loadProducts() {
    showLoading('加载中...');
    try {
      const hotProducts = await productService.getHotProducts(6);
      this.setData({ hotProducts: hotProducts || [] });
    } catch (err) {
      console.error('[Home] Load hot products failed:', err);
      this.setData({ hotProducts: this.getMockProducts().hot });
    } finally {
      hideLoading();
    }
  },

  async loadNewProducts() {
    try {
      const newProducts = await productService.getNewProducts(6);
      this.setData({ newProducts: newProducts || [] });
    } catch (err) {
      console.error('[Home] Load new products failed:', err);
      this.setData({ newProducts: this.getMockProducts().new });
    }
  },

  getMockBanners() {
    return [
      { _id: '1', image: 'https://img.freepik.com/free-photo/traditional-chinese-tea-set_1160-928.jpg', title: '明前龙井·头采新芽', link: '/pages/product-detail/product-detail?id=1' },
      { _id: '2', image: 'https://img.freepik.com/free-photo/ceramic-teapot-with-green-tea-leaves_1339-133812.jpg', title: '春茶季特惠', link: '/pages/products/products' }
    ];
  },

  getMockProducts() {
    return {
      hot: [
        { _id: '1', name: '西湖龙井 · 明前特级', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-bud-leaves_1339-133457.jpg'], priceRetail: 1288, priceDiscount: 688, tags: ['豆香', '鲜爽'], isHot: true },
        { _id: '2', name: '正山小种 · 野茶', category: '红茶', images: ['https://img.freepik.com/free-photo/wooden-board-with-cup-tea_1339-19691.jpg'], priceRetail: 880, priceDiscount: 520, tags: ['桂圆香', '甘醇'], isHot: true },
        { _id: '3', name: '铁观音 · 经典浓香', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/glass-cup-with-green-tea_146132-2086.jpg'], priceRetail: 568, priceDiscount: 368, tags: ['兰花香', '回甘'], isHot: true },
        { _id: '4', name: '普洱熟茶 · 宫廷料', category: '普洱', images: ['https://img.freepik.com/free-photo/tea-cup_1339-19699.jpg'], priceRetail: 1580, priceDiscount: 980, tags: ['陈香', '醇滑'], isHot: true },
        { _id: '5', name: '白毫银针 · 头采', category: '白茶', images: ['https://img.freepik.com/free-photo/fresh-tea-leaves_146132-4046.jpg'], priceRetail: 2180, priceDiscount: 1580, tags: ['毫香', '清甜'], isNew: true },
        { _id: '6', name: '大红袍 · 肉桂', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/ceramic-teapot-with-leaves_146132-2155.jpg'], priceRetail: 1280, priceDiscount: 880, tags: ['岩韵', '辛辣'], isHot: true }
      ],
      new: [
        { _id: '5', name: '白毫银针 · 头采', category: '白茶', images: ['https://img.freepik.com/free-photo/fresh-tea-leaves_146132-4046.jpg'], priceRetail: 2180, priceDiscount: 1580, tags: ['毫香', '清甜'], isNew: true },
        { _id: '7', name: '碧螺春 · 早春', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-leaves_146132-3986.jpg'], priceRetail: 980, priceDiscount: 680, tags: ['花果香', '鲜爽'], isNew: true }
      ]
    };
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
  },

  onSearch() {
    wx.switchTab({ url: '/pages/products/products' });
  },

  goToCategory(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    }
  },

  goToProduct(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/product-detail/product-detail?id=${id}` });
  },

  goToProducts(e) {
    wx.switchTab({ url: '/pages/products/products' });
  }
});
