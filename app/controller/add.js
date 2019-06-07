'use strict';

const Controller = require('egg').Controller;

class AddController extends Controller {
  async index() {
    this.ctx.body = 'user Controller Anything!';
  }
//插入试卷题目
  async addTitle() {
    const { ctx, app } = this;
    let req = ctx.request.body;
    let result = await ctx.service.add.addTitle(req.title, req.big_block, req.category_id);
    ctx.body = result;
    // ctx.body = "测试返回结果"
  }

}

module.exports = AddController;