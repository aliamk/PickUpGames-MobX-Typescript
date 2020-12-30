import React, { Fragment } from 'react'
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
// import { RootStoreContext } from '../../../app/stores/rootStore';
// import {Form as FinalForm} from 'react-final-form';
// import { Link } from 'react-router-dom';
import { IVisit } from '../../../App/models/visit_interface';
// import TextAreaInput from '../../../app/common/form/TextAreaInput';
// import { observer } from 'mobx-react-lite';
// import {formatDistance} from 'date-fns';

const VisitDetailedChat: React.FC<{ visit: IVisit }> = ({ visit }) => {

    // const rootStore = useContext(RootStoreContext);
    
    // const {
    //   createHubConnection,
    //   stopHubConnection,
    //   addComment,
    //   activity
    // } = rootStore.activityStore;
  
    // useEffect(() => {
    //   createHubConnection();
    //   return () => {
    //     stopHubConnection();
    //   }
    // }, [createHubConnection, stopHubConnection])


    return (
        <Fragment>

            <Segment textAlign='center' attached='top' inverted color='teal' style={{ border: 'none' }} >
                <Header>Chat about this event</Header>
            </Segment>

            <Segment attached>
                <Comment.Group>
                
                <Comment>
                <Comment.Avatar src='/assets/user.png' />
                <Comment.Content>
                    <Comment.Author>Matt</Comment.Author>
                    <Comment.Metadata>
                    <div>{visit.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>Comment</Comment.Text>
                </Comment.Content>
                </Comment>
                

                <Form reply>
                   
                    <Form.TextArea>
                    
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form.TextArea>

                    </Form>

                </Comment.Group>
            </Segment>
        </Fragment>
    )
}

export default VisitDetailedChat
