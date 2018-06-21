import React from 'react';
import Aux from '../../hoc/aux';
import Classes from './layout.css';
import Toolbar from '../Navigations/Toolbar/Toolbar';

const layout = ( props ) => {
  return (
  <Aux>
     <Toolbar />
     <main className={Classes.Content}>
       { props.children}
     </main>
  </Aux>
);
}
export default layout;
