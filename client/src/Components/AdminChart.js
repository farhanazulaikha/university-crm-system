import React, {useEffect, useState} from 'react'
import './AdminChart.css'
import { PieChart, Pie, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Axios from 'axios';


function AdminChart() {

  const [rndNumber, setRndNumber] = useState(0);
  const [tnlNumber, setTnlNumber] = useState(0);

  const [mncNumber, setMncNumber] = useState(0);
  const [smeNumber, setSmeNumber] = useState(0);
  const [ngoNumber, setNgoNumber] = useState(0);
  const [glcNumber, setGlcNumber] = useState(0);
  const [startupNumber, setStartupNumber] = useState(0);


  useEffect(()=>{

      Axios.get('http://localhost:3001/totalchart1')
      .then((res) => {
          // if(res.data.length > 0){
              setRndNumber(res.data.rndTotal);
              setTnlNumber(res.data.tnlTotal);
          // }
          
      });
  }, [rndNumber, tnlNumber]);

  useEffect(()=>{

    Axios.get('http://localhost:3001/totalchart2')
    .then((res) => {
        // if(res.data.length > 0){
            setMncNumber(res.data.mncTotal);
            setSmeNumber(res.data.smeTotal);
            setNgoNumber(res.data.ngoTotal);
            setGlcNumber(res.data.glcTotal);
            setStartupNumber(res.data.startupTotal);
        
    });
}, [mncNumber, smeNumber, ngoNumber, glcNumber, startupNumber]);


    const data = [
        { name: 'Research and Development (R&D)', value: rndNumber, fill: '#0088FE' },
        { name: 'Teaching and Learning (T&L)', value: tnlNumber, fill:'#00C49F' },
      ];

      const colors = ['#0000ff', '#00008b', '#add8e6', '#6495ed', '#6f8faf'];

      const data01 = [
        {
          name: "MNC",
          value: mncNumber,
          fill : "#0000FF",
        },
        {
          name: "SME",
          value: smeNumber,
          fill: "#00008B",
        },
        {
          name: "NGO",
          value: ngoNumber,
          fill: "#ADD8E6",
        },
        {
          name: "GLC",
          value: glcNumber,
          fill: "#6495ED",
        },
        {
          name: "Startup",
          value: startupNumber,
          fill: "#6F8FAF",
        }
      ]


  return (
    <div className="chart">
        <div className = "featuredChart">
            <div className = "title">
                <span className = "chartTitle">Number of Registered Project</span>
                <span className = "chartSub">According to Type</span>
            </div>
            
            <ResponsiveContainer width="100%" height="100%" aspect={2.5/1}>
                <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                />
                <Tooltip/>
                <Legend/>
                </PieChart>
        </ResponsiveContainer>
        </div>
        <div className = "featuredChart">
            <div className = "title">
                <span className = "chartTitle">Number of Registered Company</span>
                <span className = "chartSub">According to Category</span>
            </div>
            <ResponsiveContainer width="100%" height="100%" aspect={2.5/1}>
                <BarChart width={730} height={200} data={data01}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend 
                      payload={
                        data01.map(
                          (item, index) => ({
                            id: item.name,
                            value: `${item.name}`,
                            color: colors[index % colors.length]
                          })
                        )
                      }
                    />
                  <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}/>
                
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default AdminChart