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

  onShow() {
    this.setData({
      activeTab: 'hot'
    });
    this.loadProducts();
  },

  onLoad() {
    this.loadBanners();
    this.loadProducts();
    this.loadNewProducts();
  },

  loadBanners() {
    const db = wx.cloud.database();
    db.collection('banners').where({
      isActive: true
    }).orderBy('sort', 'asc').get().then(res => {
      if (res.data.length > 0) {
        this.setData({ banners: res.data });
      } else {
        this.setData({
          banners: [
            { _id: '1', image: 'https://img.freepik.com/free-photo/traditional-chinese-tea-set_1160-928.jpg', title: '明前龙井·头采新芽', link: '/pages/product-detail/product-detail?id=1' },
            { _id: '2', image: 'https://img.freepik.com/free-photo/ceramic-teapot-with-green-tea-leaves_1339-133812.jpg', title: '春茶季特惠', link: '/pages/products/products' }
          ]
        });
      }
    }).catch(err => {
      this.setData({
        banners: [
          { _id: '1', image: 'https://img.freepik.com/free-photo/traditional-chinese-tea-set_1160-928.jpg', title: '明前龙井·头采新芽', link: '/pages/product-detail/product-detail?id=1' },
          { _id: '2', image: 'https://img.freepik.com/free-photo/ceramic-teapot-with-green-tea-leaves_1339-133812.jpg', title: '春茶季特惠', link: '/pages/products/products' }
        ]
      });
    });
  },

  loadProducts() {
    const db = wx.cloud.database();
    db.collection('products').orderBy('sales', 'desc').limit(6).get().then(res => {
      this.setData({ hotProducts: res.data });
    }).catch(err => {
      this.setData({
        hotProducts: this.getMockProducts()
      });
    });
  },

  getMockProducts() {
    return [
      { _id: '1', name: '西湖龙井 · 明前特级', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-bud-leaves_1339-133457.jpg'], priceRetail: 1288, priceDiscount: 688, tags: ['豆香', '鲜爽'], isHot: true },
      { _id: '2', name: '正山小种 · 野茶', category: '红茶', images: ['https://img.freepik.com/free-photo/wooden-board-with-cup-tea_1339-19691.jpg'], priceRetail: 880, priceDiscount: 520, tags: ['桂圆香', '甘醇'], isHot: true },
      { _id: '3', name: '铁观音 · 经典浓香', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/glass-cup-with-green-tea_146132-2086.jpg'], priceRetail: 568, priceDiscount: 368, tags: ['兰花香', '回甘'], isHot: true },
      { _id: '4', name: '普洱熟茶 · 宫廷料', category: '普洱', images: ['https://img.freepik.com/free-photo/tea-cup_1339-19699.jpg'], priceRetail: 1580, priceDiscount: 980, tags: ['陈香', '醇滑'], isHot: true },
      { _id: '5', name: '白毫银针 · 头采', category: '白茶', images: ['https://img.freepik.com/free-photo/fresh-tea-leaves_146132-4046.jpg'], priceRetail: 2180, priceDiscount: 1580, tags: ['毫香', '清甜'], isNew: true },
      { _id: '6', name: '大红袍 · 肉桂', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/ceramic-teapot-with-leaves_146132-2155.jpg'], priceRetail: 1280, priceDiscount: 880, tags: ['岩韵', '辛辣'], isHot: true }
    ];
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    if (tab === 'hot') {
      this.loadProducts();
    } else {
      this.loadNewProducts();
    }
  },

  loadNewProducts() {
    const db = wx.cloud.database();
    db.collection('products').where({
      isNew: true
    }).orderBy('createTime', 'desc').limit(6).get().then(res => {
      this.setData({ newProducts: res.data });
    }).catch(err => {
      this.setData({
        newProducts: [
          { _id: '5', name: '白毫银针 · 头采', category: '白茶', images: ['https://img.freepik.com/free-photo/fresh-tea-leaves_146132-4046.jpg'], priceRetail: 2180, priceDiscount: 1580, tags: ['毫香', '清甜'], isNew: true },
          { _id: '7', name: '碧螺春 · 早春', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-leaves_146132-3986.jpg'], priceRetail: 980, priceDiscount: 680, tags: ['花果香', '鲜爽'], isNew: true }
        ]
      });
    });
  },

  onSearch() {
    wx.switchTab({
      url: '/pages/products/products'
    });
  },

  goToCategory(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({ url });
  },

  goToProduct(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  },

  goToProducts(e) {
    const tag = e.currentTarget.dataset.tag;
    wx.switchTab({
      url: '/pages/products/products'
    });
  }
});
