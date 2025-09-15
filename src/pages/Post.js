const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Error posting ticket: " + (errorData.error || response.statusText));
      return;
    }

    await response.json();
    alert("Ticket posted successfully!");

    setFormData({
      trainNumber: "",
      trainName: "",
      from: "",
      to: "",
      date: "",
      tickets: "",
      holderName: "",
      contact: "",
      age: "",
      gender: "",
      travelClass: "",
    });
  } catch (error) {
    alert("Network error: " + error.message);
  }
};
