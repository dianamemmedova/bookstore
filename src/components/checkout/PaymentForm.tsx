import { BACKGROUND_SOFT, BORDER_DEFAULT, GRAY_TEXT, PRIMARY, WHITE } from '../../constants/theme'
import type{ PaymentProps } from '../../types/checkout';


export default function PaymentForm({
  payMethod, setPayMethod, form, errors,
  inp, clearErr, inputClass, formatCard, formatExpiry,
}: PaymentProps) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ödəniş Üsulu</h3>

      <div className="flex gap-3 mb-4">
        {(['card', 'cash'] as const).map(m => (
          <button key={m} onClick={() => setPayMethod(m)}
            className="flex-1 py-2.5 text-sm border transition-colors rounded-sm"
            style={{
              borderColor: payMethod === m ? PRIMARY : BORDER_DEFAULT,
              background:  payMethod === m ? BACKGROUND_SOFT : WHITE,
              color:       payMethod === m ? PRIMARY : GRAY_TEXT,
              fontWeight:  payMethod === m ? 600 : 400,
            }}>
            {m === 'card' ? '💳 Kart ilə' : '💵 Nağd'}
          </button>
        ))}
      </div>

      {payMethod === 'card' && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-sm border border-gray-100">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Kart Nömrəsi * <span className="text-gray-400 font-normal">(16 rəqəm)</span>
            </label>
            <input className={inputClass('cardNumber')} placeholder="0000 0000 0000 0000"
              value={form.cardNumber} inputMode="numeric" maxLength={19}
              onChange={e => { inp('cardNumber', formatCard(e.target.value)); clearErr('cardNumber') }} />
            {errors.cardNumber
              ? <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
              : <p className="text-xs text-gray-400 mt-1">Kartın üzərindəki 16 rəqəmi daxil edin</p>}
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Kart Sahibinin Adı *</label>
            <input className={inputClass('cardHolder')} placeholder="ALI HASANOV"
              value={form.cardHolder}
              onChange={e => { inp('cardHolder', e.target.value.toUpperCase()); clearErr('cardHolder') }} />
            {errors.cardHolder && <p className="text-xs text-red-500 mt-1">{errors.cardHolder}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Son Tarix * <span className="text-gray-400 font-normal">(MM/İİ)</span>
              </label>
              <input className={inputClass('cardExpiry')} placeholder="03/28"
                value={form.cardExpiry} inputMode="numeric" maxLength={5}
                onChange={e => { inp('cardExpiry', formatExpiry(e.target.value)); clearErr('cardExpiry') }} />
              {errors.cardExpiry
                ? <p className="text-xs text-red-500 mt-1">{errors.cardExpiry}</p>
                : <p className="text-xs text-gray-400 mt-1">Məs: 03/28</p>}
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                CVV * <span className="text-gray-400 font-normal">(3 rəqəm)</span>
              </label>
              <input className={inputClass('cardCvv')} placeholder="•••" type="password"
                value={form.cardCvv} inputMode="numeric" maxLength={3}
                onChange={e => { inp('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 3)); clearErr('cardCvv') }} />
              {errors.cardCvv
                ? <p className="text-xs text-red-500 mt-1">{errors.cardCvv}</p>
                : <p className="text-xs text-gray-400 mt-1">Kartın arxasındakı 3 rəqəm</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-400">256-bit SSL şifrələmə ilə qorunur</span>
          </div>
        </div>
      )}

      {payMethod === 'cash' && (
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-sm text-sm text-amber-700">
          Kuryer çatdırdıqda nağd ödəniş edəcəksiniz. Xahiş edirik dəqiq məbləği hazırlayın.
        </div>
      )}
    </section>
  )
}