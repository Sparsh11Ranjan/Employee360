import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className="rounded-lg flex bg-white shadow-md overflow-hidden">
  <div className={`text-3xl flex items-center justify-center ${color} text-white px-5 py-6`}>
    {icon}
  </div>
  <div className="pl-4 py-4">
    <p className="text-gray-600 text-sm">{text}</p>
    <p className="text-2xl font-bold">{number}</p>
  </div>
</div>

  )
}

export default SummaryCard