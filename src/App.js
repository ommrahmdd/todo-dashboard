import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Nav from "./components/nav/nav";
import Sidebar from "./components/sidebar/sidebar";
// import { Provider } from "react";
import "./App.css";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store/store";

function App() {
  let [activeComp, setActiveComp] = useState("Platform Launch");
  return (
    <>
      <Router>
        <Provider store={store}>
          <div className="customApp row g-0">
            <div className="customNav">
              <Nav />
            </div>
            <div className="customSidebar d-lg-block d-none col-lg-3">
              <Sidebar />
            </div>
            <div className="customComp col-lg-9 p-0 m-0">
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </div>
        </Provider>
      </Router>
    </>
  );
}

export default App;
