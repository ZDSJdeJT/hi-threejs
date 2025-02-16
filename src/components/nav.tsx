import { Link } from '@tanstack/react-router';

const menu = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '办公室',
    path: '/office',
  },
  {
    name: '女人',
    path: '/woman',
  },
];

function Nav() {
  return (
    <nav className="p-2 flex gap-2 bg-accent-foreground fixed bottom-0 z-10 w-full">
      {menu.map(({ name, path }, index) => (
        <Link
          key={index}
          to={path}
          className="[&.active]:font-bold text-accent"
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}

export { Nav };
