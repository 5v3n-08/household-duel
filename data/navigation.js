export const navigations = [
  {
    id: 1,
    name: 'Dashboard',
    description: 'test',
    type: 'dropDown',
    icon: 'dashboard_outlined',
    link: '/dashboard',
    sub: [
      {
        icon: 'i-Clock-3',
        name: 'Widgets',
        link: '/dashboard/widgets',
        type: 'link'
      }
    ]
  },

  {
    id: 2,
    name: 'Settings',
    icon: 'account_square_outlined',
    link: '/account'
  },
  {
    id: 3,
    type: 'sectionTitle',
    name: 'Apps'
  },
  {
    name: 'Apps',
    description: '',
    type: 'dropDown',
    icon: 'website',
    sub: [
      {
        icon: 'i-Clock-4',
        name: 'Housework',
        link: '/apps/housework',
        type: 'link'
      }
    ]
  }
]
