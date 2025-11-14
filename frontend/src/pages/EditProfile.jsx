import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function EditProfile() {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    dob: "",
  });

  // Load profile
  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setForm({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        email: res.data.email,
        mobile: res.data.mobile,
        dob: res.data.dob ? res.data.dob.substring(0, 10) : "",
      });
    } catch (err) {
      console.error("Profile load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // handle field updates
  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save profile
  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put("/auth/update-profile", form);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center text-lg ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        Loading your profile...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-xl mx-auto shadow-2xl p-8 rounded-xl
        bg-white dark:bg-gray-800 dark:border-gray-700 border">

        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

        <form className="flex flex-col gap-4" onSubmit={saveProfile}>

          {/* FIRST & LAST NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="first_name"
              value={form.first_name}
              onChange={updateField}
              placeholder="First Name"
              className={`p-3 rounded border 
                ${theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"}
              `}
              required
            />

            <input
              name="last_name"
              value={form.last_name}
              onChange={updateField}
              placeholder="Last Name"
              className={`p-3 rounded border 
                ${theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"}
              `}
              required
            />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="Email"
            className={`p-3 rounded border 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"}
            `}
            required
          />

          {/* MOBILE */}
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={updateField}
            placeholder="Mobile Number"
            className={`p-3 rounded border 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"}
            `}
            required
          />

          {/* DATE OF BIRTH */}
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={updateField}
            className={`p-3 rounded border 
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"}
            `}
          />

          {/* SAVE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            disabled={saving}
            className="mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
