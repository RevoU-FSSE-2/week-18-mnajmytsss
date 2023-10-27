import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{ user: user, setUser: setUser}}>
            {children}
        </AppContext.Provider>
    )
}
AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AppProvider;