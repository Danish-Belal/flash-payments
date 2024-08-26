"use client"
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registering Chart.js components
ChartJs.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({accounts} : DoughnutChartProps) => {
     const accountNames = accounts.map((a)=>a.name);
     const balances = accounts.map((b) => b.currentBalance)
     const data = {
          datasets: [
              {
                  label: 'Banks',
                  data: balances,
                  backgroundColor: ['#FFA726', '#FB8C00', '#F57C00'],
              },
          ],
          labels: accountNames,
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
