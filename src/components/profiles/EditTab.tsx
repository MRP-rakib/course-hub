import { Calendar, Mail, MapPin, User } from "lucide-react";
import InputField from "../ui/InputField";
import { AuthUser, Profile } from "@/types/authType";
import { useState } from "react";
import SelectField from "../ui/SelectField";
import { supabase } from "@/lib/supabaseClient";

interface EditingTabType {
  profile: Profile | null;
  user: AuthUser | null;
}

function EditTab({ profile, user }: EditingTabType) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    fullname: profile?.fullname || "",
    email: user?.email || "",
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

  // ✅ FIXED cleanObj (handles "", null, undefined)
  const cleanObj = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([, v]) => v !== null && v !== undefined && v !== "",
      ),
    ) as Partial<T>;
  };

  const handleUpdate = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (!profile?.id) {
      setMessage({ type: "error", text: "Profile not found" });
      return;
    }

    const clean = cleanObj(form);

    const { email, ...profileData } = clean;

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", profile.id);
    if (profilesError) {
      setMessage({ type: "error", text: profilesError.message });
      setLoading(false);
      return;
    }
    if (profilesData) {
      setMessage({ type: "success", text: "profile update succesfull" });
      setLoading(false);
      return;
    }

    console.log("sending email:", email);
    const { data: emailData, error: emailError } =
      await supabase.auth.updateUser({
        email: email?.trim(),
      });
    console.log(emailData);
    console.log(emailError);
    if (emailError) {
      setMessage({ type: "error", text: emailError.message });
      setLoading(false);
      return;
    }
    if (emailData) {
      setMessage({ type: "success", text: "profile update succesfull" });
      setLoading(false);
      return;
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
