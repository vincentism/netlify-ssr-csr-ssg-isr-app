import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(min = 10, max = 41) {
  const duration = Math.floor(Math.random() * max) + min; // 生成10-50ms随机整数
  return new Promise(resolve => setTimeout(resolve, duration));
}

export function randomRange(min = 10, max = 20) {
  const num = Math.floor(Math.random() * max) + min; 
  return num;
}