import { listeners } from "process"

const WS_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("http", "ws") || "ws://192.168.56.20:8000"

export type ScanProgressEvent = {
    type: "progress"
    deviceId: string
    scanType: "fast" | "full"
    progress: number
    message: string
}

export type ScanCompleteEvent = {
    type: "complete"
    deviceId: string
    scanType: "fast" | "full"
    progress: number
    message: string
}

export type WebSocketEvent = ScanProgressEvent | ScanCompleteEvent

export class ScanWebSocket {
    private ws: WebSocket | null = null
    private eventListeners: ((event: WebSocketEvent) => void)[] = []
  
    connect(deviceId: string, scanType: "fast" | "full") {
      if (this.ws) {
        this.disconnect()
      }
  
      this.ws = new WebSocket(`${WS_BASE_URL}/ws/scan/${deviceId}/${scanType}`)
  
      this.ws.onopen = () => {
        console.log("WebSocket connection established")
      }
  
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketEvent
          this.eventListeners.forEach((listener) => listener(data))
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }
  
      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error)
      }
  
      this.ws.onclose = () => {
        console.log("WebSocket connection closed")
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
    }
  
    addEventListener(callback: (event: WebSocketEvent) => void) {
      this.eventListeners.push(callback)
      return () => {
        this.eventListeners = this.eventListeners.filter((listener) => listener !== callback)
      }
    }
  }

  export const scanWebSocket = new ScanWebSocket()