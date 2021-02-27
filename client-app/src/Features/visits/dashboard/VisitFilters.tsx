import React, { Fragment, useContext } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import { RootStoreContext } from '../../../App/stores/rootStore';
import { observer } from 'mobx-react-lite';

const VisitFilters = () => {

  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.visitStore;

  return (
    <Fragment>
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
        {/* FILTER MENU */}
        <Header icon={'filter'} attached content={'Filters'} />
        <Menu.Item
          active={predicate.size === 0} // are there any key-value pairs in the predicate Map (see observable predicate in visitStore)
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Visits'}
        />
        <Menu.Item
          active={predicate.has('isGoing')} // are there any 'isGoing' key-value pairs in the predicate Map (see observable predicate in visitStore)
          onClick={() => setPredicate('isGoing', 'true')}
          color={'blue'}
          name={'username'}
          content={"I'm Going"}
        />
        <Menu.Item
          active={predicate.has('isHost')}  // are there any 'isHost' key-value pairs in the predicate Map (see observable predicate in visitStore)
          onClick={() => setPredicate('isHost', 'true')}
          color={'blue'}
          name={'host'}
          content={"I'm hosting"}
        />
      </Menu>

      {/* CALENDAR - Header & react widget */}
      <Header icon={'calendar'} attached content={'Select Date'} />
      <Calendar
        onChange={date => setPredicate('startDate', date!)}
        value={predicate.get('startDate') || new Date()}
      />

    </Fragment>
  );
};

export default observer(VisitFilters);