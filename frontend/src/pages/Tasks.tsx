import { useState, useEffect, useContext } from "react";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  creator?: { id: number | string; name: string; email: string };
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [createdByMe, setCreatedByMe] = useState<boolean>(false);
  const [filteredTasks, setFilteredTasks] = useState<Task[] | null>(null);
  const { logout, user } = useContext(AuthContext);

  async function loadTasks() {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
      // clear previous client-side filters when reloading
      setFilteredTasks(null);
    } catch (err: any) {
      console.error("Failed to load tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function deleteTask(id: number) {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err: any) {
      console.error("Failed to delete task", err);
    }
  }

  async function applyFilter() {
    setLoading(true);
    try {
      const params: Record<string, any> = {};
      if (statusFilter && statusFilter !== "ALL") params.status = statusFilter;
      if (createdByMe) {
        params.onlyCreatedByMe = true;
      } else params.onlyCreatedByMe = false;

      const { data } = await api.get("/tasks", { params });
      setFilteredTasks(data);
    } catch (err: any) {
      console.error("Filter request failed", err);
    } finally {
      setLoading(false);
    }
  }

  const visibleTasks = filteredTasks ?? tasks;

  return (
    <div className="p-8">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 style={{ width: "80%", textAlign: "center" }}>
          {"Minhas Tarefas - " + user?.name.toUpperCase()}{" "}
        </h1>
        <div style={{flexDirection: 'column'}}>
          <Link to="/tasks/new" className="btn-primary">
            Nova Tarefa
          </Link>
          <button onClick={logout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>
      <div className="tasks-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label style={{ marginRight: 8 }}>Filtrar por status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos</option>
              <option value="PENDING">Pendente</option>
              <option value="IN_PROGRESS">Em andamento</option>
              <option value="DONE">Concluída</option>
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={createdByMe}
                onChange={(e) => setCreatedByMe(e.target.checked)}
              />
              Criadas por mim
            </label>
            <div style={{ alignItems: "flex-end", }}>
              <button onClick={applyFilter} className="btn-primary">
                Filtrar
              </button>
              <button
                onClick={() => {
                  setFilteredTasks(null);
                  setStatusFilter("ALL");
                  setCreatedByMe(false);
                }}
                className="btn-secondary"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div>Carregando tarefas...</div>
        ) : !visibleTasks || visibleTasks.length === 0 ? (
          <div>Nenhuma tarefa encontrada.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Título</th>
                  <th className="px-4 py-2 text-left">Descrição</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Criado por</th>
                  <th className="px-4 py-2 text-left">Vencimento</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-4 py-2">{t.title}</td>
                    <td className="px-4 py-2 truncate-desc">
                      {t.description
                        ? t.description.length > 15
                          ? `${t.description.slice(0, 15)}...`
                          : t.description
                        : ""}
                    </td>
                    <td className="px-4 py-2">{t.status}</td>
                    <td className="px-4 py-2">{t.creator?.name ?? "-"}</td>
                    <td className="px-4 py-2">
                      {new Date(t.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 actions-cell">
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/tasks/${t.id}`} className="btn-info">
                          Ver mais
                        </Link>
                        {user?.id === t.creator?.id ? (
                          <Link
                            to={`/tasks/edit/${t.id}`}
                            className="btn-warning"
                          >
                            Editar
                          </Link>
                        ) : (
                          <span
                            className="btn-warning disabled"
                            aria-disabled="true"
                            title="Você não pode editar esta tarefa"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              opacity: 0.6,
                              cursor: "not-allowed",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            Editar
                          </span>
                        )}
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="btn-danger"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
