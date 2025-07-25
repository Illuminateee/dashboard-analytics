'use client'

import { useState, useEffect } from 'react'
import { AnalyticsFilters, fetchFilterOptions } from '@/services/api'

interface FilterPanelProps {
  filters: AnalyticsFilters
  onFiltersChange: (filters: AnalyticsFilters) => void
  loading?: boolean
}

// For now, let's use hardcoded filter options since the API endpoint might be missing
const defaultFilterOptions = {
  ageGroups: ['18-25', '26-35', '36-45', '46-55', '55+'],
  deviceBrands: ['Samsung', 'Apple', 'Google', 'Huawei', 'OnePlus', 'LG', 'Sony', 'Nokia'],
  locationTypes: ['urban', 'suburban', 'coastal', 'metropolitan'],
  digitalInterests: ['Social Media', 'Technology', 'Gaming', 'Music', 'News', 'Sport', 'E-commerce'],
  genders: ['Male', 'Female']
}

export default function FilterPanel({ filters, onFiltersChange, loading }: FilterPanelProps) {
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions()
        setFilterOptions(options)
      } catch (error) {
        console.error('Failed to load filter options:', error)
      }
    }
    loadFilterOptions()
  }, [])

  const handleFilterChange = (key: keyof AnalyticsFilters, value: string) => {
    console.log('🔧 Filter changed:', key, value)
    const newFilters = {
      ...filters,
      [key]: value === 'all' ? undefined : value
    }
    console.log('🔧 New filters:', newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    console.log('🧹 Clearing all filters')
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              disabled={loading}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={filters.gender || 'all'}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-gray-900 bg-white">All Genders</option>
            {filterOptions.genders.map((gender) => (
              <option key={gender} value={gender} className="text-gray-900 bg-white">
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Age Group Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
          <select
            value={filters.ageGroup || 'all'}
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-gray-900 bg-white">All Ages</option>
            {filterOptions.ageGroups.map((ageGroup) => (
              <option key={ageGroup} value={ageGroup} className="text-gray-900 bg-white">
                {ageGroup}
              </option>
            ))}
          </select>
        </div>

        {/* Device Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Device Brand</label>
          <select
            value={filters.brandDevice || 'all'}
            onChange={(e) => handleFilterChange('brandDevice', e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-gray-900 bg-white">All Brands</option>
            {filterOptions.deviceBrands.map((brand) => (
              <option key={brand} value={brand} className="text-gray-900 bg-white">
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Location Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
          <select
            value={filters.locationType || 'all'}
            onChange={(e) => handleFilterChange('locationType', e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-gray-900 bg-white">All Locations</option>
            {filterOptions.locationTypes.map((locationType) => (
              <option key={locationType} value={locationType} className="text-gray-900 bg-white">
                {locationType}
              </option>
            ))}
          </select>
        </div>

        {/* Digital Interest Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Digital Interest</label>
          <select
            value={filters.digitalInterest || 'all'}
            onChange={(e) => handleFilterChange('digitalInterest', e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white text-gray-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-gray-900 bg-white">All Interests</option>
            {filterOptions.digitalInterests.map((interest) => (
              <option key={interest} value={interest} className="text-gray-900 bg-white">
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm text-gray-600">Updating charts...</span>
        </div>
      )}
    </div>
  )
}