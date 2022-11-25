
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import Login from '../../pages/login';


const requiredauth = ( Component,pageProps) => {
    const Auth = (props) => {
      // Login data added to props via redux-store (or use react context for example)
      const token = useSelector(selectCurrentToken);
      // If user is not logged in, return login component
      if (!token) {
        return (
          <Login />
        );
      }
  
      // If user is logged in, return original component
      const getLayout = Component.getLayout || ((page) => page);
      return (
        getLayout(<Component {...pageProps} />)
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
export default requiredauth;
