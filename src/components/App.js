import CreateImage from "./CreateImage";
import UploadImage from "./UploadImage";
import Mint from "./Mint";
import {Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import {Component} from 'react';
import MintedTokens from "./MintedTokens";

export const history = createBrowserHistory();

class App extends Component {

    constructor() {
        super();    
        this.state = {
            imageData: [],
        };
      }

    render() {return (
    <Router history={history}>
        <Switch>
            <Route path={"/"} exact component={CreateImage} />
            <Route path="/upload" component={UploadImage} />        
            <Route path="/mint" component={Mint} />
            <Route path="/minted-tokens" component={MintedTokens} />
        </Switch>
    </Router>
    );
}
}
export default App;