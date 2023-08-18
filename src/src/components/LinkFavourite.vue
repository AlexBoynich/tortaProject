<template>
    <div class="container">
        <h2 class="title">Ссылка на понравившийся торт</h2>
        <div class="subBlock">
            <input v-model='favourite_link' class="linkForFavourite" placeholder='Ссылка на фото'>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'


export default {
    data(){
        return {
            favourite_link: '',
        }
    },
    methods: {
        ...mapActions([
            'CHANGE_FAVOURITE_LINK'
        ]),
    },
    watch: {
        favourite_link() {
            this.CHANGE_FAVOURITE_LINK({link: this.favourite_link})
        }
    }
}
</script>

<style lang="sass" scoped>
    .linkForFavourite
        padding: 10px 8px 10px 39px
        width: 328px
        color: rgba(135, 135, 135, 1)
        border-radius: 5px
        border: 1px solid rgb(200, 200, 200)
        background-image: url('@/assets/images/clip.svg')
        background-size: 20px 20px
        background-repeat: no-repeat
        background-position: center left 15px
        font-family: 'open-sans'
        font-size: 16px
        font-weight: 400
        line-height: 21px
        letter-spacing: 0em

</style>