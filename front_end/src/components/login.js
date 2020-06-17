import React from 'react';
import ReactDOM from 'react-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Bg from './particle-background.gif';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0
        }
    }

    input_change() {
        return (e) => {
            this.setState({ i: e.target.value });
        }
    }
    render() {
        let sty = {
            textAlign: 'center'
        }
        let lik = {
            textDecoration: 'none',
            fontSize: '25px',
            fontFamily: 'Arial',
        }
        let i;
        return (
            <div style={{ backgroundImage: `url(${Bg})`, padding: '50px', minHeight: '100vh', paddingBottom: '100px' }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} style={{ padding: '10px 0px 20px 0px', textAlign: 'center' }}>
                        <h1>Enter User ID</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            i = document.getElementById('user').value;
                            console.log(i);
                        }
                        }
                        >

                            {/* <Input type='text' id='user' onChange={this.input_change()} /><br /><br /> */}
                            <TextField label="UserID" variant="outlined" id='user' onChange={this.input_change()} /><br /><br />
                            <Link href={`Submit/${this.state.i}`} style={lik}>Submit</Link>
                        </form>

                    </Paper>
                </Container>
            </div>
        )
    }
}


export default Login;
