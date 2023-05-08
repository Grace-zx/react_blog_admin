/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617541502431_6386';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //数据库连接配置
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',//服务器地址，本地的，如果有服务器，就写服务器地址
      // port
      port: '3306',//端口
      // username
      user: 'root',//用户名
      // password
      password: 'zhouxu123',//密码
      // database
      database: 'react_blog', //数据库名   
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  //跨域
  config.security = {
    csrf:{
      enable:false
    },
    domainWhiteList:[ '*' ]
  }
  config.cors = {
    origin: 'http://localhost:3000',//只允许这个域进行访问接口
    credentials: true,  //开启认证，允许Cookie可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'//允许的请求方法
  };
  return { 
    ...config,
    ...userConfig,
  };
};
