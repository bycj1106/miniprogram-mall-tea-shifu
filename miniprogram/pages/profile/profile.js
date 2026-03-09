Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    stats: {
      points: 2680,
      coupons: 3,
      balance: 500
    },
    level: 'gold',
    menuItems: [
      { id: 1, name: '我的订单', icon: '📋', url: '' },
      { id: 2, name: '我的收藏', icon: '❤️', url: '' },
      { id: 3, name: '会员日历', icon: '📅', url: '' },
      { id: 4, name: '收货地址', icon: '📍', url: '' },
      { id: 5, name: '设置', icon: '⚙️', url: '' }
    ]
  },

  onLoad() {
    this.getUserProfile();
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.saveUserInfo(res.userInfo);
      },
      fail: () => {
        this.setData({
          userInfo: {
            nickName: '茶友',
            avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lxia07jQodd2fGIYQfG0LAaoGFMHmYfRy0qYQ3qVblbl9n7CWViaNY4ZO5tC5iaLQ/0'
          },
          hasUserInfo: true
        });
      }
    });
  },

  saveUserInfo(userInfo) {
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      const openid = res.result.openid;
      db.collection('users').where({
        _openid: openid
      }).get().then(res => {
        if (res.data && res.data.length === 0) {
          db.collection('users').add({
            data: {
              userInfo: userInfo,
              points: 100,
              balance: 0,
              coupons: [],
              level: 'bronze',
              createTime: new Date()
            }
          }).catch(err => {});
        } else if (res.data && res.data.length > 0) {
          db.collection('users').doc(res.data[0]._id).update({
            data: {
              userInfo: userInfo
            }
          }).catch(err => {});
        }
      }).catch(err => {});
    }).catch(err => {});
  },

  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      this.saveUserInfo(e.detail.userInfo);
    }
  },

  goToMenu(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' });
    }
  },

  goToLogin() {
    this.getUserProfile();
  }
});
