<template>
<my-products-comp/>
</template>

<script>

import MyProductsComp from '../components/MyProductsComponent.vue'
export default{
    name:'MyProductsView',
    
    components: {
      MyProductsComp,
    }
}
</script>