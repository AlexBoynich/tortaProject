<template>
    <div class="cookie">
        <h4 class="info">
            Наш сайт защищает персональные данные пользователей и обрабатывает Cookies только для персонализации сервисов.
            Запретить обработку Cookies можно в настройкахВашего браузера. Пожалуйста, ознакомьтесь с
            <a class='politicy' href="/documents/politika.pdf" target="_blank">Политикой конфиденциальности</a> и
            <a class='politicy' href="/documents/personalData.pdf" target="_blank">Согласием на обработку персональных данных.</a>
        </h4>
        <button
            class="agree"
            @click="setWarning"
        >
            Согласен
        </button>
    </div>
</template>

<script>


export default {
    data() {
        return {
            props: ['warning']
        }
    },
    methods: {
        setWarning() {
            this.$emit('setWarning')
        }
    }
}
</script>

<style lang="sass" scoped>
.cookie
    display: flex
    flex-direction: column
    max-width: 360px
    max-height: 249px
    align-items: center
    justify-content: center
    background: #FFF
    padding: 8px 16px
    text-align: center
    .politicy
        color: #858585
        text-decoration: none

        &:hover
            text-decoration: underline
    .agree
        margin: 24px 0 8px
        background: #9FB84D
        color: #FFF
        width: 139px
        height: 41px
        padding: 10px 24px
        border: none
        border-radius: 5px
        cursor: pointer

</style>
