import {NavLink} from "react-router";
import {useSelector} from "react-redux";
function Navbar(){
    const auth = useSelector(state=>state.isauth);
    return(
     <>
     <div>
         <div>
            <span>ShareIt</span>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/files">Files</NavLink>
         </div>
         <div>
            if(auth){
                <NavLink to="/Signup">SignUp</NavLink>
            }
            else{
                <NavLink to="/Logout">LogOut</NavLink>
            }
         </div>
         <div></div>
     </div>
     </>
    );
}
export default Navbar;