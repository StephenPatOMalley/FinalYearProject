import Link from "next/link";
import classes from './MainHeader.module.css';

function MainHeader(){
    return(
    <>
        <header className={classes.header}>
            <div className={classes.headername}>Covid Room Monitor</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/CarbonData">C02 Data</Link>
                    </li>
                </ul>
            </nav>
        </header>
    </>
    );
}

export default MainHeader;