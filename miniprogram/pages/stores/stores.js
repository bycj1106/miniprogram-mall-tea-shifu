/**
 * 门店页面逻辑
 */
const { storeService } = require('../../services');
const { showLoading, hideLoading, showError } = require('../../utils/request');
const { isEmpty, formatDistance } = require('../../utils/util');

Page({
  data: {
    stores: []
  },

  onLoad() {
    this.loadStores();
  },

  async loadStores() {
    showLoading('加载中...');
    try {
      const stores = await storeService.getStoreList();
      if (!isEmpty(stores)) {
        // 格式化距离显示
        const formattedStores = stores.map(store => ({
          ...store,
          displayDistance: store.distance ? formatDistance(store.distance) : ''
        }));
        this.setData({ stores: formattedStores });
      } else {
        this.setData({ stores: this.getMockStores() });
      }
    } catch (err) {
      console.error('[Stores] Load stores failed:', err);
      showError('加载失败，请点击重试');
      this.setData({ stores: this.getMockStores() });
    } finally {
      hideLoading();
    }
  },

  getMockStores() {
    return [
      {
        _id: '1',
        name: '拾福茶仓·总店',
        address: '北京市朝阳区建国门外大街1号国贸商城B1层B108商铺',
        latitude: 39.9088,
        longitude: 116.4080,
        phone: '010-12345678',
        distance: 0.8,
        displayDistance: '800m'
      },
      {
        _id: '2',
        name: '拾福茶仓·金融街店',
        address: '北京市西城区金融街19号金融购物中心L104商铺',
        latitude: 39.9153,
        longitude: 116.3608,
        phone: '010-23456789',
        distance: 2.5,
        displayDistance: '2.5km'
      },
      {
        _id: '3',
        name: '拾福茶仓·三里屯店',
        address: '北京市朝阳区工人体育场北路8号三里屯SOHO商场2层210商铺',
        latitude: 39.9350,
        longitude: 116.4470,
        phone: '010-34567890',
        distance: 3.2,
        displayDistance: '3.2km'
      }
    ];
  },

  openNavigation(e) {
    const store = e.currentTarget.dataset.store;
    if (!store || !store.latitude || !store.longitude) {
      wx.showToast({ title: '门店位置信息有误', icon: 'none' });
      return;
    }

    wx.openLocation({
      latitude: store.latitude,
      longitude: store.longitude,
      name: store.name,
      address: store.address,
      scale: 18
    });
  },

  makeCall(e) {
    const phone = e.currentTarget.dataset.phone;
    if (!phone) {
      wx.showToast({ title: '电话号码有误', icon: 'none' });
      return;
    }

    wx.makePhoneCall({
      phoneNumber: phone
    });
  }
});
