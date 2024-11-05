import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ReactCountryFlag from "react-country-flag";
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <>
        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <LanguageIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
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
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => handleLanguageChange("en")}>
            <ReactCountryFlag
              countryCode="US"
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              cdnSuffix="svg"
              className="me-3"
              title="US"
            />
            US
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("vi")}>
            <ReactCountryFlag
              countryCode="VN"
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              cdnSuffix="svg"
              title="VN"
              className="me-3"
            />
            VN
          </MenuItem>
        </Menu>
      </>
    </>
  );
}
