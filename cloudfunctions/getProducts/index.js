const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const { category, tag, keyword } = event
  let query = {}
  
  if (category && category !== '全部') {
    query.category = category
  }
  
  if (tag === 'hot') {
    query.isHot = true
  } else if (tag === 'new') {
    query.isNew = true
  }
  
  if (keyword) {
    query.name = db.RegExp({
      regexp: keyword,
      options: 'i'
    })
  }
  
  return await db.collection('products').where(query).orderBy('sales', 'desc').get()
}
