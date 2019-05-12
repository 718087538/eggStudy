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

  async content() {
    // 获取get传值
    // koa中如何获取get传值   ctx.query

    // egg中如何获取get传值
    const query = this.ctx.query;
    console.log(query);
    this.ctx.body = 'news information';
  }


  async newsList() {
    // koa获取动态路由传值    ctx.params

    // egg中获取动态路由传值

    const params = this.ctx.params;
    console.log(params);
    this.ctx.body = 'newsLast';
  }
}

module.exports = HomeController;
