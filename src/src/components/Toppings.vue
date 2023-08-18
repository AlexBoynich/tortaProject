<template>
    <div class="container toppings" >
        <h2 class="title">Начинки</h2>
        <div class="toppingsBlock"
        >
            <toppingsItem
                v-for="(toppingsItem, index) in toppingsList"
                v-show="showAll || !(index>2)"
                :showAll="showAll"
                :toppingsItem="toppingsItem"
                :currentTier="currentTier"
                @getDecors="getDecors"
                :tier="index"
            />
        </div>
        <button class="showMore" @click="show()">
            <h3 class="txt">
                {{ textOnButton }}
            </h3>
            <img
                :class="{'active' : showAll}"
                src="/images/showMoreButton/arrow.svg"
                alt="Show more"
            >
        </button>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import ToppingsItem from './ToppingsItem.vue';

export default {
    data(){
        return {
            showAll: false,
            textOnButton: ''
        }
    },

    computed: {
        ...mapGetters([
            'GET_CURRENT_TIER'
        ]),
        numberOnPagination: function () {
            return this.toppingsList.length - 3
        }
    },

    methods: {
        show() {
            this.showAll=!this.showAll
            if (this.showAll) {
                this.textOnButton = 'Свернуть'
            } else {
                this.textOnButton = 'Показать еще ' + this.numberOnPagination
            }
        },
        addProductList(item, index) {
            this.$emit('addProductList', item, index)
        },
        getDecors(id) {
            this.$emit('getDecors', id)
        },
    },

    components: {
        ToppingsItem,
    },

    props: ['checkedToppingFirstTier', 'toppingsList', 'currentTier'],
    
    watch: {
        GET_CURRENT_TIER() {
            this.textOnButton = 'Показать еще ' + this.numberOnPagination
        },
        toppingsList() {

            this.textOnButton = 'Показать еще ' + this.numberOnPagination
        }
    }
}

</script>

<style lang="sass" scoped>
.toppings
    display: flex
    flex-direction: column
    align-items: center
    .title
        width: 100%
        text-align: start
.toppingsBlock
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 12px
    max-width: 1010px
    width: 100%
.showMore
    width: 100%
    background: rgba(240, 240, 240, 1)
    color: rgba(0, 0, 0, 1)
    border: none
    border-radius: 5px
    cursor: pointer
    margin-top: 16px
    padding: 9px 0
    display: flex
    align-items: center
    justify-content: center
    gap: 0 8px
    max-width: 328px
    img
        width: 16px
        height: 16px
        transition: .3s ease-in-out

    .active
        transform: rotate(180deg)


</style>
