import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard';

const Dashboard = (props) => {
  const { role, history } = props;
  const renderDashboard = (role) => {
    switch(role){
      case CONSTANTS.CUSTOMER:
        return <CustomerDashboard history={history} match={props.match} />
      case CONSTANTS.CREATOR: 
        return <CreatorDashboard history={history} match={props.match} />
      case CONSTANTS.MODERATOR:
        return <ModeratorDashboard history={history} match={props.match} />
      default: return;
    };
  };
  return (
    <div>
      <Header />
      {
          renderDashboard(role)
      }
      {console.log(role)}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
