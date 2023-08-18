<template>
        <div class="decorationBlock"
            @click="addToTotal(GET_CURRENT_TIER, decorationItem, 'decors'); isActive(GET_CURRENT_TIER, decorationItem.id)"
            :class="{active: active}"
        >
            <img :src=decorationItem.image alt="Decoration image" class="decorationImg">
            <h4 class="subtitle">{{ decorationItem.name }}</h4>
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
    data(){
        return {
            active: false,
        }
    },
    methods: {
        ...mapActions([
            'ADD_DECOR',
        ]),
        addToTotal(tier, item, type) {
            this.ADD_DECOR({tier, item, type})
        },
        isActive(tier, obj) {
            let result=[]
            if (this.TOTAL[tier-1].decors.find((i) => {
        return  obj===i.id
        })) {
            this.active=true
        }  else this.active=false


        },
    },
    props: ['decorationItem', 'currentTier'],
    computed: {
        ...mapGetters([
            'GET_CHECKED',
            'TOTAL',
             'GET_CURRENT_TIER'
        ]),
    },

    mounted () {
        if (this.TOTAL[this.GET_CURRENT_TIER-1].decors.find((i) => {
        return  this.decorationItem.id===i.id
        })) {
            this.active=true
        }  else this.active=false
    }
}
</script>

<style lang="sass" scoped>

.decorationBlock
    display: flex
    flex-direction: column
    border-radius: 5px
    cursor: pointer
    width: 100%
    max-width: 328px
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.16)
    .decorationImg
        width: 100%
        aspect-ratio: 16/10
        object-fit: cover  
        border-radius: 5px  
    .subtitle
        margin: 8px
        text-align: center
.active
    border: 2px solid #9FB84D
</style>