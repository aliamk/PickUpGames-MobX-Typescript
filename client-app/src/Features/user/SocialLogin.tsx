import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

interface IProps {
    fbCallback: (response: any) => void;
}

const SocialLogin: React.FC<IProps> = ({fbCallback}) => {
    return (
        <div>
            <FacebookLogin 
                appId="464450101591130"     // This doesn't need to be hidden
                fields="name,email,picture" // the fields we want back from FB
                callback={fbCallback}
                render={(renderProps: any) => {
                    return (
                        <Button onClick={renderProps.onClick} type="button" fluid color="facebook">
                            <Icon name="facebook" />
                            Login with Facebook
                        </Button>
                    )
                } }
            />
        </div>
    )
}

export default observer(SocialLogin)