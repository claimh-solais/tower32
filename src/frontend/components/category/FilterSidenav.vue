<template>
    <aside class="menu">
        <p class="menu-label">Catalog</p>
        <ul class="menu-list">
            <li v-for="(rootCat) in rootCategories" :key="'rootCat_' + rootCat.id">
                <a class="field">
                    <input
                        class="is-checkradio is-success"
                        type="checkbox"
                        :value="rootCat.id"
                        :checked="false"
                        :id="'category_' + rootCat.id"
                        v-model="checkedCategories"
                    >
                    <label :for="'category_' + rootCat.id">{{ rootCat.title }}</label>
                </a>

                <CategoryLvl1Item :rootCategoryId="rootCat.id"></CategoryLvl1Item>
            </li>
        </ul>

        <p class="menu-label">Pricing</p>
        <ul class="menu-list">
            <li>
                <a class="field">
                    <input
                        class="is-checkradio"
                        type="radio"
                        :value="[]"
                        :checked="pricingRange == []"
                        id="priceRange_clear"
                        v-model="checkedPricingRange"
                    />
                    <label for="priceRange_clear">Bỏ lọc</label>
                </a>
            </li>

            <li v-for="(range, index) in defaultRanges" :key="index">
                <a class="field">
                    <input
                        class="is-checkradio"
                        type="radio"
                        :value="[range[0], range[1]]"
                        :checked="pricingRange == [range[0], range[1]]"
                        :id="'priceRange_' + range[0] + '_' + range[1]"
                        v-model="checkedPricingRange"
                    />
                    <label :for="'priceRange_' + range[0] + '_' + range[1]">{{ currencyFormatter(range[0]) }} - {{ currencyFormatter(range[1]) }}</label>
                </a>
            </li>
        </ul>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoryLvl1Item from '@/components/category/filter/CategoryLvl1Item'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'FilterSidenav',
    components: {
        VueSlider,
        CategoryLvl1Item,
    },
    data() {
        return {
            defaultRanges: [
                [0, 1000000],
                [1000000, 2000000],
                [2000000, 5000000],
                [5000000, 15000000],
                [15000000, 50000000],
            ],
            checkedCategories: [],
            checkedPricingRange: this.pricingRange,
        }
    },
    computed: {
        ...mapGetters('category', {
            rootCategories: 'getCategoryRoots',
            pricingRange: 'getPricingRangeFilter',
        }),
    },
    watch: {
        checkedCategories(newValue, oldValue) {
            const addedValue = _.first(_.difference(newValue, oldValue))
            const removedValue = _.first(_.difference(oldValue, newValue))

            if (!_.isNil(addedValue)) {
                this.addCategoryToFilter(addedValue)
            }
            if (!_.isNil(removedValue)) {
                this.removeCategoryFromFilter(removedValue)
            }

            this.getItems({ currentPage: 1 })
        },

        checkedPricingRange(newValue, oldValue) {
            if (_.isEmpty(newValue)) {
                this.resetPricingRangeFilter(newValue)
            }
            else {
                this.changePricingRangeFilter(newValue)
            }
            this.getItems({ currentPage: 1 })
        },
    },
    methods: {
        ...mapActions('category', [
            'getItems',
            'getCategories',
            'clearFilter',
            'addCategoryToFilter',
            'removeCategoryFromFilter',
            'addSortAttributeToFilter',
            'removeSortAttributeFromFilter',
            'resetPricingRangeFilter',
            'changePricingRangeFilter',
        ]),
        currencyFormatter(val) {
            return `${('' + val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`
        },
    },
    async created () {
        await this.getCategories({ categoryId: '' })
    },
}

/*
<li>
    <a>
        <vue-slider
            :value="pricingRange"
            :min="0"
            :max="10000000"
            :interval="10000"
            :enable-cross="false"
            :tooltip="'always'"
            :tooltip-placement="['top', 'bottom']"
            :tooltip-formatter="currencyFormatter"
            @change="changePricingRangeFilter"
        ></vue-slider>
    </a>
</li>
<li>
    <a
        class="button is-warning"
        @click="resetPricingRangeFilter"
    >Reset</a>
</li>
*/
</script>
