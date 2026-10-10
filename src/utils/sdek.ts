import { useEffect, useState } from 'react'
import { api } from '../lib/api'

/** Включена ли карта пунктов СДЭК на сервере и ключ Яндекс Карт для неё */
export function useSdekConfig(): { loaded: boolean; enabled: boolean; ymapsKey: string } {
  const [cfg, setCfg] = useState({ loaded: false, enabled: false, ymapsKey: '' })
  useEffect(() => {
    api<{ enabled: boolean; ymapsKey: string }>('/sdek/config')
      .then((r) => setCfg({ loaded: true, enabled: r.enabled, ymapsKey: r.ymapsKey }))
      .catch(() => setCfg({ loaded: true, enabled: false, ymapsKey: '' }))
  }, [])
  return cfg
}
