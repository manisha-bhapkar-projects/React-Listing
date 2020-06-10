import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ListItems from './List_Items';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[],
      currentitem:{
        text:'',
        key:''
      }
    }
    this.handleInput = this.handleInput.bind(this);     //inside the constructor
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);


  }
  handleInput(e){
    this.setState({
      currentitem:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentitem;
    console.log(newItem);
    if(newItem.text!==""){
      const items = [...this.state.items, newItem];  
      //converts the items into separate item (...this.state.items) using destructuring
      //add into newItem   
      this.setState({
        items:items,
        currentitem:{
          text:'',
          key:'',
        }
      })
    }
 }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
}

setUpdate(text,key){
  console.log("items:"+this.state.items);
  const items = this.state.items;
  items.map(item=>{      
    if(item.key===key){
      console.log(item.key +"    "+key)
      item.text= text;
    }
  })
  this.setState({
    items: items
  })
  }

  render(){
    return(
      <div className="App">
        <header>
          <form id="CURD_operation" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter Text" 
          value={this.state.currentitem.text}
          onChange={this.handleInput}/>
          <button type="submit">Add</button>
          </form>
        </header>
        <ListItems items = {this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}/>
      </div>

          );
  }
}

export default App;

