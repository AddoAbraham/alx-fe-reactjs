import { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    console.log("User Registered:", { username, email, password });
    alert("Registration successful!");

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mb-8 p-4 border rounded shadow"
    >
      <h3 className="text-xl font-semibold mb-4">
        Controlled Registration Form
      </h3>

      <div className="mb-3">
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter username"
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
