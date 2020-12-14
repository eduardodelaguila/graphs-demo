import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Nav from "./components/Nav";
import { Line as NLine } from "./components/Nivo";
import { Line as ALine } from "./components/Apex";
import { Line as CLine } from "./components/ChartJS";

import DataSelector from "./components/DataSelector";
import DataContextProvider from "./context/DataContext";

import "./App.scss";
import "../node_modules/react-vis/dist/style.css";

function App() {
    return (
        <Router>
            <DataContextProvider>
                <div className="App">
                    <Nav />
                    <div className="App__content">
                        <DataSelector />
                        <Switch>
                            <Route exact path="/nivo">
                                <Redirect to="/nivo/line" />
                            </Route>
                            <Route path="/nivo/line">
                                <NLine />
                            </Route>
                            <Route exact path="/apex">
                                <Redirect to="/apex/line" />
                            </Route>
                            <Route path="/apex/line">
                                <ALine />
                            </Route>
                            <Route exact path="/chartjs">
                                <Redirect to="/chartjs/line" />
                            </Route>
                            <Route path="/chartjs/line">
                                <CLine />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </DataContextProvider>
        </Router>
    );
}

export default App;
