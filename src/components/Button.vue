<template>
    <div class="button"
    @click="
    $emit('changeCurrentTierForNext', currentTier+1);
    $emit('getToppings')"
    >
        <h2 class="buttonText">{{(currentTier !== GET_CHECKED_TIERS && currentTier<=5) ? buttonProps[currentTier].text : buttonProps.text}}</h2>
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
            'GET_CHECKED_TIERS'
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
    background: #9FB84D
    color: #FFFFFF
    height: 61px
    width: 328px
    border-radius: 5px
    cursor: pointer

</style>