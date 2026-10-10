/*
 * Загрузка JavaScript API Яндекс Карт (2.1) по требованию — только на странице оформления, когда нужна карта.
 * Ключ приходит с нашего сервера (/api/sdek/config), чтобы его можно было сменить без пересборки сайта.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    ymaps?: any
  }
}

let loading: Promise<any> | null = null

export function loadYmaps(apiKey: string): Promise<any> {
  if (loading) return loading
  loading = new Promise((resolve, reject) => {
    if (window.ymaps) return window.ymaps.ready(() => resolve(window.ymaps))
    const s = document.createElement('script')
    const key = apiKey ? `&apikey=${encodeURIComponent(apiKey)}` : ''
    s.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${key}`
    s.async = true
    s.onload = () => window.ymaps.ready(() => resolve(window.ymaps))
    s.onerror = () => {
      loading = null
      reject(new Error('ymaps'))
    }
    document.head.appendChild(s)
  })
  return loading
}
