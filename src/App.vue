<template>
    <div class="full">
        <div class="nav" v-if="$store.getters.isAuthenticated">
            <div class="header">
                <div class="logo-container">
                    <icon icon="hands-helping" class="logo"/>
                </div>
                <div class="title">Vault</div>
            </div>

            <div class="nav-item" :class="{ active: $route.name === option.route }" :key="option.name" v-for="option in options" @click="_ => $router.push(option.route)">
                <icon :icon="option.icon" class="nav-item-icon"></icon>
                <div class="nav-item-title">{{option.name}}</div>
            </div>
        </div>
        <div class="content">
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
                        name: 'Dashboard',
                        icon: 'bars',
                        route: 'home'
                    },
                    {
                        name: 'Analytics',
                        icon: 'chart-line',
                        route: ''
                    },
                    {
                        name: 'My Events',
                        icon: 'calendar-check',
                        route: ''
                    },
                    {
                        name: 'Host an Event',
                        icon: 'calendar-day',
                        route: 'event-creation'
                    },
                    {
                        name: 'Profile',
                        icon: 'user-tie',
                        route: ''
                    }
                ],
            }
        },
    }
</script>

<style lang="scss">
    @import 'assets/styles/global.scss';

    .full {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        background-color: #F6F4FC;
    }

    .nav {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 250px;
        height: 100%;
        background-color: #FEFEFE;
        border-right: 1px solid #E5E7EB;
        overflow: hidden;
        
        .header {
            display: flex;
            flex: 0;
            flex-direction: row;
            align-items: center;
            align-self: center;
            margin: 40px 20px 40px 20px;

            .logo-container {
                position: relative;
                width: 70px;
                height: 70px;
                border-radius: 15px;
                background-color: rgba(0,20,50,0.6);
                margin-right: 20px;
                
                .logo {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    color: #FEFEFE;
                }

            }

            .title {
                flex: 1;
                font-size: 1.4em;
                font-weight: 600;
            }

        }
        
        .nav-item {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 20px 0;
            opacity: 0.4;
            transition: 0.2s;
            cursor: pointer;
            
            &:hover {
                opacity: 0.6;
            }

            &.active {
                opacity: 1;
            }

            &.active ::after {
                content: "";
                display: inline-block;
                position: absolute;
                right: -3px;
                top: 1px;
                width: 3px;
                height: 100%;
                background-color: #ffc107;
                transition: 0.2s;
            }

            &.active .nav-item-icon {
                transform: translateX(3px);
            }

            &.active .nav-item-title {
                transform: translateX(-3px);
            }

            .nav-item-icon {
                margin-left: 40px;
                margin-right: 25px;
                transition: 0.2s;
            }

            .nav-item-title {
                padding: 5px 20px 5px 0;
                font-weight: 600;
                flex: 1;
                text-align: center;
                transition: 0.2s;
            }

        }
    }

    .content {
        flex: 1;
    }

    .profile {
        width: 350px;
        height: 100%;
        background-color: #FEFEFE;
        border-left: 1px solid #E5E7EB;
    }
</style>