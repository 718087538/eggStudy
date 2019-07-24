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
  config.keys = appInfo.name + '_1557540507845_9482';


  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
  };

  config.jwt = {
    secret: "123456" //可以自己设置密钥，暂时先不用改
  }

  // add your middleware config here
  config.middleware = [];
  config.pg = {
    // default: {
    //   database: null,
    //   connectionLimit: 5,
    // },
    // app: true,
    // agent: false,
    // pool: true,

    // Single Database
    client: {
      host: '129.28.192.143',
      port: '5432',
      user: 'postgres',
      password: 'postgres',
      database: 'myStudy',
    },

    // Multi Databases
    // clients: {
    //   db1: {
    //     host: 'host',
    //     port: 'port',
    //     user: 'user',
    //     password: 'password',
    //     database: 'database',
    //   },
    //   db2: {
    //     host: 'host',
    //     port: 'port',
    //     user: 'user',
    //     password: 'password',
    //     database: 'database',
    //   },
    // },
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: null,
      db: 0,
    },
  }


  //config.security和config.cors用来处理跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
  };



  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配制模板引擎
  // {app_root}/config/config.default.js
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};

