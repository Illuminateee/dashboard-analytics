const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

console.log('🔗 API_BASE_URL:', API_BASE_URL);

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

// Helper function to create query params only for non-empty values
const createQueryParams = (filters?: AnalyticsFilters): string => {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      params.append(key, value);
    }
  });
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

// Make sure all functions are properly exported
export async function fetchGenderStats(filters?: AnalyticsFilters): Promise<GenderStat[]> {
  try {
    const queryString = createQueryParams(filters);
    const url = `${API_BASE_URL}/api/analytics/gender${queryString}`;
    console.log('🌐 Fetching Gender Stats:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ApiResponse<GenderStat[]> = await response.json();
    console.log('📊 Gender Stats Response:', result);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching gender stats:', error);
    throw new Error('Failed to fetch gender stats');
  }
}

export async function fetchLocationStats(filters?: AnalyticsFilters): Promise<LocationStat[]> {
  try {
    const queryString = createQueryParams(filters);
    const url = `${API_BASE_URL}/api/analytics/location${queryString}`;
    console.log('🌐 Fetching Location Stats:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ApiResponse<LocationStat[]> = await response.json();
    console.log('📊 Location Stats Response:', result);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching location stats:', error);
    throw new Error('Failed to fetch location stats');
  }
}

export async function fetchAgeGroupStats(filters?: AnalyticsFilters): Promise<AgeGroupStat[]> {
  try {
    const queryString = createQueryParams(filters);
    const url = `${API_BASE_URL}/api/analytics/age-groups${queryString}`;
    console.log('🌐 Fetching Age Group Stats:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ApiResponse<AgeGroupStat[]> = await response.json();
    console.log('📊 Age Group Stats Response:', result);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching age group stats:', error);
    throw new Error('Failed to fetch age group stats');
  }
}

export async function fetchDigitalInterestStats(filters?: AnalyticsFilters): Promise<DigitalInterestStat[]> {
  try {
    const queryString = createQueryParams(filters);
    const url = `${API_BASE_URL}/api/analytics/digital-interest${queryString}`;
    console.log('🌐 Fetching Digital Interest Stats:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ApiResponse<DigitalInterestStat[]> = await response.json();
    console.log('📊 Digital Interest Stats Response:', result);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching digital interest stats:', error);
    throw new Error('Failed to fetch digital interest stats');
  }
}

export async function fetchDeviceStats(filters?: AnalyticsFilters): Promise<DeviceStat[]> {
  try {
    const queryString = createQueryParams(filters);
    const url = `${API_BASE_URL}/api/analytics/devices${queryString}`;
    console.log('🌐 Fetching Device Stats:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ApiResponse<DeviceStat[]> = await response.json();
    console.log('📊 Device Stats Response:', result);
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching device stats:', error);
    throw new Error('Failed to fetch device stats');
  }
}