'use client'
import { revalidatePath } from 'next/cache'

 
export default function ClearBtn() {
 
  return (
    <div>
      <button onClick={() => revalidatePath('/isr3')}>调用 revalidatePath</button>
    </div>
  )
}