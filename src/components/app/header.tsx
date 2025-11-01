import { useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { ThemeSwitcher } from '@/components/appearance/theme'
import { LanguageSwitcher } from '@/components/appearance/language'

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const pages = [
    {
      url: "/about",
      title: t('nav.about')
    },
    {
      url: "/contact-us",
      title: t('nav.contact-us')
    },
    {
      url: "/posts",
      title: t('nav.posts')
    },
    {
      url: "/profile",
      title: t('nav.profile')
    },
    {
      url: "/login",
      title: t('nav.login')
    },
    {
      url: "/404",
      title: t('nav.404')
    },
  ];

  useEffect(() => {
    const checkDIR = () => {
      if (i18n.language === "ar") {
        document.body.dir = "rtl"
      } else {
        document.body.dir = "ltr"
      }
    };
    checkDIR()
  }, [i18n.language]);

  if (location.pathname === "/login") return null;
  return (
    <header className='p-4 flex items-center justify-between'>
      <div>
        <Link to='/'>
          <img
            src='/images/tanstack-circle-logo.png'
            className='size-8'
          />
        </Link>
      </div>
      <div className='flex items-center gap-2 flex-wrap justify-center'>
        {
          pages.map((p, i) => (
            <Link to={p.url} key={i}>{p.title}</Link>
          ))
        }
      </div>
      <div className='flex max-md:flex-col items-center gap-1'>
        <ThemeSwitcher variant={"group"} />
        <LanguageSwitcher variant={"select"} />
      </div>
    </header>
  )
}
