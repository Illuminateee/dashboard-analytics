'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/navigation/navigation'
import { 
  fetchLocationStats,
  type LocationStat,
  type AnalyticsFilters
} from '@/services/api'

import LocationChart from '@/components/charts/LocationChart'
import FilterPanel from '@/components/filters/FilterPanel'

export default function LocationAnalysisPage() {
  const [locationData, setLocationData] = useState<LocationStat[]>([])
  const [filters, setFilters] = useState<AnalyticsFilters>({})
  const [loading, setLoading] = useState(true)

  const fetchLocationData = useCallback(async (currentFilters: AnalyticsFilters) => {
    try {
      setLoading(true)
      const locationResponse = await fetchLocationStats(currentFilters)
      setLocationData(locationResponse)
    } catch (err: any) {
      console.error('Failed to load location data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLocationData(filters)
  }, [fetchLocationData, filters])

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters)
  }

  const totalUsers = locationData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Location Analysis</h1>
          <p className="mt-2 text-gray-600">Location type distribution and geographical patterns</p>
        </div>

        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
          loading={loading} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-green-600">
              {loading ? '...' : totalUsers.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Types</h3>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? '...' : locationData.length}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <LocationChart data={locationData} loading={loading} />
        </div>
      </main>
    </div>
  )
}