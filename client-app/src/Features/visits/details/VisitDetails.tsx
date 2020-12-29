import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, Image } from 'semantic-ui-react'

import VisitStore from '../../../App/stores/visitStore'
import { Link, RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../../App/layout/LoadingComponent'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
  id: string
}

const VisitDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

  const visitStore = useContext(VisitStore)
  const { visit, openEditForm, cancelSelectedVisit, loadVisit, loadingInitial } = visitStore

  useEffect(() => {
    loadVisit(match.params.id)
  }, [loadVisit, match.params.id])

  if (loadingInitial || !visit) return <LoadingComponent content='Loading activity...' />

  return (
        <Card fluid>
        <Image src={`/assets/locationImages/${visit!.location}.png`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{visit!.title}</Card.Header>
          <Card.Meta>
            <span>{visit!.date}</span>
          </Card.Meta>
          <Card.Description>
            {visit!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>    
            <Button.Group widths={2}>
                <Button as={Link} to={`/manage/${visit.id}`} basic color='blue' content='Edit' />    
                <Button onClick={() => history.push('/visits')} basic color='grey' content='Cancel' />
            </Button.Group>     
        </Card.Content>
      </Card>
    )
}

export default observer(VisitDetails)
