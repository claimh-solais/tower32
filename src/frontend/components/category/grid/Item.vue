<template>
    <a class="card" v-bind:href="'/product/' + product.id">
        <div class="card-image">
            <figure class="image is-4by5">
                <img v-bind:src="product.imageSrc" alt="Placeholder image">
            </figure>
        </div>

        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{ product.type }}</p>
                </div>
            </div>
            <div class="content" v-html="product.title"></div>
        </div>

        <footer class="card-footer">
            <span class="card-footer-item">{{ product.basePrice }}₫</span>
            <span class="card-footer-item">{{ product.price }}₫</span>
        </footer>
    </a>
</template>

<script>
export default {
    name: 'GridViewItem',
    components: { },
    props: { product: Object },
    computed: {
        // ...mapState({ })
    },
    methods: { },
}
</script>

<style lang="scss" scoped>

</style>
