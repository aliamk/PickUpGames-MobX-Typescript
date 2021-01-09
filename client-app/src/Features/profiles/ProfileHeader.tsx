import React from 'react';
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from 'semantic-ui-react';
import { IProfile } from '../../App/models/profile';
import { observer } from 'mobx-react-lite';

interface IProps {
  profile: IProfile;
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Attending' value='5' />
            <Statistic label='Attended' value='42' />
          </Statistic.Group>
          <Divider />
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: '100%' }}>
                <Button fluid color='teal' content= 'Direct Message' />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button fluid basic color={true ? 'red' : 'green'} /*content={true ? 'Unfollow' : 'Follow'}*/ />
              </Reveal.Content>
            </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);

  // isCurrentUser: boolean;
  // loading: boolean;
  // follow: (username: string) => void;
  // unfollow: (username: string) => void;