<template>
    <div class="field">
        <div class="dropdown is-right" :class="{ 'is-active': !_.isEmpty(searchItems) }">
            <div class="dropdown-trigger"
                v-click-outside="handleCloseEvent"
            >
                <div class="control has-icons-left" aria-haspopup="true" aria-controls="dropdown-menu">
                    <input
                        class="input"
                        type="input"
                        placeholder="Search..."
                        v-model="searchQuery"
                    />

                    <span class="icon is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>

            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <a class="dropdown-item"
                        v-for="(item) in searchItems"
                        :key="item.id"
                        :href="'/product/' + item.id"
                    >
                        <article class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img :src="item.imageSrc" alt="Placeholder image">
                                </figure>
                            </div>

                            <div class="media-content">
                                <p class="title is-5">{{ item.title }}</p>
                                <p class="subtitle is-6">{{ item.synopsis }}</p>
                            </div>
                        </article>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'FilterSearch',
    components: { },
    data() {
        return {
            searchQuery: "",
        }
    },
    computed: {
        ...mapState('category', ['searchItems']),
    },
    watch: {
        searchQuery(newValue, oldValue) {
            this.getSearchItems(newValue)
        },
    },
    methods: {
        ...mapActions('category', [
            'clearSearchItems',
        ]),

        getSearchItems: _.debounce(function (searchQuery) {
            this.$store.dispatch('category/getSearchItems', searchQuery)
        }, 250),

        handleCloseEvent(e) {
            this.clearSearchItems()
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
