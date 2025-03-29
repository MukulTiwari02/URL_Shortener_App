import React from 'react'

const Dashboard = () => {
  document.getElementsByTagName('title').item(0).innerHTML = "Dashboard";
  return (
    <div className='dashboard-container'>        
      <h1>Dashboard is in progress....</h1>
      <a href="/">Go to home</a>
    </div>
  )
}

export default Dashboard