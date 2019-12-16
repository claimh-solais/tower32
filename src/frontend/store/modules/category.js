import _ from 'lodash'
import shop from '../../api/shop'

// initial state
const state = {
    stats: {},
    items: [],
    categories: {},
    filters: {
        categoryIds: [],
        pricingRange: [0,10000000],
        sortBy: {},
    },
    searchItems: [],
}

// getters
const getters = {
    getItems: (state) => () => state.items,
    getStats: (state) => () => state.stats,
    getCategoryRoots: (state) => {
        return state.categories['']
    },
    getCategoryChildren: (state) =>
        (categoryId) => {
            return state.categories[categoryId]
        },
    getPricingRangeFilter: (state) => {
        return state.filters.pricingRange
    },
    getSearchItems: (state) => {
        return state.filters.searchItems || []
    },
}

// actions
const actions = {
    async getCategories({ commit }, { categoryId }) {
        categoryId = _.isEmpty(categoryId) ? '' : categoryId
        const getMethodName = _.isEmpty(categoryId) ? 'getCategoryRoots' : 'getCategoryChildren'

        const resp = await shop[getMethodName](categoryId)
            .catch(console.error)

        if (false === resp instanceof Error) {
            commit('setCategories', { categoryId, categories: resp.results })

            return resp.results
        }

        return
    },

    async getItems({ commit, state }, { currentPage }) {
        const resp = await shop
            .getItems({ filters: state.filters, currentPage })
            .catch(console.error)

        if (false === resp instanceof Error) {
            commit('setItems', resp.results || [])
            commit('setStats', resp.delta || {})

            return resp.results
        } else { commit() }

        return []
    },

    async getSearchItems({ commit }, searchQuery) {
        const resp = await shop
            .getSearchItems(searchQuery)
            .catch(console.error)

        let items = []
        if (false === resp instanceof Error) {
            items = resp.results || []
        }
        commit('setSearchItems', items)
        return items
    },

    async getPaths({ commit }, categoryId) {
        const resp = await shop
            .getCategoryPaths(categoryId)
            .catch(console.error)

        commit()
        return resp.results
    },

    clearFilter({ commit }) {
        commit('clearCategoryFilter')
        commit('clearSortByFilter')
    },

    clearCategoryFilter({ commit }) {
        commit('clearCategoryFilter')
    },

    clearSortByFilter({ commit }) {
        commit('clearSortByFilter')
    },

    clearSearchItems({ commit }) {
        commit('clearSearchItems')
    },

    addCategoryToFilter({ commit }, categoryId) {
        commit('addCategoryToFilter', categoryId)
    },

    removeCategoryFromFilter({ commit }, categoryId) {
        commit('removeCategoryFromFilter', categoryId)
    },

    addSortAttributeToFilter({ commit }, { attributeName, direction }) {
        commit('addSortAttributeToFilter', { attributeName, direction })
    },

    removeSortAttributeFromFilter({ commit }, attributeName) {
        commit('removeSortAttributeFromFilter', attributeName)
    },

    resetPricingRangeFilter({ commit }) {
        commit('resetPricingRangeFilter')
    },

    changePricingRangeFilter({ commit }, pricingRange) {
        commit('changePricingRangeFilter', pricingRange)
    },
}

// mutations
const mutations = {
    setCategories(state, { categoryId, categories }) {
        categoryId = _.isEmpty(categoryId) ? '' : categoryId

        state.categories = Object.assign({}, state.categories, {
            [categoryId]: categories,
        })

        return state.categories
    },

    setItems(state, items) {
        state.items = [...items]
        return state.items
    },

    setSearchItems(state, items) {
        state.searchItems = items
        return state.searchItems
    },

    setStats(state, stats) {
        state.stats = { ...stats }
        return state.stats
    },

    clearCategoryFilter(state) {
        state.filters.categoryIds = []
        return state.filters
    },

    clearSortByFilter(state) {
        state.filters.sortBy = {}
        return state.filters
    },

    clearSearchItems(state) {
        state.searchItems = []
        return state.searchItems
    },

    addCategoryToFilter(state, categoryId) {
        state.filters.categoryIds = (state.filters.categoryIds || [])
        state.filters.categoryIds.push(categoryId)

        return state.filters
    },

    removeCategoryFromFilter(state, categoryId) {
        state.filters.categoryIds = (state.filters.categoryIds || [])

        const itemIndex = state.filters.categoryIds.indexOf(categoryId)
        state.filters.categoryIds.splice(itemIndex, 1)

        return state.filters
    },

    addSortAttributeToFilter(state, { attributeName, direction }) {
        state.filters.sortBy = Object.assign({}, state.filters.sortBy, {
            [attributeName]: direction,
        })

        return state.filters
    },

    removeSortAttributeFromFilter(state, attributeName) {
        delete state.filters.sortBy[attributeName]

        return state.filters
    },

    resetPricingRangeFilter(state) {
        state.filters.pricingRange = [0, 10000000]
        return state.filters
    },

    changePricingRangeFilter(state, pricingRange) {
        state.filters.pricingRange = pricingRange
        return state.filters
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
