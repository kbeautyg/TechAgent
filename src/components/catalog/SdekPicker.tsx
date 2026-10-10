import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, LocateFixed, MapPin, Package, Search } from 'lucide-react'
import { api } from '../../lib/api'
import { loadYmaps } from '../../utils/ymaps'

/*
 * Выбор пункта СДЭК на карте прямо в оформлении: город → карта с пунктами и постаматами → «Выбрать».
 * Пункты отдаёт наш сервер (он ходит в API СДЭК), карта — Яндекс. Сохраняются город, код и адрес пункта.
 * Если на сервере нет ключей СДЭК, родитель показывает обычные поля «Город» и «Адрес пункта».
 */

export interface SdekPoint {
  code: string
  type: 'PVZ' | 'POSTAMAT'
  name: string
  address: string
  lat: number
  lon: number
  workTime: string
  note: string
}

export interface SdekChoice {
  cityCode: number
  city: string
  point: SdekPoint
}

interface City {
  code: number
  name: string
}

/** «Москва, Россия» → «Москва» — для заказа и письма */
const shortCity = (name: string) => name.split(',')[0].trim()

export default function SdekPicker({
  ymapsKey,
  value,
  onChange,
  invalid,
  initialCity = '',
}: {
  ymapsKey: string
  value: SdekChoice | null
  onChange: (v: SdekChoice | null) => void
  invalid?: boolean
  initialCity?: string
}) {
  const [query, setQuery] = useState(value ? value.city : initialCity)
  const [cities, setCities] = useState<City[]>([])
  const [city, setCity] = useState<City | null>(value ? { code: value.cityCode, name: value.city } : null)
  const [points, setPoints] = useState<SdekPoint[] | null>(null)
  const [loadErr, setLoadErr] = useState('')
  const [active, setActive] = useState<string | null>(value?.point.code ?? null)
  const [filter, setFilter] = useState('')
  const [editing, setEditing] = useState(!value)
  const [mapFailed, setMapFailed] = useState(false)
  const mapBox = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const omRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const listRef = useRef<HTMLUListElement>(null)
  /** Последний выбранный пункт — карта, загрузившаяся позже выбора, сразу покажет его красным */
  const activeRef = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])

  /* Подсказки городов */
  useEffect(() => {
    if (!editing || (city && shortCity(city.name) === query.trim())) return
    const q = query.trim()
    if (q.length < 2) return
    const t = setTimeout(() => {
      api<{ cities: City[] }>(`/sdek/cities?q=${encodeURIComponent(q)}`).then((r) => setCities(r.cities)).catch(() => setCities([]))
    }, 250)
    return () => clearTimeout(t)
  }, [query, editing, city])

  /* Пункты выбранного города */
  useEffect(() => {
    if (!city) return
    let alive = true
    api<{ points: SdekPoint[] }>(`/sdek/points?city=${city.code}`)
      .then((r) => { if (alive) setPoints(r.points) })
      .catch(() => { if (alive) setLoadErr('Не удалось загрузить пункты СДЭК. Попробуйте ещё раз чуть позже.') })
    return () => { alive = false }
  }, [city])

  /* Карта: создаётся один раз, точки перерисовываются при смене города */
  useEffect(() => {
    if (!editing || !points || !points.length || !mapBox.current) return
    let cancelled = false
    loadYmaps(ymapsKey)
      .then((ymaps) => {
        if (cancelled || !mapBox.current) return
        if (!mapRef.current) {
          mapRef.current = new ymaps.Map(mapBox.current, { center: [points[0].lat, points[0].lon], zoom: 11, controls: [] }, {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          })
          mapRef.current.controls.add('zoomControl', { size: 'small', position: { right: 10, top: 10 } })
          mapRef.current.behaviors.disable('scrollZoom')
        }
        const map = mapRef.current
        if (omRef.current) map.geoObjects.remove(omRef.current)
        const om = new ymaps.ObjectManager({ clusterize: true, gridSize: 64 })
        om.objects.options.set({ preset: 'islands#blueCircleDotIcon', iconColor: '#1B44F5' })
        om.clusters.options.set({ preset: 'islands#blueClusterIcons', clusterIconColor: '#1B44F5' })
        om.add({
          type: 'FeatureCollection',
          features: points.map((p) => ({
            type: 'Feature',
            id: p.code,
            geometry: { type: 'Point', coordinates: [p.lat, p.lon] },
            properties: { hintContent: p.address },
          })),
        })
        om.objects.events.add('click', (e: { get: (k: string) => string }) => setActive(e.get('objectId')))
        map.geoObjects.add(om)
        omRef.current = om
        const picked = points.find((p) => p.code === activeRef.current)
        if (picked) {
          om.objects.setObjectOptions(picked.code, { preset: 'islands#redDotIcon', iconColor: '#E7000B', zIndex: 1000 })
          map.setCenter([picked.lat, picked.lon], 15)
        } else {
          const bounds = om.getBounds()
          if (bounds) map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 24 })
        }
      })
      .catch(() => setMapFailed(true))
    return () => { cancelled = true }
  }, [points, editing, ymapsKey])

  /* Выделение активной точки на карте и в списке */
  useEffect(() => {
    const om = omRef.current
    if (!om || !points) return
    for (const p of points) {
      om.objects.setObjectOptions(p.code, p.code === active
        ? { preset: 'islands#redDotIcon', iconColor: '#E7000B', zIndex: 1000 }
        : { preset: 'islands#blueCircleDotIcon', iconColor: '#1B44F5', zIndex: 0 })
    }
    if (active) {
      const p = points.find((x) => x.code === active)
      // Приближаем, чтобы пункт вышел из группы точек и стал виден красным
      if (p && mapRef.current) mapRef.current.setCenter([p.lat, p.lon], Math.max(mapRef.current.getZoom(), 15), { duration: 300 })
      listRef.current?.querySelector(`[data-code="${CSS.escape(active)}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [active, points])

  /* Карта уничтожается вместе с компонентом */
  useEffect(() => () => {
    mapRef.current?.destroy()
    mapRef.current = null
    omRef.current = null
  }, [])

  const shown = useMemo(() => {
    if (!points) return []
    const f = filter.trim().toLowerCase()
    return f ? points.filter((p) => `${p.address} ${p.name} ${p.code}`.toLowerCase().includes(f)) : points
  }, [points, filter])

  const activePoint = points?.find((p) => p.code === active) ?? null

  const pickCity = (c: City) => {
    setPoints(null)
    setLoadErr('')
    setCity(c)
    setQuery(shortCity(c.name))
    setCities([])
    setActive(null)
    setFilter('')
    onChange(null)
  }

  const choose = (p: SdekPoint) => {
    if (!city) return
    onChange({ cityCode: city.code, city: shortCity(city.name), point: p })
    setEditing(false)
    mapRef.current?.destroy()
    mapRef.current = null
    omRef.current = null
  }

  const locate = () => {
    if (!navigator.geolocation || !points?.length) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      let best = points[0]
      let bestD = Infinity
      for (const p of points) {
        const d = (p.lat - latitude) ** 2 + ((p.lon - longitude) * Math.cos((latitude * Math.PI) / 180)) ** 2
        if (d < bestD) { bestD = d; best = p }
      }
      setActive(best.code)
    })
  }

  /* Пункт выбран — короткая строка с кнопкой «Изменить» */
  if (!editing && value) {
    return (
      <div className="sdek-chosen" id="co-sdekPoint" tabIndex={-1}>
        <Check size={20} className="text-success flex-none mt-0.5" />
        <div className="min-w-0 flex-1">
          <b>{value.city}, {value.point.address}</b>
          <span>{value.point.type === 'POSTAMAT' ? 'Постамат' : 'Пункт выдачи'} СДЭК · {value.point.workTime}</span>
        </div>
        <button type="button" onClick={() => setEditing(true)}>Изменить</button>
      </div>
    )
  }

  return (
    <div className="sdek" id="co-sdekPoint" tabIndex={-1}>
      <label htmlFor="sdek-city" className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">Город</label>
      <div className="relative">
        <input
          id="sdek-city"
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => { setQuery(e.target.value); if (city) { setCity(null); setPoints(null); onChange(null) } }}
          placeholder="Начните вводить город"
          className={`w-full h-[52px] px-4 rounded-2xl lg:rounded-xl lg:h-12 border bg-white text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none text-base ${invalid && !city ? 'border-red-500/50' : 'border-border'}`}
        />
        {cities.length > 0 && !city && (
          <ul className="sdek-suggest" role="listbox">
            {cities.map((c) => (
              <li key={c.code}>
                <button type="button" onClick={() => pickCity(c)}>{c.name}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {city && (
        <div className="mt-4">
          {loadErr && <p className="text-red-600 text-[13.5px] m-0">{loadErr}</p>}
          {!points && !loadErr && <div className="sdek-map sdek-map-loading">Загружаем пункты СДЭК…</div>}
          {points && points.length === 0 && <p className="text-[14px] text-text-muted m-0">В этом городе нет пунктов СДЭК. Выберите ближайший город.</p>}
          {points && points.length > 0 && (
            <>
              {!mapFailed && (
                <div className="relative">
                  <div ref={mapBox} className="sdek-map" />
                  {'geolocation' in navigator && (
                    <button type="button" className="sdek-locate" onClick={locate} aria-label="Ближайший ко мне пункт">
                      <LocateFixed size={18} />
                    </button>
                  )}
                </div>
              )}

              {activePoint && (
                <div className="sdek-card">
                  <div className="min-w-0 flex-1">
                    <span className="sdek-card-type">{activePoint.type === 'POSTAMAT' ? 'Постамат' : 'Пункт выдачи'} · {activePoint.code}</span>
                    <b>{activePoint.address}</b>
                    {activePoint.workTime && <span>{activePoint.workTime}</span>}
                    {activePoint.note && <span>{activePoint.note}</span>}
                  </div>
                  <button type="button" className="app-btn app-btn-primary sdek-choose" onClick={() => choose(activePoint)}>
                    Выбрать этот пункт
                  </button>
                </div>
              )}

              <div className="sdek-filter">
                <Search size={16} className="text-text-muted flex-none" />
                <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={`Улица или код — пунктов: ${points.length}`} aria-label="Найти пункт по адресу" />
              </div>
              <ul className="sdek-list" ref={listRef}>
                {shown.map((p) => (
                  <li key={p.code} data-code={p.code}>
                    <button type="button" className={p.code === active ? 'on' : ''} onClick={() => setActive(p.code)}>
                      {p.type === 'POSTAMAT' ? <Package size={18} className="flex-none text-text-muted" /> : <MapPin size={18} className="flex-none text-text-muted" />}
                      <span className="min-w-0 flex-1">
                        <b>{p.address}</b>
                        <span>{p.type === 'POSTAMAT' ? 'Постамат' : 'Пункт выдачи'}{p.workTime ? ` · ${p.workTime}` : ''}</span>
                      </span>
                    </button>
                  </li>
                ))}
                {shown.length === 0 && <li className="sdek-empty">Ничего не нашлось</li>}
              </ul>
            </>
          )}
        </div>
      )}
      {invalid && <p className="text-red-600 text-[13px] mt-2 ml-1">{city ? 'Выберите пункт СДЭК на карте или в списке' : 'Укажите город'}</p>}
    </div>
  )
}
