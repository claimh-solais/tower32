<template>
    <GridView :hasControlBar="false" :currentPage="1"></GridView>
</template>

<script>
import GridView from '@/components/category/grid/View.vue'

export default {
    name: 'Listing',
    components: {
        GridView,
    },
    computed: { },
    methods: { },
}
</script>
