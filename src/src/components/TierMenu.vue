<template>
    <div class='container'>
        <div class="slider">
            <h4
                v-show="(GET_WEIGHT && GET_CHECKED_EVENT && GET_CHECKED_TIERS && index<=GET_CHECKED_TIERS) || (index === 0)"
                v-for="(item, index) in sliderList"
                @click="$emit('changeCurrentTierForNext', index);
                $emit('getToppings')"
                :class="['itemMenu',{active: GET_CURRENT_TIER === index}]"
            >{{ item.text }}</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            sliderList: [
                {text: 'Основное'},
                {text: 'Первый ярус'},
                {text: 'Второй ярус'},
                {text: 'Третий ярус'},
                {text: 'Четвертый ярус'},
                {text: 'Пятый ярус'},
            ],
        }
    },
    
    props: ['currentTier'],

    computed: {
        ...mapGetters([
            'GET_CHECKED_TIERS',
            'GET_CHECKED_EVENT',
            'GET_WEIGHT',
            'GET_CURRENT_TIER'
        ])
    }
}
</script>

<style lang="sass" scoped>
.slider
    display: flex
    flex-direction: row
    overflow: auto
    gap: 12px
    h4
        white-space: nowrap
        padding-bottom: 7px
        &:hover
            cursor: pointer

.slider
    -ms-overflow-style: none
    scrollbar-width: none

.slider::-webkit-scrollbar
    width: 0
    height: 0
.active
    text-decoration-line: underline
    text-decoration-color: #9FB84D
    text-decoration-style: solid
    text-decoration-thickness: 2px
    text-underline-offset: 8px


</style>
