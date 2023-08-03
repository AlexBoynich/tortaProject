<template>
    <div class="tiersBlock container">
        <h2 class="title">Количество ярусов</h2>
        <div class="subBlock">
            <div
                v-for="tier of tierList"
                class="tier"
                :class="{active: GET_CHECKED_TIERS=== tier.number}"
                @click="changeCheckedTiers(tier.number)"
            >
                <h4 class="numberOfTier">{{ tier.number }}</h4>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
    data(){
        return {
            tierList:[
                {number: 1},
                {number: 2},
                {number: 3},
                {number: 4},
                {number: 5},
            ],
        }
    },
    methods: {
        ...mapActions([
            'CHANGE_CHECKED_TIERS'
        ]),
      changeCheckedTiers (data) {
        this.CHANGE_CHECKED_TIERS(data)
      }
    },
    computed: {
        ...mapGetters([
            'GET_CHECKED_TIERS'
        ])
    }
}
</script>

<style lang="sass" scoped>
.subBlock
    display: flex
    gap: 12px
.tier
    display: flex
    align-items: center
    justify-content: center
    border: 1px solid #00000029
    border-radius: 5px
    width: 56px
    height: 61px
    cursor: pointer
.active
    border: 2px solid #9FB84D

</style>
