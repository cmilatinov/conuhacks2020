<script>
import { Radar } from 'vue-chartjs'

export default {
    extends: Radar,
    mounted () {
        this.renderChart({
            labels: ['Culinary', 'Security', 'Management', 'Marketing', 'Hardware Setup'],
            datasets: [{
                label: 'Skills',
                backgroundColor: 'rgba(204, 35, 42, 0.8)',
                data: [2.4, 1.3, 3.5, 4.2, 2.8],
            }]},
            {
                scale: {
                    angleLines: {
                        display: true
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                }
            }
        );
    }
}
</script>