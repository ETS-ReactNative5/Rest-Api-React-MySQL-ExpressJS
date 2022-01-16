import MainNavigation from '../../navigation/MainNavigation'
import './Layout.css'

function Layout(props) {
    return <div className='background'>
        <MainNavigation />
        <main className="main">{props.children}</main>
    </div>
}

export default Layout