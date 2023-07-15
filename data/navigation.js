export const navigations = [
  {
    id: 1,
    name: 'Dashboard',
    description: 'test',
    type: 'dropDown',
    icon: 'mdi-home',
    link: '/dashboard',
    sub: [
      {
        icon: 'mdi-widgets-outline',
        name: 'Widgets',
        link: '/dashboard/widgets',
        type: 'link'
      }
    ]
  },

  {
    id: 2,
    name: 'Settings',
    description: 'User Settings',
    icon: 'mdi-account-cog-outline',
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
    icon: 'mdi-web',
    sub: [
      {
        icon: 'mdi-family-tree',
        name: 'Housework',
        link: '/apps/housework',
        type: 'link'
      }
    ]
  }
]
