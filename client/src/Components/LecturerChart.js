import React, {useEffect, useState, useContext} from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Axios from 'axios';
import { UserContext } from './../Helper/Context';

function LecturerChart() {

  const {userId, setUserId} = useContext(UserContext);


  const [rndNumber, setRndNumber] = useState(0);
  const [tnlNumber, setTnlNumber] = useState(0);

  useEffect(()=>{

    Axios.get(`http://localhost:3001/${userId}/totalrndlect`,{
        id: userId,
})
    .then((res) => {
        setRndNumber(res.data.rndTotal);
    });
}, [rndNumber]);

useEffect(()=>{

    Axios.get(`http://localhost:3001/${userId}/totaltnllect`,{
        id: userId,
})
    .then((res) => {
        setTnlNumber(res.data.tnlTotal);
    });
}, [tnlNumber]);

    const data = [
        { name: 'Research and Development (R&D)', value: rndNumber, fill: '#008080' },
        { name: 'Teaching and Learning (T&L)', value: tnlNumber, fill: '#40E0D0' },
      ];

  return (
    <div className="chart">
        {rndNumber > 0 || tnlNumber > 0
        ?
            <ResponsiveContainer width="100%" height="100%" aspect={1.5/1}>
                <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#104271"
                    label
                />
                <Tooltip/>
                <Legend/>
                </PieChart>
        </ResponsiveContainer>
        :
        <span>No project has been added yet!</span>
        }
</div>
  )
}

export default LecturerChart