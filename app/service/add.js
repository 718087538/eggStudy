'use strict';

const Service = require('egg').Service;
class HomeService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    
    // 插入试卷标题
    async addTitle(title, big_block, category_id,  sub_id, creat_time) {
        // let insertNewsSql = `INSERT INTO public.user(acount,password) VALUES ($1,$2) RETURNING *;`;
        let insertNewsSql = `INSERT INTO public.block(title,big_block, category_id, creat_time) VALUES ($1,$2,$3,$4) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [title, big_block, category_id, creat_time]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }
   


}

module.exports = HomeService;