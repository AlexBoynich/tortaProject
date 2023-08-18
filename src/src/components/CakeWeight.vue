<template>
    <div class="cakeWeight container">
        <h2 class="title">Вес торта</h2>
        <div class="subBlock">
            <input @change="postWeight" v-model="inputContent" :placeholder="placeholder" class="inputCakeWeight">
        </div>
        <div class="subBlock">
            <h4>Примерный вес торта {{(inputContent) ? inputContent : 0}} кг / {{Math.round(numberOfPieces)}} порций<br>Вес одной порции 140 гр.</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'CakeWeight',
    data() {
        return {
            inputContent: '',
            minWeight: 2,
            numberOfPieces : 16,
        }
    },
    computed: {
        ...mapGetters([
            'GET_CHECKED_TIERS',
            'GET_WEIGHT'
        ]),
        placeholder: function () {
            return 'Минимальный вес - ' + this.minWeight + ' кг'
        }
    },
    methods: {
        updateMinWeight (tier) {
            tier === 1 ? this.minWeight = 2 :
            tier === 2 ? this.minWeight = 4 :
            tier === 3 ? this.minWeight = 7 :
            tier === 4 ? this.minWeight = 9 :
            tier === 5 ? this.minWeight = 12 :
            this.minWeight = null

            this.postWeight()

            return this.minWeight
        },
        postWeight() {
            if (this.inputContent >= this.minWeight) {
                this.$emit('postWeight', this.inputContent)
            } else {
                this.$emit('postWeight', false)            }
        }
    },
    props: ['checkedCakeWeight'],
    watch: {
        GET_CHECKED_TIERS () {
            this.updateMinWeight(this.GET_CHECKED_TIERS)
        },
        inputContent () {
            this.numberOfPieces = this.inputContent/0.14
        }
    },
}
</script>

<style lang="sass" scoped>
.subBlock
    input
        width: 328px
        padding: 10px 16px
        border-radius: 5px
        border: 1px solid #C8C8C8
        font-family: 'open-sans'
        font-size: 16px
        font-weight: 400
        line-height: 21px
        letter-spacing: 0em


        &::-moz-placeholder
            border: 2px solid #9FB84D
.fail
    border: 1px solid red
.subBlock .fail
    border: 1px solid red
</style>
