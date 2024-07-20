import { Box, Button, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomizedInput from "../componentes/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Succesfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Use viewport height for full screen
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "-5px -5px 105px #64f3d5",
          padding: { xs: "30px", md: "50px" }, // Adjust padding based on screen size
          borderRadius: "10px",
          border: "none",
          width: { xs: "250px", md: "500px" }, // Set max width for medium screens
        }}
      >
        <form onSubmit={handleSubmit}
          style={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              size="small"
              sx={{
                px: 2,
                py: 1,
                padding: "10px",
                color: "black",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
