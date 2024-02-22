import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import defaultPicture from '../../assets/icons/default-picture.png';

import styles from './google-auth.module.scss';

export const GoogleAuthComponent = () => {
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(getFromLocalStorage('user'));

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    const { name, picture } = decoded;

    const userPicture = picture ? picture : defaultPicture;

    const userData = {
      name,
      picture: userPicture,
    };

    setUser(userData);
    saveToLocalStorage('user', userData);
  };

  const handleLoginError = () => {
    setError('Error occurred during authorization');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.googleAuthContainer}>
      {user ? (
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <img src={user.picture} alt="user" className={styles.userPicture} />
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          type="icon"
          theme="filled_blue"
        />
      )}
    </div>
  );
};
