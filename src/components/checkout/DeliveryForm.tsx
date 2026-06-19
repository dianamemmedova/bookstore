import { formatDateAz } from '../../utils/date'
import { PRIMARY } from '../../constants/theme'
import type { Delivery } from '../../types/checkout';



export default function DeliveryForm({ form, errors, minDate, inp, clearErr, inputClass }: Delivery) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Çatdırılma Məlumatları</h3>
      <div className="space-y-3">

        <div>
          <label className="text-xs text-gray-600 mb-1 block">Ad Soyad *</label>
          <input className={inputClass('fullName')} placeholder="Əli Həsənov"
            value={form.fullName} onChange={e => { inp('fullName', e.target.value); clearErr('fullName') }} />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-600 mb-1 block">Telefon *</label>
          <input className={inputClass('phone')} placeholder="+994 50 XXX XX XX"
            value={form.phone} onChange={e => { inp('phone', e.target.value); clearErr('phone') }} />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-600 mb-1 block">Şəhər *</label>
          <select className={inputClass('city')} value={form.city}
            onChange={e => { inp('city', e.target.value); clearErr('city') }}>
            <option value="">Seçin</option>
            {['Bakı','Gəncə','Sumqayıt','Lənkəran','Şirvan','Naxçıvan'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="text-xs text-gray-600 mb-1 block">Küçə *</label>
          <input className={inputClass('street')} placeholder="Neftçilər prospekti"
            value={form.street} onChange={e => { inp('street', e.target.value); clearErr('street') }} />
          {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Bina №</label>
            <input className={inputClass('building')} placeholder="12A"
              value={form.building} onChange={e => inp('building', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Mənzil №</label>
            <input className={inputClass('apartment')} placeholder="47"
              value={form.apartment} onChange={e => inp('apartment', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 mb-1 block">
            Çatdırılma Tarixi *
            <span className="text-gray-400 font-normal ml-1">(ən tez {formatDateAz(minDate)})</span>
          </label>
          <input
            type="date"
            min={minDate}
            value={form.deliveryDate}
            onChange={e => { inp('deliveryDate', e.target.value); clearErr('deliveryDate') }}
            className={inputClass('deliveryDate')}
          />
          {form.deliveryDate && !errors.deliveryDate && (
            <p className="text-xs mt-1" style={{ color: PRIMARY }}>
              ✓ {formatDateAz(form.deliveryDate)}
            </p>
          )}
          {errors.deliveryDate && <p className="text-xs text-red-500 mt-1">{errors.deliveryDate}</p>}
        </div>

      </div>
    </section>
  )
}