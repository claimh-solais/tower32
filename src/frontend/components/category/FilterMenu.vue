<template>
    <div :class="{ 'is-active': isActive }" class="dropdown is-right">
        <div class="dropdown-trigger"
            v-click-outside="handleCloseEvent"
            @click="isActive = !isActive"
        >
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Sắp xếp</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>

        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <!-- <a class="dropdown-item">Nổi bật</a> -->
                <a
                    class="dropdown-item"
                    :class="{ 'is-active': _.isEqual(`${sortByExpr}`, 'createdAt desc') }"
                    @click="sortBy('createdAt desc')"
                >Mới nhất</a>

                <a
                    class="dropdown-item"
                    :class="{ 'is-active': _.isEqual(`${sortByExpr}`, 'price_decimal asc') }"
                    @click="sortBy('price_decimal asc')"
                >Giá từ thấp - cao</a>

                <a
                    class="dropdown-item"
                    :class="{ 'is-active': _.isEqual(`${sortByExpr}`, 'price_decimal desc') }"
                    @click="sortBy('price_decimal desc')"
                >Giá từ cao - thấp</a>

                <hr class="dropdown-divider">

                <a
                    class="dropdown-item"
                    :class="{ 'is-active': _.isEqual(`${sortByExpr}`, 'title_varchar asc') }"
                    @click="sortBy('title_varchar asc')"
                >Tên từ A-Z</a>

                <a
                    class="dropdown-item"
                    :class="{ 'is-active': _.isEqual(`${sortByExpr}`, 'title_varchar desc') }"
                    @click="sortBy('title_varchar desc')"
                >Tên từ Z-A</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'CategoryFilterMenu',
    components: { },
    data() {
        return {
            isActive: false,
            sortByExpr: 'createdAt desc',
        }
    },
    watch: {
        sortByExpr(newValue, oldValue) {
            const exprFragment = _.split(newValue, ' ')
            const attributeName = exprFragment[0]
            const direction = exprFragment[1]

            this.clearSortByFilter()
            this.addSortAttributeToFilter({ attributeName, direction })

            this.getItems({ currentPage: 1 })
        },
    },
    methods: {
        ...mapActions('category', [
            'getItems',
            'clearSortByFilter',
            'addSortAttributeToFilter',
            'removeSortAttributeFromFilter',
        ]),

        sortBy(sortByExpr) {
            this.sortByExpr = sortByExpr || 'createdAt desc'
        },

        handleCloseEvent(e) {
            this.isActive = false
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
