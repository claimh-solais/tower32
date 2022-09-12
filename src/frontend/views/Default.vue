<template>
    <v-app id="inspire">
    <v-content>
      <category-listing></category-listing>
    </v-content>
  </v-app>
</template>

<script>
import CategoryListing from '@/views/category/Listing.vue'

export default {
    name: 'DefaultView',
    components: {
      CategoryListing,
    },
    props: {
        source: String,
    },
    data() {
        return {
            drawer: null,
        }
    },
    beforeRouteUpdate (to, from, next) {
        next()
    },
    computed: { },
    methods: { },
}
</script>
