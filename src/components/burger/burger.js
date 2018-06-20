import React from 'react'
import BurgerIngredient from './burgerIngredient/burgerIngredient'
import Classes from './burger.css'

const burger = ( props ) =>{
   return (
      <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="bread-bottom" />
      </div>
   );
}

export default burger;
