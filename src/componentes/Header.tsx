import { AppBar, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Logo } from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const auth = useAuth();
  const { pathname } = useLocation();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />

        <div>
          {auth?.isLoggedIn ? (
            <>
              {pathname !== "/chat" && (
                <NavigationLink
                  bg="#00fffc"
                  to="/chat"
                  text="Go To Chat"
                  textColor="black"
                />
              )}
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />

              <NavigationLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
