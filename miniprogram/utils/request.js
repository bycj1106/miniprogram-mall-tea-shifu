/**
 * 统一请求封装
 */
const { DB_COLLECTIONS, ERROR_MESSAGES } = require('../constants');

const db = wx.cloud.database();

/**
 * 查询集合数据
 * @param {string} collectionName - 集合名称
 * @param {Object} query - 查询条件
 * @param {Object} options - 选项（orderBy, limit）
 * @returns {Promise<Array>}
 */
function queryCollection(collectionName, query = {}, options = {}) {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('[DB Error] Database not initialized');
      reject(new Error('Database not initialized'));
      return;
    }

    let queryObj = db.collection(collectionName).where(query);

    if (options.orderBy) {
      queryObj = queryObj.orderBy(options.orderBy.field, options.orderBy.order);
    }

    if (options.skip) {
      queryObj = queryObj.skip(options.skip);
    }

    if (options.limit) {
      queryObj = queryObj.limit(options.limit);
    }

    queryObj.get()
      .then(res => {
        resolve(res.data || []);
      })
      .catch(err => {
        console.error(`[DB Error] ${collectionName}:`, err);
        reject(err);
      });
  });
}

/**
 * 查询单条记录
 * @param {string} collectionName - 集合名称
 * @param {string} id - 记录ID
 * @returns {Promise<Object|null>}
 */
function getById(collectionName, id) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).doc(id).get()
      .then(res => {
        resolve(res.data || null);
      })
      .catch(err => {
        console.error(`[DB Error] ${collectionName}/${id}:`, err);
        reject(err);
      });
  });
}

/**
 * 添加记录
 * @param {string} collectionName - 集合名称
 * @param {Object} data - 要添加的数据
 * @returns {Promise<Object>}
 */
function addRecord(collectionName, data) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).add({
      data: {
        ...data,
        createTime: new Date(),
        updateTime: new Date()
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(`[DB Error] Add to ${collectionName}:`, err);
        reject(err);
      });
  });
}

/**
 * 更新记录
 * @param {string} collectionName - 集合名称
 * @param {string} id - 记录ID
 * @param {Object} data - 要更新的数据
 * @returns {Promise<Object>}
 */
function updateRecord(collectionName, id, data) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).doc(id).update({
      data: {
        ...data,
        updateTime: new Date()
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(`[DB Error] Update ${collectionName}/${id}:`, err);
        reject(err);
      });
  });
}

/**
 * 删除记录
 * @param {string} collectionName - 集合名称
 * @param {string} id - 记录ID
 * @returns {Promise<Object>}
 */
function deleteRecord(collectionName, id) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).doc(id).remove()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(`[DB Error] Delete ${collectionName}/${id}:`, err);
        reject(err);
      });
  });
}

/**
 * 条件删除记录
 * @param {string} collectionName - 集合名称
 * @param {Object} query - 查询条件
 * @returns {Promise<Object>}
 */
function deleteByQuery(collectionName, query) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).where(query).remove()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.error(`[DB Error] Delete ${collectionName} by query:`, err);
        reject(err);
      });
  });
}

/**
 * 显示错误提示
 * @param {string} message - 错误信息
 */
function showError(message = ERROR_MESSAGES.OPERATION_FAILED) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  });
}

/**
 * 显示成功提示
 * @param {string} message - 成功信息
 */
function showSuccess(message = '操作成功') {
  wx.showToast({
    title: message,
    icon: 'success',
    duration: 2000
  });
}

/**
 * 显示加载中
 * @param {string} title - 加载提示文本
 */
function showLoading(title = '加载中...') {
  wx.showLoading({
    title: title,
    mask: true
  });
}

/**
 * 隐藏加载中
 */
function hideLoading() {
  wx.hideLoading();
}

module.exports = {
  queryCollection,
  getById,
  addRecord,
  updateRecord,
  deleteRecord,
  deleteByQuery,
  showError,
  showSuccess,
  showLoading,
  hideLoading,
  db,
  DB_COLLECTIONS
};
