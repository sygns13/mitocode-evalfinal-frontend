import { decodeToken } from "../configs/credentials"

export const validateMenus = (menu) => {
  const userJWT = decodeToken()

  const currentUserRole = userJWT.roles[0]
  const newMenu = []

  for (let i = 0; i < menu.length; i++) {
    const currentMenu = menu[i]
    if (currentMenu.roles.includes(currentUserRole)) {
      newMenu.push(currentMenu)
    }
  }
  return newMenu
}