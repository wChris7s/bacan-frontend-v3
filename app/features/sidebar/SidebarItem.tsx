import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Box from "@mui/material/Box";
import { useAuth } from "react-oidc-context";
import { signOutRedirect } from "~/root";

interface SidebarItemProps {
  open?: boolean;
}

const BLACK = "#27282C";
const sidebarTextStyle = {
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "1.75",
};

const SidebarItem: React.FC<SidebarItemProps> = ({ open = true }) => {
  const auth = useAuth();
  return (
    <>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {index % 2 === 0 ? (
                  <InboxOutlinedIcon
                    htmlColor={BLACK}
                    sx={{
                      fontSize: "20px !important",
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                ) : (
                  <MailOutlineIcon
                    htmlColor={BLACK}
                    sx={{
                      fontSize: "20px !important",
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                disableTypography={false}
                sx={{
                  ...sidebarTextStyle,
                  opacity: open ? 1 : 0,
                  m: 0,
                  transition: "opacity 0.2s",
                  width: open ? "auto" : 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "& .MuiTypography-root": {
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "1.75",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {index % 2 === 0 ? (
                  <InboxOutlinedIcon
                    htmlColor={BLACK}
                    sx={{
                      fontSize: "20px !important",
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                ) : (
                  <MailOutlineIcon
                    htmlColor={BLACK}
                    sx={{
                      fontSize: "20px !important",
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                disableTypography={false}
                sx={{
                  ...sidebarTextStyle,
                  opacity: open ? 1 : 0,
                  m: 0,
                  transition: "opacity 0.2s",
                  width: open ? "auto" : 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "& .MuiTypography-root": {
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "1.75",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* Espaciador para empujar los items inferiores */}
      <Box sx={{ flexGrow: 1 }} />
      {/* Item en el margen inferior */}
      <List sx={{ width: "100%" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={(_) => {
              auth.removeUser();
              signOutRedirect();
            }}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <LogoutOutlinedIcon
                htmlColor={BLACK}
                sx={{
                  fontSize: "20px !important",
                  width: "20px !important",
                  height: "20px !important",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              disableTypography={false}
              sx={{
                ...sidebarTextStyle,
                opacity: open ? 1 : 0,
                m: 0,
                transition: "opacity 0.2s",
                width: open ? "auto" : 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                "& .MuiTypography-root": {
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "1.75",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        {/* Nuevo item adicional en el margen inferior */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <MailOutlineIcon
                htmlColor={BLACK}
                sx={{
                  fontSize: "20px !important",
                  width: "20px !important",
                  height: "20px !important",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Otro item inferior"
              disableTypography={false}
              sx={{
                ...sidebarTextStyle,
                opacity: open ? 1 : 0,
                m: 0,
                transition: "opacity 0.2s",
                width: open ? "auto" : 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                "& .MuiTypography-root": {
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "1.75",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

// @ts-ignore
export default SidebarItem;
