<script>
import { Radar } from 'vue-chartjs'

export default {
    extends: Radar,
    props: {
        labels: {
            type: Array,
            required: true
        },
        datasets: {
            type: Array,
            required: true
        },
        options: {
            type: Object,
            required: true
        }
    },
    mounted () {
        this.renderChart({ labels: this.labels,  datasets: this.datasets }, this.options);
    }
}
</script>