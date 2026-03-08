import React from 'react'
import axios from 'axios'
const App = () => {
  const apicall = axios.get("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzNjZmYwYzQ3MDVmNzJhYWI1OGNhMGFmNzM4ZjkzZSIsIm5iZiI6MTc3MjkyNzY4MS42MDYwMDAyLCJzdWIiOiI2OWFjYmFjMTM0NTNhNGQ0ZDI3OTNkYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wjfsiij1Ib5gqrbERCPYTMxsRqi78HVs29fQ_z9dQkU")
  console.log(apicall);
  return (
    <div>App</div>
  )
}

export default App