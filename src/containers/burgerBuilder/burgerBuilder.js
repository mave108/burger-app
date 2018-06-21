import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
}

class BurgerBuilder extends Component{
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientsHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    //calculate new price
    updatedIngredients[type] = updatedCount;
    const updatedPrice      = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients:updatedIngredients,totalPrice: updatedPrice});
  }
  removeIngredientsHandler = (type) =>{
    const updatedIngredients = {
      ...this.state.ingredients
    }
    //calculate new price
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const updatedPrice      = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ingredients:updatedIngredients,totalPrice: updatedPrice});
  }

  render() {
       return (
         <Aux>
           <Burger ingredients={this.state.ingredients}/>
           <BuildControls
              ingredientAdded={this.addIngredientsHandler}
              ingredientRemoved = {this.removeIngredientsHandler}/>
         </Aux>
       );
  }
}

export default BurgerBuilder;
