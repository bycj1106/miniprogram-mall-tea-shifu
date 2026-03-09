Page({
  data: {
    stores: []
  },

  onLoad() {
    this.loadStores();
  },

  loadStores() {
    const db = wx.cloud.database();
    db.collection('stores').get().then(res => {
      this.setData({ stores: res.data });
    }).catch(err => {
      this.setData({
        stores: this.getMockStores()
      });
    });
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
        distance: 0.8
      },
      { 
        _id: '2', 
        name: '拾福茶仓·金融街店', 
        address: '北京市西城区金融街19号金融购物中心L104商铺', 
        latitude: 39.9153, 
        longitude: 116.3608, 
        phone: '010-23456789',
        distance: 2.5
      },
      { 
        _id: '3', 
        name: '拾福茶仓·三里屯店', 
        address: '北京市朝阳区工人体育场北路8号三里屯SOHO商场2层210商铺', 
        latitude: 39.9350, 
        longitude: 116.4470, 
        phone: '010-34567890',
        distance: 3.2
      }
    ];
  },

  openNavigation(e) {
    const store = e.currentTarget.dataset.store;
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
    wx.makePhoneCall({
      phoneNumber: phone
    });
  }
});
