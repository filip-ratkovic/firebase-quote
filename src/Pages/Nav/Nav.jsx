import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSlice } from "../../Store/themeSlice";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../../Config/firebase";
import { useTranslation } from "react-i18next";
import {
  MenuItem,
  Switch,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  styled,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Menu,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Language as LanguageIcon,
  Key as KeyIcon,
  Person as PersonAdd,
  Settings as SettingsIcon,
  Logout,
} from "@mui/icons-material";

import "./nav.css";

function Nav() {
  const [alignment, setAlignment] = React.useState("web");
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const userAuth = auth?.currentUser?.uid;
  console.log(userAuth);

  const { i18n, t } = useTranslation(["nav"]);

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", m: "10px", marginRight: "auto" }}
              onClick={() => navigate("/")}
            >
              {t("home")}
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <SettingsIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  backgroundColor: "#93a0a3",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "none",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <KeyIcon />
                <Typography
                  variant="p"
                  component="div"
                  sx={{ cursor: "pointer", m: "10px" }}
                  onClick={() => navigate("/password")}
                >
                  {t("password")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LanguageIcon />

                <Box sx={{ ml: "10px" }}>
                  <ToggleButtonGroup
                    color="primary"
                    value={localStorage.getItem("i18nextLng")}
                    exclusive
                    onChange={handleLangChange}
                    aria-label="ENG"
                  >
                    <ToggleButton value="en">ENG</ToggleButton>
                    <ToggleButton value="sr">SRB</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Typography color="inherit" onClick={() => navigate("/signup")}>
                  {t("SignUp")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {authState.id || userAuth ? (
                  <Typography variant="outlined" onClick={logout}>
                    {t("logout")}
                  </Typography>
                ) : (
                  <Typography
                    variant="outlined"
                    onClick={() => navigate("/login")}
                  >
                    {t("login")}
                  </Typography>
                )}{" "}
              </MenuItem>
            </Menu>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  defaultChecked
                  onChange={() => {
                    dispatch(themeSlice.actions.toggleTheme());
                  }}
                  checked={themeState.theme === "dark"}
                />
              }
            />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Nav;
