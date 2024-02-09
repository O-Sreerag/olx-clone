import React, { useContext, useState} from 'react';
import UserContext from '../../context/userContext';
import supabase from '../../config/supabase';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';


function Header() {
  const { user } = useContext(UserContext);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Clear the local storage or perform any other necessary cleanup
      localStorage.removeItem('supabaseSession');
      setShowLogout(false);
      // Optionally, redirect the user to the login page or home page
    } catch (error) {
      console.error('Error logging out:', (error as Error).message);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {user ? (
          <div className="userSection">
            <span onClick={() => setShowLogout(!showLogout)}>{user.email}</span>
            {showLogout && (
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className="loginPage">
            <span>Login</span>
            <hr />
          </div>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
