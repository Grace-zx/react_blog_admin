let ipUrl = 'http://127.0.0.1:7001/admin/' 
//路径管理
let servicePath = {
  checkLogin:ipUrl + 'checkLogin' ,  //检查用户名和密码
  getTypeInfo:ipUrl + 'getTypeInfo' ,  //获得文章类别信息
  addArticle:ipUrl + 'addArticle' ,  //添加文章
  updateArticle:ipUrl + 'updateArticle' ,  //修改文章
  getArticleList:ipUrl + 'getArticleList' ,  //获取文章列表
  delArticle:ipUrl + 'delArticle/' ,  //删除文章
  getArticleById:ipUrl + 'getArticleById/' ,  //根据id获得文章详情
  getDraftList:ipUrl + 'getDraftList/' ,  //获取草稿箱文章
  delArticleDraft:ipUrl + 'delArticleDraft/' ,  //删除草稿箱文章
  getArticleDraftById:ipUrl + 'getArticleDraftById/' ,  //根据id获得草稿箱文章详情
  addArticleDraft:ipUrl + 'addArticleDraft' ,  //添加草稿箱文章
  getPhotoList:ipUrl + 'getPhotoList' ,  //获取相册列表
  delPicture:ipUrl + 'delPicture/' ,  //删除照片
  addPicture:ipUrl + 'addPicture' ,  //添加照片
  getMessageList:ipUrl + 'getMessageList' ,  //获取留言板列表
  delMessage:ipUrl + 'delMessage/' ,//删除访客留言
  delMessageReply:ipUrl + 'delMessageReply/' ,//删除博主回复留言
  getMessageReply:ipUrl + 'getMessageReply' ,//博主回复留言
  getCheckMessage:ipUrl + 'getCheckMessage' ,  //获取审核留言列表
  getPassMessage:ipUrl + 'getPassMessage' ,//审核通过留言
  delCheckMessage:ipUrl + 'delCheckMessage/' ,  //删除审核留言
  getLinks:ipUrl + 'getLinks' ,//获取链接列表
  delLink:ipUrl + 'delLink/' ,//删除链接列表
  addLink:ipUrl + 'addLink' ,//添加链接
  updateLink:ipUrl + 'updateLink' ,//修改链接
  getInformation:ipUrl + 'getInformation' ,//获得个人信息
  updateInformation:ipUrl + 'updateInformation' ,//修改个人信息
}
export default servicePath;