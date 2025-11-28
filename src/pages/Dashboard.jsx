import {useState, useContext, createContext} from "react";
import "./Dashboard.css";

function Login() {
  const { loginUser } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const submit = () => {
    if (!username || !password) {
      return alert("Enter username & password");
    }
    loginUser(username, password, role);
  };

  return (
    <div className="main-container">
      <div className="box">
        <h2 className="login-txt">Login / Register</h2>
        <div className="input-field-box">
         <select className="select-field" value={role} onChange={(e) => setRole(e.target.value)}>
          <option className="option-field" value="patient">Patient</option>
          <option className="option-field" value="doctor">Doctor</option>
         </select>
         <input className="input-field" type="text" placeholder="Enter Your Name" value={username} onChange={(e) => setUsername(e.target.value)} />
         <input className="input-field" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="form-btn" onClick={submit}>Continue</button>
      </div>
    </div>
  );
}

function PatientDashboard() {
  const { currentUser, requests, sendRequest } = useContext(DataContext);

  const recommended = [
    "Dr. Arjun Kumar",
    "Dr. Priya"
  ];

  const myReqs = requests.filter(
    (r) => r.patient === currentUser.username
  );

  const accepted = myReqs.find(
    (r) => r.status === "accepted"
  );

  return (
    <div className="main-container">
      <div className="box">
      <h2>Patient Dashboard</h2>
      <h3>Welcome, {currentUser.username}</h3>

      <ProfileEditor />
      <h3>Recommended Doctors</h3>
      {recommended.map((c) => (
        <div className="card" key={c}>
          {c}
          <button className="sendReq-btn" onClick={() => sendRequest(currentUser.username, c)}>Send Request</button>
        </div>
      ))}

      <h3>My Requests</h3>
      {myReqs.map((r, idx) => (
        <div className="card" key={idx}>
          Doctor: <b>{r.doctor}</b>
          <br />
          Status: <b>{r.status}</b>
        </div>
      ))}
    </div>
    </div>
  );
}

function DoctorDashboard() {
  const { currentUser, requests, acceptRequest } = useContext(DataContext);
  const incoming = requests.filter((r) => r.doctor === currentUser.username);
  const accepted = incoming.find((r) => r.status === "accepted");

  return (
    <div className="main-container">
      <div className="box">
      <h2>Doctor Dashboard</h2>
      <h3>Welcome, <span className="userName">{currentUser.username}</span></h3>

      <ProfileEditor />
      <h3>Incoming Requests</h3>
      {incoming.map((r, idx) => (
        <div className="card" key={idx}>
          Patient: <b>{r.patient}</b>
          <br />
          Status: <b>{r.status}</b>
          {r.status === "pending" && (
            <button className="sendReq-btn" onClick={() => acceptRequest(r.patient, currentUser.username)}>Accept</button>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

function ProfileEditor() {
  const { currentUser, updateProfile } = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: currentUser.username,
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    disease: currentUser.disease || "",
    doctorDetails: currentUser.doctorDetails || ""
  });

  const saveProfile = () => {
    updateProfile(form);
    setEditMode(false);
  };

  return (
    <div className="card profile-box">
      <h3>Profile</h3>

      {!editMode ? (
        <>
          <p><b>Name:</b> {form.username}</p>
          <p><b>Email:</b> {form.email || "Not set"}</p>
          <p><b>Phone:</b> {form.phone || "Not set"}</p>
          
          {currentUser.role === "patient" && (
            <p><b>Diseases:</b> {form.disease || "Not added"}</p>
          )}
          {currentUser.role === "doctor" && (
            <p><b>Doctor Info:</b> {form.doctorDetails || "Not provided"}</p>
          )}
          <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      ) : (
        <>
          <input  placeholder="Name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}/>
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/>
          <textarea className="textarea-field" placeholder="disease" value={form.disease} onChange={(e) => setForm({ ...form, disease: e.target.value })}/>

          {currentUser.role === "doctor" && (
            <textarea className="textarea-field" placeholder="doctor Details" value={form.doctorDetails} onChange={(e) => setForm({ ...form, doctorDetails: e.target.value })
              }
            />
          )}
          <div className="edit-btn-box">
            <button className="save-btn" onClick={saveProfile}>Save</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <DataProvider>
      <MainDashboard />
    </DataProvider>
  );
}

function MainDashboard() {
  const { currentUser } = useContext(DataContext);

  if (!currentUser) return <Login />;
  return currentUser.role === "patient" ? (
    <PatientDashboard />
  ) : (
    <DoctorDashboard />
  );
}

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState({});

  const loginUser = (username, password, role) => {
    let user = users.find((u) => u.username === username);

    if (!user) {
      user = {
        username,
        password,
        role,
        email: "",
        phone: "",
        disease: "",
        doctorDetails: ""
      };
      setUsers([...users, user]);
    }
    setCurrentUser(user);
  };
  const updateProfile = (updatedUser) => {
    setUsers(users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    ));
    setCurrentUser(updatedUser);
  };
  const sendRequest = (patient, doctor) => {
    setRequests([
      ...requests,
      { patient, doctor, status: "pending" }
    ]);
  };
  const acceptRequest = (patient, doctor) => {
    setRequests(
      requests.map((r) =>
        r.patient === patient && r.doctor === doctor
          ? { ...r, status: "accepted" }
          : r
      )
    );
  };

  // CHAT
  const sendMessage = (patient, doctor, from, text) => {
    const key = `${patient}_${doctor}`;
    const newMsgs = { ...messages };
    if (!newMsgs[key]) newMsgs[key] = [];
    newMsgs[key].push({ from, text });
    setMessages(newMsgs);
  };

  return (
    <DataContext.Provider
      value={{
        users,
        currentUser,
        loginUser,
        updateProfile,
        requests,
        sendRequest,
        acceptRequest,
        messages,
        sendMessage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// CHAT COMPONENT
function Chat({ patient, doctor }) {
  const { messages, sendMessage, currentUser } =
    useContext(DataContext);

  const key = `${patient}_${doctor}`;
  const chat = messages[key] || [];

  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    sendMessage(patient, doctor, currentUser.username, text);
    setText("");
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {chat.map((m, i) => (
          <div className={`msg ${m.from === currentUser.username ? "me" : "them"}`} key={i}>
            <b>{m.from}</b>: {m.text}
          </div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message..."/>
      <button onClick={send}>Send</button>
    </div>
  );
}

