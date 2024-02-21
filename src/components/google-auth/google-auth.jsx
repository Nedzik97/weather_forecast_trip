import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import styles from './google-auth.module.scss';

export const GoogleAuthComponent = () => {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);
    const { name, picture } = decoded;

    const userData = { name, picture };
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  return (
    <div className={styles.googleAuthContainer}>
      {localStorage.getItem('user') ? (
        <div className={styles.userInfo}>
          <div className={styles.buttonWrapper}>
            <span className={styles.userName}>
              {JSON.parse(localStorage.getItem('user')).name}
            </span>
            <img
              src={JSON.parse(localStorage.getItem('user')).picture}
              alt="User"
              className={styles.userPicture}
            />
          </div>

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
