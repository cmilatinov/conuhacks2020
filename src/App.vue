<template>
    <div id="app">
        <div class="main-container">
            <navbar :components="options"></navbar>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    //Components
    import NavBar from './components/navbar';
    export default {
        name: 'app',
        components: {
            'navbar': NavBar,
        },
        data() {
            return {
                options: [
                    {
                        name: 'Home',
                        icon: {
                            name: 'home'
                        },
                        route: 'home'
                    },
                    {
                        name: 'Profile',
                        icon: {
                            name: 'user'
                        },
                        route: 'profile'
                    }
                ],
            }
        },
    }
</script>

<style lang="scss">
    @import 'assets/styles/global.scss';
</style>