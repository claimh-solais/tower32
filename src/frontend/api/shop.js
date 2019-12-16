import axios from 'axios'
import qs from 'qs'

export default {
    async getItems({ filters, currentPage }) {
        const {
            sortBy,
            categoryIds,
            pricingRange,
        } = filters

        const queryObj = {
            fq: `categoryIds:(${_.join(categoryIds, ' OR ')}) AND price_decimal:[${pricingRange[0]} TO ${pricingRange[1]}]`,
            p: currentPage,
        }

        const sortQueryString = _.reduce((sortBy || {}), (result, v, k) => {
            if (result) result = _.join([result, _.join([k, v], ' ')], ',')
            else result = _.join([k, v], ' ')
            return result
        }, '')
        if (!_.isEmpty(sortQueryString)) {
            queryObj.sort = sortQueryString
        }

        const queryString = qs.stringify(queryObj, { encode: false })

        return axios
            .get(`/apiv1/items?${queryString}`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },

    async getSearchItems(searchQuery) {
        const queryObj = {
            q: `title_varchar:"${searchQuery}"`,
            sort: `title_varchar desc`,
            p: 1,
        }
        const queryString = qs.stringify(queryObj, { encode: false })

        return axios
            .get(`/apiv1/items?${queryString}`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },

    async getCategoryPaths(categoryId) {
        return axios
            .get(`/apiv1/category/${categoryId}/paths`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },

    async getCategoryRoots() {
        return axios
            .get(`/apiv1/categories`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },

    async getCategoryChildren(categoryId) {
        return axios
            .get(`/apiv1/category/${categoryId}/children`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },

    async getCategoryDescendants(categoryId) {
        return axios
            .get(`/apiv1/category/${categoryId}/descendants`)
            .then(function (resp) { return resp.data })
            .catch(function (err) { return err })
    },
}
