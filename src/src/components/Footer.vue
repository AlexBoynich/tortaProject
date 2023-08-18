<template>
    <div class="footerBlock container">
        <div>
            <div class="subBlock">
                <h4 class="number">Номер отдела продаж: <a href="tel:+7 (382) 299-54-01">+7 (382) 299-54-01</a></h4>
                <a class="politicy" href="/documents/politika.pdf" target="_blank">Политика конфиденциальности</a>
                <a class="agree" href="/documents/personalData.pdf" target="_blank">Согласие на обработку персональных данных</a>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="sass" scoped>
.footerBlock
    background: #F0F0F0
    box-sizing: border-box
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
.container
    display: flex
    flex-direction: column
    padding-bottom: 76px
    position: relative

    .subBlock
        display: flex
        flex-direction: column
        gap: 12px 0

        h4
            display: ruby

            a
                font-size: 16px


        a
            color: rgba(0, 0, 0, 1)
            text-decoration: none
            font-family: 'open-sans', sans-serif
            font-size: 12px
            font-weight: 400
            line-height: 12px


</style>
