import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, set, get } from "firebase/database";

const PARTICIPANTES = ["Chava 👦", "Angie 👧", "Iván 👨", "Lulú 👩", "Diego ⭐"];

const PARTIDOS_GRUPOS = [
  { id: 1, grupo: "A", local: "México", visita: "Sudáfrica", fecha: "11 Jun" },
  { id: 2, grupo: "A", local: "Corea del Sur", visita: "Rep. Checa*", fecha: "11 Jun" },
  { id: 3, grupo: "A", local: "Rep. Checa*", visita: "Sudáfrica", fecha: "18 Jun" },
  { id: 4, grupo: "A", local: "México", visita: "Corea del Sur", fecha: "18 Jun" },
  { id: 5, grupo: "A", local: "Rep. Checa*", visita: "México", fecha: "24 Jun" },
  { id: 6, grupo: "A", local: "Sudáfrica", visita: "Corea del Sur", fecha: "24 Jun" },
  { id: 7, grupo: "B", local: "Canadá", visita: "Bosnia", fecha: "12 Jun" },
  { id: 8, grupo: "B", local: "Qatar", visita: "Suiza", fecha: "13 Jun" },
  { id: 9, grupo: "B", local: "Suiza", visita: "Bosnia", fecha: "18 Jun" },
  { id: 10, grupo: "B", local: "Canadá", visita: "Qatar", fecha: "18 Jun" },
  { id: 11, grupo: "B", local: "Bosnia", visita: "Qatar", fecha: "24 Jun" },
  { id: 12, grupo: "B", local: "Suiza", visita: "Canadá", fecha: "24 Jun" },
  { id: 13, grupo: "C", local: "Brasil", visita: "Marruecos", fecha: "13 Jun" },
  { id: 14, grupo: "C", local: "Haití", visita: "Escocia", fecha: "13 Jun" },
  { id: 15, grupo: "C", local: "Brasil", visita: "Haití", fecha: "19 Jun" },
  { id: 16, grupo: "C", local: "Marruecos", visita: "Escocia", fecha: "19 Jun" },
  { id: 17, grupo: "C", local: "Escocia", visita: "Brasil", fecha: "25 Jun" },
  { id: 18, grupo: "C", local: "Marruecos", visita: "Haití", fecha: "25 Jun" },
  { id: 19, grupo: "D", local: "EUA", visita: "Paraguay", fecha: "12 Jun" },
  { id: 20, grupo: "D", local: "Australia", visita: "Turquía", fecha: "13 Jun" },
  { id: 21, grupo: "D", local: "Paraguay", visita: "Turquía", fecha: "19 Jun" },
  { id: 22, grupo: "D", local: "EUA", visita: "Australia", fecha: "19 Jun" },
  { id: 23, grupo: "D", local: "Turquía*", visita: "EUA", fecha: "25 Jun" },
  { id: 24, grupo: "D", local: "Paraguay", visita: "Australia", fecha: "25 Jun" },
  { id: 25, grupo: "E", local: "Alemania", visita: "Curazao", fecha: "14 Jun" },
  { id: 26, grupo: "E", local: "Costa de Marfil", visita: "Ecuador", fecha: "14 Jun" },
  { id: 27, grupo: "E", local: "Alemania", visita: "Costa de Marfil", fecha: "20 Jun" },
  { id: 28, grupo: "E", local: "Ecuador", visita: "Curazao", fecha: "20 Jun" },
  { id: 29, grupo: "E", local: "Curazao", visita: "Costa de Marfil", fecha: "26 Jun" },
  { id: 30, grupo: "E", local: "Ecuador", visita: "Alemania", fecha: "26 Jun" },
  { id: 31, grupo: "F", local: "Países Bajos", visita: "Japón", fecha: "14 Jun" },
  { id: 32, grupo: "F", local: "Suecia", visita: "Túnez", fecha: "15 Jun" },
  { id: 33, grupo: "F", local: "Países Bajos", visita: "Suecia", fecha: "20 Jun" },
  { id: 34, grupo: "F", local: "Japón", visita: "Túnez", fecha: "20 Jun" },
  { id: 35, grupo: "F", local: "Túnez", visita: "Países Bajos", fecha: "26 Jun" },
  { id: 36, grupo: "F", local: "Suecia", visita: "Japón", fecha: "26 Jun" },
  { id: 37, grupo: "G", local: "Bélgica", visita: "Egipto", fecha: "15 Jun" },
  { id: 38, grupo: "G", local: "Irán", visita: "Nueva Zelanda", fecha: "15 Jun" },
  { id: 39, grupo: "G", local: "Bélgica", visita: "Irán", fecha: "21 Jun" },
  { id: 40, grupo: "G", local: "Egipto", visita: "Nueva Zelanda", fecha: "21 Jun" },
  { id: 41, grupo: "G", local: "Nueva Zelanda", visita: "Bélgica", fecha: "27 Jun" },
  { id: 42, grupo: "G", local: "Egipto", visita: "Irán", fecha: "27 Jun" },
  { id: 43, grupo: "H", local: "España", visita: "Cabo Verde", fecha: "15 Jun" },
  { id: 44, grupo: "H", local: "Arabia Saudita", visita: "Uruguay", fecha: "15 Jun" },
  { id: 45, grupo: "H", local: "España", visita: "Arabia Saudita", fecha: "21 Jun" },
  { id: 46, grupo: "H", local: "Cabo Verde", visita: "Uruguay", fecha: "21 Jun" },
  { id: 47, grupo: "H", local: "Uruguay", visita: "España", fecha: "27 Jun" },
  { id: 48, grupo: "H", local: "Arabia Saudita", visita: "Cabo Verde", fecha: "27 Jun" },
  { id: 49, grupo: "I", local: "Francia", visita: "Senegal", fecha: "16 Jun" },
  { id: 50, grupo: "I", local: "Irak", visita: "Noruega", fecha: "16 Jun" },
  { id: 51, grupo: "I", local: "Francia", visita: "Irak", fecha: "22 Jun" },
  { id: 52, grupo: "I", local: "Senegal", visita: "Noruega", fecha: "22 Jun" },
  { id: 53, grupo: "I", local: "Noruega", visita: "Francia", fecha: "27 Jun" },
  { id: 54, grupo: "I", local: "Irak", visita: "Senegal", fecha: "27 Jun" },
  { id: 55, grupo: "J", local: "Argentina", visita: "Argelia", fecha: "16 Jun" },
  { id: 56, grupo: "J", local: "Austria", visita: "Jordania", fecha: "16 Jun" },
  { id: 57, grupo: "J", local: "Argentina", visita: "Austria", fecha: "22 Jun" },
  { id: 58, grupo: "J", local: "Argelia", visita: "Jordania", fecha: "22 Jun" },
  { id: 59, grupo: "J", local: "Jordania", visita: "Argentina", fecha: "27 Jun" },
  { id: 60, grupo: "J", local: "Argelia", visita: "Austria", fecha: "27 Jun" },
  { id: 61, grupo: "K", local: "Portugal", visita: "Congo", fecha: "17 Jun" },
  { id: 62, grupo: "K", local: "Uzbekistán", visita: "Colombia", fecha: "17 Jun" },
  { id: 63, grupo: "K", local: "Portugal", visita: "Uzbekistán", fecha: "23 Jun" },
  { id: 64, grupo: "K", local: "Colombia", visita: "Congo", fecha: "23 Jun" },
  { id: 65, grupo: "K", local: "Congo", visita: "Uzbekistán", fecha: "28 Jun" },
  { id: 66, grupo: "K", local: "Colombia", visita: "Portugal", fecha: "28 Jun" },
  { id: 67, grupo: "L", local: "Inglaterra", visita: "Croacia", fecha: "17 Jun" },
  { id: 68, grupo: "L", local: "Ghana", visita: "Panamá", fecha: "17 Jun" },
  { id: 69, grupo: "L", local: "Inglaterra", visita: "Ghana", fecha: "23 Jun" },
  { id: 70, grupo: "L", local: "Croacia", visita: "Panamá", fecha: "23 Jun" },
  { id: 71, grupo: "L", local: "Panamá", visita: "Inglaterra", fecha: "28 Jun" },
  { id: 72, grupo: "L", local: "Croacia", visita: "Ghana", fecha: "28 Jun" },
];

const PARTIDOS_ELIM = [
  { id: 101, ronda: "16avos", llave: "1", fecha: "2 Jul" },
  { id: 102, ronda: "16avos", llave: "2", fecha: "2 Jul" },
  { id: 103, ronda: "16avos", llave: "3", fecha: "3 Jul" },
  { id: 104, ronda: "16avos", llave: "4", fecha: "3 Jul" },
  { id: 105, ronda: "16avos", llave: "5", fecha: "4 Jul" },
  { id: 106, ronda: "16avos", llave: "6", fecha: "4 Jul" },
  { id: 107, ronda: "16avos", llave: "7", fecha: "5 Jul" },
  { id: 108, ronda: "16avos", llave: "8", fecha: "5 Jul" },
  { id: 109, ronda: "16avos", llave: "9", fecha: "6 Jul" },
  { id: 110, ronda: "16avos", llave: "10", fecha: "6 Jul" },
  { id: 111, ronda: "16avos", llave: "11", fecha: "7 Jul" },
  { id: 112, ronda: "16avos", llave: "12", fecha: "7 Jul" },
  { id: 113, ronda: "16avos", llave: "13", fecha: "8 Jul" },
  { id: 114, ronda: "16avos", llave: "14", fecha: "8 Jul" },
  { id: 115, ronda: "16avos", llave: "15", fecha: "9 Jul" },
  { id: 116, ronda: "16avos", llave: "16", fecha: "9 Jul" },
  { id: 201, ronda: "Octavos", llave: "1", fecha: "11 Jul" },
  { id: 202, ronda: "Octavos", llave: "2", fecha: "11 Jul" },
  { id: 203, ronda: "Octavos", llave: "3", fecha: "12 Jul" },
  { id: 204, ronda: "Octavos", llave: "4", fecha: "12 Jul" },
  { id: 205, ronda: "Octavos", llave: "5", fecha: "13 Jul" },
  { id: 206, ronda: "Octavos", llave: "6", fecha: "13 Jul" },
  { id: 207, ronda: "Octavos", llave: "7", fecha: "14 Jul" },
  { id: 208, ronda: "Octavos", llave: "8", fecha: "14 Jul" },
  { id: 301, ronda: "Cuartos", llave: "1", fecha: "16 Jul" },
  { id: 302, ronda: "Cuartos", llave: "2", fecha: "16 Jul" },
  { id: 303, ronda: "Cuartos", llave: "3", fecha: "17 Jul" },
  { id: 304, ronda: "Cuartos", llave: "4", fecha: "17 Jul" },
  { id: 401, ronda: "Semis", llave: "1", fecha: "14 Jul" },
  { id: 402, ronda: "Semis", llave: "2", fecha: "15 Jul" },
  { id: 501, ronda: "3er Lugar", llave: "1", fecha: "18 Jul" },
  { id: 601, ronda: "Final", llave: "1", fecha: "19 Jul" },
];

const GRUPO_COLORS = {
  A:"#e74c3c",B:"#e67e22",C:"#27ae60",D:"#3498db",
  E:"#9b59b6",F:"#1abc9c",G:"#e91e8c",H:"#f39c12",
  I:"#c0392b",J:"#16a085",K:"#8e44ad",L:"#2980b9",
};
const RONDA_COLORS = {
  "16avos":"#546e7a","Octavos":"#1565c0","Cuartos":"#6a1b9a",
  "Semis":"#c62828","3er Lugar":"#e65100","Final":"#f5c518",
};
const MEDAL = ["🥇","🥈","🥉","4️⃣","5️⃣"];

function calcPoints(p, r) {
  if (!p || !r || p.local==="" || p.visita==="" || r.local==="" || r.visita==="") return null;
  const pl=parseInt(p.local),pv=parseInt(p.visita),rl=parseInt(r.local),rv=parseInt(r.visita);
  if (pl===rl && pv===rv) return 3;
  const gP=pl>pv?"L":pl<pv?"V":"E", gR=rl>rv?"L":rl<rv?"V":"E";
  if (gP==="E" && gR==="E") return 2;
  if (gP===gR) return 1;
  return 0;
}

const IS = { width:39,height:35,textAlign:"center",fontSize:16,fontWeight:700,
  background:"rgba(255,255,255,0.12)",color:"#fff",
  border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:8,outline:"none" };

function Chip({ label, color }) {
  return (
    <span style={{fontSize:11,fontWeight:600,background:color+"22",color,
      padding:"3px 8px",borderRadius:10,border:`1px solid ${color}44`}}>
      {label}
    </span>
  );
}

const mkEmpty = (ids) => { const o={}; ids.forEach(id=>{ o[id]={local:"",visita:""}; }); return o; };

export default function App() {
  const [tab, setTab]       = useState("grupos");
  const [grp, setGrp]       = useState("A");
  const [ronda, setRonda]   = useState("16avos");
  const [resTab, setResTab] = useState("grupos");
  const [resGrp, setResGrp] = useState("A");
  const [part, setPart]     = useState(PARTICIPANTES[0]);

  // Estado local (se sincroniza con Firebase en tiempo real)
  const [pronos,    setPronos]    = useState({});
  const [resGrupos, setResGrupos] = useState(mkEmpty(PARTIDOS_GRUPOS.map(m=>m.id)));
  const [resElim,   setResElim]   = useState(mkEmpty(PARTIDOS_ELIM.map(m=>m.id)));
  const [equipos,   setEquipos]   = useState(mkEmpty(PARTIDOS_ELIM.map(m=>m.id)));
  const [status,    setStatus]    = useState("🔄 Conectando...");

  // ── Escucha cambios en tiempo real desde Firebase ──────────────────────────
  useEffect(() => {
    const unsubs = [];

    // Pronósticos de todos
    unsubs.push(onValue(ref(db, "pronos"), snap => {
      setPronos(snap.val() || {});
      setStatus("🟢 En vivo");
    }, () => setStatus("🔴 Sin conexión")));

    // Resultados grupos
    unsubs.push(onValue(ref(db, "resGrupos"), snap => {
      setResGrupos({ ...mkEmpty(PARTIDOS_GRUPOS.map(m=>m.id)), ...(snap.val()||{}) });
    }));

    // Resultados eliminatorias
    unsubs.push(onValue(ref(db, "resElim"), snap => {
      setResElim({ ...mkEmpty(PARTIDOS_ELIM.map(m=>m.id)), ...(snap.val()||{}) });
    }));

    // Equipos eliminatorias
    unsubs.push(onValue(ref(db, "equipos"), snap => {
      setEquipos({ ...mkEmpty(PARTIDOS_ELIM.map(m=>m.id)), ...(snap.val()||{}) });
    }));

    return () => unsubs.forEach(u => u());
  }, []);

  // ── Escritura a Firebase ───────────────────────────────────────────────────
  async function setProno(pid, id, side, val) {
    if (val !== "" && (isNaN(val) || parseInt(val) < 0)) return;
    const path = `pronos/${pid}/${id}`;
    const snap = await get(ref(db, path));
    const cur  = snap.val() || { local: "", visita: "" };
    await set(ref(db, path), { ...cur, [side]: val });
  }

  async function setRG(id, side, val) {
    if (val !== "" && (isNaN(val) || parseInt(val) < 0)) return;
    const path = `resGrupos/${id}`;
    const snap = await get(ref(db, path));
    const cur  = snap.val() || { local: "", visita: "" };
    await set(ref(db, path), { ...cur, [side]: val });
  }

  async function setRE(id, side, val) {
    if (val !== "" && (isNaN(val) || parseInt(val) < 0)) return;
    const path = `resElim/${id}`;
    const snap = await get(ref(db, path));
    const cur  = snap.val() || { local: "", visita: "" };
    await set(ref(db, path), { ...cur, [side]: val });
  }

  async function setEq(id, side, val) {
    const path = `equipos/${id}`;
    const snap = await get(ref(db, path));
    const cur  = snap.val() || { local: "", visita: "" };
    await set(ref(db, path), { ...cur, [side]: val });
  }

  // ── Tabla de posiciones ───────────────────────────────────────────────────
  const puntos = PARTICIPANTES.map(p => {
    let ex=0,gn=0,em=0;
    const pp = pronos[p] || {};
    PARTIDOS_GRUPOS.forEach(m => {
      const pts = calcPoints(pp[m.id], resGrupos[m.id]);
      if(pts===3)ex++; else if(pts===2)em++; else if(pts===1)gn++;
    });
    PARTIDOS_ELIM.forEach(m => {
      const pts = calcPoints(pp[m.id], resElim[m.id]);
      if(pts===3)ex++; else if(pts===2)em++; else if(pts===1)gn++;
    });
    return { p, ex, gn, em, total: ex*3 + gn + em*2 };
  }).sort((a,b) => b.total - a.total);

  const grupos = ["A","B","C","D","E","F","G","H","I","J","K","L"];
  const rondas = ["16avos","Octavos","Cuartos","Semis","3er Lugar","Final"];

  const badge = pts => {
    if(pts===3) return { bg:"#27ae60", label:"3pts ⭐" };
    if(pts===2) return { bg:"#f39c12", label:"2pts 🤝" };
    if(pts===1) return { bg:"#3498db", label:"1pt ✅" };
    if(pts===0) return { bg:"#c0392b", label:"0pts" };
    return null;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"linear-gradient(135deg,#0d1b2a 0%,#1a3a2a 50%,#0d1b2a 100%)",minHeight:"100vh",color:"#f0f0f0",paddingBottom:50}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(90deg,#1a7a4a,#f5c518,#1a7a4a)",padding:"15px 20px 11px",textAlign:"center"}}>
        <div style={{fontSize:22,fontWeight:900,letterSpacing:2,color:"#0d1b2a"}}>🏆 QUINIELA MUNDIAL 2026 🏆</div>
        <div style={{fontSize:11,color:"#0d1b2a",fontWeight:600,marginTop:3}}>Exacto 3pts · Ganador 1pt · Empate correcto 2pts</div>
        <div style={{fontSize:10,color:"#0d1b2a99",marginTop:2}}>{status}</div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",justifyContent:"center",gap:6,padding:"12px 12px 0",flexWrap:"wrap"}}>
        {[["grupos","⚽ Grupos"],["elim","🏆 Eliminatorias"],["resultados","📋 Resultados"],["tabla","🏅 Tabla"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{padding:"7px 15px",borderRadius:30,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:tab===k?"#f5c518":"rgba(255,255,255,0.1)",color:tab===k?"#0d1b2a":"#ccc",boxShadow:tab===k?"0 0 12px #f5c51866":"none"}}>{l}</button>
        ))}
      </div>

      <div style={{maxWidth:780,margin:"0 auto",padding:"12px 12px 0"}}>

        {/* ── GRUPOS ── */}
        {tab==="grupos" && (
          <div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
              {PARTICIPANTES.map(p=>(
                <button key={p} onClick={()=>setPart(p)} style={{padding:"6px 11px",borderRadius:20,border:"2px solid",borderColor:part===p?"#f5c518":"transparent",background:part===p?"rgba(245,197,24,0.15)":"rgba(255,255,255,0.07)",color:part===p?"#f5c518":"#bbb",fontWeight:700,cursor:"pointer",fontSize:11}}>{p}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
              {grupos.map(g=>(
                <button key={g} onClick={()=>setGrp(g)} style={{padding:"3px 10px",borderRadius:12,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:grp===g?GRUPO_COLORS[g]:"rgba(255,255,255,0.1)",color:"#fff"}}>G-{g}</button>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {PARTIDOS_GRUPOS.filter(m=>m.grupo===grp).map(m=>{
                const pro = (pronos[part]||{})[m.id] || { local:"",visita:"" };
                const res = resGrupos[m.id] || { local:"",visita:"" };
                const pts = calcPoints(pro,res); const b = badge(pts);
                return (
                  <div key={m.id} style={{background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 13px",borderLeft:`4px solid ${GRUPO_COLORS[m.grupo]}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <span style={{fontSize:10,color:"#aaa"}}>📅 {m.fecha}</span>
                      {b && <span style={{fontSize:11,fontWeight:700,background:b.bg,color:"#fff",padding:"2px 7px",borderRadius:7}}>{b.label}</span>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <span style={{flex:1,fontWeight:700,textAlign:"right",fontSize:13}}>{m.local}</span>
                      <div style={{display:"flex",gap:4,alignItems:"center"}}>
                        <input type="number" min="0" max="20" value={pro.local} onChange={e=>setProno(part,m.id,"local",e.target.value)} style={IS}/>
                        <span style={{color:"#f5c518",fontWeight:900}}>:</span>
                        <input type="number" min="0" max="20" value={pro.visita} onChange={e=>setProno(part,m.id,"visita",e.target.value)} style={IS}/>
                      </div>
                      <span style={{flex:1,fontWeight:700,textAlign:"left",fontSize:13}}>{m.visita}</span>
                    </div>
                    {(res.local!==""||res.visita!=="") && (
                      <div style={{textAlign:"center",marginTop:5,fontSize:11,color:"#aaa"}}>
                        Resultado real: <strong style={{color:"#27ae60"}}>{res.local} - {res.visita}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ELIMINATORIAS ── */}
        {tab==="elim" && (
          <div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
              {PARTICIPANTES.map(p=>(
                <button key={p} onClick={()=>setPart(p)} style={{padding:"6px 11px",borderRadius:20,border:"2px solid",borderColor:part===p?"#f5c518":"transparent",background:part===p?"rgba(245,197,24,0.15)":"rgba(255,255,255,0.07)",color:part===p?"#f5c518":"#bbb",fontWeight:700,cursor:"pointer",fontSize:11}}>{p}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
              {rondas.map(r=>(
                <button key={r} onClick={()=>setRonda(r)} style={{padding:"3px 10px",borderRadius:12,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:ronda===r?RONDA_COLORS[r]:"rgba(255,255,255,0.1)",color:"#fff"}}>{r}</button>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {PARTIDOS_ELIM.filter(m=>m.ronda===ronda).map(m=>{
                const eq  = equipos[m.id]  || { local:"",visita:"" };
                const pro = (pronos[part]||{})[m.id] || { local:"",visita:"" };
                const res = resElim[m.id]  || { local:"",visita:"" };
                const pts = calcPoints(pro,res); const b = badge(pts);
                const def = eq.local.trim()!=="" && eq.visita.trim()!=="";
                const c   = RONDA_COLORS[m.ronda] || "#555";
                return (
                  <div key={m.id} style={{background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 13px",borderLeft:`4px solid ${c}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                      <span style={{fontSize:10,color:c,fontWeight:700}}>Llave {m.llave} · {m.fecha}</span>
                      {b && def && <span style={{fontSize:11,fontWeight:700,background:b.bg,color:"#fff",padding:"2px 7px",borderRadius:7}}>{b.label}</span>}
                    </div>
                    <div style={{display:"flex",gap:5,marginBottom:7}}>
                      <input value={eq.local} onChange={e=>setEq(m.id,"local",e.target.value)} placeholder="Equipo local" style={{flex:1,padding:"4px 7px",borderRadius:7,border:"1px dashed #f5c51855",background:"rgba(245,197,24,0.08)",color:"#f5c518",fontSize:11,fontWeight:700}}/>
                      <span style={{color:"#555",alignSelf:"center",fontSize:11}}>vs</span>
                      <input value={eq.visita} onChange={e=>setEq(m.id,"visita",e.target.value)} placeholder="Equipo visitante" style={{flex:1,padding:"4px 7px",borderRadius:7,border:"1px dashed #f5c51855",background:"rgba(245,197,24,0.08)",color:"#f5c518",fontSize:11,fontWeight:700}}/>
                    </div>
                    {def ? (
                      <div style={{display:"flex",alignItems:"center",gap:7}}>
                        <span style={{flex:1,fontWeight:700,textAlign:"right",fontSize:13}}>{eq.local}</span>
                        <div style={{display:"flex",gap:4,alignItems:"center"}}>
                          <input type="number" min="0" max="20" value={pro.local} onChange={e=>setProno(part,m.id,"local",e.target.value)} style={IS}/>
                          <span style={{color:c,fontWeight:900}}>:</span>
                          <input type="number" min="0" max="20" value={pro.visita} onChange={e=>setProno(part,m.id,"visita",e.target.value)} style={IS}/>
                        </div>
                        <span style={{flex:1,fontWeight:700,textAlign:"left",fontSize:13}}>{eq.visita}</span>
                      </div>
                    ) : (
                      <div style={{textAlign:"center",color:"#555",fontSize:11,padding:"4px 0"}}>Escribe los equipos arriba para habilitar el pronóstico</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RESULTADOS ── */}
        {tab==="resultados" && (
          <div>
            <div style={{fontSize:12,color:"#aaa",textAlign:"center",marginBottom:10}}>Captura los resultados reales aquí</div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:12}}>
              {[["grupos","⚽ Grupos"],["elim","🏆 Eliminatorias"]].map(([k,l])=>(
                <button key={k} onClick={()=>setResTab(k)} style={{padding:"7px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:resTab===k?"#27ae60":"rgba(255,255,255,0.1)",color:"#fff"}}>{l}</button>
              ))}
            </div>
            {resTab==="grupos" && (
              <div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
                  {grupos.map(g=>(
                    <button key={g} onClick={()=>setResGrp(g)} style={{padding:"3px 10px",borderRadius:12,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:resGrp===g?GRUPO_COLORS[g]:"rgba(255,255,255,0.1)",color:"#fff"}}>G-{g}</button>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {PARTIDOS_GRUPOS.filter(m=>m.grupo===resGrp).map(m=>{
                    const res = resGrupos[m.id] || { local:"",visita:"" };
                    const jug = res.local!=="" && res.visita!=="";
                    return (
                      <div key={m.id} style={{background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 13px",borderLeft:`4px solid ${jug?"#27ae60":GRUPO_COLORS[m.grupo]}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                          <span style={{fontSize:10,color:"#aaa"}}>📅 {m.fecha}</span>
                          {jug && <span style={{fontSize:11,color:"#27ae60",fontWeight:700}}>✓ Jugado</span>}
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <span style={{flex:1,fontWeight:700,textAlign:"right",fontSize:13}}>{m.local}</span>
                          <div style={{display:"flex",gap:4}}>
                            <input type="number" min="0" max="20" value={res.local} onChange={e=>setRG(m.id,"local",e.target.value)} style={{...IS,background:"rgba(39,174,96,0.2)",borderColor:"#27ae60"}}/>
                            <span style={{color:"#27ae60",fontWeight:900,alignSelf:"center"}}>:</span>
                            <input type="number" min="0" max="20" value={res.visita} onChange={e=>setRG(m.id,"visita",e.target.value)} style={{...IS,background:"rgba(39,174,96,0.2)",borderColor:"#27ae60"}}/>
                          </div>
                          <span style={{flex:1,fontWeight:700,textAlign:"left",fontSize:13}}>{m.visita}</span>
                        </div>
                        {jug && (
                          <div style={{display:"flex",gap:5,marginTop:7,flexWrap:"wrap"}}>
                            {PARTICIPANTES.map(p=>{
                              const pts=calcPoints((pronos[p]||{})[m.id],res); const b=badge(pts);
                              const pr=(pronos[p]||{})[m.id]||{};
                              return(
                                <div key={p} style={{fontSize:10,padding:"2px 7px",borderRadius:7,background:b?.bg?b.bg+"33":"rgba(255,255,255,0.07)",border:`1px solid ${b?.bg||"rgba(255,255,255,0.1)"}`,color:b?.bg||"#777"}}>
                                  {p.split(" ")[0]}: {pr.local!==""?`${pr.local}-${pr.visita}`:"—"} {b?b.label:"0pts"}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {resTab==="elim" && (
              <div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,justifyContent:"center"}}>
                  {rondas.map(r=>(
                    <button key={r} onClick={()=>setRonda(r)} style={{padding:"3px 10px",borderRadius:12,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:ronda===r?RONDA_COLORS[r]:"rgba(255,255,255,0.1)",color:"#fff"}}>{r}</button>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {PARTIDOS_ELIM.filter(m=>m.ronda===ronda).map(m=>{
                    const eq  = equipos[m.id]  || { local:"",visita:"" };
                    const res = resElim[m.id]   || { local:"",visita:"" };
                    const jug = res.local!==""  && res.visita!=="";
                    const c   = RONDA_COLORS[m.ronda];
                    return (
                      <div key={m.id} style={{background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"10px 13px",borderLeft:`4px solid ${c}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                          <span style={{fontSize:10,color:c,fontWeight:700}}>Llave {m.llave} · {m.fecha}</span>
                          {jug && <span style={{fontSize:11,color:"#27ae60",fontWeight:700}}>✓ Jugado</span>}
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:7}}>
                          <span style={{flex:1,fontWeight:700,textAlign:"right",fontSize:13}}>{eq.local||"Por definir"}</span>
                          <div style={{display:"flex",gap:4}}>
                            <input type="number" min="0" max="20" value={res.local} onChange={e=>setRE(m.id,"local",e.target.value)} style={{...IS,background:"rgba(39,174,96,0.2)",borderColor:"#27ae60"}}/>
                            <span style={{color:"#27ae60",fontWeight:900,alignSelf:"center"}}>:</span>
                            <input type="number" min="0" max="20" value={res.visita} onChange={e=>setRE(m.id,"visita",e.target.value)} style={{...IS,background:"rgba(39,174,96,0.2)",borderColor:"#27ae60"}}/>
                          </div>
                          <span style={{flex:1,fontWeight:700,textAlign:"left",fontSize:13}}>{eq.visita||"Por definir"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TABLA ── */}
        {tab==="tabla" && (
          <div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {puntos.map(({p,ex,gn,em,total},i)=>(
                <div key={p} style={{background:i===0?"linear-gradient(90deg,rgba(245,197,24,0.2),rgba(245,197,24,0.05))":"rgba(255,255,255,0.06)",borderRadius:14,padding:"13px 17px",border:i===0?"1.5px solid rgba(245,197,24,0.4)":"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:13}}>
                  <span style={{fontSize:26}}>{MEDAL[i]}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:16,color:i===0?"#f5c518":"#fff"}}>{p}</div>
                    <div style={{display:"flex",gap:7,marginTop:5,flexWrap:"wrap"}}>
                      <Chip label={`⭐ ${ex} exactos`} color="#27ae60"/>
                      <Chip label={`✅ ${gn} ganador`} color="#3498db"/>
                      <Chip label={`🤝 ${em} empate`} color="#f39c12"/>
                    </div>
                  </div>
                  <div style={{fontSize:34,fontWeight:900,color:i===0?"#f5c518":"#fff",minWidth:46,textAlign:"right"}}>{total}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,padding:"12px 15px",background:"rgba(255,255,255,0.04)",borderRadius:12}}>
              <div style={{fontWeight:700,color:"#aaa",fontSize:12,marginBottom:7}}>Sistema de puntos</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                <Chip label="⭐ Exacto = 3 pts" color="#27ae60"/>
                <Chip label="🤝 Empate correcto = 2 pts" color="#f39c12"/>
                <Chip label="✅ Ganador correcto = 1 pt" color="#3498db"/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
