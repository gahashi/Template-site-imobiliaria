const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Imovei',
      path: '/imoveis',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Cadastrar imovel',
      path: '/cadastrar-imovel',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield',
    }
  ]
}

export default navigation
