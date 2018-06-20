import React from 'react'
import BurgerIngredient from './burgerIngredient/burgerIngredient'
import Classes from './burger.css'

const burger = ( props ) =>{

/*
  let transformedingredients = Object.keys(props.ingredients)
     .map( (igKey) => {
     return [...Array(props.ingredients[igKey])].map((_,i) =>{
        return <BurgerIngredient type="{igKey}" key={igKey+i} />
     });
   });
//console.log(transformedingredients);
*/


let transformedingredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        ;
        console.log(transformedingredients);
   return (
      <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top" />
             { transformedingredients }
            <BurgerIngredient type="bread-bottom" />
      </div>
   );
}

export default burger;
