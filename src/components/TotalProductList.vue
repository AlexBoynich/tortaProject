<template>
    <div class="tierList">
        <div class="tierAndForm">
            <h3 class="tierNumber">Ярус: {{index+1}}</h3>
            <h3 class="form">Форма: {{ tier.form }}</h3>
        </div>
        <div class="topping">
            <img :src="tier.topping.image" alt="" class="toppingImage">'
            <div class="nameAndDesc">
                <h3 class="name">Начинка</h3>
                <h5 class="desc">{{ tier.topping.name }}</h5>
            </div>
        </div>
        <div class="decors">
            <div 
            v-for="decor in tier.decors"
            class="decor">
            <img :src="decor.image" alt="" class="decorImage">'
            <div class="nameAndDesc">
                <h3 class="name">Вид оформления</h3>
                <h5 class="desc">{{ decor.name }}</h5>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    data(){
        return {
        }
    },
    props: ['index', 'tier'],
    computed: {
        ...mapGetters([
            'TOTAL',
            'GET_TOTAL_PRICE',
            'GET_CHECKED_TIERS',
            'GET_CHECKED_EVENT',
            'GET_WEIGHT'
        ])
    },
}
</script>

<style lang="sass" scoped>
.tierList
    display: flex
    flex-direction: column
    gap: 12px
    .tierAndForm
        display: flex
        flex-direction: row
        justify-content: space-between
    .topping
        display: flex
        flex-direction: row
        .toppingImage
            width: 45px
            height: 45px
        .nameAndDesc
            display: flex
            flex-direction: column
            margin-left: 16px
    .decors
        display: flex
        flex-direction: column
        gap: 12px
    .decor
        display: flex
        flex-direction: row
        .decorImage
            width: 45px
            height: 45px
        .nameAndDesc
            display: flex
            flex-direction: column
            margin-left: 16px

</style>