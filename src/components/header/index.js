import React from 'react'
import style from './header.module.css'
import Logo from '../../assets/Logo.svg'
import ExploreIcon from '../../assets/Group 1.svg'
import CreateIcon from '../../assets/create.svg'
import EditIcon from '../../assets/edit.svg'


const HeaderIcon = ({icon}) => {
    return (
        <div className={style.icon_container}>
            <img src={icon.icon} alt="" />
            <span>{icon.name}</span>
        </div>
    )
}

const Header = () => {

    const headerIconList = [
        {
            icon: ExploreIcon,
            name: "Explore"
        },
        {
            icon: CreateIcon,
            name: "Create"
        },
        {
            icon: EditIcon,
            name: "Edit"
        }
    ]

    return (
        <div className={style.header_container}>
            <img src={Logo} alt="" />
            <div className={style.header_explore_container}>
                <div className={style.explore_container_icons}>
                    {headerIconList.map(headerIcon => {
                        return <HeaderIcon icon={headerIcon} />
                    })}
                </div>
                <button className={style.login_button}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Header