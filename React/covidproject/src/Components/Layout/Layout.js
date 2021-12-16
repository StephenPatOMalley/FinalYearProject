import MainHeader from "./MainHeader";
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div className={classes.div}>
            <MainHeader />
            <main>{props.children}</main>
        </div>
    );
}

export default Layout;