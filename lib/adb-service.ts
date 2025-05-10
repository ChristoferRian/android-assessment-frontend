// import tipe
import { promises } from "dns";
import type { DeviceInfo } from "./types";
import { resolve } from "path";
import { setTimeout } from "timers/promises";

// yah ini juga masih pake mockup dulu deh



export async function scanDevice(): Promise<DeviceInfo> {
    // Simulate a delay for the scanning process
    await new Promise((resolve) => setTimeout(resolve, 2000))
  
    // Return mock data
    return {
      Brand: "Samsung",
      model: "Galaxy S21",
      androidVersion: "12",
      securityPatch: "2023-03-01",
      kernelVersion: "5.4.61-android12-9-00001-g1a2b3c4d5e",
      basebandVersion: "S5123B-27.57.01",
      lastUpdateOS: "2023-02-15",
      lastUpdateSecurityPatch: "2023-03-01",
      bootloaderLocked: true,
      userName: "user@example.com",
      totalStorage: "128 GB",
      remainingStorage: "64.5 GB",
    }
  }