//前台路由
module.exports = app =>{
  const {router,controller} = app
  // 首页
  router.get('/default/index',controller.default.home.index)
  //首页列表
  router.get('/default/getArticleList',controller.default.home.getAticleList)
  //文章详情
  router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
  //类别
  router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
  //根据类别id获得首页文章列表
  router.get('/default/getListById/:id',controller.default.home.getListById)
  //根据类别id获得相册列表
  router.get('/default/getPhotoList/:id',controller.default.home.getPhotoList)
  //根据类别id获得留言列表
  router.get('/default/getMessageList/:id',controller.default.home.getMessageList)
  //添加留言
  router.post('/default/getAddMessage',controller.default.home.getAddMessage)
  //获取友情链接
  router.get('/default/getLinks',controller.default.home.getLinks)
  //获取个人信息
  router.get('/default/getInformation',controller.default.home.getInformation)
}