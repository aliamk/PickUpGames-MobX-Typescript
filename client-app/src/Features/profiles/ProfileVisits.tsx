import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserVisit } from '../../App/models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../App/stores/rootStore';

// Semantic-ui Tab for three menu items
const panes = [
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

const ProfileEvents = () => {
    // Access rootStore and destructure profileStore
  const rootStore = useContext(RootStoreContext);
  const { loadUserVisits, profile, loadingVisits, userVisits } = rootStore.profileStore!;

  // Load the loadUserVisits action
  useEffect(() => {
    loadUserVisits(profile!.username);
  }, [loadUserVisits, profile]);

  // Method for changing tabs in the <Tab> in the return statement
  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = 'past';
        break;
      case 2:
        predicate = 'hosting';
        break;
      default:
        predicate = 'future';
        break;
    }
    loadUserVisits(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingVisits}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={'Visits'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userVisits.map((visit: IUserVisit) => (
              <Card
                as={Link}
                to={`/visits/${visit.id}`}
                key={visit.id}
              >
                <Image
                  src={`/assets/games/${visit.title}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{visit.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(visit.date), 'do LLL')}</div>
                    <div>{format(new Date(visit.date), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileEvents);