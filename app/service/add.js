'use strict';

const Service = require('egg').Service;
class HomeService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    
    // 插入试卷标题
    async addTitle(title, big_block, category_id) {
        // let insertNewsSql = `INSERT INTO public.user(acount,password) VALUES ($1,$2) RETURNING *;`;
        let insertNewsSql = `INSERT INTO public.block(title,big_block, category_id) VALUES ($1,$2,$3) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [title, big_block, category_id]);
        this.app.logger.info('result:', result);
        return {
            data: {result:result},
            code: 200,
            desc: '写入成功'
        }
    }
   


}

module.exports = HomeService;