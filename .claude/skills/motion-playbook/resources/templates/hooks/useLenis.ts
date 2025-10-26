import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
export function useLenis(enabled=true){
  useEffect(()=>{
    if(!enabled) return
    const lenis=new Lenis({duration:1.1,smoothWheel:true})
    let rafId:number
    const raf=(t:number)=>{ lenis.raf(t); rafId=requestAnimationFrame(raf) }
    rafId=requestAnimationFrame(raf)
    return ()=>{ cancelAnimationFrame(rafId); lenis.destroy() }
  },[enabled])
}
