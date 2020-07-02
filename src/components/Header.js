import React, { Fragment, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${ theme.palette.divider }`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  activeToolbar: {
    backgroundColor: 'rgba(0, 0, 0, .25)',
  },
  btnMenu: {
    textTransform: "none"
  },
  activeMenu: {
    textTransform: "none",
    textDecoration: 'underline'
  },
}))

const Header = props => {
  const { sections } = props
  const classes = useStyles()

  // State
  const [anchorEls, setAnchorEls] = useState({
    Persil: null,
    Penerimaan: null,
  })

  const [activeMenu, setActiveMenu] = useState(sections.find(val => {
    const path = window.location.pathname.split('/')[1].replace(/-/g, '')
    if(path === 'login') return 'Login'
    return !!val.title.replace(/\s/g, '').match(new RegExp(path, 'i'))
  }).title)

  const [activeLink, setActiveLink] = useState(() => {
    const al = []
    const path = window.location.pathname
    for(let section of sections){
      if(!section.children) continue
      for(let child of section.children){
        al.push(child.link)
      }
    }
    return al[al.indexOf(path)]
  })

  const handleClick = e => {
    const el = e.currentTarget.getAttribute('aria-controls')
    setAnchorEls({
      ...anchorEls,
      [el]: e.currentTarget
    })
  }

  const handleClose = e => {
    for(let key of Object.keys(anchorEls)){
      if(!!anchorEls[key]){
        setActiveMenu(key)
      }
    }
    setAnchorEls({ Persil: null, Penerimaan: null })
    setActiveLink(e.currentTarget.getAttribute('href'))
  }

  return(
    <>
      <Toolbar className={ classes.toolbar }>
        <Typography
          component="h2"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          className= { classes.toolbarTitle }
        >
          MOLISTA
        </Typography>
        <Button 
          component={ RouterLink } 
          to='/login' 
          variant="outlined" 
          size="small"
          onClick={ () => setActiveMenu(null) }
        >Login</Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={ classes.toolbarSecondary }>
        { sections.map(section => {
          if(section.children){
            return (<Fragment key={ section.title }>
              <Button 
                className={ activeMenu === section.title ? classes.activeMenu : classes.btnMenu }
                aria-controls={ section.title }
                aria-haspopup="true" 
                onClick={ handleClick }
              >
                { section.title }
              </Button>
              <Menu
                id={ section.title }
                anchorEl={ anchorEls[section.title] }
                keepMounted
                open={ Boolean(anchorEls[section.title]) }
                onClose={ handleClose }
              >
                { section.children.map((child, i) => (
                    <MenuItem 
                      key={ child.title }
                      className={ (i === 0 ? classes.toolbar : '') +  ' ' + (activeLink === child.link ? classes.activeToolbar : '') }
                      component={ RouterLink }
                      to={ child.link }
                      onClick={ handleClose }
                    >
                      { child.title }
                    </MenuItem>
                  ))
                }
              </Menu>
            </Fragment>)
          } else {
            return (
              <Link
                color="inherit"
                noWrap
                key={ section.title }
                variant="body2"
                href={ section.link }
                className={ activeMenu === section.title ? classes.activeMenu : classes.toolbarLink }
                component={ RouterLink }
                to={ section.link }
                onClick={ () => setActiveMenu(section.title) }
              >
                { section.title }
              </Link>
            )
          }
        })}
      </Toolbar>
    </>
  )
}

export default Header