'use strict';

const Service = require('egg').Service;
class DropService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    // 插入试卷标题
    async dropList(big_block, category_id, sub_id) {
        let dropListSql = `DELETE FROM public.block WHERE big_block = $1 and category_id = $2 and sub_id = $3;`;
        let result = await this.app.pg.query(dropListSql, [big_block, category_id, sub_id]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '删除成功'
        }
    }
    // 插入试卷标题
    async dropQuestion(big_block, category_id, sub_id) {
        let dropListSql = `DELETE FROM public.select WHERE big_block = $1 and category_id = $2 and sub_id = $3;`;
        let result = await this.app.pg.query(dropListSql, [big_block, category_id, sub_id]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '删除成功'
        }
    }


}

module.exports = DropService;