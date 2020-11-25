

<template> 
<b-card no-body header="Categorias">
    <b-list-group flush> 
        <b-list-group-item 
            v-for="item in categoria.list" 
            :key="item.id"
            :active="item.id == categoria.selected.id"
            @click="setCategoria(item)"
        > {{item.category}} 
        </b-list-group-item> 
    </b-list-group>  
</b-card>
</template>

<script>
export default {
    computed: {
        categoria () {
            return this.$store.state.taco.categoria
        }
    },
    methods: {
        setCategoria(item)  {
            if(this.categoria.selected.id == item.id){ 
                this.$store.commit('taco/categoria/SET', {})
                this.$nuxt.$router.replace({ path: '/taco'})
            }
            else{
                this.$store.commit('taco/categoria/SET', item)
                this.$nuxt.$router.replace({ path: '/taco/'+item.id })
            } 
        }
    },
    async fetch() {
        if(!this.$store.state.taco.categoria.list.length){ 
            const { data } = await this.$axios.get( 'https://taco-food-api.herokuapp.com/api/v1/category' )
            this.$store.commit('taco/categoria/INIT', data)
        } 
    }
}
</script>

<style >
.list-group{
    width: 100%;
}
</style>

 