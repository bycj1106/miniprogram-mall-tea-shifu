/**
 * 服务层入口
 */
const productService = require('./productService');
const userService = require('./userService');
const storeService = require('./storeService');
const cartService = require('./cartService');
const collectionService = require('./collectionService');

module.exports = {
  productService,
  userService,
  storeService,
  cartService,
  collectionService
};
