<template>
    <div class="main-container" style="height: 100vh;">
        <div class="profile-card">
            <div class="header">Profile</div>
            <b-img class="profile-image"></b-img>
            <div class="form-header">Email</div>
            <b-input :disabled="true" class="profile-input" v-model="currUser.email" placeholder="E-mail" />
            <div class="form-header">First Name</div>
            <b-input class="profile-input" v-model="currUser.fname" placeholder="First Name" />
            <div class="form-header">Last Name</div>
            <b-input class="profile-input" v-model="currUser.lname" placeholder="Last Name" />
            <div class="form-header">Skills</div>
            <div class="radar">
                <radar-chart
                    :labels="currUser.skills.map(s => s.name[lang])"
                    :datasets="[{
                        label: 'Skills',
                        backgroundColor: 'rgba(245,172,39, 0.7)',
                        data: currUser.skills.map(s => s.rating)
                    }]"
                    :options="{
                            scale: {
                                angleLines: {
                                    display: false
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 5
                                }
                            }
                        }"
                ></radar-chart>
                <!-- <radar-chart></radar-chart> -->
            </div>
        </div>
    </div>
</template>

<script>
    import RadarChart from '../components/radar-chart';

    export default {
        components: {
            'radar-chart': RadarChart
        },

        data() {
            return {
            }
        },

        computed: {
            currUser() {
                return this.$store.getters.currentUser;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .profile-input {
        margin: 20px 0;
    }

    .profile-card {
        background-color: white;
        padding: 5%;

        box-shadow: 0 0 25px -10px black;

        border-radius: 40px;
    }

    .form-header {
        font-weight: 500;
    }

    .main-container {
        padding: 5%;
    }

    .header {
        font-weight: 500;
        text-transform: uppercase;
        font-size: 1.5em;
        color: #383838;
        margin-bottom: 1.5%;
    }

    .radar{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

