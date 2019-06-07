'use strict';

const Controller = require('egg').Controller;

class DropController extends Controller {
    async index() {
        this.ctx.body = 'user Controller Anything!';
    }
    //删除试卷
    async dropList() {
        const { ctx, app } = this;
        let req = ctx.request.body;
        // console.log(req.category_id,"sssssssssssssssssssssssssss");
        ctx.logger.info('req.big_block,req.category_id,req.sub_id', req.big_block, req.category_id, req.sub_id);
        let result = await ctx.service.drop.dropList(req.big_block, req.category_id, req.sub_id);
        ctx.body = result;
        // ctx.body = "测试返回结果"
    }
    //   删除题目
    async dropQuestion() {
        const { ctx, app } = this;
        let req = ctx.request.body;
        // console.log(req.category_id,"sssssssssssssssssssssssssss");
        // ctx.logger.info('req99666666666666666666666', req.big_block, req.category_id, req.sub_id,req.id);
        let result = await ctx.service.drop.dropQuestion(req.big_block, req.category_id, req.sub_id,req.id);
        ctx.body = result;
        // ctx.body = "测试返回结果"
    }



}

module.exports = DropController;