/**
 * 产品详情页逻辑
 */
const { productService, collectionService, cartService } = require('../../services');
const { showLoading, hideLoading, showError, showSuccess } = require('../../utils/request');
const { isEmpty } = require('../../utils/util');

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

  async loadProduct(id) {
    showLoading('加载中...');
    try {
      const product = await productService.getProductDetail(id);
      if (product) {
        this.setData({ product });
        this.checkCollection(id);
      } else {
        this.setData({ product: this.getMockProduct(id) });
      }
    } catch (err) {
      console.error('[ProductDetail] Load product failed:', err);
      showError('加载失败，请点击重试');
      this.setData({ product: this.getMockProduct(id) });
    } finally {
      hideLoading();
    }
  },

  async checkCollection(productId) {
    try {
      const isCollected = await collectionService.checkIsCollected(productId);
      this.setData({ isCollected });
    } catch (err) {
      console.error('[ProductDetail] Check collection failed:', err);
    }
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

  onReady() {
    setTimeout(() => {
      if (this.data.product && this.data.product.radarData) {
        this.drawRadarChart();
      }
    }, 500);
  },

  drawRadarChart() {
    if (!this.data.product || !this.data.product.radarData) {
      return;
    }

    const query = wx.createSelectorQuery();
    query.select('#radarChart')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) {
          return;
        }

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

        // 绘制背景网格
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          const r = (radius / 5) * i;
          for (let j = 0; j < sides; j++) {
            const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.strokeStyle = '#E8E4D6';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // 绘制外框
        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = '#D4C9B5';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制数据区域
        ctx.beginPath();
        for (let j = 0; j < sides; j++) {
          const angle = (Math.PI * 2 / sides) * j - Math.PI / 2;
          const r = (values[j] / 100) * radius;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(85, 107, 47, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#556B2F';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制数据点
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
    const { product, currentImage } = this.data;
    if (!product || !product.images) {
      return;
    }
    wx.previewImage({
      current: product.images[currentImage],
      urls: product.images
    });
  },

  async toggleCollection() {
    const { product, isCollected } = this.data;
    if (!product) {
      return;
    }

    try {
      if (isCollected) {
        await collectionService.removeCollection(product._id);
        this.setData({ isCollected: false });
        wx.showToast({ title: '已取消收藏', icon: 'none' });
      } else {
        await collectionService.addCollection(product._id);
        this.setData({ isCollected: true });
        wx.showToast({ title: '收藏成功', icon: 'success' });
      }
    } catch (err) {
      console.error('[ProductDetail] Toggle collection failed:', err);
      wx.showToast({ title: '操作失败，请重试', icon: 'none' });
    }
  },

  async addToCart() {
    const { product, quantity } = this.data;
    if (!product) {
      return;
    }

    try {
      await cartService.addToCart(product, quantity);
      wx.showToast({ title: '已加入购物车', icon: 'success' });
    } catch (err) {
      console.error('[ProductDetail] Add to cart failed:', err);
      wx.showToast({ title: '加入购物车失败', icon: 'none' });
    }
  },

  onShareAppMessage() {
    const { product } = this.data;
    if (!product) {
      return {};
    }
    return {
      title: product.name,
      path: `/pages/product-detail/product-detail?id=${product._id}`
    };
  }
});
