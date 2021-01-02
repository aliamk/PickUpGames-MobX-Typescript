import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { IUserFormValues } from '../../App/models/user';
import { RootStoreContext } from '../../App/stores/rootStore';


const LoginForm = () => {
    
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values)}
            
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                <Field name='email' component={TextInput} placeholder='Email' />
                <Field
                    name='password'
                    component={TextInput}
                    placeholder='Password'
                    type='password'
                />
                <Button positive content='Login' />
                </Form>
            )}
        />
    );
};

export default LoginForm;