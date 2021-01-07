import React, {useContext, useEffect} from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { RootStoreContext } from '../../App/stores/rootStore'
import { RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../App/layout/LoadingComponent'

interface RouteParams {
    username: string;
  }
  
interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
    const rootStore = useContext(RootStoreContext)
    const {loadingProfile, profile, loadProfile} = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username);
      }, [loadProfile, match]);

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />;

    return (
        <div>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!}/>
                <ProfileContent />
            </Grid.Column>
        </div>
    )
}

export default ProfilePage
