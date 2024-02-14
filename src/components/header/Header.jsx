import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status) // authSlice line 6
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus // don't render this element if the user is logged in
        },
        {
            name: "Sign up",
            slug: "/signup",
            active: !authStatus // don't render this element if the user is logged in
        }
    ];

    console.log("Logged in:", authStatus);

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {
                            // navItems.map((navItem) => navItem.active? <li key={item.name}><button onClick={() => navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">{item.name}</button></li> : null)
                            navItems.map((navItem) => {
                                if(navItem.active) {
                                    return <li key={navItem.name}>
                                                <button onClick={() => navigate(navItem.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                                                    {navItem.name}
                                                </button>
                                          </li>
                                }

                                return null;
                            })
                        }

                        {authStatus && (<li><LogoutBtn /></li>)}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
// jo cheez repeat ho rahi hai, usmein key lagani hai