<template> 
<div class="alimentos">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card no-body header="Lista de alimentos">
            <b-list-group flush> 
                <b-list-group-item v-for="index in 10" :key="index"> 
                    <b-skeleton width="85%"></b-skeleton>
                </b-list-group-item> 
            </b-list-group>
        </b-card>
      </template>

        <b-card no-body header="Lista de alimentos">
            <b-list-group flush> 
                <b-list-group-item 
                    v-for="item in alimento.list" 
                    :key="item.id"
                    :active="item.id == alimento.selected.id"
                    @click="setAlimento(item)"
                > {{item.description}} 
                </b-list-group-item> 
            </b-list-group>  
        </b-card>
    </b-skeleton-wrapper> 
</div>
</template>

<script>
export default {
     data() {
      return {
        loading: false,
        loadingTime: 0,
        maxLoadingTime: 3
      }
    },
    computed: {
        alimento () {
            return this.$store.state.taco.alimento
        },
        categoria() {
            return this.$store.state.taco.categoria.selected
        }
    },
    watch: {
        categoria(){
            console.info('CATEGORIA HAS CHANGED')
            this.getAlimentos()
        }
    },
    methods: {
        setAlimento(item)  {
            if(this.alimento.selected.id == item.id){ 
                this.$store.commit('taco/alimento/SET', {})
                this.$nuxt.$router.replace({ path: '/taco/'+this.categoria.id})
            }
            else{
                this.$store.commit('taco/alimento/SET', item)
                this.$nuxt.$router.replace({ path: '/taco/'+this.categoria.id+'/'+item.id })
            } 
        },
        async getAlimentos(){
            if(this.categoria.id){ 
                this.loading = true
                const { data } = await this.$axios.get( 'https://taco-food-api.herokuapp.com/api/v1/category/'+this.categoria.id+'/food' )
                this.$store.commit('taco/alimento/INIT', data)
                this.loading = false
            }  
        }
    },
    async fetch() { 
        await this.getAlimentos()
    }
}
</script>

<style >
.list-group{
    width: 100%;
}
</style>

 