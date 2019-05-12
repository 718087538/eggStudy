'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    this.ctx.body = 'user Controller Anything!';
  }
}

module.exports = AdminController;