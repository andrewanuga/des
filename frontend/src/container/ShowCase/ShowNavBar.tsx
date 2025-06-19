import { NavLink } from 'react-router-dom';
import './ShowCase.css'
import InteractiveBlob from '@/components/InteractiveBlob';

interface NavItem {
  name: string;
  to: string;
  id: number;
}

interface Props {
  ref : null,
  style : {
    borderTopColor: string,
    borderRightColor: string,
    borderBottomColor: string,
    borderLeftColor: string,
    transition: string,
    boxShadow: string,
  },
}
const ShowNavBar = (props : Props) => {
  const linksTo: NavItem[] = [
    {
      name: 'Home',
      to: '/',
      id: 0,
    },
    {
      name: 'About',
      to: '/about',
      id: 1,
    },
    {
      name: 'ShowCase',
      to: '/showcase',
      id: 2,
    },
    {
      name: 'More',
      to: '/more',
      id: 3,
    },
    {
      name: 'Footer',
      to: '/footer',
      id: 4,
    },
  ];

  return (
    <div 
    className="text-white w-[95%] h-14 flex backdrop-blur-2xl border mt-5 bg-gray-100/15 overflow-hidden rounded-md justify-evenly items-center gap-3 flex-wrap"
    ref = {props.ref}
    style={props.style}
    >
      {linksTo.map((item) => (
        <NavLink
          to={item.to}
          key={item.id}
          className={({ isActive }) => 
            isActive ? 'shadow-indigo-800 shadow-xl' : 'p-3 '
          }
        >
          {item.name}
        </NavLink>
      ))}
      <InteractiveBlob />
    </div>
  );
};

export default ShowNavBar;