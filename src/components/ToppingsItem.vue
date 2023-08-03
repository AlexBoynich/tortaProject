<template>
        <div class="toppingBlock subBlock"
            @click="addToTotal(currentTier, toppingsItem, 'topping');
            $emit('getDecors', toppingsItem.id);"
            :class="{active: isActive(currentTier,toppingsItem.id)}"
        >
            <img :src=toppingsItem.image alt="" class="toppingImg">
            <div class="nameAndCost">
                <h4 class="name">{{ toppingsItem.name }}</h4>
                <h4 class="cost">{{ toppingsItem.price }} ₽</h4>
            </div>
            <p class="description">{{ toppingsItem.description }}</p>
        </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    data(){
        return {
        }
    },

    methods: {
        ...mapActions([
      'ADD_TO_TOTAL',
      'CHANGE_CHECKED',
      'SET_IS_ACTIVE'
    ]),
        addToTotal(tier, item, type) {
            this.CHANGE_CHECKED({tier, item, type})
        },
        isActive(tier, obj) {
            if(this.TOTAL[tier-1].topping) 
            return this.TOTAL[tier-1].topping.id===obj
        },
    },

    computed: {
        ...mapGetters([
            'GET_CHECKED',
            'TOTAL'
        ]),
    },

    mounted() {
    },

    props: ['toppingsItem','showAll', 'currentTier']
}

</script>

<style lang="sass" scoped>
.subBlock
    display: flex
    flex-direction: column
.toppingBlock
    display: flex
    flex-direction: column
    border: 1px solid #00000029
    border-radius: 5px
    cursor: pointer
    width: 100%
    max-width: 328px
    .toppingImg
        width: 100%
        aspect-ratio: 16/10
        object-fit: cover
    .nameAndCost
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        padding: 12px 12px 0
        .cost
            white-space: nowrap
    p
        color: #5F5F5F
        padding: 12px 12px 30px
        text-align: center
.active
    border: 2px solid #9FB84D
</style>