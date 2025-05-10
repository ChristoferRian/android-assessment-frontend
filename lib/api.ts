import { promises } from "dns"

// ip dari api, karna design arsiteknya monolith jadi ya ip dari machinenya sendiri, untuk sementara gw hardcode dlu deh
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.56.20:8000"

// define tipe devicenya
interface Device {
    id: string
    name: string
}

interface ScanReport {
    id: number
    deviceId: string
    scanType: string
    startTime: string
    endTime: string
    results: any
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
  
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })
  
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "An error occurred" }))
      throw new Error(error.message || `API error: ${response.status}`)
    }
  
    return response.json()
  }


// endpoint buat device connection
export const deviceApi = {
    startPolling: () => fetchApi("/device/start-polling", {method: "POST"}),
    getConnectionDevices: () => fetchApi<Device[]>("/device/connected"),
}


// endpoint buat ngescan
export const scanApi = {
    startFastScan: (deviceId: string) => fetchApi(`/scan/fast/${deviceId}`, {method: "POST"}),
    getLastFastScan: (deviceId: string) => fetchApi<ScanReport>(`/scan/fast/${deviceId}/last`),
    startFullScan: (deviceId: string) => fetchApi(`/scan/full/${deviceId}`, {method: "POST"}),
    getLastFullScan: (deviceId: string) => fetchApi<ScanReport>(`/scan/full/${deviceId}/last`, {method: "POST"}),
    getReportById: (reportId: number) => fetchApi<ScanReport>(`/reports/${reportId}`),
}

// endpoint buat reports
export const reportsApi = {
  getAllReports: (limit = 50) => fetchApi<ScanReport[]>(`/reports/?limit?${limit}`),
  getReportById: (reportId: number) => fetchApi<ScanReport>(`/reports/${reportId}`),
  getReportsByDevice: (deviceId: string) => fetchApi<ScanReport[]>(`/reports/device/${deviceId}`),
  downloadAllReport: (reportId: number, format = "json") => {
    window.open(`${API_BASE_URL}/reports/${reportId}/download?format=${format}`, "_blank")
    return Promise.resolve()
  },

  deleteReport: (reportId: number) => fetchApi(`/reports/${reportId}`, {method: "DELETE"}), 
}