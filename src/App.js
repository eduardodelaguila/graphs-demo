import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Nav from "./components/Nav";
import { Line } from "./components/Victory";
import { Line as ULine } from "./components/Uber";
import { Line as SLine } from "./components/Spotify";
import { Line as NLine } from "./components/Nivo";
import { Line as ALine } from "./components/Apex";
import { Line as CLine } from "./components/ChartJS";

import "./App.scss";
import "../node_modules/react-vis/dist/style.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route exact path="/victory">
                        <Redirect to="/victory/line" />
                    </Route>
                    <Route path="/victory/line">
                        <Line />
                    </Route>
                    <Route exact path="/uber">
                        <Redirect to="/uber/line" />
                    </Route>
                    <Route path="/uber/line">
                        <ULine />
                    </Route>
                    <Route exact path="/spotify">
                        <Redirect to="/spotify/line" />
                    </Route>
                    <Route path="/spotify/line">
                        <SLine />
                    </Route>
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
        </Router>
    );
}

export default App;
