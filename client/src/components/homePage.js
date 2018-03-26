import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class HomePage extends Component {
    state = {
        open:false
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render(){
        return(
            <MuiThemeProvider>
                <div>
                    <Drawer open={this.state.open}>
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <AppBar
                        title="Readable"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onClick = {this.handleToggle}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}


export default HomePage;