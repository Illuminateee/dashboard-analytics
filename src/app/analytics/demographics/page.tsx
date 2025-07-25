'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/navigation/navigation'
import { 
  fetchGenderStats, 
  fetchAgeGroupStats,
  type GenderStat,
  type AgeGroupStat,
  type AnalyticsFilters
} from '@/services/api'

import GenderChart from '@/components/charts/GenderChart'
import AgeGroupChart from '@/components/charts/AgeGroupChart'
import FilterPanel from '@/components/filters/FilterPanel'

export default function DemographicsPage() {
  const [genderData, setGenderData] = useState<GenderStat[]>([])
  const [ageGroupData, setAgeGroupData] = useState<AgeGroupStat[]>([])
  const [filters, setFilters] = useState<AnalyticsFilters>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDemographicsData = useCallback(async (currentFilters: AnalyticsFilters) => {
    try {
      setLoading(true)
      setError(null)

      const [genderResponse, ageGroupResponse] = await Promise.all([
        fetchGenderStats(currentFilters),
        fetchAgeGroupStats(currentFilters)
      ])

      setGenderData(genderResponse)
      setAgeGroupData(ageGroupResponse)
    } catch (err: any) {
      setError(`Failed to load demographics data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDemographicsData(filters)
  }, [fetchDemographicsData, filters])

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters)
  }

  const totalUsers = genderData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Demographics</h1>
          <p className="mt-2 text-gray-600">Gender and age group analysis with interactive filtering</p>
        </div>

        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
          loading={loading} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? '...' : totalUsers.toLocaleString()}
            </p>
            {Object.keys(filters).some(key => filters[key as keyof AnalyticsFilters]) && (
              <p className="text-sm text-gray-500 mt-1">Filtered results</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Groups</h3>
            <p className="text-3xl font-bold text-green-600">
              {loading ? '...' : ageGroupData.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Different age categories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GenderChart data={genderData} loading={loading} />
          <AgeGroupChart data={ageGroupData} loading={loading} />
        </div>
      </main>
    </div>
  )
}