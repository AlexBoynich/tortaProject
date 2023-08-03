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
        padding: 7px 8px 7px 27px
        width: 328px
        background: #F0F0F0
        color: #878787
        border-radius: 5px
        border: none
        background-image: url('@/assets/images/clip.svg')
        background-size: 24px 24px
        background-repeat: no-repeat
        background-position-y: center
</style>