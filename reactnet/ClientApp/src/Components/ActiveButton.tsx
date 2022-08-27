import React from 'react'

function ActiveButton({status}:{status:boolean}) {
  return (
    <div style={{
        padding:5,
        borderRadius:5,
        backgroundColor: status ? "green": '#ff4621',
        color:"white"
    }}>{status ? "Active" : "Inactive"}</div>
  )
}

export default ActiveButton