import React, { useState } from "react";
import AddClient from "./AddClient";
import ClientsList from "./ClientsList";
import ClientDetails from "./ClientDetails";
import AnimatedBackground from "./AnimatedBackground";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [tab, setTab] = useState("add");
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <>
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 1, fontFamily: "Tajawal, Arial, sans-serif", background: "none", minHeight: "100vh", padding: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 32, color: "#ff0050" }}>نظام إدارة وتتبع اشتراكات العملاء</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          <button onClick={() => { setTab("add"); setSelectedClient(null); }}
            style={{ background: tab === "add" ? '#4f8cff' : '#e3e6ed', color: tab === "add" ? '#fff' : '#2d3a4b', fontWeight: 'bold' }}>
            إضافة عميل جديد
          </button>
          <button onClick={() => { setTab("list"); setSelectedClient(null); }}
            style={{ background: tab === "list" ? '#4f8cff' : '#e3e6ed', color: tab === "list" ? '#fff' : '#2d3a4b', fontWeight: 'bold' }}>
            قائمة العملاء
          </button>
        </div>
        {tab === "add" && <AddClient onClientAdded={() => setRefresh(r => r + 1)} />}
        {tab === "list" && !selectedClient && <ClientsList refresh={refresh} onSelectClient={id => setSelectedClient(id)} />}
        {tab === "list" && selectedClient && <ClientDetails clientId={selectedClient} onBack={() => setSelectedClient(null)} />}
      </div>
    </>
  );
}

export default App;
