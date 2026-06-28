import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-orange-200/60">
      <div className="min-h-[160px] px-5 py-10 text-center lg:min-h-[200px] lg:px-[max(20px,calc((100vw-1200px)/2))] lg:py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-10 lg:flex-row lg:items-start lg:text-right">
          <div>
            <img src="/logo/4.png" alt="Global Recipe" className="h-8 w-auto" />
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-600 lg:mx-0">
              دروس سينمائية للطهاة الفضوليين. مبني للتركيز والنكهة والإبداع.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-stone-500 lg:justify-start">
            <Link to="/" className="transition hover:text-orange-800">الرئيسية</Link>
            <Link to="/#explore" className="transition hover:text-orange-800">استكشف</Link>
            <Link to="/#gallery" className="transition hover:text-orange-800">المعرض</Link>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-[1200px] text-center text-xs text-stone-400 lg:mt-12 lg:text-right">
          صُنع بكل حب ❤️
        </p>
      </div>
    </footer>
  )
}
