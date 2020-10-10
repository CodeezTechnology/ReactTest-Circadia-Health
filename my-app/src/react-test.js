import React from 'react';
import axios from 'axios'
import LoadingScreen from 'react-loading-screen';

export class CalculateSquareRoot
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            number: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== '' && this.state.value !== null) {
            console.log("number " + this.state.value);
            this.setState({
                loading: true
            });
            axios.get(`http://localhost:5000/${this.state.value}`)
                .then(response => {
                    this.setState({ number: JSON.stringify(response.data.data) });
                    //debugger;
                    this.setState({
                        loading: false
                    });
                    console.log(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else {
            alert('Please enter any number');
        }

    }
    render() {
        return (
            /* eslint-disable */
            /* eslint-disable no-unused-expressions */
            <LoadingScreen
                loading={this.state.loading ? true : false}
                bgColor='#f1f1f1'
                spinnerColor='blue'
                textColor='#676767'
                logoSrc='/logo192.png'
                text='Please wait Square root is being calculating..'>

                <div>
                    <h3>React Test</h3>
                    <form onSubmit={this.handleSubmit} id="fmSubmit">
                        <label>  Number:
                <input
                                id="txtNumber"
                                type="number"
                                className="input-user"
                                placeholder="number"
                                value={this.state.value}
                                onChange={this.handleChange}
                                min="0" step="1"
                            />
                        </label>
                        <input
                            id="btnSubmit"
                            type="submit"
                            value="calculate square root"
                        />
                        <hr></hr>
                        <div>
                            <h1 id="txtResult">{this.state.number}</h1>
                        </div>
                    </form>
                </div>
            </LoadingScreen>
        );
    }
}

