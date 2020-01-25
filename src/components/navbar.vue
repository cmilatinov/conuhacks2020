<template>
    <div class="top">
        <div class="top-nav">
            <div>
                <router-link :to="{name: option.route}"
                             class="item" active-class="active"
                             @click="onClick(option)"
                             v-for="(option, index) in components"
                             :key="option + index">
                    <icon class="icon" :icon="option.icon.name"/>
                </router-link>
                <icon icon="bell" class="icon" ></icon><b-badge variant="warning">0</b-badge>
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
    .icon {
        color: white;
        opacity: 0.4;

        font-size: 2em;
        margin: 1%;

        cursor: pointer;
        transition: 0.2s;

        &:hover {
            opacity: 1;
            transition: 0.2s;
        }
    }

    .top{
        width: 100vw;
        position: absolute;
    }
</style>