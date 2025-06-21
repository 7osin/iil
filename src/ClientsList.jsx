import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ClientsList({ refresh, onSelectClient }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchClients() {
    setLoading(true);
    const snap = await getDocs(collection(db, "clients"));
    setClients(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  }

  useEffect(() => { fetchClients(); }, [refresh]);

  return (
    <div style={{ direction: "rtl", maxWidth: 700, margin: "auto" }}>
      <h2>قائمة العملاء والاشتراكات</h2>
      {loading ? <p>جاري التحميل...</p> : (
        <table border="1" cellPadding="8" style={{width:'100%',textAlign:'center'}}>
          <thead>
            <tr>
              <th>اسم العميل</th>
              <th>رقم الجوال</th>
              <th>نوع الاشتراك</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
              <th>مدة الاشتراك (يوم)</th>
              <th>تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.type}</td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
                <td>{c.duration}</td>
                <td><button onClick={() => onSelectClient(c.id)}>عرض</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
