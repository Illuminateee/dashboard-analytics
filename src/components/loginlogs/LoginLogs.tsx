'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserDetailsModal from '../usersdetails/UserDetails';

interface LoginHourData {
  loginHour: string;
  count: number;
  userCount: number;
}

interface LoginHourChartProps {
  filters: any;
}

export default function LoginHourChart({ filters }: LoginHourChartProps) {
  const [data, setData] = useState<LoginHourData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      // Create query params only if filters exist and have values
      const queryParams = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== '') {
            queryParams.append(key, value);
          }
        });
      }
      
      const queryString = queryParams.toString();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/analytics/login-hours${queryString ? `?${queryString}` : ''}`;
      
      console.log('🌐 Fetching login hours from:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching login hour data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleBarClick = (data: any) => {
    setSelectedHour(data.loginHour);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Login Hour Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="loginHour" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#3B82F6" 
              cursor="pointer"
              onClick={handleBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          Click on any bar to view users for that login hour
        </p>
      </div>

      <UserDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        filters={{ ...filters, loginHour: selectedHour }}
        title={`Users who logged in at ${selectedHour}`}
      />
    </>
  );
}