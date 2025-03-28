import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faTruck,
  faTriangleExclamation,
  faIdCard,
  faAngleRight,
  faAngleDown,
  faShoppingCart,
  faBoxesPacking,
} from '@fortawesome/free-solid-svg-icons'
import styles from '../../../styles/style'

const AdminNav = () => {
  const [activeNavItemIndex, setactiveNavItemIndex] = useState(null)

  const handleNavItemClick = (index) => {
    setactiveNavItemIndex(index === activeNavItemIndex ? null : index)
  }
  const links = [
    {
      title: 'Vehicles',
      link: '/admin/vehicles',
      icon: faTruck,
      subLinks: [],
    },
    {
      title: 'Shipments',
      link: '/admin/shipment',
      icon: faBoxesPacking,
      subLinks: [],
    },
    {
      title: 'Orders',
      link: 'admin/order',
      icon: faShoppingCart,
      subLinks: [],
    },
  ]
  return (
    <>
      <nav className="mt-3 h-full px-[30px]">
        {links.map((item, index) => (
          <React.Fragment key={item.title}>
            <NavLink
              exact="true"
              className={`${styles.sidebar_item} flex justify-between flex-row`}
              activeclassname="active"
              to={item.link}
              onClick={() => handleNavItemClick(index)}
            >
              <div>
                <FontAwesomeIcon
                  icon={item.icon}
                  className="mr-[10px] w-[25px]"
                />
                <span>{item.title}</span>
              </div>
              {item.subLinks.length > 0 ? (
                <div>
                  <FontAwesomeIcon
                    className="text-right"
                    icon={
                      activeNavItemIndex === index ? faAngleDown : faAngleRight
                    }
                  />
                </div>
              ) : (
                ''
              )}
            </NavLink>
            <ul>
              {item.subLinks.length > 0 && index === activeNavItemIndex
                ? item.subLinks.map((subLinkItem, index) => (
                    <NavLink
                      exact="true"
                      className={`${
                        styles.sidebar_item_sublink
                      } ml-[45px] pl-2 border-l-2 border-text_primary hover:border-highlight ${
                        index === 0 ? 'mt-2' : ''
                      } ${index === item.subLinks.length - 1 ? 'mb-2' : ''}`}
                      activeclassname="active"
                      to={subLinkItem.link}
                    >
                      {subLinkItem.title}
                    </NavLink>
                  ))
                : null}
            </ul>
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}

export default AdminNav
