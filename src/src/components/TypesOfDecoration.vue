<template>
    <div class="decorations container">
        <h2 class="title">Виды оформления</h2>
        <div
        class="decorationsBlock"
        >
            <DecorationItem 
                v-for="(decorationItem, index) in decorationList"
                v-show="showAll || !(index>2)"
                :decorationItem="decorationItem"
                :currentTier="currentTier"
                :tier="index"
            />
        </div>
        <button class="showMore" @click="show()">
            <h3 class="txt">
                {{ textOnButton }}
            </h3>
            <img
                :class="{'active' : showAll}"
                src="/images/showMoreButton/arrow.svg"
                alt="arrow.svg"
            >
        </button>
    </div>
</template>

<script>
import DecorationItem from './DecorationItem.vue';

export default {
    data(){
        return {
            showAll: false,
            textOnButton: ''
        }
    },
    props: ['decorationList','checkedDecorationFirstTier', 'currentTier'],
    methods: {
        show() {
            this.showAll=!this.showAll
            if (this.showAll) {
                this.textOnButton = 'Свернуть'
            } else {
                this.textOnButton = 'Показать еще ' + this.numberOnPagination
            }
        },
        addProductList(item, index) {
            this.$emit('addProductList', item, index)
        },
    },
    components: {
        DecorationItem,
    },
        computed: {
        numberOnPagination: function () {
            return this.decorationList.length - 3
        }
    },
    watch: {
        decorationList() {
            this.textOnButton = 'Показать еще ' + this.numberOnPagination
        }
    }
}
</script>

<style lang="sass" scoped>
.decorations
    display: flex
    flex-direction: column
    align-items: center
    .title
        width: 100%
        text-align: start
.decorationsBlock
    display: flex
    flex-direction: row
    flex-wrap: wrap
    gap: 12px
    max-width: 1010px
    width: 100%
    margin-top: 24px
.subBlock
    display: flex
    flex-direction: column
    gap: 16px
.showMore
    width: 100%
    background: rgba(240, 240, 240, 1)
    color: rgba(0, 0, 0, 1)
    border: none
    border-radius: 5px
    cursor: pointer
    margin-top: 16px
    padding: 9px 0
    display: flex
    align-items: center
    justify-content: center
    gap: 0 8px
    max-width: 328px
    img
        width: 16px
        height: 16px
        transition: .3s ease-in-out
    .active
        transform: rotate(180deg)
</style>