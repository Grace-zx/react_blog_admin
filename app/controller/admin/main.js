'use strict'

const Controller = require('egg').Controller

class MainController extends Controller{
  async index(){
    this.ctx.body = "hi api"
  }
  //判断用户名密码是否正确
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                "' AND password = '"+password+"'"

    const res = await this.app.mysql.query(sql)
    if(res.length>0){
        //登录成功,进行session缓存
        let openId=new Date().getTime()
        this.ctx.session.openId={ 'openId':openId }
        this.ctx.body={'data':'登录成功','openId':openId}

    }else{
        this.ctx.body={data:'登录失败'}
    } 
  }
  // 获取文章类别信息
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  //添加文章
  async addArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article',tempArticle)
    const insertSuccess = result.affectedRows === 1 //返回了一行数据就表明改了文章
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:insertSuccess,
      insertId:insertId
    }
  }
  //修改文章
  async updateArticle(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article',tempArticle)
    const updateSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:updateSuccess,
      insertId:insertId,
    }
  }
  //获取文章列表
  async getArticleList(){
    let sql = 'SELECT article.id as id,'+
                'article.title as title,'+
                'article.introduce as introduce,'+
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                'ORDER BY article.id DESC '

    const results = await this.app.mysql.query(sql)
    this.ctx.body={list:results}
  }
  //删除文章
  async delArticle(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article',{'id':id})
    this.ctx.body = {data:res}
  }
  // 根据id获得文章详情
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'article.article_content as article_content,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE article.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }
  // 获取草稿箱文章列表
  async getDraftList(){
    let sql = 'SELECT article_draft.id as id,'+
                'article_draft.title as title,'+
                'article_draft.introduce as introduce,'+
                "FROM_UNIXTIME(article_draft.addTime,'%Y-%m-%d' ) as addTime,"+
                'type.typeName as typeName '+
                'FROM article_draft LEFT JOIN type ON article_draft.type_id = type.Id '+
                'ORDER BY article_draft.id DESC '

    const results = await this.app.mysql.query(sql)
    this.ctx.body={list:results}
  }
  //删除草稿箱文章
  async delArticleDraft(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article_draft',{'id':id})
    this.ctx.body = {data:res}
  }
  // 根据id获得草稿箱文章详情
  async getArticleDraftById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article_draft.id as id,'+
              'article_draft.title as title,'+
              'article_draft.introduce as introduce,'+
              'article_draft.article_content as article_content,'+
              "FROM_UNIXTIME(article_draft.addTime,'%Y-%m-%d' ) as addTime,"+
              'article_draft.view_count as view_count ,'+
              'type.typeName as typeName ,'+
              'type.id as typeId '+
              'FROM article_draft LEFT JOIN type ON article_draft.type_id = type.Id '+
              'WHERE article_draft.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }
  //添加草稿箱文章
  async addArticleDraft(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article_draft',tempArticle)
    const insertSuccess = result.affectedRows === 1 //返回了一行数据就表明改了文章
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:insertSuccess,
      insertId:insertId
    }
  }
  //留言模块
  //获取留言列表
  async getMessageList(){
    let sql = 'SELECT comment.id as id,'+
                'comment.name as name,'+
                'comment.content as content,'+
                "FROM_UNIXTIME(comment.datetime,'%Y-%m-%d' ) as time,"+
                'comment.reply as reply '+
                'FROM comment ' +
                'WHERE comment.display=' + 1
    const results = await this.app.mysql.query(sql)
    this.ctx.body={list:results}
  }
  //删除访客留言
  async delMessage(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('comment',{'id':id})
    this.ctx.body = {data:res}
  } 
  //删除博主回复留言id
  async delMessageReply(){
    let id = this.ctx.params.id
    let sql = "UPDATE comment set comment.reply = null WHERE comment.id = " + id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data:res}
  }
  //博主回复留言
  async getMessageReply(){
    // let body = this.ctx.request.body
    // console.log(body,this.ctx.request)
    // let id = this.ctx.request.body.id
    // let reply = this.ctx.request.body.reply
    // let sql = "UPDATE comment set comment.reply = " + reply + " WHERE comment.id = " + id
    // const res = await this.app.mysql.query(sql)
    // this.ctx.body = {data:res}
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('comment',tempArticle)
    this.ctx.body = {data:result}
  }
  //审核留言列表
  async getCheckMessage(){
    let sql = 'SELECT comment.id as id,'+
                'comment.name as name,'+
                'comment.content as content,'+
                "FROM_UNIXTIME(comment.datetime,'%Y-%m-%d' ) as time,"+
                'comment.reply as reply '+
                'FROM comment ' +
                'WHERE comment.display=' + 0
    const results = await this.app.mysql.query(sql)
    console.log(results)
    this.ctx.body={list:results}
  }
  //审核通过留言
  async getPassMessage(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('comment',tempArticle)
    const updateSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:updateSuccess,
      insertId:insertId,
    }
  }
  //审核删除留言
  async delCheckMessage(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('comment',{'id':id})
    this.ctx.body = {data:res}
  } 
  //相册模块
  //获取相册列表
  async getPhotoList(){
    let sql = 'SELECT photo.id as uid,'+
                'photo.name as name,'+
                "FROM_UNIXTIME(photo.time,'%Y-%m-%d' ) as time,"+
                'photo.url as url '+
                'FROM photo '
    const results = await this.app.mysql.query(sql)
    console.log(results)
    this.ctx.body={list:results}
  }
  //删除照片
  async delPicture(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('photo',{'id':id})
    this.ctx.body = {data:res}
  }
  //添加照片
  async addPicture(){
    let tempArticle = this.ctx.request.body
    console.log(tempArticle,'tempArticle')
    const result = await this.app.mysql.insert('photo',tempArticle)
    const insertSuccess = result.affectedRows === 1 //返回了一行数据就表明改了文章
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:insertSuccess,
      insertId:insertId
    }
  }
  //获取链接列表
  async getLinks(){
    let sql = 'SELECT links.id as id ,' +
              'links.name as name ,' + 
              'links.url as url ' + 
              'FROM links'
    const results = await this.app.mysql.query(sql)
    this.ctx.body={list:results}
  }
  //删除链接
  async delLink(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('links',{'id':id})
    this.ctx.body = {data:res}
  }
  //添加链接
  async addLink(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('links',tempArticle)
    this.ctx.body = {
      isSuccess:'成功',
    }
  }
  //修改链接
  async updateLink(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('links',tempArticle)
    this.ctx.body = {
      isSuccess:'成功',
    }
  }
  //获取个人信息
  async getInformation(){
    let sql = 'SELECT information.id as id ,' +
    'information.github as github ,' + 
    'information.name as name ,' + 
    'information.qq as qq ,' + 
    'information.wechat as wechat ,' + 
    'information.email as email ,' + 
    'information.introduce as introduce ' + 
    'FROM information'
     const results = await this.app.mysql.query(sql)
     this.ctx.body = {data:results}
  }
  //修改个人信息
  async updateInformation(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.update('information',tempArticle)
    this.ctx.body = {
      isSuccess:'成功',
      data:result
    }
  }
}

module.exports = MainController