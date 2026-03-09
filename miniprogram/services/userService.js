/**
 * 用户服务
 */
const { queryCollection, addRecord, updateRecord, getOpenId, DB_COLLECTIONS } = require('../utils/request');
const { DEFAULT_AVATAR, USER_LEVEL } = require('../constants');

/**
 * 获取当前用户信息
 * @returns {Promise<Object|null>}
 */
async function getCurrentUser() {
  try {
    const openid = await getOpenId();
    if (!openid) {
      return null;
    }

    const users = await queryCollection(DB_COLLECTIONS.USERS, { _openid: openid });
    return users && users.length > 0 ? users[0] : null;
  } catch (err) {
    console.error('[User Service] Get current user failed:', err);
    return null;
  }
}

/**
 * 创建新用户
 * @param {Object} userInfo - 用户信息
 * @returns {Promise<Object>}
 */
async function createUser(userInfo) {
  const data = {
    userInfo: userInfo,
    points: 100,
    balance: 0,
    coupons: [],
    level: USER_LEVEL.BRONZE
  };

  return addRecord(DB_COLLECTIONS.USERS, data);
}

/**
 * 更新用户信息
 * @param {string} userId - 用户ID
 * @param {Object} data - 要更新的数据
 * @returns {Promise<Object>}
 */
async function updateUser(userId, data) {
  return updateRecord(DB_COLLECTIONS.USERS, userId, data);
}

/**
 * 同步用户信息（存在则更新，不存在则创建）
 * @param {Object} userInfo - 微信用户信息
 * @returns {Promise<Object>}
 */
async function syncUserInfo(userInfo) {
  try {
    const openid = await getOpenId();
    if (!openid) {
      throw new Error('Failed to get openid');
    }

    const users = await queryCollection(DB_COLLECTIONS.USERS, { _openid: openid });

    if (users && users.length > 0) {
      // 用户已存在，更新信息
      await updateUser(users[0]._id, { userInfo });
      return users[0];
    } else {
      // 新用户，创建记录
      return createUser(userInfo);
    }
  } catch (err) {
    console.error('[User Service] Sync user info failed:', err);
    throw err;
  }
}

/**
 * 获取用户默认信息（未登录时使用）
 * @returns {Object}
 */
function getDefaultUserInfo() {
  return {
    nickName: '茶友',
    avatarUrl: DEFAULT_AVATAR
  };
}

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  syncUserInfo,
  getDefaultUserInfo,
  USER_LEVEL
};
