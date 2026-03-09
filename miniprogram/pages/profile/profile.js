/**
 * 我的页面逻辑
 */
const { userService } = require('../../services');
const { showError } = require('../../utils/request');
const { DEFAULT_AVATAR, USER_LEVEL } = require('../../constants');

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
    levelText: '金叶会员',
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
        this.syncUserInfo(res.userInfo);
      },
      fail: () => {
        // 使用默认头像
        this.setData({
          userInfo: {
            nickName: '茶友',
            avatarUrl: DEFAULT_AVATAR
          },
          hasUserInfo: true
        });
      }
    });
  },

  async syncUserInfo(userInfo) {
    try {
      await userService.syncUserInfo(userInfo);
    } catch (err) {
      console.error('[Profile] Sync user info failed:', err);
    }
  },

  onGetUserInfo(e) {
    if (e.detail && e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      this.syncUserInfo(e.detail.userInfo);
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
