import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function ToastHandler(handleToast) {
  const navigate = useNavigate();
  useEffect(function () {
    navigate('/');
  }, []);

  handleToast();

  return <div></div>;
}

export default ToastHandler;
