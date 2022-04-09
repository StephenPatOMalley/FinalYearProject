import MainHeader from "./MainHeader";
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={classes.div}>
            <MainHeader />
            {props.children}
        </div>
    );
}

export default Layout;