import { createContext,useContext,useReducer,useEffect } from "react";
import authRedcuer from "../reducers/authReducer";
import { loginUser,registerUser,logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

// creating the store 
export const AuthContext = createContext();
console.log("context",AuthContext)//returns provider and consumer 

// creating initial state 
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  role: null,
  loading: true,
  error: null,
};



// dispatch: action to reducers
// reducers :these pure function where action are carried out to update state variable
export const AuthProvider=({children})=>{
      const [state, dispatch] = useReducer(authRedcuer, initialState);

      // Programatic Navigation
      let navigate=useNavigate()

      // useEffect to get the data from local storage
      useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        // condition to check weather data exists or not 
        if(token && user){
           try {
            // parse the data (converts strigfied format into readable format)
          const userData = JSON.parse(user);
          dispatch({
                type: 'LOGIN_SUCCESS', // action--> to reducers
                payload: { user: userData, token }, // information/data to passed to reducers
                });
           } catch (error) {
             dispatch({type:"LOADING_COMPLETE"})// action--> to reducers
           }
        }else{
           dispatch({type:"LOADING_COMPLETE"})// action--> to reducers
        }


      },[])// components loads only once at mounting phase(at initially the Browser is loaded)

    //  useEffect to redirect the User To different Ui Based on Role
    useEffect(()=>{
      if (state.isAuthenticated && !state.loading) { // checking weather user is logged in or not
        if (state.role === 'admin') navigate('/admin'); // checking weather user id admin
        else if (state.role === 'dealer') navigate('/dealer');// // checking weather user id dealer
        else navigate('/shop'); //default naviagtion if user role is public
      }

    },[state.isAuthenticated,state.role,state.loading])//runs on change of variables in the dependecy array


    // login state
  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const { user, token } = await loginUser(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message || 'Login failed',
      });
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const { user, token } = await registerUser(userData);  
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: error.message || 'Registration failed',
      });
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    logoutUser();
    dispatch({ type: 'LOGOUT' });
    navigate('/shop'); // Redirect to login on logout
  };

  const setUserAndToken = (user, token) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    setUserAndToken,
  };

  if(state.loading)return <h6>loading...</h6>

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
