"use client";

import { logout } from "@/lib/session";

const Logout = () => {
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Logout;
