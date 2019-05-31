'use strict';

const Service = require('egg').Service;
class HomeService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    
    // 插入试卷标题
    async addTitle(title, category_id) {
        // let insertNewsSql = `INSERT INTO public.user(acount,password) VALUES ($1,$2) RETURNING *;`;
        let insertNewsSql = `INSERT INTO public.block(title,category_id) VALUES ($1,$2) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [title, category_id]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }
   


}

module.exports = HomeService;