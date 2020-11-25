<template> 
    <div> 
        <span @click="back()">VOLTAR</span>
        <h1>  {{alimento.description}}</h1>

        <div>
            <b-form-group
                id="fieldset-1"
                :description="`Unidade de medida base: ''${alimento.base_unit}''`"
                label="Informe a quantidade:"
                label-for="input-1"
                >
                <b-form-input id="input-1" v-model="base_qty" trim></b-form-input>
            </b-form-group>

            <b-table striped hover :items="atributos_calculados"></b-table>
        </div>
       <!-- <b-table striped hover :items="alimento."></b-table> -->
    </div> 
</template>

<script>
export default { 
    data(){
        return {
            base_qty: 0
        }
    },
    computed: { 
        alimento () {
            return this.$store.state.taco.alimento.selected
        },
        atributos_calculados (){

            if(!this.alimento.attributes) return [];
            //{ key: 'carbohydrate', label: 'carboidrato' }
            let atrbs = [];
            let attr = this.alimento.attributes; 
            Object.keys(this.alimento.attributes).map((key, index) => {
                if(['energy', 'fatty_acids'].indexOf(key) > -1) return;
                let qty = this.alimento.attributes[key].qty;
                let qty_total;
                if(typeof qty == 'number') {
                    qty_total =  parseFloat(( this.base_qty * qty ) / this.alimento.base_qty ).toFixed(2) + ''+ this.alimento.attributes[key].unit
                }
                else{
                    qty_total = qty; 
                }
                atrbs.push({ propriedade: key, quantidade_total: qty_total });
            });
            return atrbs;
        }
    },
    mounted(){
        this.base_qty = this.alimento.base_qty
    },
    methods: {
        back(){ 
            this.$store.commit('taco/alimento/SET', {})
            this.$nuxt.$router.replace({ path: '/taco/'+this.alimento.category_id})
        }
    }
     
}
</script>