"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("../../../crosscutting/exceptions/APIError");
const message_1 = require("../../../crosscutting/messages/message");
class BaseRepositoryMysql {
    /**
     *
     * @param model Object modelo que sera usado para realizar as operacoes no banco de dados
     * @param DbContext Contexto do banco para controle de transacao
     * @param paginateParams Parametros enviados na requisicao, que sao usados para paginacao, filtro e log de auditoria
     */
    constructor(model, DbContext, paginateParams) {
        this.model = model;
        this.DbContext = DbContext;
        if (paginateParams === undefined) {
            this.paginateParams = {
                page: 1,
                limit: parseInt(process.env.LIMIT_PAGINATION) || 10,
                offset: 0,
                pageSize: parseInt(process.env.LIMIT_PAGINATION) || 10,
                fields: [],
                includes: [],
                order: [],
                includesRequired: false,
                user: {},
                attributes: [],
                includeAttributes: [],
                distinct: false,
            };
        }
        else {
            paginateParams.limit = this.verifyPageLimit(paginateParams.limit);
            paginateParams.pageSize = this.verifyPageLimit(paginateParams.pageSize);
            this.paginateParams = paginateParams;
        }
    }
    /**
     * Metodo responsavel por receber as condicoes de uma query personalizada e realizar paginacao
     * @param queryBuilder Query sequelize com wheres, includes e attributes
     */
    paginate(queryBuilder) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findAndCountAll(Object.assign(Object.assign({ transaction: this.DbContext.getTransaction() }, queryBuilder), { offset: this.paginateParams.offset, limit: this.paginateParams.limit, order: this.paginateParams.order }));
            const data = {
                paginate: true,
                total: result.count,
                page: this.paginateParams.page,
                pageSize: this.paginateParams.pageSize,
                pages: Math.ceil(result.count / this.paginateParams.pageSize),
                data: result.rows,
            };
            return data;
        });
    }
    verifyPageLimit(valor) {
        const limit = parseInt(process.env.LIMIT_PAGINATION) || 10;
        return valor > limit ? limit : valor;
    }
    /**
     * Metodo responsavel por buscar todas as informacoes na base de dados
     * e retornar os dados paginado, com ou sem filtro, com ou sem includes e com ou ser ordenacao
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const modelAttributes = this.model['rawAttributes'];
            const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);
            const searchableFields = this.searchableFields(amountSearchQueryIncludes, modelAttributes, this.paginateParams);
            const filter = Object.assign(Object.assign({}, searchableFields), { include: amountSearchQueryIncludes.queryIncludesList });
            return this.paginate(filter);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(item, {
                transaction: this.DbContext.getTransaction(),
                user: this.paginateParams.user,
            });
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(item, {
                where: {
                    id: id,
                },
                individualHooks: true,
                transaction: this.DbContext.getTransaction(),
                user: this.paginateParams.user,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.destroy({
                where: { id },
                individualHooks: true,
                transaction: this.DbContext.getTransaction(),
                user: this.paginateParams.user,
            });
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(item);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelAttributes = this.model['rawAttributes'];
            const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);
            const searchableFields = this.searchableFields(amountSearchQueryIncludes, modelAttributes, this.paginateParams);
            const filter = Object.assign(Object.assign({}, searchableFields), { include: amountSearchQueryIncludes.queryIncludesList });
            filter['where'] = { id: +id };
            return yield this.model.findOne(Object.assign({}, filter));
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DbContext.beginTransaction();
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DbContext.commit();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DbContext.rollback();
        });
    }
    searchableFields(amountSearchQueryIncludes, modelAttributes, queryParams) {
        const searchableFields = {};
        const excludeAttributes = [];
        Object.keys(modelAttributes).forEach(key => {
            if (modelAttributes[key]['hidden'] === true || (queryParams.attributes && !queryParams.attributes.includes(key))) {
                excludeAttributes.push(key);
            }
        });
        amountSearchQueryIncludes.filterQ.forEach(query => {
            const [key, value] = query.split('=');
            if (excludeAttributes.indexOf(key) >= 0) {
                throw new APIError_1.APIError(`${key} - ${message_1.default.Filter.FIELD_HIDDEN_CONTEXT}`);
            }
            if (!modelAttributes[key]) {
                throw new APIError_1.APIError(`${key} - ${message_1.default.Filter.FIELD_NOT_FOUND}`);
            }
            if (!value.length) {
                throw new APIError_1.APIError(`${key} - ${message_1.default.Filter.VALUE_IS_NULL}`);
            }
            const typeAttributeName = modelAttributes[key]['type'].toString();
            switch (true) {
                case typeAttributeName.indexOf('VARCHAR') >= 0: {
                    searchableFields[key] = { $like: `${value}%` };
                    break;
                }
                case typeAttributeName.indexOf('DATE') >= 0: {
                    searchableFields[key] = null;
                    if (['true', 1, '1'].indexOf(value) >= 0) {
                        searchableFields[key] = {
                            $not: null,
                        };
                    }
                    break;
                }
                case typeAttributeName.indexOf('TINYINT') >= 0: {
                    searchableFields[key] = ['true', 1, '1'].indexOf(value) >= 0 ? 1 : 0;
                    break;
                }
                default: {
                    searchableFields[key] = value;
                    break;
                }
            }
        });
        const distinct = !!queryParams.distinct;
        const queryBuilder = {
            attributes: {
                exclude: excludeAttributes,
            },
            where: Object.assign({}, searchableFields),
            distinct,
        };
        return queryBuilder;
    }
    amountSearchQueryIncludes(query) {
        let filterQ = [];
        if (query.fields !== undefined) {
            filterQ = Array.isArray(query.fields) ? query.fields : new Array(query.fields);
        }
        let queryIncludes = [];
        if (query.includes !== undefined) {
            queryIncludes = Array.isArray(query.includes) ? query.includes : new Array(query.includes);
        }
        const queryIncludesList = [];
        if (queryIncludes.length > 0) {
            queryIncludes.forEach(includeQuery => {
                let include = {
                    required: query.includesRequired,
                };
                const [entity, alias] = includeQuery.split('.');
                const model = this.DbContext.getModel(entity);
                if (alias !== undefined) {
                    include['as'] = alias;
                }
                include['model'] = model;
                include['attributes'] = {
                    exclude: [],
                };
                const modelAttributes = !query.attributes ? query.attributes : model['rawAttributes'];
                Object.keys(modelAttributes).forEach(key => {
                    if (modelAttributes[key]['hidden'] === true || (query.includeAttributes && !query.includeAttributes.includes(key))) {
                        include['attributes'].exclude.push(key);
                    }
                });
                const whereInclude = filterQ.filter(q => q.indexOf(entity) >= 0);
                let searchableFieldsIncludes = {};
                whereInclude.forEach(query => {
                    filterQ.splice(filterQ.indexOf(query), 1);
                    const [key, value] = query.split('=');
                    const [, relationValue] = key.split('.');
                    if (!value.length) {
                        throw new APIError_1.APIError(`${key} - ${message_1.default.Filter.VALUE_IS_NULL}`);
                    }
                    const typeAttributeName = modelAttributes[relationValue]['type'].toString();
                    switch (true) {
                        case typeAttributeName.indexOf('VARCHAR') >= 0: {
                            searchableFieldsIncludes[relationValue] = { $like: `${value}%` };
                            break;
                        }
                        case typeAttributeName.indexOf('DATE') >= 0: {
                            searchableFieldsIncludes[relationValue] = null;
                            if (['true', 1, '1'].indexOf(value) >= 0) {
                                searchableFieldsIncludes[relationValue] = {
                                    $not: null,
                                };
                            }
                            break;
                        }
                        case typeAttributeName.indexOf('TINYINT') >= 0: {
                            searchableFieldsIncludes[relationValue] = ['true', 1, '1'].indexOf(value) >= 0 ? 1 : 0;
                            break;
                        }
                        default: {
                            searchableFieldsIncludes[relationValue] = value;
                            break;
                        }
                    }
                });
                include['where'] = Object.assign({}, searchableFieldsIncludes);
                queryIncludesList.push(include);
            });
        }
        return { queryIncludesList, filterQ };
    }
}
exports.default = BaseRepositoryMysql;
