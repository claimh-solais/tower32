<template>
    <ul>
        <li v-for="lvl1Cat in categories" :key="'rootChildCat_' + lvl1Cat.id">
            <a class="field">
                <input
                    class="is-checkradio is-success"
                    type="checkbox"
                    :value="lvl1Cat.id"
                    :checked="false"
                    :id="'category_' + lvl1Cat.id"
                    v-model="checkedCategories"
                >
                <label :for="'category_' + lvl1Cat.id">{{ lvl1Cat.title }}</label>
            </a>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'CategoryLvl1Item',
    props: {
        rootCategoryId: String,
    },
    data() {
        return {
            checkedCategories: [],
        }
    },
    computed: {
        ...mapGetters('category', ['getCategoryChildren']),
        categories() {
            return this.getCategoryChildren(this.rootCategoryId)
        },
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
        ]),
    },
    async created () {
        const categoryId = this.rootCategoryId
        await this.getCategories({ categoryId })
    },
}
</script>