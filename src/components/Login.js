import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <section className="container">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
            </section>
        )
    }
}

export default Login;