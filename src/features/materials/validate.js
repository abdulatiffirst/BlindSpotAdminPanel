import { isUrl } from '@/utils/url'

export const EMPTY_MATERIAL = { title: '', description: '', category: '', photo: '', link: '', tags: [] }

export function validateMaterial(f) {
  if (!f.title.trim() || !f.category) return 'Title and category are required.'
  if (!isUrl(f.link)) return 'Link must start with http:// or https://'
  if (f.photo && !isUrl(f.photo)) return 'Logo must be an image URL starting with http(s)://'
  return ''
}
