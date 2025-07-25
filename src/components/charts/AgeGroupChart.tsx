// filepath: src/components/charts/AgeGroupChart.tsx
'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AgeGroupStat } from '@/services/api'

interface AgeGroupChartProps {
  data: AgeGroupStat[]
  loading?: boolean
}

export default function AgeGroupChart({ data, loading }: AgeGroupChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  const chartData = data.map(item => ({
    name: item.ageGroup,  // Changed from age_group to ageGroup
    value: item.count
  }))

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Users']} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.6} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}