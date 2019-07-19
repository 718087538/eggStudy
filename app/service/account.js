'use strict';

const Service = require('egg').Service;
class AccountService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    
    // 注册
    async account(account, password,nick_name) {
        let insertNewsSql = `INSERT INTO public.user(account,password,nick_name) VALUES ($1,$2,$3) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [account, password,nick_name]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }


}

module.exports = AccountService;