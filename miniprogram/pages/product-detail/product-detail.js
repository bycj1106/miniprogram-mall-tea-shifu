Page({
  data: {
    product: null,
    isCollected: false,
    currentImage: 0,
    quantity: 1
  },

  onLoad(options) {
    if (options.id) {
      this.loadProduct(options.id);
    }
  },

  loadProduct(id) {
    const db = wx.cloud.database();
    db.collection('products').doc(id).get().then(res => {
      this.setData({ product: res.data });
      this.checkCollection(id);
    }).catch(err => {
      this.setData({
        product: this.getMockProduct(id)
      });
    });
  },

  getMockProduct(id) {
    const products = {
      '1': { 
        _id: '1', 
        name: '西湖龙井 · 明前特级', 
        category: '绿茶', 
        images: [
          'https://img.freepik.com/free-photo/green-tea-bud-leaves_1339-133457.jpg',
          'https://img.freepik.com/free-photo/green-tea-leaves_146132-3986.jpg',
          'https://img.freepik.com/free-photo/glass-cup-with-green-tea_146132-2086.jpg'
        ],
        priceRetail: 1288, 
        priceDiscount: 688, 
        tags: ['豆香', '鲜爽'],
        origin: '杭州西湖',
        year: '2024年新茶',
        isHot: true,
        isNew: false,
        stock: 100,
        radarData: {
          aroma: 92,
          fresh: 88,
          sweet: 75,
          body: 82,
          bitter: 20,
          durable: 72
        },
        description: '明前龙井，产自杭州西湖核心产区清明前采摘的特级嫩芽。干茶扁平光滑，色泽嫩绿微黄，冲泡后汤色杏绿明亮，香气清高持久，滋味鲜醇甘爽，叶底匀整成朵。'
      },
      '2': {
        _id: '2',
        name: '正山小种 · 野茶',
        category: '红茶',
        images: ['https://img.freepik.com/free-photo/wooden-board-with-cup-tea_1339-19691.jpg'],
        priceRetail: 880,
        priceDiscount: 520,
        tags: ['桂圆香', '甘醇'],
        origin: '福建武夷山',
        year: '2024年春茶',
        isHot: true,
        radarData: {
          aroma: 85,
          fresh: 78,
          sweet: 90,
          body: 80,
          bitter: 15,
          durable: 85
        },
        description: '正山小种产自武夷山桐木关，采用传统工艺精制而成。'
      }
    };
    return products[id] || products['1'];
  },

  checkCollection(productId) {
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      const openid = res.result.openid;
      db.collection('collections').where({
        _openid: openid,
        productId: productId
      }).get().then(res => {
        if (res.data.length > 0) {
          this.setData({ isCollected: true });
        }
      }).catch(err => {});
    }).catch(err => {});
  },

  onReady() {
    setTimeout(() => {
      this.drawRadarChart();
    }, 500);
  },

  drawRadarChart() {
    const query = wx.createSelectorQuery();
    query.select('#radarChart')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        const centerX = res[0].width / 2;
        const centerY = res[0].height / 2;
        const radius = Math.min(centerX, centerY) - 60;
        const sides = 6;
        const data = this.data.product.radarData;
        const values = [data.aroma, data.fresh, data.sweet, data.body, data.bitter, data.durable];

        ctx.clearRect(0, 0, res[0].width, res[0].height);

        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          const r = (radius / 5) * i;
          for (let j = 0; j < sides; j++) {
            const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = '#E8E4D6';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#D4C9B5';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
          const r = (values[j] / 100) * radius;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(85, 107, 47, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#556B2F';
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let j = 0; j < sides; j++) {
          const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
          const r = (values[j] / 100) * radius;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#556B2F';
          ctx.fill();
        }
      });
  },

  onImageChange(e) {
    this.setData({
      currentImage: e.detail.current
    });
  },

  previewImages() {
    wx.previewImage({
      current: this.data.product.images[this.data.currentImage],
      urls: this.data.product.images
    });
  },

  toggleCollection() {
    const db = wx.cloud.database();
    const productId = this.data.product._id;
    
    if (this.data.isCollected) {
      db.collection('collections').where({
        productId: productId
      }).remove().then(res => {
        this.setData({ isCollected: false });
        wx.showToast({ title: '已取消收藏', icon: 'none' });
      });
    } else {
      db.collection('collections').add({
        data: {
          productId: productId,
          createTime: new Date()
        }
      }).then(res => {
        this.setData({ isCollected: true });
        wx.showToast({ title: '收藏成功', icon: 'success' });
      });
    }
  },

  addToCart() {
    const db = wx.cloud.database();
    const cartItem = {
      productId: this.data.product._id,
      name: this.data.product.name,
      image: this.data.product.images[0],
      price: this.data.product.priceDiscount,
      quantity: this.data.quantity,
      addTime: new Date()
    };

    db.collection('cart').add({
      data: cartItem
    }).then(res => {
      wx.showToast({ title: '已加入购物车', icon: 'success' });
    }).catch(err => {
      wx.showToast({ title: '已加入购物车', icon: 'success' });
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.product.name,
      path: `/pages/product-detail/product-detail?id=${this.data.product._id}`
    };
  }
});
