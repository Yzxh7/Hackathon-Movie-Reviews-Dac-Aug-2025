import { useState } from "react";
import api from "../api/axiosConfig";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function ChangePassword() {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    setSaving(true);

    try {
      await api.put("/auth/change-password", {
        old_password: form.oldPassword,
        new_password: form.newPassword,
      });

      alert("Password changed successfully!");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error("Change password error:", error);
      alert(error.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`max-w-xl mx-auto p-8 rounded-xl shadow-xl border
        ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-300"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Change Password</h1>

        <form onSubmit={handlePasswordChange} className="flex flex-col gap-5">

          {/* Old Password */}
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={updateField}
            className={`p-3 rounded border 
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
            required
          />

          {/* New Password */}
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={updateField}
            className={`p-3 rounded border 
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={updateField}
            className={`p-3 rounded border 
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }
            `}
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={saving}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Change Password"}
          </motion.button>

        </form>
      </div>
    </motion.div>
  );
}
