import React, {Component} from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import If from './If';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidForm: null,
            formValues: {
                name: null,
                email: null,
                age: null,
                country: null
            }
        };
        this.countryList = [
            {label: 'Please select', value: ''},
            {label: 'England', value: 'England'},
            {label: 'Wales', value: 'Wales'},
            {label: 'Scotland', value: 'Scotland'}
        ];
        this.setValue = this.setValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    setValue(valueObject) {
        let newState = window.Object.assign({}, this.state);
        newState.formValues[valueObject.name] = valueObject.value;
        newState.isValidForm = this.checkFormValidity();

        this.setState(newState, () => {
            console.log(this.state)
        });
    }
    
    checkFormValidity() {
        for(let field in this.state.formValues) {
            if(!this.state.formValues[field]) {
                return false;
            }
        }

        return true;
    }

    submit(e) {
        console.log(e);
        e.preventDefault();
    }

    render() {
        let submitButton;
        
        if(this.state.isValidForm) {
            submitButton = <button className="btn btn-primary" type="submit">Submit</button>;
        } else {
            submitButton = <button className="btn btn-primary" disabled={true} type="submit">Submit</button>;
        }

        return (
            <form onSubmit={this.submit} noValidate>
                <p>&nbsp;</p>
                <If condition={true}>
                    <TextInput 
                        label="Name" 
                        name="name" 
                        id="name" 
                        pattern="^[a-zA-Z\-' ]{0,255}$" 
                        onValidate={this.setValue} 
                        required 
                    />
                </If>
                <TextInput 
                    type="email" 
                    label="Email" 
                    name="email" 
                    id="email" 
                    pattern="^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$" 
                    onValidate={this.setValue} 
                    required 
                />
                <TextInput 
                    type="number" 
                    label="Age" 
                    name="age" 
                    id="age" 
                    pattern="^[0-9]+$" 
                    min="0" 
                    max="100" 
                    step="1" 
                    onValidate={this.setValue} 
                    required 
                />
                <SelectInput 
                    label="Country" 
                    name="country" 
                    id="country" 
                    data={this.countryList} 
                    selectedValue={this.countryList[1].value} 
                    onValidate={this.setValue} 
                    required 
                />
                {submitButton}
            </form>
        )
    }
}

export default FormContainer;