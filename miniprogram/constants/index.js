/**
 * 项目常量定义
 */
module.exports = {
  DB_COLLECTIONS: {
    PRODUCTS: 'products',
    BANNERS: 'banners',
    STORES: 'stores',
    USERS: 'users',
    CART: 'cart',
    COLLECTIONS: 'collections'
  },

  USER_LEVEL: {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold'
  },

  TABS: {
    HOT: 'hot',
    NEW: 'new'
  },

  TAGS: {
    MASTER: 'master',
    GIFT: 'gift',
    NEW: 'new',
    HOT: 'hot'
  },

  DEFAULT_AVATAR: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lxia07jQodd2fGIYQfG0LAaoGFMHmYfRy0qYQ3qVblbl9n7CWViaNY4ZO5tC5iaLQ/0',

  ERROR_MESSAGES: {
    NETWORK_ERROR: '网络错误，请检查网络后重试',
    LOAD_FAILED: '加载失败，请点击重试',
    OPERATION_FAILED: '操作失败，请重试',
    PLEASE_LOGIN: '请先登录后再操作'
  }
};
