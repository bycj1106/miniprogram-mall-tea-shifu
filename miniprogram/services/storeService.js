/**
 * 门店服务
 */
const { queryCollection, DB_COLLECTIONS } = require('../utils/request');

/**
 * 获取门店列表
 * @returns {Promise<Array>}
 */
async function getStoreList() {
  return queryCollection(DB_COLLECTIONS.STORES);
}

module.exports = {
  getStoreList
};
