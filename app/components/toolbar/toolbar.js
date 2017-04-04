/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {logOut} from '../../actions';
import Storage from 'material-ui/svg-icons/device/storage';
import Analytics from 'material-ui/svg-icons/editor/insert-chart';
import Setting from 'material-ui/svg-icons/action/settings';
import Book from 'material-ui/svg-icons/action/book';
import Cache from 'material-ui/svg-icons/image/flash-on';
import Queues from 'material-ui/svg-icons/action/compare-arrows';
import Notifications from 'material-ui/svg-icons/alert/add-alert';
import Email from 'material-ui/svg-icons/communication/email';
import People from 'material-ui/svg-icons/social/people';
import {grey500, grey700} from 'material-ui/styles/colors';
import NotificationsModal from './notification'
//import NotificationsModal from '../notification/notification'

const toolbartitle = {
    fontSize: 18
};

const iconStyles = {
    marginRight: 12,
    marginLeft: 12,
    cursor: "pointer"
};

class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            appSelector: false
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {}
    handleTouchTap = (which, event) => {
        event.preventDefault()
        this.state[which] = true
        this.state.anchorEl = event.currentTarget
        this.setState(this.state)
    }

    handleRequestClose = () => {
        this.setState({open: false, appSelector: false})
    }
    redirectTo(where, noAppId) {
        if (noAppId) {
            this.context.router.push('/' + where)
        } else {
            this.context.router.push('/' + this.props.currentApp + "/" + where)
        }
        this.handleRequestClose()
    }
    redirectToApp(appId) {
        window.location.pathname = '/' + appId + "/" + window.location.pathname.split('/')[2]
        this.handleRequestClose()
    }
    render() {
        let userImage = "/assets/images/user-image.png"
        if (this.props.currentUser.file) {
            userImage = this.props.currentUser.file.document.url
        }
        let allApps = []
        if (this.props.apps.length && !this.props.isDashboardMainPage && this.props.currentApp) {
            allApps = this.props.apps.filter(x => x.appId != this.props.currentApp).map((app, i) => {
                return <button className="coloptbtn" key={i} onClick={this.redirectToApp.bind(this, app.appId)}>
                    <i className="ion ion-android-cloud cloud"></i>
                    {app.name}</button>
            })
        }
        let notifications = [
            {
                type: 'noaction',
                text: 'I dont have any action!!!',
                icon: 'http://www.freeiconspng.com/uploads/facebook-transparent-logo-png-0.png',
                seen: false,
                meta: {}
            }, {
                type: 'oneaction',
                text: 'Yeah! I just got one action!!',
                meta: {
                    acceptButton: {
                        text: 'Cool',
                        method: 'post',
                        url: 'http://www.testing.com/ok',
                        external: true,
                        payload: {
                            key: 'value'
                        }
                    }
                },
                seen: false
            }, {
                type: 'twoaction',
                text: 'Best one.',
                meta: {
                    cancelButton: {
                        text: 'I reject',
                        method: 'post',
                        external: false,
                        url: 'http://www.testing.com/cancel',
                        payload: {
                            key: 'value'
                        }
                    },
                    acceptButton: {
                        text: 'I accept',
                        method: 'get',
                        external: true,
                        url: 'http://www.testing.com/accept',
                        payload: {
                            key: 'value'
                        }
                    }
                },
                icon: 'https://img.clipartfest.com/925898b903a4d9182622fda48f870f66_welcome-to-our-room-with-a-twitter-logo-clipart-png_1139-926.png',
                seen: false
            }
        ]
        return (
            <div id="nav-dash" style={{
                backgroundColor: '#FFF',
                paddingTop: 2
            }}>
                <div className="container">
                    <Toolbar className='toolbar' style={{
                        backgroundColor: '#FFF'
                    }}>
                        <ToolbarGroup>
                            <img style={{
                                marginLeft: -25
                            }} className="icon cp" src="/assets/images/cblogo.png" alt="cloud" onClick={this.redirectTo.bind(this, '', true)}/> {!this.props.isDashboardMainPage
                                ? <span className="appselector" onClick={this.handleTouchTap.bind(this, 'appSelector')}>
                                        <i className="ion ion-android-cloud cloud"></i>
                                        {this.props.currentAppName}
                                        <i className="fa fa-caret-down downc" aria-hidden="true"></i>
                                        <Popover open={this.state.appSelector} anchorEl={this.state.anchorEl} anchorOrigin={{
                                            horizontal: 'right',
                                            vertical: 'bottom'
                                        }} targetOrigin={{
                                            horizontal: 'right',
                                            vertical: 'top'
                                        }} onRequestClose={this.handleRequestClose} animated={true} className="profilepop">
                                            <p className="headingpop">YOUR APPS</p>
                                            {allApps}
                                        </Popover>
                                    </span>
                                : ''
}

                        </ToolbarGroup>
                        {!this.props.isDashboardMainPage
                            ? (
                                <ToolbarGroup>
                                    <Storage style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'tables', false)}/>
                                    <Analytics style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'analytics', false)}/>
                                    <Setting style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'settings', false)}/>
                                    <Cache style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'cache', false)}/>
                                    <Queues style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'queue', false)}/>
                                    <Notifications style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'push', false)}/>
                                    <Email style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'email', false)}/>
                                    <ToolbarSeparator/>
                                    <ToolbarTitle style={toolbartitle} text=""/> {/* <Book style={iconStyles} color={grey700}/> */}
                                    <object type="image/svg+xml" data="/assets/images/feedback.svg">
                                        Your browser does not support SVG
                                    </object>
                                    <object type="image/svg+xml" data="/assets/images/book.svg">
                                        Your browser does not support SVG
                                    </object>
                                    <NotificationsModal notifications={notifications}/> {this.props.isAdmin
                                        ? <People style={iconStyles} color={grey700} onClick={this.redirectTo.bind(this, 'admin', true)}/>
                                        : ''
}
                                    <ToolbarSeparator/>
                                    <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom'
                                    }} targetOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top'
                                    }} onRequestClose={this.handleRequestClose} animated={true} className="profilepop">
                                        <p className="headingpop">{this.props.currentUser.user
                                                ? this.props.currentUser.user.name.toUpperCase()
                                                : ''}</p>
                                        <button className="coloptbtn" onClick={this.redirectTo.bind(this, 'profile', true)}>My Profile</button>
                                        <button className="coloptbtn">Billing</button>
                                        <button className="coloptbtn" onClick={this.props.onLogoutClick.bind(this)}>Logout</button>
                                    </Popover>
                                    <IconButton onClick={this.handleTouchTap.bind(this, 'open')}>
                                        <img className="userhead" src={userImage} alt=""/>
                                    </IconButton>
                                </ToolbarGroup>
                            )
                            : <ToolbarGroup>
                                {/* <Book style={iconStyles} color={grey700}/> */}
                                <object type="image/svg+xml" data="/assets/images/feedback.svg">
                                    Your browser does not support SVG
                                </object>
                                <object type="image/svg+xml" data="/assets/images/book.svg">
                                    Your browser does not support SVG
                                </object>
                                <NotificationsModal notifications={notifications}/> {this.props.isAdmin
                                    ? <People style={iconStyles} color={grey700} onClick={this.redirectTo.bind(this, 'admin', true)}/>
                                    : ''
}
                                <ToolbarSeparator/>
                                <IconButton onClick={this.handleTouchTap.bind(this, 'open')}>
                                    <img className="userhead" src={userImage} alt=""/>
                                </IconButton>
                                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom'
                                }} targetOrigin={{
                                    horizontal: 'right',
                                    vertical: 'top'
                                }} onRequestClose={this.handleRequestClose} animated={true} className="profilepop">
                                    <p className="headingpop">{this.props.currentUser.user
                                            ? this.props.currentUser.user.name.toUpperCase()
                                            : ''}</p>
                                    <button className="coloptbtn" onClick={this.redirectTo.bind(this, 'profile', true)}>My Profile</button>
                                    <button className="coloptbtn">Billing</button>
                                    <button className="coloptbtn" onClick={this.props.onLogoutClick.bind(this)}>Logout</button>
                                </Popover>
                            </ToolbarGroup>
}
                    </Toolbar>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let isAdmin = false
    if (state.user.user) {
        isAdmin = state.user.user.isAdmin
    }
    return {currentApp: state.manageApp.appId, currentUser: state.user, currentAppName: state.manageApp.name, isAdmin, apps: state.apps}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logOut());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
