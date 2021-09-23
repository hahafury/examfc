import React from 'react';
import styles from '../../Brief/Brief.module.sass';
import CONSTANTS from '../../../constants';
import { connect } from 'react-redux';
import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';
import { moderationVerdict } from '../../../actions/actionCreator';
import { Redirect } from 'react-router';

const ContestInfo = (props) => {
  const {
    changeEditContest, userId, contestData, role, goChat, isContestVerdict
  } = props;
  const {
    typeOfTagline, brandStyle, typeOfName, styleName, contestType,
    title, focusOfWork, targetCustomer, industry, originalFileName,
    fileName, User, status, id
  } = contestData;
  const briefRenderChatOrVerdict = (role) => {
    if(role == CONSTANTS.MODERATOR){
        return (
          <div className = {styles.decision}>
            <i onClick  = {() => props.moderationVerdict({id: id, verdict: CONSTANTS.MODERATION_VERDICT_RESOLVE, contestOwner: contestData.userId})} className = "fas fa-check-circle"></i>
            <i onClick = {() => props.moderationVerdict({id: id, verdict: CONSTANTS.MODERATION_VERDICT_REJECT, contestOwner: contestData.userId})} className = "far fa-times-circle"></i>
          </div>
        );
    } else if(role == CONSTANTS.CREATOR){
        return (
           <i onClick={goChat} className="fas fa-comments" />
        );
    }
  }
  return (
    <div className={styles.mainContestInfoContainer}>
      { 
        isContestVerdict && window.location.replace('/dashboard')
      }
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </div>
            {
              (User.id === userId && status !== CONSTANTS.CONTEST_STATUS_FINISHED)
              && <div onClick={() => changeEditContest(true)} className={styles.editBtn}>Edit</div>
            }
            {
              briefRenderChatOrVerdict(role)
            }
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
          {
            contestType === CONSTANTS.NAME_CONTEST
              ? <NameContestSpecialInfo typeOfName={typeOfName} styleName={styleName} />
              : (
                contestType === CONSTANTS.TAGLINE_CONTEST
                  ? (
                    <TaglineContestSpecialInfo
                      typeOfTagline={typeOfTagline}
                      nameVenture={contestData.nameVenture}
                    />
                  )
                  : <LogoContestSpecialInfo brandStyle={brandStyle} nameVenture={contestData.nameVenture} />
              )
          }
        <div className={styles.dataContainer}>
          <span className={styles.label}>What is your Business/ Brand about?</span>
          <span className={styles.data}>{focusOfWork}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Description target customers of company </span>
          <span className={styles.data}>{targetCustomer}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Industry  of company</span>
          <span className={styles.data}>{industry}</span>
        </div>
        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              target="_blank"
              className={styles.file}
              href={`${CONSTANTS.publicURL}${fileName}`}
              download={originalFileName}
              rel="noreferrer"
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>{
  const { isContestVerdict } = state.moderationContests;
  return { isContestVerdict };
}

const mapDispatchToProps = (dispatch) => ({
  moderationVerdict: (data) => dispatch(moderationVerdict(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ContestInfo)