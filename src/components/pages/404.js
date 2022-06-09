import {Link} from 'react-router-dom';

const Page404 = () => {

    return (
        <>
            <h1 style={{'fontSize': '200px', 'textAlign': 'center'}}>404</h1>
            <Link 
                to="/"
                style={{'fontSize': '20px', 'textAlign': 'center', "display": 'block', 'textDecoration': 'underline'}} >
                Return to Home Page</Link>
        </>
    )
}

export default Page404;