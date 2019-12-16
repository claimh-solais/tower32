<template>
    <FilterSearch></FilterSearch>
</template>

<script>
import FilterSearch from '@/components/category/FilterSearch.vue'

export default {
    name: 'FilterSearchView',
    components: {
        FilterSearch,
    },
    props: { },
    data() {
        return { }
    },
    beforeRouteUpdate (to, from, next) {
        next()
    },
    computed: { },
    methods: { },
}
</script>
