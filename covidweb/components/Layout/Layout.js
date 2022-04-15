import MainHeader from "./MainHeader";

function Layout(props) {
    return (
        <div>
            <MainHeader />
            {props.children}
        </div>
    );
}

export default Layout;