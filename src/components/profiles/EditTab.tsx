import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import InputField from "../ui/InputField";
import { Profile } from "@/types/authType";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SelectField from "../ui/SelectField";

interface EditingTabType {
  profile: Profile | null;
}

function EditTab({ profile }: EditingTabType) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    fullname: profile?.fullname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    gender: profile?.gender || "",
    dateOfBirth: profile?.date_of_birth
      ? new Date(profile.date_of_birth).toISOString().split("T")[0]
      : "",
    location: profile?.location || "",
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!profile?.id) {
      setMessage({ type: "error", text: "Profile ID not found" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const cleanValue = (value: string) => {
        if (value === "" || value === null || value === undefined) {
          return undefined;
        }
        return value.trim()
      };
      const rawPayload = {
        fullname: cleanValue(form.fullname),
        email: cleanValue(form.email),
        phone: cleanValue(form.phone),
        gender: cleanValue(form.gender),
        date_of_birth: cleanValue(form.dateOfBirth),
        location: cleanValue(form.location),
      };
      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(([, v]) => v !== undefined),
      ) as Partial<typeof rawPayload>;

      if (Object.keys(payload).length === 0) {
        setMessage({ type: "error", text: "No changes to update" });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", profile.id)
        .select()
        .single()

      if (error) {
        console.error("Update error:", error);
        setMessage({ type: "error", text: error.message });
      } else {
        console.log("Update response:", data);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          name="fullname"
          label="Full Name"
          icon={<User className="h-4 w-4" />}
          value={form.fullname}
          onChange={handleChange}
        />

        <InputField
          name="email"
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          name="phone"
          label="Phone Number"
          icon={<Phone className="h-4 w-4" />}
          value={form.phone}
          onChange={handleChange}
        />

        <SelectField
          name="gender"
          label="Gender"
          icon={<User className="h-4 w-4" />}
          value={form.gender}
          onChange={handleChange}
          placeholder="Select your gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />

        <InputField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          icon={<Calendar className="h-4 w-4" />}
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <InputField
          name="location"
          label="Location"
          icon={<MapPin className="h-4 w-4" />}
          value={form.location}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="flex-1 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}

export default EditTab;
