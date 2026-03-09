/**
 * 工具函数
 */

/**
 * 格式化价格显示
 * @param {number} price - 价格（分）
 * @returns {string} 格式化后的价格字符串
 */
function formatPrice(price) {
  if (typeof price !== 'number') {
    return '¥0';
  }
  return `¥${price.toFixed(2)}`;
}

/**
 * 计算节省金额
 * @param {number} retailPrice - 零售价
 * @param {number} discountPrice - 优惠价
 * @returns {number} 节省金额
 */
function calculateSaving(retailPrice, discountPrice) {
  const saving = retailPrice - discountPrice;
  return saving > 0 ? saving : 0;
}

/**
 * 格式化距离显示
 * @param {number} distance - 距离（公里）
 * @returns {string} 格式化后的距离字符串
 */
function formatDistance(distance) {
  if (typeof distance !== 'number') {
    return '';
  }
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 间隔时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(fn, delay = 300) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 检查对象是否为空
 * @param {Object} obj - 要检查的对象
 * @returns {boolean} 是否为空
 */
function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  return false;
}

/**
 * 深度克隆对象
 * @param {Object} obj - 要克隆的对象
 * @returns {Object} 克隆后的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * 获取用户唯一标识
 * @returns {Promise<string>} openid
 */
function getOpenId() {
  return wx.cloud.callFunction({
    name: 'login'
  }).then(res => {
    return res.result.openid;
  }).catch(err => {
    console.error('[Util Error] Get openid failed:', err);
    return null;
  });
}

/**
 * 格式化日期
 * @param {Date|number} date - 日期或时间戳
 * @param {string} format - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) {
    return '';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}

module.exports = {
  formatPrice,
  calculateSaving,
  formatDistance,
  debounce,
  throttle,
  isEmpty,
  deepClone,
  getOpenId,
  formatDate
};
