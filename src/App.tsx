import './App.css';
import Home from './Home';
import LoginButton from './Login';

import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  
  return (
      isAuthenticated ?
      <div>
        <Home />
      </div>  : <LoginButton />
  )
}

export default App
