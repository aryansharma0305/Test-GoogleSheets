import { auth, provider } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [fileId, setFileId] = useState("");
  const [data, setData] = useState([]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token1 = credential.accessToken;
      setToken(token1);
      console.log("Access Token:", token1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRetrieve = async () => {
    if (!fileId || !token) return alert("Login and enter a file ID first!");
    try {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Sheet1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      console.log("Sheet data:", result.values);
      setData(result.values || []);
    } catch (err) {
      console.error("Retrieve error:", err);
    }
  };

  const handleEnterData = async () => {
    if (!fileId || !token) return alert("Login and enter a file ID first!");
    try {
      const body = {
        values: [
          ["Name", "Age", "City"],
          ["Aryan", "21", "Bangalore"],
          ["Tanu", "20", "Delhi"],
        ],
      };

      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/Sheet1!A1:C3?valueInputOption=RAW`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();
      alert("Data entered successfully!");
      console.log("Write result:", result);
    } catch (err) {
      console.error("Enter data error:", err);
    }
  };

  return (
    <>
      <button onClick={handleLogin}>Login with Google</button>
      <p>Token: {token ? token: "Not logged in"}</p>

      <input
        type="text"
        placeholder="Enter Google Sheet ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />

      <div>

        <button onClick={handleRetrieve}>Retrieve Data</button>
        <br></br>
        <button onClick={handleEnterData}>Enter Data</button>
      </div>

      <div>
        <h3>Retrieved Data:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
