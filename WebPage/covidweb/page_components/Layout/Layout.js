import MainHeader from "./MainHeader";
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={classes.div}>
            <MainHeader />
            <div className={classes.main}>{props.children}</div>
        </div>
    );
}

export default Layout;