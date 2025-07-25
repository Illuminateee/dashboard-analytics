'use client'

import { useState, useEffect } from 'react'
import { type AnalyticsFilters } from '@/services/api'

interface FilterPanelProps {
  filters: AnalyticsFilters
  onFiltersChange: (filters: AnalyticsFilters) => void
  loading?: boolean
}

interface FilterOptions {
  genders: string[]
  deviceBrands: string[]
  locationTypes: string[]
  digitalInterests: string[]
  ageGroups: string[]
  locations: string[]
  loginHours: string[]
}

export default function FilterPanel({ filters, onFiltersChange, loading }: FilterPanelProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genders: [],
    deviceBrands: [],
    locationTypes: [],
    digitalInterests: [],
    ageGroups: ['18-25', '26-35', '36-45', '46-55', '55+'], // Static age groups
    locations: [],
    loginHours: []
  })
  const [optionsLoading, setOptionsLoading] = useState(true)

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter-options`)
        const result = await response.json()
        
        if (result.success) {
          setFilterOptions(prev => ({
            ...prev,
            ...result.data
          }))
        }
      } catch (error) {
        console.error('Error fetching filter options:', error)
      } finally {
        setOptionsLoading(false)
      }
    }

    fetchFilterOptions()
  }, [])

  const handleFilterChange = (key: keyof AnalyticsFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === '' ? undefined : value
    }
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  if (optionsLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
          disabled={loading}
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Gender</label>
          <select 
            value={filters.gender || ''}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="" className="text-gray-900">All Genders</option>
            {filterOptions.genders.map(gender => (
              <option key={gender} value={gender} className="text-gray-900">{gender}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Age Group</label>
          <select 
            value={filters.ageGroup || ''}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="" className="text-gray-900">All Ages</option>
            {filterOptions.ageGroups.map(ageGroup => (
              <option key={ageGroup} value={ageGroup} className="text-gray-900">{ageGroup}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Device Brand</label>
          <select 
            value={filters.brandDevice || ''}
            onChange={(e) => handleFilterChange('brandDevice', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="" className="text-gray-900">All Devices</option>
            {filterOptions.deviceBrands.map(brand => (
              <option key={brand} value={brand} className="text-gray-900">{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Location Type</label>
          <select 
            value={filters.locationType || ''}
            onChange={(e) => handleFilterChange('locationType', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="" className="text-gray-900">All Locations</option>
            {filterOptions.locationTypes.map(locationType => (
              <option key={locationType} value={locationType} className="text-gray-900">{locationType}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Digital Interest</label>
          <select 
            value={filters.digitalInterest || ''}
            onChange={(e) => handleFilterChange('digitalInterest', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="" className="text-gray-900">All Interests</option>
            {filterOptions.digitalInterests.map(interest => (
              <option key={interest} value={interest} className="text-gray-900">{interest}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  )
}