import React from 'react'
import Table from 'react-bootstrap/Table'
import "./UserTable.css"
export default class UserTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userList:[],
        }
    }

    getUserInfo=()=> {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(res => this.setState({ userList: res }));
    }

    componentDidMount() {
        this.getUserInfo();
    }
    render() {
        const {userList} = this.state;
        return (
            <div>
                <h2 id="title">All Users </h2>
                <p id="info"> username and age</p>

                <Table bordered hover size="sm" className="tb" >
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userList.map((item,index)=>(
                            <tr key={index}>
                                <td>
                                    {item.username}
                                </td>
                                <td>
                                    {item.age}
                                </td>
                            </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}