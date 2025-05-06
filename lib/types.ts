// Copy the types.ts content from the provided code
// Define types based on the API responses

export interface Device {
  device_id: string
  brand: string
  model: string
}

export interface StorageInfo {
  total: string
  used: string
  available: string
  use_percentage: string
}

export interface FastScanData {
  brand: string
  model: string
  android_version: string
  security_patch: string
  kernel_version: string
  baseband_version: string
  bootloader_locked: boolean
  user_name: string
  storage: StorageInfo
}

export interface FullScanData extends FastScanData {
  accounts: string[]
  installed_packages: string[]
  // Additional full scan data fields
}

export interface ScanReport {
  id: number
  device_id: string
  brand: string
  model: string
  scan_type: "fast" | "full"
  scan_data: FastScanData | FullScanData
  created_at: string
}

export interface ApiResponse {
  status: string
  message: string
  [key: string]: any
}

export interface DeviceInfo {
  brand: string
  phoneType: string
  model: string
  androidVersion: string
  securityPatch: string
  kernelVersion: string
  basebandVersion: string
  lastUpdateOS: string
  lastUpdateSecurityPatch: string
  bootloaderLocked: boolean
  userName: string
  totalStorage: string
  remainingStorage: string
}
