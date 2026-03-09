/**
 * 购物车服务
 */
const { addRecord, deleteByQuery, queryCollection, DB_COLLECTIONS } = require('../utils/request');

/**
 * 添加到购物车
 * @param {Object} product - 产品信息
 * @param {number} quantity - 数量
 * @returns {Promise<Object>}
 */
async function addToCart(product, quantity = 1) {
  const cartItem = {
    productId: product._id || product.id,
    name: product.name,
    image: product.images && product.images[0],
    price: product.priceDiscount,
    quantity: quantity
  };

  return addRecord(DB_COLLECTIONS.CART, cartItem);
}

/**
 * 获取购物车列表
 * @returns {Promise<Array>}
 */
async function getCartList() {
  return queryCollection(DB_COLLECTIONS.CART);
}

/**
 * 清空购物车
 * @returns {Promise<Object>}
 */
async function clearCart() {
  return deleteByQuery(DB_COLLECTIONS.CART, {});
}

module.exports = {
  addToCart,
  getCartList,
  clearCart
};
