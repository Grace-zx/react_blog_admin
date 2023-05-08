'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
   this.ctx.body = 'api hi'
  }
  //获取首页列表
  async getAticleList(){
    //数据库查询连接，记住每个值后面要加空格和逗号，最后一个只用加空格
    let sql = 'SELECT article.id as id ,' +
               'article.title as title ,' + 
               'article.introduce as introduce ,' + 
               //双冒号，因为里面要使用单引号，将时间戳转换成年月日时分秒
               "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," + 
               'article.view_count as view_count ,' + 
               'type.typeName as typeName ' + 
               'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {data:results}
  }
  //获取文章详情
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,'+
               'article.title as title ,'+ 
               'article.introduce as introduce ,'+ 
               'article.article_content as article_content ,'+ 
               //双冒号，因为里面要使用单引号，将时间戳转换成年月日时分秒
               "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ,"+ 
               'article.view_count as view_count ,'+ 
               'type.typeName as typeName ,'+ 
               'type.id as typeId '+
               'FROM article LEFT JOIN type ON article.type_id = type.Id '+ 
               'WHERE article.id='+ id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result,id:id}
  }
  //得到类别名称和编号
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }
  //根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result,id:id}
  }
  //根据类别ID获得相册列表
  async getPhotoList(){
    let id = this.ctx.params.id
    // let sql = 'SELECT photo.id as id,'+
    //           'photo.name as name,'+
    //           "FROM_UNIXTIME(photo.time,'%Y-%m-%d %H:%i:%s' ) as time,"+
    //           'type.typeName as typeName '+
    //           'photo.url as url '+
    //           'FROM photo LEFT JOIN type ON photo.type_id = type.Id '+
    //           'WHERE type_id='+id
    let sql = 'SELECT photo.id as uid,'+
                'photo.name as name,'+
                "FROM_UNIXTIME(photo.time,'%Y-%m-%d' ) as time,"+
                'photo.url as url '+
                'FROM photo '
    // const results = await this.app.mysql.query(sql)
    // console.log(results)
    // this.ctx.body={list:results}
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result,id:id}
  }
  //获取留言列表
  async getMessageList(){
    let id = this.ctx.params.id
    let sql = 'SELECT comment.id as id,'+
                'comment.name as name,'+
                'comment.content as content,'+
                "FROM_UNIXTIME(comment.datetime,'%Y-%m-%d' ) as time,"+
                'comment.reply as reply '+
                'FROM comment ' +
                'WHERE comment.display=' + 1
    const results = await this.app.mysql.query(sql)
    this.ctx.body={data:results,id:id}
  }
  //添加留言
  async getAddMessage(){
    let tempArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('comment',tempArticle)
    // const insertSuccess = result.affectedRows === 1 //返回了一行数据就表明改了文章
    // const insertId = result.insertId
    this.ctx.body = {
      data:result
    }
  }
  //获取友情链接
  async getLinks(){
    let sql = 'SELECT links.id as id ,' +
    'links.name as name ,' + 
    'links.url as url ' + 
    'FROM links'
     const results = await this.app.mysql.query(sql)
     this.ctx.body = {data:results}
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
}

module.exports = HomeController;
