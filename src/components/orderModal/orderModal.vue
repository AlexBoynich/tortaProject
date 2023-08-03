<template>
    <div class="modal-mask" @click="closeOnClickOutside">
        <div v-if="GET_IS_SUCCESS_ORDER" class="modal-container">
            <img src="/images/modals/orderModal/for-good-modal.svg" alt="heart-checkmark">
            <div class="modal-content">
                <div class="title">Ваш заказ принят!</div>
                <div class="desc">Мы свяжемся с вами в ближайшее время!</div>
                <button @click="closeModal">Спасибо</button>
            </div>
        </div>
        <div v-if="!GET_IS_SUCCESS_ORDER" class="modal-container">
            <img src="/images/modals/orderModal/for-bad-modal.svg" alt="for-bad-modal">
            <div class="modal-content">
                <div class="title">Что-то пошло не так</div>
                <div class="desc bad-modal">Заявка не была отправлена!</div>
                <button @click="closeModal" class="bad-modal">Повторить попытку</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "orderModal",
    data () {
        return {
            isGood: false // от этой переменной зависит контент модалки, лучше передавай пропсом из родительского
        }
    },
    methods: {
        ...mapActions([
            'CHANGE_IS_SUCCESS_ORDER'
        ]),
        closeModal() {
            this.CHANGE_IS_SUCCESS_ORDER(null)
        },
        closeOnClickOutside(e) {
            console.log(e.target.classList)
            if (e.target.classList.contains('modal-mask')) {
                this.CHANGE_IS_SUCCESS_ORDER(null)
            }
        }
    },
    computed: {
        ...mapGetters([
            'GET_IS_SUCCESS_ORDER'
        ])
    }
}
</script>

<style scoped lang="sass">

.modal-mask
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    z-index: 9
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #3B3B3BC9

    .modal-container
        width: 344px
        height: 361px
        border-radius: 30px
        background: white
        padding: 32px 16px 32px
        position: absolute
        z-index: 10
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column

        img
            width: 88px
            height: 85px
            margin-bottom: 24px

        .modal-content
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column

            .title
                font-family: "open-sans", sans-serif
                font-size: 20px
                font-weight: 500
                line-height: 21px
                text-align: center
                margin-bottom: 8px

            .desc
                max-width: 180px
                font-family: "open-sans", sans-serif
                font-size: 16px
                font-weight: 400
                line-height: 21px
                text-align: center
                margin-bottom: 32px

                &.bad-modal
                    max-width: 312px
                    margin-bottom: 53px

            button
                width: 100%
                font-family: "open-sans", sans-serif
                font-size: 20px
                font-weight: 500
                line-height: 21px
                text-align: center
                padding: 20px 0
                border: none
                background: #9FB84D
                color: white
                border-radius: 5px
                cursor: pointer

                &.bad-modal
                    background: #F0F0F0
                    color: black
</style>
