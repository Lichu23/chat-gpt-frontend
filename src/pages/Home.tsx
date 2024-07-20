import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnimation from "../componentes/typer_ani/TypingAnimation";

export const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginTop:{md:"50px", xs:"150px"},
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <TypingAnimation />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            mx: "auto",
            mt: "50px",
          }}
        >
          <img
            src="chat.png"
            alt="chat image for home page"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
