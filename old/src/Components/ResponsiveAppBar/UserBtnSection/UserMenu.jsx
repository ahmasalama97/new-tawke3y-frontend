import { Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import AppRoutes from '../../../services/AppRoutes'
import CookiesStorageService from '../../../services/CookiesStorageService'
import restClient from '../../../services/Client/RestClient'
import Configuration from '../../../services/Api/Configuration'

const UserMenu = ({ menuState, changeMenuState }) => {
  const logoutPath = `${Configuration.USER_MANAGEMENT_BASE_URL}${Configuration.Auth_Endpoints.logout}`

  const logoutHandler = () => {
    restClient
      .postRequest(logoutPath, {
        token: CookiesStorageService.getAccessToken(),
        refresh_token: CookiesStorageService.getAccessRefreshToken(),
      })
      .then((res) => {
        if (res.status === 200) {
          CookiesStorageService.clearToken()
          window.location.href = process.env.REACT_APP_AUTH_FRONTEND_URL
        }
      })
  }

  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={menuState}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(menuState)}
      onClose={changeMenuState}>
      <MenuItem sx={styles.menuItemBtn} onClick={changeMenuState}>
        <Link to={AppRoutes.userProfile}>profile</Link>
      </MenuItem>

      <MenuItem sx={styles.menuItemBtn} onClick={changeMenuState}>
        <Link onClick={logoutHandler}>log out</Link>
      </MenuItem>
    </Menu>
  )
}

const styles = {
  menuItemBtn: {
    minWidth: '100px',
    padding: 0,
    textTransform: 'capitalize',
    transition: 'all 0.5s',
    marginBottom: '5px',

    '& a': {
      textDecoration: 'unset',
      width: '100%',
      transition: 'all 0.5s',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      color: 'primary.contrastText',
    },
  },
}

export default UserMenu
