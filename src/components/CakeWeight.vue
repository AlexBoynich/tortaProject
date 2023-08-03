<template>
    <div class="cakeWeight container">
        <h2 class="title">Вес торта</h2>
        <div class="subBlock">
            <input @change="postWeight" v-model="inputContent" :placeholder="placeholder" >
        </div>
        <div class="subBlock">
            <h4>Примерный вес торта 2 кг / 16 порций<br>Вес одной порции 140 гр.</h4>
        </div>
    </div>
</template>

<script>


export default {
    name: 'CakeWeight',
    data() {
        return {
            inputContent: this.checkedCakeWeight,
            minWeight: 2,
        }
    },
    computed: {
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
                console.log('все норм')
                this.$emit('postWeight', this.inputContent)
            } else {
                this.$emit('postWeight', false)            }
        }
    },
    props: ['checkedCakeWeight']
}
</script>

<style lang="sass" scoped>
.subBlock
    input
        width: 328px
        padding: 12px 16px
        border-radius: 5px
        border: 1px solid #C8C8C8

        &::-moz-placeholder
            border: 2px solid #9FB84D
</style>
