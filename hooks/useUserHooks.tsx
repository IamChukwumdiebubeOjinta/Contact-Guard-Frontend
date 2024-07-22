import { useApiService } from '@/context/HuxApiServiceContext';
import { useState, useEffect } from 'react';

const useUserInfo = () => {
  const { apiService } = useApiService();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiService.get('/user');
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching user info');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [apiService]);

  return { userInfo, loading, error };
};

export default useUserInfo;