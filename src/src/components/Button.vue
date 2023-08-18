<template>
    <div class="button"
    @click="
    $emit('changeCurrentTierForNext', GET_CURRENT_TIER+1);
    $emit('getToppings')"
    >
        <h2 class="buttonText">{{(currentTier !== GET_CHECKED_TIERS && currentTier<=5) ? buttonProps[currentTier].text : buttonProps.text}} <img src="/images/more.svg" class='more' alt="Show more"></h2>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
        }
    },
    props: ['buttonProps', 'currentTier'],
    computed: {
        ...mapGetters([
            'GET_CHECKED_TIERS',
            'GET_CURRENT_TIER'
        ])
    }
}
</script>

<style lang="sass" scoped>
.button
    margin: 32px 16px 0
    display: flex
    align-items: center
    justify-content: center
    background: rgba(159, 184, 77, 1)
    color: #FFFFFF
    height: 61px
    border-radius: 5px
    cursor: pointer
    &:active
        background: rgba(122, 142, 55, 1)
    .buttonText
        display: flex
        flex-direction: row
.more
    margin-top: 5px
    margin-left: 8px
</style>