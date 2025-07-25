const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

console.log('🔗 API_BASE_URL:', API_BASE_URL); // Add this line for debugging

export interface GenderStat {
  gender: string
  count: number
}

export interface LocationStat {
  locationType: string
  count: number
}

export interface AgeGroupStat {
  ageGroup: string
  count: number
}

export interface DigitalInterestStat {
  digitalInterest: string
  count: number
}

export interface DeviceStat {
  brandDevice: string
  count: number
}

// Add filter interface
export interface AnalyticsFilters {
  ageGroup?: string
  brandDevice?: string
  locationType?: string
  digitalInterest?: string
  gender?: string
}

// Add response wrapper interface to match backend format
interface ApiResponse<T> {
  success: boolean
  data: T
}

// Make sure all functions are properly exported
export async function fetchGenderStats(filters?: AnalyticsFilters): Promise<GenderStat[]> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }
    
    const url = `${API_BASE_URL}/api/analytics/gender${params.toString() ? `?${params.toString()}` : ''}`
    console.log('🌐 Fetching Gender Stats:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<GenderStat[]> = await response.json()
    console.log('📊 Gender Stats Response:', result)
    return result.data || []
  } catch (error) {
    console.error('❌ Error fetching gender stats:', error)
    throw new Error('Failed to fetch gender stats')
  }
}

export async function fetchLocationStats(filters?: AnalyticsFilters): Promise<LocationStat[]> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }
    
    const url = `${API_BASE_URL}/api/analytics/location${params.toString() ? `?${params.toString()}` : ''}`
    console.log('🌐 Fetching Location Stats:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<LocationStat[]> = await response.json()
    console.log('📊 Location Stats Response:', result)
    return result.data || []
  } catch (error) {
    console.error('❌ Error fetching location stats:', error)
    throw new Error('Failed to fetch location stats')
  }
}

export async function fetchAgeGroupStats(filters?: AnalyticsFilters): Promise<AgeGroupStat[]> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }
    
    const url = `${API_BASE_URL}/api/analytics/age-groups${params.toString() ? `?${params.toString()}` : ''}`
    console.log('🌐 Fetching Age Group Stats:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<AgeGroupStat[]> = await response.json()
    console.log('📊 Age Group Stats Response:', result)
    return result.data || []
  } catch (error) {
    console.error('❌ Error fetching age group stats:', error)
    throw new Error('Failed to fetch age group stats')
  }
}

export async function fetchDigitalInterestStats(filters?: AnalyticsFilters): Promise<DigitalInterestStat[]> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }
    
    const url = `${API_BASE_URL}/api/analytics/digital-interest${params.toString() ? `?${params.toString()}` : ''}`
    console.log('🌐 Fetching Digital Interest Stats:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<DigitalInterestStat[]> = await response.json()
    console.log('📊 Digital Interest Stats Response:', result)
    return result.data || []
  } catch (error) {
    console.error('❌ Error fetching digital interest stats:', error)
    throw new Error('Failed to fetch digital interest stats')
  }
}

export async function fetchDeviceStats(filters?: AnalyticsFilters): Promise<DeviceStat[]> {
  try {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
    }
    
    const url = `${API_BASE_URL}/api/analytics/devices${params.toString() ? `?${params.toString()}` : ''}`
    console.log('🌐 Fetching Device Stats:', url)
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: ApiResponse<DeviceStat[]> = await response.json()
    console.log('📊 Device Stats Response:', result)
    return result.data || []
  } catch (error) {
    console.error('❌ Error fetching device stats:', error)
    throw new Error('Failed to fetch device stats')
  }
}

// Add function to get filter options
export async function fetchFilterOptions(): Promise<{
  ageGroups: string[]
  deviceBrands: string[]
  locationTypes: string[]
  digitalInterests: string[]
  genders: string[]
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/filter-options`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    console.log('📋 Filter Options Response:', result)
    return result.data || {
      ageGroups: [],
      deviceBrands: [],
      locationTypes: [],
      digitalInterests: [],
      genders: []
    }
  } catch (error) {
    console.error('❌ Error fetching filter options:', error)
    // Return default options based on your dataset
    return {
      ageGroups: ['18-25', '26-35', '36-45', '46-55', '55+'],
      deviceBrands: ['Samsung', 'Apple', 'Google', 'Huawei', 'OnePlus', 'LG', 'Sony', 'Nokia', 'Motorola', 'Xiaomi'],
      locationTypes: ['urban', 'sub urban', 'coastal', 'metropolitan', 'Suburban Fringe'],
      digitalInterests: ['Social Media', 'Technology', 'Gaming', 'Music', 'News', 'Sport', 'E-commerce', 'Podcast'],
      genders: ['Male', 'Female']
    }
  }
}