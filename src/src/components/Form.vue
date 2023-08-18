<template>
    <div class="container">
        <h2 class="title">Форма</h2>
        <div class="formBlock subBLock">
            <div class="form"
                v-for="(squareItem, index) of (GET_CURRENT_TIER===GET_CHECKED_TIERS) ? formList : formListWithoutLastTier"
                :id="index"
                :class="{active: isActive(GET_CURRENT_TIER, squareItem.name)}"
                @click="addToTotal(GET_CURRENT_TIER, squareItem.name, 'form');"
            >
            <EventWrapper
                :squareItem="squareItem"
                :currentTier="currentTier"
            />
        </div>
        </div>
    </div>
</template>

<script>
import EventWrapper from './EventWrapper.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    data(){
        return {
            formList: [
                {name: 'Круг', image: '/images/form-list/circle.svg'},
                {name: 'Шестиугольник', image: '/images/form-list/hexagon.svg'},
                {name: 'Прямоугольник', image: '/images/form-list/rectangle.svg'},
                {name: 'Квадрат', image: '/images/form-list/square.svg'},
                {name: 'Другая', image: '/images/form-list/heart.svg'}
            ]
        }
    },
    components: {
        EventWrapper
    },
    props: ['currentTier'],
    computed: {
        ...mapGetters([
            'TOTAL',
            'GET_CHECKED_TIERS',
            'GET_CURRENT_TIER'
        ]),
        formListWithoutLastTier() {
            return this.formList.slice(0,4)
        }
    },
    methods: {
        ...mapActions([
      'ADD_TO_TOTAL',
      'CHANGE_CHECKED',
    ]),
        addToTotal(tier, item, type) {
            this.CHANGE_CHECKED({tier, item, type})
        },
        isActive(tier, obj) {
            if(this.TOTAL[tier-1].form) 
            return this.TOTAL[tier-1].form===obj
        },
    }
}
</script>

<style lang="sass" scoped>
.formBlock
    display: flex
    flex-direction: row
    gap: 12px
    flex-wrap: wrap
    margin-top: 24px
.form
    border-radius: 8px
.active
    border: 2px solid #9FB84D

</style>