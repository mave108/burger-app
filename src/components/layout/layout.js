import React from 'react';
import Aux from '../../hoc/aux';
import Classes from './layout.css';

const layout = ( props ) => {
  return (
  <Aux>
     <div>Toolsbars, Sidedrawers, Backdrops</div>
     <main className={Classes.Content}>
       { props.children}
     </main>
  </Aux>
);
}
export default layout;
