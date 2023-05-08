//中台守卫
module.exports = options =>{
  return async function adminauth(ctx,next){
      //通过判断上下文的sessionId来判断用户是否登录
      if(ctx.session.openId){
          await next()
      }else{
          ctx.body={data:'没有登录'}
      }
  }
}