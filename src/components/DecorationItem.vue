<template>
        <div class="decorationBlock"
            @click="addToTotal(currentTier, decorationItem, 'decors'); isActive(currentTier, decorationItem.id)"
            :class="{active: active}"
        >
            <img :src=decorationItem.image alt="" class="decorationImg">
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
        console.log(this.active)

        },
    },
    props: ['decorationItem', 'currentTier'],
    computed: {
        ...mapGetters([
            'GET_CHECKED',
            'TOTAL'
        ]),
    },
}
</script>

<style lang="sass" scoped>

.decorationBlock
    display: flex
    flex-direction: column
    border: 1px solid #00000029
    border-radius: 5px
    cursor: pointer
    width: 100%
    max-width: 328px
    .decorationImg
        width: 100%
        aspect-ratio: 16/10
        object-fit: cover    
    .subtitle
        margin: 8px
        text-align: center
.active
    border: 2px solid #9FB84D
</style>