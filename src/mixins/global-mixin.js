import Vue from "vue";

Vue.mixin({
    data() {
        return {
            
        }
    },
    computed: {
        lang() {
            return this.$store.getters.language;
        },
    },
    methods: {
        
    }
});

export default {};