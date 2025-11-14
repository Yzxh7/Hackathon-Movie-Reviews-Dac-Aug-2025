import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1️⃣ Basic validations
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (form.mobile.length !== 10) {
      alert("Mobile number must be 10 digits!");
      return;
    }

    // 2️⃣ Create backend-friendly JSON
    const userData = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      mobile: form.mobile.trim(),
      dob: form.dob,
      password: form.password,
    };

    console.log("Data sent to backend:", userData);

    try {
      await api.post("/auth/register", userData);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed (backend error).");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`flex justify-center items-center min-h-[80vh] transition-all duration-300
        ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}
      `}
    >
      <motion.form
        onSubmit={handleSignup}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`shadow-2xl rounded-xl p-10 w-full max-w-lg border
          ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white"}
        `}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        {/* FIRST + LAST NAME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={`border p-3 rounded transition-all
              focus:ring-2 focus:ring-green-500
              ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
            `}
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`border p-3 rounded transition-all
              focus:ring-2 focus:ring-green-500
              ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
            `}
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={`border p-3 rounded w-full mt-4 transition-all
            focus:ring-2 focus:ring-green-500
            ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
          `}
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* MOBILE */}
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          maxLength="10"
          pattern="[0-9]{10}"
          className={`border p-3 rounded w-full mt-4 transition-all
            focus:ring-2 focus:ring-green-500
            ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
          `}
          value={form.mobile}
          onChange={handleChange}
          required
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          className={`border p-3 rounded w-full mt-4 transition-all
            focus:ring-2 focus:ring-green-500
            ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
          `}
          value={form.dob}
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={`border p-3 rounded w-full mt-4 transition-all
            focus:ring-2 focus:ring-green-500
            ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
          `}
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={`border p-3 rounded w-full mt-4 transition-all
            focus:ring-2 focus:ring-green-500
            ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}
          `}
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-green-600 text-white py-3 w-full rounded mt-6 text-lg
            hover:bg-green-700 transition-all"
        >
          Create Account
        </motion.button>
        <p className="text-center mt-4 text-sm">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    className="text-blue-500 hover:underline cursor-pointer"
  >
    Log in here
  </span>
</p>

      </motion.form>
    </motion.div>
  );
}
