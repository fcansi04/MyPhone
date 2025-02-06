"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, userSession }) => {
  return <SessionProvider session={userSession}>{children}</SessionProvider>;
};

export default Provider;
