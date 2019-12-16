<template>
<div class="container">
    <div class="section" v-if="hasControlBar">
        <nav class="navbar">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item">Showing {{ items.length }} / {{ itemsTotal }} of {{ itemsPerPage }}</div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <FilterMenu></FilterMenu>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <div class="section">
        <div
            class="columns is-multiline"
            v-if="!_.isEmpty(items)"
        >
            <div
                class="column is-one-quarter"
                v-for="product in items"
                :key="product.id"
            >
                <GridViewItem v-bind:product="product"></GridViewItem>
            </div>
        </div>

        <div
            class="columns is-multiline"
            v-else
        >
            <div class="column">
                <nav class="level">
                    <div class="level-item has-text-centered">
                        <p class="title is-3">
                            <span class="icon has-text-info is-large">
                                <i class="fas fa-info-circle"></i>
                            </span>
                        </p>
                        <p class="subtitle is-5">No Item(s)</p>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <div class="section">
        <Pagination
            :itemsTotal="itemsTotal"
            :itemsPerPage="itemsPerPage"
            :currentPage="currentPage"
            :buttonsMax="buttonsMax"
            :url="url"
            :nextText="pagination.nextText"
            :previousText="pagination.previousText"
            :goToText="pagination.goToText"
            :pageText="pagination.pageText"
        ></Pagination>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Pagination from '@/components/category/Pagination.vue'
import FilterMenu from '@/components/category/FilterMenu.vue'
import GridViewItem from '@/components/category/grid/Item.vue'

export default {
    name: 'CategoryGridView',
    components: {
        Pagination,
        FilterMenu,
        GridViewItem,
    },
    props: {
        currentPage: Number,
        hasControlBar: Boolean,
    },
    data() {
        const { categoryId = '1RVBEWiZ0blZsbJJArmujp1L03y' } = this.$route.params

        return {
            itemsTotal: 0,
            itemsPerPage: 1,
            buttonsMax: 9,
            url: this.$route.name,
            categoryId,
            pagination: {
                nextText: 'Next page',
                previousText: 'Previous page',
                goToText: 'Go to page',
                pageText: 'Page',
            },
        };
    },
    computed: {
        ...mapState('category', ['stats', 'items']),
    },
    watch: {
        buttonsMax(newValue, oldValue) {
            if (newValue % 2) {
                return;
            }
            if (newValue < oldValue) {
                this.buttonsMax = newValue - 1;
            }
            if (newValue > oldValue) {
                this.buttonsMax = newValue + 1;
            }
        },
        stats(newValue, oldValue) {
            if (!newValue) return

            this.itemsTotal = newValue.total
            this.itemsPerPage = newValue.limit
        },
    },
    methods: {
        checkLastPage() {
            if (this.currentPage > this.lastPage) {
                this.$router.replace({
                    name: this.url,
                    query: { page: this.lastPage },
                });
            }
        },
        ...mapActions('category', [
            'getItems',
            'getStats',
            'clearFilter',
            'addCategoryToFilter',
        ]),
    },
    async created () {
        let { currentPage = 1 } = this
        let { categoryId = '1RVBEWiZ0blZsbJJArmujp1L03y' } = this.$route.params

        this.clearFilter()
        this.addCategoryToFilter(categoryId)

        await this.getItems({ currentPage })
    },
    // async updated () {
    //     this.$nextTick(() => { })
    // }
}
</script>

<style lang="scss" scoped>
.navbar {
    z-index: 0;
}
</style>
