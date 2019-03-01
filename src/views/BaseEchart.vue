<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-favor"></i>图表</el-breadcrumb-item>
                <el-breadcrumb-item>Echarts图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <v-chart :options="polar"/>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <v-chart :options="rose"/>
                    </div>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content">
                        <v-chart :options="gl"/>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <v-chart :options="airlight"/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars */

    import ECharts from 'vue-echarts'

    import 'echarts/lib/chart/line'

    require('echarts');
    require('echarts-gl');

    export default {
        name: "BaseEchart.vue",
        components: {
            'v-chart': ECharts
        },
        data() {
            let data = [];

            for (let i = 0; i <= 360; i++) {
                let t = i / 180 * Math.PI
                let r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
            }

            let _3DData = [];
            for (let t = 0; t < 25; t += 0.001) {
                let x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
                let y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
                let z = t + 2.0 * Math.sin(75 * t);
                _3DData.push([x, y, z]);
            }
            console.log(_3DData.length);

            let flightOption = {
                backgroundColor: '#000',
                globe: {
                    baseTexture: './data/world.topo.bathy.200401.jpg',
                    heightTexture: './data/bathymetry_bw_composite_4k.jpg',

                    shading: 'lambert',

                    light: {
                        ambient: {
                            intensity: 0.4
                        },
                        main: {
                            intensity: 0.4
                        }
                    },

                    viewControl: {
                        autoRotate: false
                    }
                },
                series: {

                    type: 'lines3D',

                    coordinateSystem: 'globe',

                    blendMode: 'lighter',

                    lineStyle: {
                        width: 1,
                        color: 'rgb(50, 50, 150)',
                        opacity: 0.1
                    },

                    data: []
                }
            };
            // get data from local demo
            fetch("./data/flight.json").then(function (res) {
                res.json().then(function (data) {
                    console.log(data);
                    function getAirportCoord(idx) {
                        return [data.airports[idx][3], data.airports[idx][4]];
                    }
                    flightOption.series.data = data.routes.map(function(airline) {
                        return [
                            getAirportCoord(airline[1]),
                            getAirportCoord(airline[2])
                        ];
                    });

                })
            });

            return {
                polar: {
                    title: {
                        text: '极坐标双数值轴'
                    },
                    legend: {
                        data: ['line']
                    },
                    polar: {
                        center: ['50%', '54%']
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    angleAxis: {
                        type: 'value',
                        startAngle: 0
                    },
                    radiusAxis: {
                        min: 0
                    },
                    series: [
                        {
                            coordinateSystem: 'polar',
                            name: 'line',
                            type: 'line',
                            showSymbol: false,
                            data: data
                        }
                    ],
                    animationDuration: 2000
                },
                gl: {
                    tooltip: {},
                    backgroundColor: '#fff',
                    visualMap: {
                        show: false,
                        dimension: 2,
                        min: 0,
                        max: 30,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                    },
                    xAxis3D: {
                        type: 'value'
                    },
                    yAxis3D: {
                        type: 'value'
                    },
                    zAxis3D: {
                        type: 'value'
                    },
                    grid3D: {
                        viewControl: {
                            projection: 'orthographic'
                        }
                    },
                    series: [{
                        type: 'line3D',
                        data: _3DData,
                        lineStyle: {
                            width: 4
                        }
                    }]},
                rose: {
                    title : {
                        text: '南丁格尔玫瑰图',
                        subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'半径模式',
                            type:'pie',
                            radius : [20, 110],
                            center : ['25%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:10, name:'rose1'},
                                {value:5, name:'rose2'},
                                {value:15, name:'rose3'},
                                {value:25, name:'rose4'},
                                {value:20, name:'rose5'},
                                {value:35, name:'rose6'},
                                {value:30, name:'rose7'},
                                {value:40, name:'rose8'}
                            ]
                        },
                        {
                            name:'面积模式',
                            type:'pie',
                            radius : [30, 110],
                            center : ['75%', '50%'],
                            roseType : 'area',
                            data:[
                                {value:10, name:'rose1'},
                                {value:5, name:'rose2'},
                                {value:15, name:'rose3'},
                                {value:25, name:'rose4'},
                                {value:20, name:'rose5'},
                                {value:35, name:'rose6'},
                                {value:30, name:'rose7'},
                                {value:40, name:'rose8'}
                            ]
                        }
                    ]
                },
                airlight:flightOption

            }
        },
        // created (){
        //
        // }
    }
    function getAirportCoord(data,idx) {
        return [data.airports[idx][3], data.airports[idx][4]];
    }
    function getFlightData(flightData, data) {
        flightData = data.routes.map(function(airline) {
            return [
                getAirportCoord(data,airline[1]),
                getAirportCoord(data,airline[2])
            ];
        });

    }
</script>

<style scoped>
    /**
     * The default size is 600px×400px, for responsive charts
     * you may need to set percentage values as follows (also
     * don't forget to provide a size for the container).
     */
    .echarts {
        width: 100%;
        height: 100%;
    }

    .grid-content {
        width: 600px;
        height: 500px;
    }
</style>
