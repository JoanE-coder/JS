import { http } from "@/api/http";

export const login = async (
  email,
  password
) => {
  const users = await http.get("/users");

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  return user || null;
};