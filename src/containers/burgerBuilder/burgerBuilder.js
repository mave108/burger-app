import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order'

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
    totalPrice: 4,
    purchasing: false,
    loading:false
  }
  componentDidmount(){
    axios.get("https://react-my-burger-app-c74f8.firebaseio.com/ingredients.json")
         .then( response => {
           //this.setState()
           console.log(response);
         });
  }
  purchasingHandler = () =>{
    if(this.purchasable() >= 0){
      this.setState( {purchasing:true} );
    }
  }

  purchasable = () =>{
    const ing = {...this.state.ingredients};
    return Object.entries(ing).map( (value,index)=>{
                         return value[1];
                 }).reduce((accu,curr)=>{
                         return accu+curr;
                 },0);
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

    if(this.state.ingredients[type] <= 0){
      //return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    //calculate new price
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const updatedPrice      = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ingredients:updatedIngredients,totalPrice: updatedPrice});
  }
  purchaseCancelHandler = () => {
    this.setState( {purchasing:false} );
  }
  purchaseContinueHandler = () =>{
    //display Loader
    this.setState( {loading:true} );
    const order = {
      ingredients:this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Rakesh",
        email: "rakeshkumar8900@gmail.com",
        address: {
          street: "test street",
          zipcode: "110078",
          country:"india"
        }
      }
    };
    axios.post("/orders.json",order)
         .then( response =>{
           this.setState( {loading:false,purchasing:false} );
         }).catch( error =>{
           this.setState( {loading:false,purchasing:false} );
           alert("An error occured while placing order please try again.");
         });
  }


  render() {
    let orderSummary = (
      <OrderSummary ingredients={this.state.ingredients}
       cancelPurchase={this.purchaseCancelHandler}
       continuePurchase={this.purchaseContinueHandler}
       price={this.state.totalPrice} />
    )
    if(this.state.loading){
      orderSummary =<Spinner />
    }
    return (
         <Aux>
          <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
              {orderSummary}
          </Modal>
           <Burger ingredients={this.state.ingredients}/>
           <BuildControls
              ingredientAdded={this.addIngredientsHandler}
              ingredientRemoved = {this.removeIngredientsHandler}
              ingredients={this.state.ingredients}
              price = {this.state.totalPrice}
              purchasable = {this.purchasable()}
              purchasing = {this.purchasingHandler}
              />
         </Aux>
       );
  }
}

export default BurgerBuilder;
