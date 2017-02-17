/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {} from '../../actions';

// icons and mui comps
import {List, ListItem} from 'material-ui/List';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import NotificationsIcon from 'material-ui/svg-icons/alert/add-alert';
import AuthIcon from 'material-ui/svg-icons/social/person';
import ImportIcon from 'material-ui/svg-icons/communication/import-export';
import DBIcon from 'material-ui/svg-icons/device/storage';
import RaisedButton from 'material-ui/RaisedButton';

// sub comps
import General from './general'
import Email from './email'
import Push from './push'

const navStyles = {
    backgroundColor:'white',
    boxSizing: 'border-box', 
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
    minWidth: '250px'
}

class Settings extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selected:'general'
        }
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    componentWillMount(){
        // redirect if active app not found
        if(!this.props.appData.viewActive){
            // this.context.router.push('/')
        } else {
            
        }
    }
    selectTab(whichTab){
        this.setState({selected:whichTab})
    }
    getCompToRender(){
        switch(this.state.selected){
            case 'general' : return <General/>
            case 'email' : return <Email/>
            case 'push' : return <Push/>
            case 'auth' : return <General/>
            case 'import' : return <General/>
            case 'mongo' : return <General/>
        }
    }
    render() {

        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <Toolbar isDashboardMainPage={false}/>
                <div className="settings tables campaign cache">
                    <div className="leftnav">
                    
                        <List style={ navStyles }>
                            <ListItem className={ this.state.selected == 'general' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'general') } primaryText="General" leftIcon={<SettingIcon />} />
                            <ListItem className={ this.state.selected == 'email' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'email') } primaryText="Email" leftIcon={<EmailIcon />} />
                            <ListItem className={ this.state.selected == 'push' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'push') } primaryText="Push Notifications" leftIcon={<NotificationsIcon />} />
                            <ListItem className={ this.state.selected == 'auth' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'auth') } primaryText="Authenication" leftIcon={<AuthIcon />} />
                            <ListItem className={ this.state.selected == 'import' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'import') } primaryText="Import / Export Data" leftIcon={<ImportIcon />} />
                            <ListItem className={ this.state.selected == 'mongo' ? "sidenavselected" : "" } onClick={ this.selectTab.bind(this,'mongo') } primaryText="MongoDB Access" leftIcon={<DBIcon />} />
                        </List>
                        
                    </div>
                    <div className="content">
                        { this.getCompToRender() }
                    </div>
                </div>
                <Footer id="app-footer"/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        appData: state.manageApp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
