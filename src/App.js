import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class Form extends React.Component {
    state = {
        userName: ''
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.userName);
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);

        const fetchedProfile = {
            name: resp.data.login,
            avatar_url: resp.data.avatar_url,
            company: resp.data.company,
        };
        console.log(fetchedProfile);
        this.props.onSubmit(fetchedProfile);
        this.setState({userName: ''})

    };

    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Github username" required value={this.state.userName}
                       onChange={event => this.setState({userName: event.target.value})}/>
                <button>Add user</button>
            </form>
        );
    }
}


const CardList = (props) => {
    return (<div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>);
};

class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile" style={{margin: '1rem'}}>
                <img src={profile.avatar_url}/>
                <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
                    <div className="name" style={{fontSize: '125%'}}>{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        )

    }
}

class App extends React.Component {
    state = {
        profiles: [],
    };
    addNewProfile = (profileData) => {
        console.log(profileData);
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData]
        }))
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                <div className="header">{this.props.title}</div>
                <div><Form onSubmit={this.addNewProfile}/>
                    <CardList profiles={this.state.profiles}/>
                </div>
                </header>
            </div>
        )
    }
}


export default App;
