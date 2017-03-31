import React from 'react';

export default class SelectInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: null,
            value: props.selectedValue || '',
            touched: null
        }
        this.update = this.update.bind(this);
    }

    update(e) {
        let select = e.target,
        newState = window.Object.assign({}, this.state);
        
        newState.valid = select.validity.valid; // Constraint validation api
        newState.value = select.value;
        newState.touched = true;

        this.setState(newState, () => {
            this.props.onValidate({
                name: this.props.name,
                value: newState.value
            })
        });
    }

    componentWillMount() {
        this.props.onValidate({
            name: this.props.name,
            value: this.state.value
        });
    }

    render () {
        const selectProps = window.Object.assign({}, this.props);
        delete selectProps.onValidate;
        delete selectProps.selectedValue;

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
                <select className="form-control" {...selectProps} value={this.state.value} onChange={this.update}>
                    {this.props.data.map((option, key) => {
                        return (<option key={key} value={option.value}>{option.label}</option>)
                    })}
                </select> 
                {errorMessage}
            </div>
        )
    }
}