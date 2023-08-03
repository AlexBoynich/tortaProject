<template>
    <div class="error">
        <h2 class="title">Не удалось загрузить страницу</h2>
        <img src="/images/error/photo.jpg" alt="" class="">
        <div class="subBlock">
            <h2>Что-то пошло не так</h2>
            <h4>Попробуйте обновить страницу</h4>
        </div>
        <Button
        :button-props="buttonProps"
        />
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    data(){
        return {
            buttonProps: {text: 'Повторить попытку'}
        }
    },
    components: {
        Button,
    },

}
</script>

<style lang="sass" scoped>
.error
    display: flex
    flex-direction: column
    align-items: center
    img
        margin: 32px 0 0
.subBlock
    display: flex
    flex-direction: column
    margin: 32px 0 0
    gap: 16px
h2, h4
    text-align: center
</style>