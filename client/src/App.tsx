import React, { useEffect, useState } from 'react';
import './App.css';
import Allroutes from './pages/AllRoutes.tsx';
import { useSelector } from 'react-redux';
import Loader from './components/Loader.tsx';
import Toast from './components/Toast.tsx';
import Sidebar from './components/SideBar.tsx';

function App() {
  const isLoading = !!useSelector((state: any) => state?.notification?.isLoading);
  const isLogedIn = !!useSelector((state: any) => state?.auth?.loginData?.token);

  const notificationData = useSelector((state: any) => state?.notification);
  
  const [showToast, setShowToast] = useState<boolean>(false)

  useEffect(() => {
    notificationData.triggerNumber && setShowToast(true)
  }, [notificationData.triggerNumber])
  return (
    <div className="App">
      {isLogedIn && <Sidebar />}
      {isLoading && <Loader />}
      {showToast && notificationData.status && <Toast
        status={notificationData.status}
        message={notificationData.message}
        duration={3000}
        onClose={() => setShowToast(false)}
      />}

      <Allroutes />
    </div>
  );
}

export default App;
