import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, set } from "firebase/database";

const PARTIDOS = [
  { id: "g1", local: "Mexico", visitante: "Polonia", grupo: "A" },
  { id: "g2", local: "Argentina", visitante: "Arabia Saudita", grupo: "B" },
  { id: "g3", local: "Francia", visitante: "Australia", grupo: "C" },
  { id: "g4", local: "Espana", visitante: "Costa Rica", grupo: "D" },
  { id: "g5", local: "Brasil", visitante: "Serbia", grupo: "E" },
  { id: "g6", local: "Portugal", visitante: "Ghana", grupo: "F" },
  { id: "g7", local: "Alemania", visitante: "Japon", grupo: "G" },
  { id: "g8", local: "Uruguay", visitante: "Corea del Sur", grupo: "H" },
  ];

export default function App() {
    const [nombre, setNombre] = useState("");
    const [pronosticos, setPronosticos] = useState({});
    const [todos, setTodos] = useState({});

  useEffect(() => {
        const quinielaRef = ref(db, "quiniela");
        onValue(quinielaRef, (snapshot) => {
                const data = snapshot.val();
                if (data) setTodos(data);
        });
  }, []);

  const guardar = () => {
        if (!nombre.trim()) return alert("Escribe tu nombre primero");
        const userRef = ref(db, "quiniela/" + nombre.trim());
        set(userRef, pronosticos);
        alert("Pronosticos guardados!");
  };

  const handlePronostico = (id, campo, valor) => {
        setPronosticos((prev) => ({
                ...prev,
                [id]: { ...prev[id], [campo]: valor },
        }));
  };

  return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto", padding: 16 }}>
                <h1 style={{ textAlign: "center" }}>Quiniela Mundial 2026</h1>h1>

                <div style={{ background: "#f0f0f0", padding: 16, borderRadius: 8, marginBottom: 24 }}>
                          <h2>Tu nombre</h2>h2>
                        <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Escribe tu nombre"
                                    style={{ padding: 8, fontSize: 16, width: "100%", boxSizing: "border-box" }}
                                  />
                </div>div>
        
              <h2>Partidos</h2>h2>
          {PARTIDOS.map((p) => (
                  <div key={p.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                            <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                                        Grupo {p.grupo}: {p.local} vs {p.visitante}
                            </div>div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="0"
                                                        style={{ width: 50, padding: 4, textAlign: "center" }}
                                                        value={pronosticos[p.id]?.local ?? ""}
                                                        onChange={(e) => handlePronostico(p.id, "local", e.target.value)}
                                                      />
                                        <span>-</span>span>
                                        <input
                                                        type="number"
                                                        min="0"
                                                        placeholder="0"
                                                        style={{ width: 50, padding: 4, textAlign: "center" }}
                                                        value={pronosticos[p.id]?.visitante ?? ""}
                                                        onChange={(e) => handlePronostico(p.id, "visitante", e.target.value)}
                                                      />
                            </div>div>
                  </div>div>
                ))}
        
              <button
                        onClick={guardar}
                        style={{
                                    width: "100%",
                                    padding: 14,
                                    background: "#16a34a",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 8,
                                    fontSize: 18,
                                    cursor: "pointer",
                                    marginBottom: 32,
                        }}
                      >
                      Guardar mis pronosticos
              </button>button>
        
              <h2>Pronosticos de todos</h2>h2>
          {Object.keys(todos).length === 0 ? (
                  <p>Nadie ha guardado pronosticos aun.</p>p>
                ) : (
                  Object.entries(todos).map(([jugador, picks]) => (
                              <div key={jugador} style={{ background: "#f9f9f9", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                                          <h3>{jugador}</h3>h3>
                                {PARTIDOS.map((p) => (
                                              <div key={p.id} style={{ fontSize: 14, marginBottom: 4 }}>
                                                {p.local} <strong>{picks[p.id]?.local ?? "-"}</strong>strong>
                                                {" - "}
                                                              <strong>{picks[p.id]?.visitante ?? "-"}</strong>strong> {p.visitante}
                                              </div>div>
                                            ))}
                              </div>div>
                            ))
                )}
        </div>div>
      );
}</h2>
