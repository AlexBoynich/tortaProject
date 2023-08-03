<template>
    <div class="eventWrapper">
        <div class="square">
            <img v-if="squareItem.link" :src=squareItem.link alt="" class="squareImg">
            <h4 class="squareText">{{ squareItem.name }}</h4>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
        }
    },
    props: ['squareItem'],
    methods: {
        ...mapActions([
      'ADD_TO_TOTAL',
      'CHANGE_CHECKED',
    ]),
        addToTotal(tier, item, type) {
            this.CHANGE_CHECKED({tier, item, type})
        },
    },
    computed: {
        ...mapGetters([
            'GET_CHECKED_EVENT'
        ])
    }
}
</script>

<style lang="sass" scoped>
.square
    width: 158px
    height: 114px
    border: 1px solid #00000029
    border-radius: 5px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    h4
        margin-top: 8px
    &:hover
        cursor: pointer
.eventWrapper
    display: flex
    gap: 16px 12px
    flex-wrap: wrap
</style>