export function toNumId(id: string | number): number {
  const n = Number(id)
  return isNaN(n) ? Math.abs(String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0)) : n
}
// Bu funksiya, string və ya number tipində gələn id-ni həmişə bir number-ə çevirir