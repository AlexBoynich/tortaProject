<template>
    <div class="eventWrapper">
        <div class="square">
            <img :src=squareItem.image alt="Form image" class="squareImg">
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
    width: 156px
    height: 112px
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.16)
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