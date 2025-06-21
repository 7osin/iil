import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function ClientDetails({ clientId, onBack }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function fetchClient() {
      setLoading(true);
      const ref = doc(db, "clients", clientId);
      const snap = await getDoc(ref);
      setClient(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      setLoading(false);
    }
    fetchClient();
  }, [clientId]);

  async function handleDelete() {
    if (window.confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      await deleteDoc(doc(db, "clients", clientId));
      setDeleted(true);
    }
  }

  if (deleted) return <div style={{direction:'rtl',textAlign:'center'}}><h2>تم حذف العميل بنجاح</h2><button onClick={onBack}>رجوع</button></div>;
  if (loading) return <p style={{direction:'rtl'}}>جاري التحميل...</p>;
  if (!client) return <p style={{direction:'rtl'}}>العميل غير موجود</p>;

  return (
    <div style={{direction:'rtl',maxWidth:400,margin:'auto',background:'#fff',padding:24,borderRadius:16,boxShadow:'0 2px 16px #0001'}}>
      <h2>تفاصيل العميل</h2>
      <p><b>الاسم:</b> {client.name}</p>
      <p><b>رقم الجوال:</b> {client.phone}</p>
      <p><b>نوع الاشتراك:</b> {client.type}</p>
      <p><b>تاريخ البداية:</b> {client.startDate}</p>
      <p><b>تاريخ النهاية:</b> {client.endDate}</p>
      <p><b>مدة الاشتراك:</b> {client.duration} يوم</p>
      <button onClick={onBack} style={{marginLeft:8}}>رجوع</button>
      <button onClick={handleDelete} style={{background:'#ff4f4f',color:'#fff'}}>حذف العميل</button>
    </div>
  );
}
