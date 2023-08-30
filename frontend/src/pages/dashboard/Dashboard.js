import React from 'react'

const Dashboard = () => {
  document.getElementsByTagName('title').item(0).innerHTML = "Dashboard";
  return (
    <div>
        <h1>Dashboard</h1>
        <a href="/login">Login Page</a>
        <a href="/">Home Page</a>
    </div>
  )
}

export default Dashboard