import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserTable from "./Components/UserTable/UserTable";
import HobbyTable from "./Components/HobbyTable/HobbyTable";

const App = () => <div className="App">
    <UserTable></UserTable>
    <HobbyTable></HobbyTable>
</div>;

ReactDOM.render(<App />, document.getElementById('root'));