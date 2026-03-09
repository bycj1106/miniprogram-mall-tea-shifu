/**
 * 收藏服务
 */
const { queryCollection, addRecord, deleteByQuery, DB_COLLECTIONS } = require('../utils/request');
const { getOpenId } = require('../utils/util');

/**
 * 检查是否已收藏
 * @param {string} productId - 产品ID
 * @returns {Promise<boolean>}
 */
async function checkIsCollected(productId) {
  try {
    const openid = await getOpenId();
    if (!openid) {
      return false;
    }

    const collections = await queryCollection(DB_COLLECTIONS.COLLECTIONS, {
      _openid: openid,
      productId: productId
    });

    return collections && collections.length > 0;
  } catch (err) {
    console.error('[Collection Service] Check collected failed:', err);
    return false;
  }
}

/**
 * 添加收藏
 * @param {string} productId - 产品ID
 * @returns {Promise<Object>}
 */
async function addCollection(productId) {
  const data = {
    productId: productId
  };

  return addRecord(DB_COLLECTIONS.COLLECTIONS, data);
}

/**
 * 取消收藏
 * @param {string} productId - 产品ID
 * @returns {Promise<Object>}
 */
async function removeCollection(productId) {
  try {
    const openid = await getOpenId();
    if (!openid) {
      throw new Error('Not logged in');
    }

    return deleteByQuery(DB_COLLECTIONS.COLLECTIONS, {
      _openid: openid,
      productId: productId
    });
  } catch (err) {
    console.error('[Collection Service] Remove collection failed:', err);
    throw err;
  }
}

/**
 * 获取用户收藏列表
 * @returns {Promise<Array>}
 */
async function getCollectionList() {
  try {
    const openid = await getOpenId();
    if (!openid) {
      return [];
    }

    return queryCollection(DB_COLLECTIONS.COLLECTIONS, { _openid: openid });
  } catch (err) {
    console.error('[Collection Service] Get collection list failed:', err);
    return [];
  }
}

module.exports = {
  checkIsCollected,
  addCollection,
  removeCollection,
  getCollectionList
};
