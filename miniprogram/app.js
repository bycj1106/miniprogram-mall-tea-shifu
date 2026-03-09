/**
 * 小程序入口
 */
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用云能力，请升级微信客户端'
      });
    } else {
      wx.cloud.init({
        env: 'shifufu-tea-env',
        traceUser: true
      });
    }

    this.globalData = {
      userInfo: null,
      openid: null
    };
  },

  globalData: {
    userInfo: null,
    openid: null
  }
});
