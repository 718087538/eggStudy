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
      host: 'localhost',
      port: '5432',
      user: 'postgres',
      password: '1234567',
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

