'use strict';

const Controller = require('egg').Controller;
// egg是一个mvc框架
/*
MVC：
View   视图 模板  页面的展示

Controller控制器:负责处理一些业务逻辑

Model 模型 ：和数据库打交道（查询数据库   请求数据）

*/
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg,hello World';
    // await this.ctx.render('index')
  }

  async news() {
    const { ctx } = this;
    ctx.body = 'i.am news';
  }
}

module.exports = HomeController;
