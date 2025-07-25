'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/navigation/navigation'
import { 
  fetchDigitalInterestStats,
  type DigitalInterestStat,
  type AnalyticsFilters
} from '@/services/api'

import DigitalInterestChart from '@/components/charts/DigitalInterestChart'
import FilterPanel from '@/components/filters/FilterPanel'

export default function DigitalInterestsPage() {
  const [interestData, setInterestData] = useState<DigitalInterestStat[]>([])
  const [filters, setFilters] = useState<AnalyticsFilters>({})
  const [loading, setLoading] = useState(true)

  const fetchInterestData = useCallback(async (currentFilters: AnalyticsFilters) => {
    try {
      setLoading(true)
      const interestResponse = await fetchDigitalInterestStats(currentFilters)
      setInterestData(interestResponse)
    } catch (err: any) {
      console.error('Failed to load interest data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInterestData(filters)
  }, [fetchInterestData, filters])

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters)
  }

  const totalUsers = interestData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Digital Interests</h1>
          <p className="mt-2 text-gray-600">User digital interest categories and preferences</p>
        </div>

        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
          loading={loading} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-orange-600">
              {loading ? '...' : totalUsers.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interest Categories</h3>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? '...' : interestData.length}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <DigitalInterestChart data={interestData} loading={loading} />
        </div>
      </main>
    </div>
  )
}