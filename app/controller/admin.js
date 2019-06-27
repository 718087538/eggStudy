'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    this.ctx.body = 'user Controller Anything!';
  }

  // 插入数据库的内容
  async insertNews() {
    const { ctx, app } = this;
    //接受前端传来的数据，text要与前端传过来的数据一致
    let { text } = ctx.request.body;
    // ctx.logger.info打印一些信息，查看服务器情况
    let result = await ctx.service.home.insertNews(text);
    ctx.body = result;
  }

  // 注册
  async account() {
    const { ctx, app } = this;
    let { acount,password } = ctx.request.body;
    let result = await ctx.service.home.account(acount,password);
    ctx.logger.info('3333',result);
    ctx.body = result;
  }
  // 登录
  async login() {
    const { ctx, app } = this;
    // ctx.validate(writeRule, ctx.request.body);
    let { account, password } = ctx.request.body;
    let result = await ctx.service.home.login(account, password);
    ctx.body = result;
  }

  async test() {
    console.log("进入了测试")
    const { ctx, app } = this;
    let headersCC = ctx.headers.token;//获得header里的token

    console.log(headersCC,"查看token的内容");

    let resultToken = this.app.jwt.verify(headersCC,this.config.secret)

    ctx.body =resultToken;
  }
}

module.exports = AdminController; 