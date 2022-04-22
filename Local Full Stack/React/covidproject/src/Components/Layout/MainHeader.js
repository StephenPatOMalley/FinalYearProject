import classes from './MainHeader.module.css';

function MainHeader(){
    return(
        <header className={classes.header}>
            <div className={classes.headername}>Covid Room Monitor</div>
        </header>
    );
}

export default MainHeader;