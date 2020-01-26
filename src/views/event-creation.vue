<template>
    <div class="main-container">
        <div class="form-container">
            <div class="form-title">Event Creation</div>

            <!-- <div class="form-header">Name</div>
            <b-input class="form-input" v-model="event.name[lang]"/>

            <div class="form-header">Description</div>
            <b-input class="form-input" v-model="event.description[lang]"/>

            <div class="form-header">Start Date</div>
            <b-input class="form-input" v-model="event.start" type="date"/>

            <div class="form-header">End Date</div>
            <b-input class="form-input" v-model="event.end" type="date"/> -->

            <div class="jobs-creation">
                <div class="jobs-info">
                    <div class="form-header" style="font-size: 1.3em">Jobs</div>
                    <div>No events have been created</div>
                    <b-button pill variant="primary">Create Job</b-button>
                </div>
                <div class="tasks-info">
                    <div class="form-header" style="font-size: 1.3em">Tasks</div>
                    <b-button pill>Create Task</b-button>
                    <div>No tasks have been created</div>
                </div>
            </div>

            <div class="form-footer">
                <div class="cancel-btn">Cancel</div>
                <b-button pill style="width: 100px; display: inline;" variant="primary">Next <icon icon="arrow-right"></icon></b-button>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
    components: {
        'date-picker': DatePicker
    },

    data() {
        return {
            event: {
                name: {
                    en: ``,
                    fr: ``
                },
                description: {
                    en: ``,
                    fr: ``
                },
                jobs: [],
                start: (new Date()).toString(),
                end: (new Date()).toString(),
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .form-input {
        margin: 20px 0;
    }

    .form-title{
        font-size: 1.5em;
        font-weight: 500;
        margin: 0 0 3% 0;
    }

    .form-header {
        font-weight: 500;
        
    }

    .form-container {
        flex: 1;
        background-color: white;
        padding: 50px;

        box-shadow: 0 0 25px -10px black;

        border-radius: 15px;
    }

    .main-container {
        padding: 5%;
    }

    .header {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.5em;
        margin: 0 2% 2% 2%;

        color: #383838;

        margin-bottom: 1.5%;
    }

    .cancel-btn {
        font-weight: 700;
        display: inline;
        color: #565656;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            color: #424242;
        }
    }

    .form-footer {
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .jobs-creation {
        display: flex;

    }

    .jobs-info {
        flex: 1;
    }

    .tasks-info {
        flex: 1;
    }

</style>