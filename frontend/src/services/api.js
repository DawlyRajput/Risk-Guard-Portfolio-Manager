import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

export const getDashboard = () => api.get("/dashboard");
export const getPositions = () => api.get("/positions");
export const createPosition = payload => api.post("/positions", payload);
export const deletePosition = id => api.delete(`/positions/${id}`);
export const calculateRisk = payload => api.post("/risk/calculate", payload);
export const calculatePositionSize = payload => api.post("/risk/position-size", payload);
export const stressTest = payload => api.post("/risk/stress-test", payload);
export const createSnapshot = payload => api.post("/snapshots", payload);

export default api;