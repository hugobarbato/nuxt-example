<template> 
    <div class="taco">
        <h1>Taco API 
            <span v-if="categoria_selecionada.id"> - {{categoria_selecionada.category}}</span>
        </h1> 
        <div class="row">
            <div class="col-3">
                <Categorias /> 
            </div>
            <div class="col-9">
                <NuxtChild  /> 
            </div>
        </div>
    </div> 
</template>

<script>
export default { 
     computed: {
        categoria_selecionada () {
            return this.$store.state.taco.categoria.selected
        }
    },
}
</script>
 
<style> 
.taco {
    max-width: 100vw; 
    padding: 10px 5%;
}
.taco .row{
    max-width: 100%;
}
 </style>