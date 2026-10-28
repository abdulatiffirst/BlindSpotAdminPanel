import { collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/config/firebase'

const col = collection(db, 'materials')

export const subscribeMaterials = (page, cb) =>
  onSnapshot(query(col, where('page', '==', page)), (s) => cb(s.docs.map((d) => ({ ...d.data(), id: d.id }))))

export const createMaterial = (page, data) => {
  const ref = doc(col)
  return setDoc(ref, { id: ref.id, page, ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}
export const updateMaterial = (id, data) => updateDoc(doc(col, id), { ...data, updatedAt: serverTimestamp() })
export const deleteMaterial = (id) => deleteDoc(doc(col, id))
