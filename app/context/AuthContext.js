"use client";
import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, []);

  const registerUser = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        setUser({ ...result.data.user, token: result.data.token });
        localStorage.setItem("token", result.data.token);
        toast.success("Account created successfully!");
      } else {
        toast.error(result.error || "Registration failed");
      }

      return result;
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const loginUser = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        setUser({ ...result.data.user, token: result.data.token });
        localStorage.setItem("token", result.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(result.message || "Login failed");
      }

      return result;
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast("Logged out", { icon: "👋" });
    router.push("/");
  };



  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
