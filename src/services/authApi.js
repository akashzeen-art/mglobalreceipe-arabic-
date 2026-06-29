export const COUNTRY_CODE = '964'
export const LOGIN_PID = 7

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export function formatMsisdn(localNumber) {
  const digits = String(localNumber).replace(/\D/g, '')
  const local = digits.startsWith(COUNTRY_CODE) ? digits.slice(COUNTRY_CODE.length) : digits
  return `${COUNTRY_CODE}${local}`
}

export async function cpLogin(msisdn) {
  const url = `${API_BASE}/prod/CPLogin/IQZain?pid=${LOGIN_PID}&msisdn=${encodeURIComponent(msisdn)}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('تعذّر الاتصال بالخادم. حاول مرة أخرى.')
  }

  return res.json()
}

export function parseLoginResponse(data) {
  const status = String(data?.response ?? '').toUpperCase()

  if (status === 'ACTIVE') {
    return {
      active: true,
      session: {
        response: 'ACTIVE',
        msisdn: data.msisdn,
        actDate: data.actDate,
        renewDate: data.renewDate,
        pricePoint: data.pricePoint,
        validity: data.validity,
        unsubUrl: data.unsubUrl,
      },
    }
  }

  if (status === 'INACTIVE') {
    return {
      active: false,
      redirectURL: data.redirectURL,
    }
  }

  return {
    active: false,
    error: 'استجابة غير متوقعة من الخادم.',
  }
}
