import Link from 'next/link'

export interface MenuLink { text: string; href: string }
export interface MenuData {
  brand: string
  brandHref: string
  links: MenuLink[]
}

export default function MenuBar({ menu }: { menu: MenuData }) {
  return (
    <header className="menu-bar">
      <div className="menu-container">
        <Link href={menu.brandHref} className="brand">
          {menu.brand}
        </Link>
        <nav className="menu-items">
          {menu.links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
