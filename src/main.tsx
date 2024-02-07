import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './Store/FirebaseContext';
import { db,auth,storage } from './Firebase/config'

ReactDOM.render(
<FirebaseContext.Provider value={{ db,auth,storage }}>
    <App />
</FirebaseContext.Provider>, document.getElementById('root'));
