Page({
  data: {
    categories: ['全部', '绿茶', '红茶', '乌龙茶', '普洱', '白茶'],
    activeCategory: 0,
    products: [],
    tag: ''
  },

  onLoad(options) {
    if (options.tag) {
      this.setData({ tag: options.tag });
      wx.setNavigationBarTitle({
        title: options.tag === 'new' ? '新茶尝鲜' : options.tag === 'gift' ? '礼盒专区' : '大师甄选'
      });
    }
    this.loadProducts();
  },

  onShow() {
    this.loadProducts();
  },

  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ activeCategory: index });
    this.loadProducts();
  },

  loadProducts() {
    const db = wx.cloud.database();
    let query = {};
    
    if (this.data.activeCategory > 0) {
      query.category = this.data.categories[this.data.activeCategory];
    }
    
    if (this.data.tag === 'new') {
      query.isNew = true;
    } else if (this.data.tag === 'hot') {
      query.isHot = true;
    }

    const dbQuery = Object.keys(query).length > 0 ? query : db.command;
    
    db.collection('products').where(query).orderBy('sales', 'desc').get().then(res => {
      if (res.data.length > 0) {
        this.setData({ products: res.data });
      } else {
        this.setData({ products: this.getMockProducts() });
      }
    }).catch(err => {
      this.setData({ products: this.getMockProducts() });
    });
  },

  getMockProducts() {
    const allProducts = [
      { _id: '1', name: '西湖龙井 · 明前特级', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-bud-leaves_1339-133457.jpg'], priceRetail: 1288, priceDiscount: 688, tags: ['豆香', '鲜爽'], isHot: true, isNew: false },
      { _id: '2', name: '正山小种 · 野茶', category: '红茶', images: ['https://img.freepik.com/free-photo/wooden-board-with-cup-tea_1339-19691.jpg'], priceRetail: 880, priceDiscount: 520, tags: ['桂圆香', '甘醇'], isHot: true, isNew: false },
      { _id: '3', name: '铁观音 · 经典浓香', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/glass-cup-with-green-tea_146132-2086.jpg'], priceRetail: 568, priceDiscount: 368, tags: ['兰花香', '回甘'], isHot: true, isNew: false },
      { _id: '4', name: '普洱熟茶 · 宫廷料', category: '普洱', images: ['https://img.freepik.com/free-photo/tea-cup_1339-19699.jpg'], priceRetail: 1580, priceDiscount: 980, tags: ['陈香', '醇滑'], isHot: true, isNew: false },
      { _id: '5', name: '白毫银针 · 头采', category: '白茶', images: ['https://img.freepik.com/free-photo/fresh-tea-leaves_146132-4046.jpg'], priceRetail: 2180, priceDiscount: 1580, tags: ['毫香', '清甜'], isHot: false, isNew: true },
      { _id: '6', name: '大红袍 · 肉桂', category: '乌龙茶', images: ['https://img.freepik.com/free-photo/ceramic-teapot-with-leaves_146132-2155.jpg'], priceRetail: 1280, priceDiscount: 880, tags: ['岩韵', '辛辣'], isHot: true, isNew: false },
      { _id: '7', name: '碧螺春 · 早春', category: '绿茶', images: ['https://img.freepik.com/free-photo/green-tea-leaves_146132-3986.jpg'], priceRetail: 980, priceDiscount: 680, tags: ['花果香', '鲜爽'], isHot: false, isNew: true },
      { _id: '8', name: '金骏眉 · 精品', category: '红茶', images: ['https://img.freepik.com/free-photo/cup-tea_146132-3996.jpg'], priceRetail: 1580, priceDiscount: 980, tags: ['蜜香', '甘甜'], isHot: true, isNew: false },
      { _id: '9', name: '福鼎白茶 · 贡眉', category: '白茶', images: ['https://img.freepik.com/free-photo/tea-bowl_146132-2104.jpg'], priceRetail: 680, priceDiscount: 480, tags: ['枣香', '醇和'], isHot: false, isNew: false },
      { _id: '10', name: '易武普洱 · 生茶', category: '普洱', images: ['https://img.freepik.com/free-photo/tea-pouring_146132-2091.jpg'], priceRetail: 2680, priceDiscount: 1680, tags: ['花蜜香', '回甘强'], isHot: true, isNew: false }
    ];

    if (this.data.tag === 'new') {
      return allProducts.filter(p => p.isNew);
    } else if (this.data.tag === 'hot') {
      return allProducts.filter(p => p.isHot);
    } else if (this.data.tag === 'master') {
      return allProducts.filter(p => p.priceRetail > 1000);
    } else if (this.data.tag === 'gift') {
      return allProducts.filter((p, i) => i % 2 === 0);
    } else if (this.data.activeCategory > 0) {
      return allProducts.filter(p => p.category === this.data.categories[this.data.activeCategory]);
    }
    return allProducts;
  },

  goToProduct(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${id}`
    });
  }
});
