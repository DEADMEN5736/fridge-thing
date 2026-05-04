"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sharedStyles } from "../styles";
import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import { FormInput } from "../components/Forms";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push("/onboarding"); //temp change for demo
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={sharedStyles.pageWrapper}>
      <div style={sharedStyles.leftColumn}>
        <h1 style={sharedStyles.logoStyle}>Fridge Thing</h1>
        <p style={sharedStyles.subtitleStyle}>Create your account.</p>

        {error && <p style={errorStyle}>{error}</p>}

        <FormInput
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter First Name"
        />

        <FormInput
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter Last Name"
        />

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create Password (min 8 characters)"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <PrimaryButton
          onClick={handleCreateAccount}
          style={loading ? { opacity: 0.7 } : {}}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </PrimaryButton>

        <Link href="/" style={{ textDecoration: "none" }}>
          <SecondaryButton>Back to Login</SecondaryButton>
        </Link>
      </div>

      <div style={sharedStyles.rightColumn}></div>
    </div>
  );
}

const errorStyle = {
  color: "#e74c3c",
  fontSize: "14px",
  fontFamily: "'Lexend', sans-serif",
  marginBottom: "16px",
  padding: "10px 14px",
  backgroundColor: "#fdf0ef",
  border: "1px solid #f5c6c2",
  borderRadius: "6px",
  width: "325px",
  boxSizing: "border-box",
};
