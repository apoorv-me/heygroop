// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const getUserIcon = () => <img src={'/static/icons/group.png'} alt={'group'} /> ;
const getDashboardIcon = () => <img src={'/static/icons/pie-chart.png'} alt={'pie-chart'} /> ;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getDashboardIcon(),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getUserIcon(), 
  },
  
  {
    title: 'Groop Management',
    path: '/dashboard/groop-management',
    icon: getUserIcon(),
  },
];



export default navConfig;
