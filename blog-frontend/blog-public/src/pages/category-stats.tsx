import React, { useEffect, useMemo, useRef } from 'react'
import Wave from '../layout/wave'
import * as echarts from 'echarts';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { categoryService } from '../services/resources/category-service';

type EChartsOption = echarts.EChartsOption;

let option: EChartsOption = {
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
    }

}

const CategoryStats = () => {

    const navigate = useNavigate()

    const chartRef = useRef<HTMLDivElement>(null)

    const { data: categoryStats } = useQuery('categoryStats', categoryService.getCategoryStats)

    const categoryOption = useMemo(() => {
        if (!categoryStats) return option
        option.series = {
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
            data: categoryStats.map(category => ({
                value: category.articleCount,
                name: category.categoryName,
                id: category.id
            }))
        }
        return option
    }, [categoryStats])

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

            myChart.setOption(categoryOption)
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

    }, [option, categoryStats])

    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-3xl '>
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

export default CategoryStats