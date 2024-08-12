"use client"
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registering Chart.js components
ChartJs.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({accounts} : DoughnutChartProps) => {
     const data = {
          datasets: [
              {
                  label: 'Banks',
                  data: [12393, 53245, 43242],
                  backgroundColor: ['#FFA726', '#FB8C00', '#F57C00'],
              },
          ],
          labels: ['Bank1', 'Bank2', 'Bank3'],
      };
     return <Doughnut 
     data={data}
     options={{
          cutout: '60%',
          plugins:{
               legend:{
                    display:false
               }
          }
     }}
     />
}
