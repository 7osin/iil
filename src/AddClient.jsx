import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const subscriptionTypes = ["شهري", "سنوي", "أسبوعي"];

export default function AddClient({ onClientAdded }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState(subscriptionTypes[0]);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // حساب تاريخ النهاية تلقائياً
  function calcEndDate(start, days) {
    if (!start || !days) return "";
    const d = new Date(start);
    d.setDate(d.getDate() + Number(days));
    return d.toISOString().slice(0, 10);
  }

  const endDate = calcEndDate(startDate, duration);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "clients"), {
        name,
        phone,
        type,
        startDate,
        endDate,
        duration: Number(duration),
        createdAt: Timestamp.now(),
      });
      setName(""); setPhone(""); setType(subscriptionTypes[0]); setStartDate(""); setDuration("");
      if (onClientAdded) onClientAdded();
    } catch (err) {
      setError("حدث خطأ أثناء الحفظ");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ direction: "rtl", maxWidth: 400, margin: "auto" }}>
      <h2>إضافة عميل جديد</h2>
      <label>اسم العميل:<input required value={name} onChange={e => setName(e.target.value)} /></label><br />
      <label>رقم الجوال:<input required value={phone} onChange={e => setPhone(e.target.value)} /></label><br />
      <label>نوع الاشتراك:
        <select value={type} onChange={e => setType(e.target.value)}>
          {subscriptionTypes.map(t => <option key={t}>{t}</option>)}
        </select>
      </label><br />
      <label>تاريخ البداية:<input required type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label><br />
      <label>مدة الاشتراك (بالأيام):<input required type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} /></label><br />
      <label>تاريخ النهاية:<input value={endDate} readOnly /></label><br />
      <button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "حفظ"}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
