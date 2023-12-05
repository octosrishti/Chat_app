import React from 'react'
import style from './footer.module.css'
import Logo from '../../assets/Logo.svg'
import ShareIcon from '../../assets/telegram.svg'

const Footer = () => {
    const Company_Email = "Contact@00000000.tech"

    return (
        <div className={style.footer}>
            <div className={style.logo_container}>
                <img className={style.Logo} src={Logo} alt="" />
            </div>
            <span>{Company_Email}</span>
            <img src={ShareIcon} alt="" />
        </div>
    )
}

export default Footer