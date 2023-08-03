<template>
    <div class="headerBlock">
        <div class="container">
            <img src="/images/logo.svg" alt="" class="logo">
            <div class="costBlock subBlock">
                <h2 class="costText">Собрать свой торт</h2>
                <div class="cost-box">
                    <h3 class="cost">
                        ~ {{ GET_TOTAL_PRICE }} ₽
                    </h3>
                    <div :class="['questionMark', {active : messageIsActive}]" @click="toggleMessage">
                        <img src="/images/questionMark.svg" alt="questionMark">
                    </div>
                    <div
                        v-show="messageIsActive"
                        class="message"
                    >
                        {{ messageContent }}
                    </div>
                </div>

            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Header",
    data () {
        return {
            messageIsActive: false,
            messageContent: 'Приблизительная цена, которая зависит от оформления торта'
        }
    },
    methods: {
        toggleMessage () {
            this.messageIsActive = !this.messageIsActive
        }
    },
    computed: {
        ...mapGetters([
            'GET_TOTAL_PRICE',
        ])
    }
}
</script>

<style lang="sass" scoped>
.costBlock
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center

    h2
        margin: 12px 0

    .cost
        font-family: 'open-sans'
        font-size: 16px
        font-weight: 400
        line-height: 21px
        text-align: center

    .cost-box
        display: flex
        align-items: center
        gap: 0 8px
        position: relative
        max-height: 25px

        .message
            position: absolute
            width: 160px
            height: 60px
            right: 5px
            top: 22px
            padding: 12px
            border: solid 1px #a5a5a5
            border-radius: 5px
            background: white
            font-family: 'open-sans'
            font-size: 12px
            font-weight: 400
            line-height: 12px
            text-align: center
            z-index: 10

        .questionMark
            border-radius: 50%
            border: solid 1.5px #323232
            width: 18px
            height: 18px
            display: flex
            align-items: center
            justify-content: center
            margin: 3px
            cursor: pointer

            &.active
                border: solid 1.5px #9FB84D

            img
                width: 5px
                height: 8px
                margin-left: -2px


hr
    border: 0.5px solid #C8C8C8
    position: absolute
    left: 0
    width: 100vw
</style>
