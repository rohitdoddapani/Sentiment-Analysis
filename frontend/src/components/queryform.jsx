import React from 'react';
import '../css/style.css';

class QueryForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
            submit_disabled: true,
            sentiment: ''
        };
    }

    handleChange = event =>{
        this.setState({
            value: event.target.value
        });

        if(event.target.value.trim() !== ''){
            this.setState({
                submit_disabled: false
            });
        }else{
            this.setState({
                submit_disabled: true
            });
        }
    }

    fetchSentiment = () => {
        fetch('/sentilize',{
            method: 'post',
            body: JSON.stringify({
                sentence: this.state.value
            })
        })
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({
                sentiment: responseJSON.sentiment
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let response_div ='';
        if(this.state.sentiment !== ''){
            response_div = <div className="response">
                <h3>Sentiment:</h3><div className="response-text wpcf7-response-output">{ this.state.sentiment }</div>
            </div>;
        }
        return(
            <div className="query-page-wrapper">
                <h1 className="page-heading">Sentilizer Welcomes You</h1>
                <div className="query-form-wrapper">
                    <textarea placeholder="Enter text here to analyze its sentiment:" id="sentiment" value={this.state.value} onChange={ this.handleChange } />
                    <input className="wpcf7-submit btn" type="button" disabled={ this.state.submit_disabled } onClick={ this.fetchSentiment } value="submit" />
                </div>
                { response_div }
                
            </div>

        )
    }
}


export default QueryForm;