<template>
    <FilterSidenav></FilterSidenav>
</template>

<script>
import FilterSidenav from '@/components/category/FilterSidenav.vue'

export default {
    name: 'FilterSidenavView',
    components: {
        FilterSidenav,
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
