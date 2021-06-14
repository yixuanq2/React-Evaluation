import React from 'react'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './HobbyTable.css';
export default class HobbyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hobbyList: ["Hobby"],
            curHobby: "Hobby",
            ageCountList: [],
        }
    }

    getHobbies = () => {
        fetch("http://localhost:3000/hobbies")
            .then(res => res.json())
            .then(res => this.setState({hobbyList: ["Hobby", ...res]}));
    }

    getAgeCount = (hobby) => {
        fetch(`http://localhost:3000/users/age/${hobby}`)
            .then(res => res.json())
            .then(res => this.setState({ageCountList: res}));
    }


    handleSelect = (eventKey) => {
        this.getAgeCount(eventKey);
        this.setState({
            curHobby: eventKey
        })
    }


    componentDidMount() {
        this.getHobbies();

    }


    render() {
        const {hobbyList, curHobby, ageCountList} = this.state
        return (
            <div>
                <h2> Age Demographic of Users with hobby</h2>
                <p> Hobby</p>
                <DropdownButton title={curHobby} >
                    {hobbyList.map((item, index) => (
                        <Dropdown.Item onSelect={this.handleSelect} eventKey={item} key={index}>{item} </Dropdown.Item>
                    ))}

                </DropdownButton>

                {(curHobby !== "Hobby") &&
                <Table bordered hover size="sm" className="tb">
                    <thead>
                    <tr>
                        <th>Age</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ageCountList.map((item,index)=>(
                                <tr key={index}>
                                    <td>
                                        {item.age}
                                    </td>
                                    <td>
                                        {item.count}
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
                }
            </div>
        )
    }


}