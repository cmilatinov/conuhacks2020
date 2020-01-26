<template>
    <div class="main-container">
        <div class="form-container">
            <div class="form-title">Event Creation</div>
            <div class="form-info">You must fill out all the fields before continuing.</div>

            <div v-if="currPhase === 0">
                <div class="form-header">Name</div>
                <b-input class="form-input" v-model="event.name[lang]"/>

                <div class="form-header">Description</div>
                <b-textarea class="form-input" v-model="event.description[lang]"/>

                <div class="form-header">Start Date</div>
                <b-input class="form-input" v-model="event.start" type="date"/>

                <div class="form-header">End Date</div>
                <b-input class="form-input" v-model="event.end" type="date"/>
            </div>

            <div v-if="currPhase === 1">
                <div class="jobs-creation">
                    <div class="jobs-info">
                        <div class="form-header" style="font-size: 1.3em">Jobs</div>

                        <b-card v-for="(job, index) of event.jobs" :key="index">
                            <div class="form-header">Title</div>
                            <b-input v-model="job.title[lang]" />
                            <div class="form-header">Description</div>
                            <b-input v-model="job.description[lang]" />
                            <div>{{job}}</div>
                        </b-card>

                        <b-button class="new-job-btn" pill @click="createNewJob" variant="primary">Create New Job</b-button>
                    </div>
                </div>
            </div>

            <div class="form-footer">
                <div class="cancel-btn" @click="goBack" :class="[{'hide-btn': currPhase === 0}]" >Go Back</div>
                <b-button @click="updatePhase" pill style="width: 100px; display: inline;" variant="primary">Next <icon icon="arrow-right"></icon></b-button>
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

    methods: {
        updatePhase() {
            this.currPhase ++;
        },

        goBack() {
            if(this.currPhase === 0)
                return;
            this.currPhase --;
        },

        createNewJob() {
            this.event.jobs.push(
                {
                    title: {
                        en: '',
                        fr: ''
                    },
                    description: {
                        en:'',
                        fr: ''
                    },
                    tasks: [],
                    skills: []
                }
            );
        }
    },

    data() {
        return {
            currPhase: 0,
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
                start: null,
                end: null,
            },

            hideFirst: false,
        }
    },

    computed: {
        firstPhase() {
            return this.event.name.en !== `` && this.event.description.en !== `` && this.event.start !== null && this.event.end !== null;
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
    }

    .form-header {
        font-weight: 500;
    }

    .form-info {
        font-size: 0.9em;
        margin: 0 0 3% 0;
        opacity: 0.8;
        font-style: italic;
    }

    .form-container {
        flex: 1;
        background-color: white;
        padding: 50px;

        box-shadow: 0 0 15px -10px black;

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

    .hide-btn {
        opacity: 0;
    }

    .new-job-btn {
        margin: 2% 0;
    }

</style>