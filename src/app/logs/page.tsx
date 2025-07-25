'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation/navigation'
import { type AnalyticsFilters } from '@/services/api'
import FilterPanel from '@/components/filters/FilterPanel'
import LoginHourChart from '@/components/loginlogs/LoginLogs'

export default function LogsPage() {
  const [filters, setFilters] = useState<AnalyticsFilters>({})

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    console.log('🔄 Login Logs Filters changed:', newFilters)
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Login Logs & User Analytics</h1>
          <p className="mt-2 text-gray-600">Track user login patterns and detailed user information</p>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          filters={filters} 
          onFiltersChange={handleFiltersChange}
          loading={false}
        />

        {/* Login Hour Distribution Chart */}
        <div className="mb-8">
          <LoginHourChart filters={filters} />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to View User Details
          </h3>
          <div className="text-blue-800">
            <ul className="list-disc list-inside space-y-1">
              <li>Click on any bar in the Login Hour chart to see users who logged in at that time</li>
              <li>Use the filters above to narrow down the data by gender, age group, device, etc.</li>
              <li>The modal will show detailed user information including names, emails, and phone numbers</li>
            </ul>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).some(key => filters[key as keyof AnalyticsFilters]) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h3>
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
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 font-bold"
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