<template>
    <div class="main-container">
        
        <div class="section-header">Personal Volunteering</div>
        <div class="row-container">
            <card variant="none" title="Past Volunteering">
                <line-chart 
                    :options="{ fill: false }"
                    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']" 
                    :datasets="[{ label: 'Number of events volunteered at', backgroundColor: '#f87979', borderColor: '#f87979', fill: false, data: genArray(12, 3, 8) }]"/>
            </card>
            <card variant="none" title="Average Volunteer Score">
                <line-chart 
                    :options="{ fill: false }"
                    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']" 
                    :datasets="[{ label: 'Volunteer Score', backgroundColor: '#28a745', borderColor: '#28a745', fill: false, data: genArray(12, 0, 5, false) }]"/>
            </card>
        </div>

        <div style="padding-top: 20px" class="section-header">Events you've Hosted</div>
        <div class="row-container">
            <card variant="none" title="Events Hosted">
                <line-chart 
                    :options="{ fill: false }"
                    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']" 
                    :datasets="[{ label: 'Number of events hosted', backgroundColor: '#004085', borderColor: '#004085', fill: false, data: genArray(12, 3, 12) }]"/>
            </card>
            <card variant="none" title="Average Attendees per Event">
                <line-chart 
                    :options="{ backgroundColor: 'rgba(0,0,0,0)' }"
                    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']" 
                    :datasets="[{ label: 'Average Attendees per Event', backgroundColor: '#ffc107', borderColor: '#ffc107', fill: false, data: genArray(12, 0, 1000, false) }]"/>
            </card>
        </div>

    </div>
</template>

<script>
import Card from '../components/card';
import LineChart from '../components/line-chart';

export default {
    components: {
        'card': Card,
        'line-chart': LineChart
    },
    methods: {
        genRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        genArray(num, min, max, integer = true) {
            let arr = [];
            for(let i = 0; i < num; i++)
                arr.push(integer ? this.getRandomInt(min, max) : this.genRandomFloat(min, max));
            return arr;
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 3%;
}

.row-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.section-header {
    font-weight: 400;
    font-size: 1.1em;
    width: 100%;
    text-align: left;

    margin: 1% 3%;
}
</style>