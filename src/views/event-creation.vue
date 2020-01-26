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

                        <b-card style="margin-top: 15px;" v-for="(job, index) of event.jobs" :key="index">
                            <div class="form-header">Title</div>
                            <b-input v-model="job.title[lang]" />
                            <div class="form-header">Description</div>
                            <b-input v-model="job.description[lang]" />
                            <div class="form-header">Skills</div>
                            <multiselect :multiple="true" v-model="job.skills" :options="skills" :custom-label="({name}) => name ? name[lang] : name">
                            </multiselect>
                            <div class="form-header">Tasks</div>
                            <div class="form-info">Write the tasks separated by a comma.</div>
                            <b-input v-model="job.tasks" placeholder="i.e. cooking, washing dishes, etc"/>
                        </b-card>

                        <b-button style="width: 100%;" class="new-job-btn" pill @click="createNewJob" variant="primary">Create New Job</b-button>
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
import net from '../helpers/network';
import Multiselect from 'vue-multiselect';

export default {
    activated() {
        net.get("/skills/list").then(res => {
            this.skills = res.data;
        }).catch(err => {console.log(err);
        });
    },

    components: {
        'date-picker': DatePicker,
        'multiselect': Multiselect
    },

    methods: {
        updatePhase() {
            if(this.currPhase === 0) {
                
                if(this.phaseOneFinished()) 
                    this.currPhase ++;
                else 
                    this.$swal('ERROR', 'Make sure you fill out all the fields', 'error');
                return;
            }

            if(this.currPhase === 1 && this.phaseTwoFinished()) {
                let event = {... this.event};
                for(let j of this.event.jobs) {
                    j.tasks = j.tasks.split(',');
                    for(let t in j.tasks) {
                        j.tasks[t] = {name: {
                            en: j.tasks[t],
                            fr: ''
                        }, order: 0}
                    }

                    j.skills = j.skills.map(s => s.id);
                }

                event.admins = [this.currUser.id];

                net.post('/events/create', event).then(res => {
                    this.$swal('SUCCESS', 'Successfully created the event', 'success');
                }).catch(err => {
                    this.$swal('ERROR', 'Unable to create event.', 'error');
                })
            } else {
                this.$swal('ERROR', 'Make sure you fill out all the fields', 'error');
            }
        },

        phaseOneFinished() {
            return this.event.name.en !== `` && this.event.description.en !== `` && this.event.start !== null && this.event.end !== null;
        },

        phaseTwoFinished() {
            if(this.event.jobs.length === 0)
                return false;
            else {
                for(let j of this.event.jobs) {
                    if(j.title.en === '' && j.title.fr === '') {
                        return false
                    }

                    if(j.description.en === '' && j.description.fr === '') {
                        return false
                    }

                    if(j.skills.length === 0) { 
                        return false
                    }

                    if(j.tasks === '') {
                        return false
                    }
                }

                return true;
            }
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
                    tasks: '',
                    skills: []
                }
            );
        }
    },

    data() {
        return {
            skills: [],
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
        currUser() {
            return this.$store.getters.currentUser;
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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