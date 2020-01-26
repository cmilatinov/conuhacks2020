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
<<<<<<< HEAD
            default: {
                scale: {
                angleLines: {
                    display: false
                },
                ticks: {
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            }
            }
=======
            required: true
            // scale: {
            //     angleLines: {
            //         display: false
            //     },
            //     ticks: {
            //         suggestedMin: 0,
            //         suggestedMax: 5
            //     }
            // }
>>>>>>> fba99789c32ad992ef943d618e92b2ac82921044
        }
    },
    mounted () {
        this.renderChart({ labels: this.labels,  datasets: this.datasets }, this.options);
    }
}
</script>