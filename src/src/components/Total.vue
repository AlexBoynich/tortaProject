<template>
    <div class="block">
        <h2 class="title">Итого:</h2>
        <div class="titleBlock">
            <div class="totalBlock">
                <div class="subBlock">
                    <h3 class="checkedEvent">Событие: {{GET_CHECKED_EVENT}}</h3>
                    <h3 class="checkedTiers">Количество ярусов: {{ GET_CHECKED_TIERS }}</h3>
                    <h3 class="weight">Вес торта: {{ GET_WEIGHT }} кг</h3>
                </div>
                <div class="totalProductList" v-show="showMore">
                    <TotalProductList
                    v-for="(tier, index) in TOTAL.slice(0, GET_CHECKED_TIERS)"
                    :tier="tier"
                    :indexOfTier="index"
                    />
                </div>
                <button class="showMore"
                @click="show"
                ><h3 class="buttonText">{{ (showMore) ? "Свернуть" : 'Подробнее' }} <img src="/images/arrowBot.svg" alt="Show more" class="arrowBot" :class="{arrowUp: showMore}"></h3></button>
            </div>
        </div>
    </div>
</template>

<script>
import TotalProductList from '@/components/TotalProductList.vue'
import { mapGetters } from 'vuex';


export default {
    data(){
        return {
            showMore: false,
        }
    },
    components: {
        TotalProductList,
    },
    computed: {
        ...mapGetters([
      'TOTAL',
      'GET_CHECKED_TIERS',
      'GET_CHECKED_EVENT',
      'GET_WEIGHT',
    ]),
    },
    methods: {
        show() {
        this.showMore=!this.showMore
  },
    }
}
</script>

<style lang="sass" scoped>
.block
    margin-top: 32px
.titleBlock
    margin-top: 32px
    padding: 12px
    border: 2px solid rgba(159, 184, 77, 1)
    border-radius: 5px

.subBlock
    display: flex
    flex-direction: column
    gap: 12px
    margin-top: 0
.showMore
    display: flex
    width: 100%
    flex-direction: row
    max-width: 420px
    margin: 24px 0 0
    height: 29px
    align-items: center
    justify-content: center
    cursor: pointer
    border: none
    border-radius: 5px
    .buttonText
        text-align: center
        color: rgba(0, 0, 0, 1)
.arrowBot
    margin-bottom: -3px
.arrowUp
    rotate: 180deg
.totalProductList
    margin-top: 24px
    display: flex
    flex-direction: column
    gap: 12px
    
</style>