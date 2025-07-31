const authRedcuer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS": // action disptached by user
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        role: action.payload.user.role,
        loading: false,
        error: null,
      };
    case "SET_AUTH_TO_STORAGE":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        role: action.payload.user.role,
        loading: false,
        error: null,
      };
    case "REGISTER_SUCESS":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        role: null,
        loading: false,
        error: null,
      };
    case "LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    case "SET_LOADING_TRUE":
      return {
        ...state,
        loading: true,
      };
    case "ClEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_REFRESH_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default authRedcuer;
