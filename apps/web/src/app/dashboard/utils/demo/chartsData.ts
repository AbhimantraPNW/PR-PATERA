export interface ILegends{
    title: string
    color: string
  }
  
  export const doughnutLegends: ILegends[] = [
    { title: 'All Products', color: 'bg-blue-500' },
    { title: 'Seasoning Products', color: 'bg-teal-600' },
    { title: 'Discount Products', color: 'bg-purple-600' },
  ]
  
  export const lineLegends: ILegends[] = [
    { title: 'All Products', color: 'bg-blue-500' },
    { title: 'Seasoning Products', color: 'bg-teal-600' },
    { title: 'Discount Products', color: 'bg-purple-600' },
  ]
  
  export const barLegends: ILegends[] = [
    { title: 'All Products', color: 'bg-blue-500' },
    { title: 'Seasoning Products', color: 'bg-teal-600' },
    { title: 'Discount Products', color: 'bg-purple-600' },
  ]
  
  export const doughnutOptions = {
    data: {
      datasets: [
        {
          data: [33, 33, 33],
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
          label: 'Dataset 1',
        },
      ],
      labels: ['All Products', 'Seasoning Products', 'Discount Products'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  }
  
  export const lineOptions = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'All Products',
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          data: [43, 48, 40, 54, 67, 73, 70],
          fill: false,
        },
        {
          label: 'Seasoning Products',
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: '#0d9488',
          borderColor: '#0d9488',
          data: [10, 30, 50, 60, 52, 45, 70],
        },
        {
          label: 'Discount Products',
          fill: false,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: '#7e3af2',
          borderColor: '#7e3af2',
          data: [24, 50, 64, 74, 52, 51, 65],
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: false,
    },
  }
  
  export const barOptions = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'All Products',
          backgroundColor: '#3b82f6',
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [-3, 14, 52, 74, 33, 90, 70],
        },
        {
          label: 'Seasoning Products',
          backgroundColor: '#0d9488',
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [66, 33, 43, 12, 54, 62, 84],
        },
        {
          label: 'Discount Products',
          backgroundColor: '#7e3af2',
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [46, 23, 33, 32, 44, 72, 14],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  }