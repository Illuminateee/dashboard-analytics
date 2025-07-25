'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/navigation/navigation'
import { 
  fetchGenderStats, 
  fetchLocationStats, 
  fetchAgeGroupStats, 
  fetchDigitalInterestStats, 
  fetchDeviceStats,
  type GenderStat,
  type LocationStat,
  type AgeGroupStat,
  type DigitalInterestStat,
  type DeviceStat,
  type AnalyticsFilters
} from '@/services/api'

import GenderChart from '@/components/charts/GenderChart'
import LocationChart from '@/components/charts/LocationChart'
import AgeGroupChart from '@/components/charts/AgeGroupChart'
import DigitalInterestChart from '@/components/charts/DigitalInterestChart'
import DeviceChart from '@/components/charts/DeviceChart'
import FilterPanel from '@/components/filters/FilterPanel'

export default function AnalyticsPage() {
  // State for chart data
  const [genderData, setGenderData] = useState<GenderStat[]>([])
  const [locationData, setLocationData] = useState<LocationStat[]>([])
  const [ageGroupData, setAgeGroupData] = useState<AgeGroupStat[]>([])
  const [digitalInterestData, setDigitalInterestData] = useState<DigitalInterestStat[]>([])
  const [deviceData, setDeviceData] = useState<DeviceStat[]>([])
  
  // Filter state
  const [filters, setFilters] = useState<AnalyticsFilters>({})
  
  // Loading states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data with filters
  const fetchAllData = useCallback(async (currentFilters: AnalyticsFilters) => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔍 Starting analytics data fetch with filters:', currentFilters)

      // Fetch all data in parallel with filters
      const [
        genderResponse,
        locationResponse,
        ageGroupResponse,
        digitalInterestResponse,
        deviceResponse
      ] = await Promise.all([
        fetchGenderStats(currentFilters),
        fetchLocationStats(currentFilters),
        fetchAgeGroupStats(currentFilters),
        fetchDigitalInterestStats(currentFilters),
        fetchDeviceStats(currentFilters)
      ])

      setGenderData(genderResponse)
      setLocationData(locationResponse)
      setAgeGroupData(ageGroupResponse)
      setDigitalInterestData(digitalInterestResponse)
      setDeviceData(deviceResponse)
    } catch (err: any) {
      console.error('❌ Error in fetchAllData:', err)
      setError(`Failed to load analytics data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchAllData(filters)
  }, [fetchAllData, filters])

  // Handle filter changes
  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    console.log('🔄 Analytics Filters changed:', newFilters)
    setFilters(newFilters)
  }

  // Calculate total users for display
  const totalUsers = genderData.reduce((sum, item) => sum + item.count, 0)

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => fetchAllData(filters)} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Comprehensive user analytics with real-time data visualization</p>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange}
          loading={loading}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : totalUsers.toLocaleString()}
                </p>
                {Object.keys(filters).some(key => filters[key as keyof AnalyticsFilters]) && (
                  <p className="text-xs text-gray-400">Filtered</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Location Types</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : locationData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Device Brands</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : deviceData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Digital Interests</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? '...' : digitalInterestData.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <GenderChart data={genderData} loading={loading} />
          <LocationChart data={locationData} loading={loading} />
          <AgeGroupChart data={ageGroupData} loading={loading} />
          <DigitalInterestChart data={digitalInterestData} loading={loading} />
        </div>

        {/* Device Chart - Full Width */}
        <div className="mb-8">
          <DeviceChart data={deviceData} loading={loading} />
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).some(key => filters[key as keyof AnalyticsFilters]) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {key}: {value}
                    <button
                      onClick={() => handleFiltersChange({ ...filters, [key]: undefined })}
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}