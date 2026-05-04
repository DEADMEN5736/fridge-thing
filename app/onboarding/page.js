"use client";
import {redirect, useRouter} from "next/navigation";
import {FormInput} from "../components/Forms";
// 1. Update the import to use the specific named components
import {PrimaryButton} from "../components/Buttons";
import {sharedStyles} from "../styles";
import {Navbar} from "../components/Navbar";
import {prisma} from "../../lib/prisma";

import { useState } from "react";

async function updateUser(user2Update, newAge, newWeight, newHeight)
{
  return prisma.user.update({
    where: {
      id: user2Update.id,
    },
    data: {
      age: newAge,
      weight: newWeight,
      height: newHeight,
    },
  });
}

export default function OnboardingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    age:"",
    weight:"",
    height:"",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/login');
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try
    {
      console.log("SENDING TO API:", formData);

      const res = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok)
      {
        router.push('/dashboard');
      }
      else
      {
          alert("Something went wrong saving onboarding info");
      }
    }
    catch(err)
    {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Navbar onLogout={handleLogout}
      ></Navbar>
        <div style={sharedStyles.onboardingWrapper}>
          <h1 style={sharedStyles.logoStyle}>Tell us about yourself!</h1>
          <p style={sharedStyles.subtitleStyle}>Help us tailor Fridge Thing to your lifestyle.</p>

        <FormInput
          label="Age"
          type="number"
          placeholder="Enter Age"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
        ></FormInput>

        <FormInput
          label="Weight"
          type="number"
          placeholder="Enter Weight (lbs)"
          value={formData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
        ></FormInput>

        <FormInput
          label="Height"
          type="text"
          placeholder={"5' 11\""}
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
        ></FormInput>

        <PrimaryButton
          onClick={handleUpdateUser}
          >
            Finish
          </PrimaryButton>
      </div>
    </div>
  );
}
