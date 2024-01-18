import React, { useEffect, useRef } from 'react'
import Wave from '../layout/wave'
import * as echarts from 'echarts';
import { ECElementEvent } from 'echarts'
import { useNavigate } from 'react-router-dom';

type EChartsOption = echarts.EChartsOption;


const Category = () => {

    const navigate = useNavigate()

    const option: EChartsOption = {
        textStyle: {
            fontSize: '1.4rem',
            fontWeight: 'normal',
            fontFamily: 'Raleway',
        },
        legend: {
            top: 'bottom',
            textStyle: {
                fontFamily: 'Raleway',
                color: '#aaa'
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        title: {
            text: "Article Category Stats",
            textStyle: {
                fontFamily: 'Raleway',
                fontSize: '1.6rem',
                color: '#aaa'
            },
            left: 'center'
        },
        series: [
            {
                name: 'Category',
                type: 'pie',
                radius: [35, 130],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 6
                },
                label: {
                    color: "#aaa"
                },
                data: [
                    { value: 3, name: 'Project', id: 54984 },
                    { value: 1, name: 'Java', id: 2 },
                    { value: 2, name: 'React', id: 4 },
                    { value: 1, name: 'Algorithm', id: 5 },
                ]
            }
        ]
    }

    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        let myChart: echarts.ECharts

        const handleEchartClick = (params: echarts.ECElementEvent) => {
            if (params.data instanceof Object) {
                if ('id' in params.data) {
                    navigate(`/category/${params.data.id}`)
                }
            }
        }

        const generateChart = () => {
            if (!chartRef.current) {
                return
            }
            if (!myChart) {
                myChart = echarts.init(chartRef.current, null)
            }

            myChart.setOption(option)
            myChart.on('click', handleEchartClick)

        }

        const resizeChart = () => {
            if (!myChart) {
                return
            }
            myChart.resize()
        }

        generateChart()

        window.addEventListener('resize', resizeChart)

        return () => {
            window.removeEventListener('resize', resizeChart)
            if (myChart) {
                myChart.off('click', handleEchartClick)
            }
        }

    }, [option])



    return (
        <div className='min-h-screen bg-[#222]  relative caret-transparent'>
            <div className='h-[70vh] relative'>
                <div className='h-[70vh] fixed w-full bg-archive bg-cover bg-no-repeat bg-center  flex justify-center items-center'>
                    <h1 className=' bg-white px-6 py-2 opacity-90 rounded-lg font-bold text-xl '>
                        Category
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='bg-[#222] relative z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    {/* Category pie chart */}
                    <div ref={chartRef} className='w-full h-[400px]'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category