import React from 'react'
import {RouteComponentProps} from 'react-router-dom'
import queryString from 'query-string'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import agent from '../../App/api/agent'
import { toast } from 'react-toastify'

const RegisterSuccess: React.FC<RouteComponentProps> = ({ location }) => {
    const { email } = queryString.parse(location.search)

    const handleConfirmEmailResend = () => {
        agent.User.resendVerifyEmailConfirm(email as string).then(() => {
            toast.success('Verification email resent = please check your email')
        }).catch((error) => console.log(error))
    }

    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='check' />
            </Header>

            <Segment.Inline>
                <div className="center">
                    <p>Please check your mail (including junk folder) for the verification email</p>
                    {email &&
                        <>
                            <p>Didn't receive an email? Please request another from the button below</p>
                            <Button onClick={handleConfirmEmailResend} primary content='Resend email' size='huge'/>
                        </>
                    }
                </div>
            </Segment.Inline>
        </Segment>
    )
}

export default RegisterSuccess
