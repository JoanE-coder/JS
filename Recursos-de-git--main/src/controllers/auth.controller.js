import { login } from "@/services/auth.service";
import { saveSession } from "@/utils/session";

export const handleLogin = async (
  email,
  password
) => {
  const user = await login(
    email,
    password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  saveSession(user);
};