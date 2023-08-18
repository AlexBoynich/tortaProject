<template>
    <div class="applicationBlock">
        <h2 class="title">Отправить заявку</h2>
        <div class="subBlock">
            <div class="name">
                <h3 class="fullName">ФИО</h3>
                <input type="text" v-model="fio" :class="{error: fioError}"  class="input" placeholder="Иванов Иван Иванович">
            </div>
            <div class="name">
                <h3 class="fullName">Телефон</h3>
                <input type="text" v-model="phoneNumber" :class="{error: numberError}" class="phoneInput" placeholder="+7 (999) 999-99-99">
            </div>
            <div class="name">
                <h3 class="fullName">Желаемая дата изготовления</h3>
                <input type="text" v-model="data_finish" :class="{error: dataError}"  class="input" placeholder="дд.мм.гггг">
            </div>
            <div class="name">
                <h3 class="fullName">Комментарий</h3>
                <textarea type="textarea" v-model="comment" class="input" placeholder="Дополнительное пожелание"></textarea>
            </div>
            <div class="checkbox">
                <h4 class="agree">Согласен на обработку персональных данных</h4>
                <input type="checkbox" id="checkbox">
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
    data(){
        return {
            fio: '',
            phoneNumber: '',
            data_finish: '',
            comment: '',
            fioError: false,
            numberError: false,
            dataError: false,
        }
    },
    computed: {
        ...mapGetters([
            'GET_PHONE'
        ])
    },
    methods: {
        ...mapActions([
            'CHANGE_APPLICATION'
        ]),
    },
    watch: {
        fio() {
            this.CHANGE_APPLICATION({fio: this.fio, number: this.phoneNumber, date: this.data_finish, comment: this.comment})
                const validFio = new RegExp("^[а-яА-ЯёЁa-zA-Z]+ [а-яА-ЯёЁa-zA-Z]+ ?[а-яА-ЯёЁa-zA-Z]+$");            
                if ((!validFio.test(this.fio)) || this.fio === ''){
                        this.fioError = true
                    } else {
                        this.fioError = false
                    }
        },
        phoneNumber() {
            
            this.CHANGE_APPLICATION({fio: this.fio, number: this.phoneNumber, date: this.data_finish, comment: this.comment}) 
            const validNumber = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,15}$/);            
                if ((!validNumber.test(this.phoneNumber)) || this.phoneNumber === ''){
                        this.numberError = true
                    } else {
                        this.numberError = false
                    }
        },
        data_finish() {
            this.CHANGE_APPLICATION({fio: this.fio, number: this.phoneNumber, date: this.data_finish, comment: this.comment})
                    if (this.data_finish === ''){
                        this.dataError = true
                    } else {
                        this.dataError = false
                    }
        },
        comment() {
            this.CHANGE_APPLICATION({fio: this.fio, number: this.phoneNumber, date: this.data_finish, comment: this.comment})
        },
        GET_PHONE() {
            if(this.GET_PHONE!== '') {
                return document.querySelector('.phoneInput').classList.remove('fail')
            }
        }
    }
}
</script>

<style lang="sass" scoped>
.subBlock
    display: flex
    flex-direction: column
    gap: 16px
.applicationBlock
    padding-top: 32px
.title
    text-align: center
.fullName
    margin-bottom: 4px
.checkbox
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
#checkbox
    width: 20px
    height: 20px
    margin-left: 16px
.agree
    max-width: 72vw
.input, .phoneInput
    width: 100%
    border-radius: 5px
    border: 1px solid #C8C8C8
    padding: 12px 16px
    font-family: "open-sans"
    font-size: 16px
    font-weight: 400
    line-height: 21px
    letter-spacing: 0em
.error
    outline: 1px solid red
.fail
    outline: 1px solid red
</style>