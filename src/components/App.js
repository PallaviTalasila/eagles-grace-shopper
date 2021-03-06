import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Header,
  Products,
  Login,
  Register,
  OrderHistory,
  Cart,
  CheckOut,
} from "../components";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const loginKey = localStorage.getItem(`Token`);
  const userNameKey = localStorage.getItem(`Username`);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(loginKey ? loginKey : false);
  const [loggedIn, setLoggedIn] = useState(loginKey ? true : false);
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <Router>
        <Header
          setUsername={setUsername}
          setPassword={setPassword}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          count={count}
        />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <Register
                {...props}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                userToken={userToken}
                setUserToken={setUserToken}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setEmail={setEmail}
                email={email}
              />
            )}
          />
          <Route
            path="/products"
            render={(props) => (
              <Products
                {...props}
                products={products}
                setProducts={setProducts}
                count={count}
                setCount={setCount}
                username={username}
              />
            )}
          />
          <Route
            path="/myOrders"
            render={(props) => (
              <OrderHistory
                {...props}
                username={username}
                loggedIn={loggedIn}
              />
            )}
          />

          <Route
            exact
            path="/cart"
            render={(props) => (
              <Cart
                {...props}
                username={username}
                loggedIn={loggedIn}
                setCartData={setCartData}
                cartData={cartData}
              />
            )}
          />
          <Route
            exact
            path="/checkout"
            render={(props) => (
              <CheckOut {...props} username={username} loggedIn={loggedIn} />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              <Products
                {...props}
                products={products}
                setProducts={setProducts}
                count={count}
                setCount={setCount}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
