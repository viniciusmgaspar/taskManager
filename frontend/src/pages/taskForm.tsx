import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";
interface CreatePerson {
  id: number;
  name: string;
  email: string;
}

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [createdPerson, setCreatedPerson] = useState({} as CreatePerson);
  const [viewers, setViewers] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      api
        .get(`/tasks/${id}`)
        .then(({ data }) => {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setStatus(data.status || "PENDING");
          setCreatedPerson(data.creator);
          setViewers(data.viewers || []);
          setDueDate(data.dueDate ? data.dueDate.split("T")[0] : "");
        })
        .catch((err) => {
          console.error("Failed to load task", err);
        });
    }
  }, [id]);

  async function handleSave(id: number, email: string) {
    try {
      await api.patch(`/tasks/${id}/viwers/${email}`);
    } catch (err) {
      console.error(
        "Falha ao salvar uma pessoa com permissão de visualizar",
        err
      );
      alert("Falha ao salvar uma pessoa para visualizar a tarefa");
    } finally {
      setSaving(false);
    }
    setIsModalOpen(false);

    return 
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    const payload = {
      title: title.trim(),
      description,
      status,
      dueDate: dueDate || null,
    };
    setSaving(true);
    try {
      if (id) await api.put(`/tasks/${id}`, payload);
      else await api.post("/tasks", payload);
      navigate("/tasks");
    } catch (err) {
      console.error("Failed to save task", err);
      alert("Erro ao salvar tarefa. Veja o console para detalhes.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {id ? "Editar Tarefa" : "Nova Tarefa"}
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "10px",
              textAlign: "initial",
            }}
            htmlFor="title"
          >
            Titulo:
          </label>
          <input
            id="title"
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
            style={{
              width: "500px",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "10px",
              textAlign: "initial",
            }}
            htmlFor="status"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={saving}
            style={{
              width: "500px",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: saving ? "#f9fafb" : "white",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            <option value="DONE">Concluido</option>
            <option value="IN_PROGRESS">Em execução</option>
            <option value="PENDING">Pendente</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "10px",
              textAlign: "initial",
            }}
            htmlFor="dueDate"
          >
            Vencimento:
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={saving}
            style={{
              width: "500px",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              color: "#374151",
              marginBottom: "10px",
              textAlign: "initial",
            }}
            htmlFor="description"
          >
            Descrição:
          </label>
          <input
            id="description"
            placeholder="Descreva a tarefa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={saving}
            style={{
              width: "500px",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              height: "200px",
            }}
          />
        </div>
        {(location.pathname !== "/tasks/new" && id) && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <label
                style={{
                  color: "#374151",
                  margin: 0,
                  textAlign: "initial",
                }}
                htmlFor="viewers"
              >
                Pessoas que podem ver esta tarefa:
              </label>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
            {isModalOpen && (
              <div>
                <div>
                  <h2>Adicionar Email</h2>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o email"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <button onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSave(+id, email)}
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {viewers.length >= 1 ? (
              viewers.map((v: any, index: number) => (
                <input
                  key={index}
                  id={`viewer-${index}`}
                  value={`${v.name} - ${v.email}`}
                  disabled={true}
                  style={{
                    width: "500px",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    marginBottom: "4px", // espaçamento entre inputs
                  }}
                />
              ))
            ) : (
              <input
                id="viewers"
                value="Nenhuma pessoa com acesso"
                disabled={true}
                style={{
                  width: "500px",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        )}
        <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            style={{
              width: "80px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "red",
              color: "white",
              fontWeight: "500",
              cursor: "pointer",
              border: "none",
            }}
          >
            Cancelar
          </button>
          {((user && user.id === createdPerson?.id) ||
            location.pathname == "/tasks/new") && (
            <button
              type="submit"
              disabled={saving}
              style={{
                width: "80px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                border: "none",
              }}
            >
              {saving ? "Salvando..." : id ? "Salvar" : "Criar"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
