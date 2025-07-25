'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/navigation/navigation'
import { 
  fetchDeviceStats,
  type DeviceStat,
  type AnalyticsFilters
} from '@/services/api'

import DeviceChart from '@/components/charts/DeviceChart'
import FilterPanel from '@/components/filters/FilterPanel'

export default function DevicePreferencesPage() {
  const [deviceData, setDeviceData] = useState<DeviceStat[]>([])
  const [filters, setFilters] = useState<AnalyticsFilters>({})
  const [loading, setLoading] = useState(true)

  const fetchDeviceData = useCallback(async (currentFilters: AnalyticsFilters) => {
    try {
      setLoading(true)
      const deviceResponse = await fetchDeviceStats(currentFilters)
      setDeviceData(deviceResponse)
    } catch (err: any) {
      console.error('Failed to load device data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDeviceData(filters)
  }, [fetchDeviceData, filters])

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters)
  }

  const totalUsers = deviceData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Device Preferences</h1>
          <p className="mt-2 text-gray-600">Device brand distribution and usage preferences</p>
        </div>

        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
          loading={loading} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">
              {loading ? '...' : totalUsers.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Device Brands</h3>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? '...' : deviceData.length}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <DeviceChart data={deviceData} loading={loading} />
        </div>
      </main>
    </div>
  )
}