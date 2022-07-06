export default function Profile() {
    console.log('this is the window location', window.location);



    return (
        <div>
            Welcome to the {window.location.pathname} page
        </div>
    )
}

//use NAavLink and the isActive property to highlight the tab that is active
//