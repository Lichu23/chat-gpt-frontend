import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ChatItem from "../componentes/chat/ChatItem";
import { useAuth } from "../context/AuthContext";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";

type Message = {
  role: "user" | "assistant ";
  content: string;
};

export const Chat = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubnmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prevChats) => [...prevChats, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", {id: "deletechats"})
      await deleteUserChats()
      setChatMessages([])
      toast.success("Deleted Chats Successfully", {id: "deletechats"})

    } catch (error) {
      console.log(error)
      toast.error("Deleting Chats Failed", {id: "deletechats"})
      
    }
  }

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats...", {id: "loadchats"})
      getUserChats().then((data) => {
        setChatMessages([...data.chats])
        toast.success("Succesfully loaded chats", {id: "loadchats"})
      }).catch(err => {
        console.log(err)
        toast.error("Loading Failed", {id: "loadchats"})
      })
    }
  }, [auth])

  useEffect(() => {
    if(!auth?.isLoggedIn) {
      return navigate("/login")
      }
  }, [auth])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:"center",
        width: "100%",
        height:"100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          flexGrow: 1,
          height:"100%",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography> <span><Button onClick={handleDeleteChats}>Clear Chat</Button></span>


        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton sx={{ color: "white", mx: 1 }}>
            <IoMdSend onClick={handleSubnmit} />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};
