"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginateHandler = void 0;
const awilix_1 = require("awilix");
function PaginateHandler(request, response, next) {
    const fieldDefaultFilter = ['limit', 'page', 'includes', 'fields', 'order',
        'includesRequired', 'includeAttributes', 'attributes', 'distinct'];
    const pageSize = parseInt(request.query.limit) || parseInt(process.env.LIMIT_PAGINATION) || 10;
    const page = parseInt(request.query.page) || 1;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    let includesRequiredFilter = false;
    if (request.query.includesRequired !== undefined && request.query.includesRequired === 'true') {
        includesRequiredFilter = true;
    }
    let orderByParams = [];
    if (request.query.order !== undefined) {
        orderByParams = Array.isArray(request.query.order) ? request.query.order : new Array(request.query.order);
    }
    const orderBy = orderByParams.map(order => {
        if (order.substr(0, 1) === '-') {
            return [order.substr(1), 'DESC'];
        }
        else {
            return [order, 'ASC'];
        }
    });
    let queryFilter = {
        page: page,
        limit: limit,
        offset: offset,
        pageSize: pageSize,
        order: orderBy,
        fields: [],
        includes: request.query.includes,
        includesRequired: includesRequiredFilter,
        user: {},
        attributes: request.query.attributes,
        includeAttributes: request.query.includeAttributes,
        distinct: request.query.distinct,
    };
    Object.keys(request.query).forEach(keys => {
        if (fieldDefaultFilter.indexOf(keys) < 0) {
            queryFilter.fields.push(`${keys}=${request.query[keys]}`);
            queryFilter[keys] = request.query[keys];
        }
    });
    request.container.register({
        paginateParams: awilix_1.asValue(queryFilter),
    });
    return next();
}
exports.PaginateHandler = PaginateHandler;
