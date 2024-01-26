import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Landing from "./pages/landing";
import images from "./assets/images";
import Image from "./components/Image";
import CreateAndJoinRoom from "./pages/createAndJoinRoom";
import ChatRoom from "./pages/chatRoom";

const App = () => {
  return (
    <main
      className="w-full h-full"
      style={{
        backgroundImage: `url(${images.bg})`,
      }}
    >
      <div className="flex flex-col mx-8 py-2 items-center space-y-4">
        <Image
          className="w-[145px] h-[34px]"
          src={images.logo}
          alt="proxumer logo"
        />
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing/:userName" element={<Landing />} />
              <Route
                path="/user/:userName/create"
                element={<CreateAndJoinRoom />}
              />
              <Route
                path="/user/:userName/join"
                element={<CreateAndJoinRoom />}
              />
              <Route
                path="/chat-room/:chatRoomName/user/:userName"
                element={<ChatRoom />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </main>
  );
};

export default App;
