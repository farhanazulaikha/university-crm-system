import React from 'react'
import AdminChart from './AdminChart'
import FeaturedInfo from './AdminFeaturedInfo'
import './Home.css'

function AdminHome() {
  return (
    <div className="home">
      <h3 className = "px-4 pb-1 pt-1">Dashboard<hr/></h3>
        <FeaturedInfo/>
        <AdminChart/>
    </div>
  )
}

export default AdminHome