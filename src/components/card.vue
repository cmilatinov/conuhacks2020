<template>
    <div :class="`card ${variant}`">
        <div class="header">
            {{title}}
        </div>
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Card Title'
        },
        variant: {
            type: String,
            default: 'primary'
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: white;
    border-radius: 20px;

    opacity: 0.8;

    transition: 0.3s;

    padding: 30px 50px;

    &:hover {
        box-shadow: 0 0 15px -10px black;
        transition: 0.3s;
    }

    &.danger {
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
    }

    &.info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
    }

    &.primary {
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
    }

    &.warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
    }
}

.header {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1.1em;

    margin-bottom: 20px;
}
</style>