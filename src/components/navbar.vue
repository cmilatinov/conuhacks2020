<template>
    <div class="top">
        <h1 class="top-title">Food Interface v3.0</h1>
        <div class="top-nav">
            <div>
                <router-link :to="{name: option.route}"
                             class="item" active-class="active"
                             @click="onClick(option)"
                             v-for="(option, index) in components"
                             :key="option + index">
                    <icon class="icon" :icon="option.icon.name"/>
                    {{option.name}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
        },
        data() {
            return {
                lang: 'en',
                search: '',
            }
        },
        props: {
            components: Array,
        },
        methods: {
            
        },
        watch: {
            
        },
    }
</script>

<style lang="scss" scoped>
    .right {
        position: relative;
        left: 25%;
        top: 8px;
    }
    .top {
        position: fixed;
        width: calc(100% - 30px);
        z-index: 1000;
    }
    .top-nav {
        background-color: #252d47;
        color: #b7bed8;
        width: 100%;
        height: 50px;
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 12px 12px rgba(0, 0, 0, .15);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .top-title {
        position: absolute;
        left: 0;
        right: 0;
        padding-top: 18px;
        pointer-events: none;
        color: #b7bed8;
        font-weight: 500;
        font-size: 9pt;
        letter-spacing: 2px;
        margin-bottom: 0;
        text-transform: uppercase;
    }
    .search {
        padding: 8px 0;
        width: 660px;
        display: inline-flex;
        justify-content: space-between;
        .option {
            margin: 0 10px;
            position: relative;
        }
        .form-control {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-weight: 500;
            padding-left: 40px;
            &::placeholder {
                color: #ccc;
            }
        }
        .search-icon {
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.1);
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            height: 34px;
            padding: 10px 6px;
            width: 32px;
        }
    }
    .item {
        position: relative;
        float: left;
        color: inherit;
        text-align: center;
        padding: 15px;
        text-decoration: none;
        font-size: 10pt;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        &:after {
            content: "";
            height: 2px;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            -webkit-transition: all;
            transition: all;
            -webkit-transition-duration: 250ms;
            transition-duration: 250ms;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        .icon {
            position: relative;
            margin-right: 5px;
        }
    }
    .active {
        color: #ffffff;
        &:after {
            background-color: #fe993d;
            box-shadow: 0 0 10px rgba(254, 153, 61, 0.5);
            transform: scale(1);
        }
    }
    .item:hover {
        color: #ffffff;
    }
    .multiselect {
        width: 205px;
        & /deep/ {
            .multiselect__tags {
                padding: 3px 10px;
                min-height: calc(1.5em + 0.75rem + 2px);
                height: calc(1.5em + 0.75rem + 2px);
            }
            .multiselect__placeholder,
            .multiselect__input,
            .multiselect__single {
                margin: 0;
                padding: 0;
                line-height: 26px;
                font-weight: 500;
                font-size: 11pt;
                letter-spacing: 1px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    @media(max-width: 1680px) {
        .top-title {
            display: none;
        }
        .item {
            padding: 15px 8px;
        }
    }
    @media(max-width: 1024px) {
        .top {
            width: 100%;
        }
        .top-nav {
            border-radius: 0;
        }
        .search {
            width: 550px;
            .multiselect {
                width: 150px;
            }
        }
        .item {
            padding: 15px 7px;
            svg {
                display: none;
            }
        }
    }
</style>