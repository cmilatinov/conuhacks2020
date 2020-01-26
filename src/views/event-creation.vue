<template>
    <div class="form">
        <div class="form-card">
            <div class="title"></div>
            <div class="content">
                <b-input placeholder=""/>
                <b-input placeholder=""/>
                <b-input placeholder=""/>
                <b-input placeholder=""/>
                <b-input placeholder=""/>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
    components: {
        'date-picker': DatePicker
    }
}
</script>

<style lang="scss" scoped>

.form {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-card {
        max-width: 500px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 30px;

        .title {
            text-align: center;
            font-family: arial;
            font-size: 1.4rem;
            font-style: bold;
            color: rgb(40, 40, 40);
            margin: 15px;
        }

        .content {
            
        }

    }

    

}




</style>