<template>
    <div class="container">
        <h2 class="title">Событие</h2>
        <div class="eventBlock subBLock">
            <div class="event"
                v-for="(squareItem, index) of squareList"
                :id="index"
                @click="$emit('changeCheckedEvent', squareItem.name, squareItem.id)"
                :class="{active: GET_CHECKED_EVENT_ID===squareItem.id}"
            >
                <EventWrapper 
                :squareItem="squareItem"
                @changeCheckedEvent="changeCheckedEvent"
                />
            </div>
        </div>
    </div>
</template>

<script>
import EventWrapper from './EventWrapper.vue';
import {mapGetters} from 'vuex'

export default {
    data(){
        return {
        }
    },
    props: ['squareList'],
    components: {
        EventWrapper
    },
    methods: {
        changeCheckedEvent(tab) {
            this.$emit('changeCheckedEvent', tab)
        }
    },
    computed: {
        ...mapGetters([
            'GET_CHECKED_EVENT',
            'GET_CHECKED_EVENT_ID'
        ])
    }
}
</script>

<style lang="sass" scoped>
.eventBlock
    display: flex
    flex-direction: row
    gap: 12px
    flex-wrap: wrap
    margin-top: 24px
.event
    border-radius: 8px
.active
    border: 2px solid #9FB84D

</style>