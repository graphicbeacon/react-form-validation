import React from 'react';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: null,
            value: null,
            touched: null
        };
        this.update = this.update.bind(this);
    }

    update(e) {
        let input = e.target,
        newState = window.Object.assign({}, this.state);
        
        newState.valid = input.validity.valid; // Constraint validation api
        newState.value = input.value;
        newState.touched = true;

        this.setState(newState, () => {
            if(newState.valid) {
                this.props.onValidate({
                    name: this.props.name,
                    value: newState.value
                })
            }
        });
    }

    componentWillMount() {
        this.props.onValidate({
            name: this.props.name,
            value: this.state.value
        });
    }

    render() {
        const inputProps = window.Object.assign({}, this.props);
        delete inputProps.onValidate;

        let formGroupClasses = 'form-group', errorMessage;

        if(this.state.touched && !this.state.valid) {
            formGroupClasses += ' has-error';
            errorMessage = <span className="help-block">Problems with validation</span>
        } else if(this.state.touched && this.state.valid) {
            formGroupClasses += ' has-success';
        }

        return (
            <div className={formGroupClasses}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input className="form-control" {...inputProps} onChange={this.update} /> 
                {errorMessage}
            </div>
        )
    }
}

TextInput.defaultProps = {
    type: 'text'
}

