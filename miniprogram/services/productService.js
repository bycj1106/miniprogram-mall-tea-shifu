/**
 * 产品服务
 */
const { queryCollection, getById, DB_COLLECTIONS } = require('../utils/request');

/**
 * 获取产品列表
 * @param {Object} options - 查询选项
 * @param {string} [options.category] - 分类筛选
 * @param {boolean} [options.isNew] - 是否新品
 * @param {boolean} [options.isHot] - 是否热销
 * @param {string} [options.orderBy] - 排序字段
 * @param {string} [options.order] - 排序方式
 * @param {number} [options.limit] - 限制数量
 * @returns {Promise<Array>}
 */
async function getProductList(options = {}) {
  const { category, isNew, isHot, orderBy = 'sales', order = 'desc', limit } = options;
  
  const query = {};
  if (category && category !== '全部') {
    query.category = category;
  }
  if (isNew) {
    query.isNew = true;
  }
  if (isHot) {
    query.isHot = true;
  }

  return queryCollection(DB_COLLECTIONS.PRODUCTS, query, {
    orderBy: { field: orderBy, order },
    limit
  });
}

/**
 * 获取产品详情
 * @param {string} id - 产品ID
 * @returns {Promise<Object|null>}
 */
async function getProductDetail(id) {
  return getById(DB_COLLECTIONS.PRODUCTS, id);
}

/**
 * 获取热销产品
 * @param {number} [limit=6] - 限制数量
 * @returns {Promise<Array>}
 */
async function getHotProducts(limit = 6) {
  return getProductList({ isHot: true, limit });
}

/**
 * 获取新品列表
 * @param {number} [limit=6] - 限制数量
 * @returns {Promise<Array>}
 */
async function getNewProducts(limit = 6) {
  return getProductList({ isNew: true, limit });
}

/**
 * 根据标签获取产品
 * @param {string} tag - 标签（master/gift/new/hot）
 * @param {number} [limit] - 限制数量
 * @returns {Promise<Array>}
 */
async function getProductsByTag(tag, limit) {
  switch (tag) {
    case 'new':
      return getNewProducts(limit);
    case 'hot':
      return getProductList({ isHot: true, limit });
    case 'master':
      // 大师甄选：高价位产品
      const allProducts = await getProductList({ limit: 100 });
      return allProducts.filter(p => p.priceRetail > 1000);
    case 'gift':
      // 礼盒专区：随机选取
      const giftProducts = await getProductList({ limit: 100 });
      return giftProducts.filter((_, index) => index % 2 === 0);
    default:
      return getProductList({ limit });
  }
}

/**
 * 获取首页轮播图
 * @returns {Promise<Array>}
 */
async function getBanners() {
  return queryCollection(DB_COLLECTIONS.BANNERS, { isActive: true }, {
    orderBy: { field: 'sort', order: 'asc' }
  });
}

module.exports = {
  getProductList,
  getProductDetail,
  getHotProducts,
  getNewProducts,
  getProductsByTag,
  getBanners
};
