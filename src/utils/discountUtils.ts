export function formatAuthors(authors: string[], maxNames = 2): string {
  if (!authors.length) return 'Müəllif məlumatı yoxdur'
  if (authors.length <= maxNames) return authors.join(', ')
  return `${authors.slice(0, maxNames).join(', ')} və b. (${authors.length})`
}
// müəllif adlarının qısaldılması