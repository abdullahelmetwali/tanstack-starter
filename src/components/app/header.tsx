import { useEffect } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { ThemeSwitcher } from '@/components/appearance/theme'
import { LanguageSwitcher } from '@/components/appearance/language'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isMobile = useIsMobile();

  const pages = [
    {
      url: "/components",
      title: t('nav.components')
    },
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
      {
        isMobile ?
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"sm"} type='button'>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className='uppercase'>TANSTACK STARTER</SheetTitle>
              </SheetHeader>
              <div className='space-y-8 px-4'>
                <ul className='space-y-1'>
                  <p className='text-muted-foreground text-xs uppercase mb-2'>pages</p>
                  {
                    pages.map((p, i) => (
                      <li key={i}>
                        <Link to={p.url}>
                          - {p.title}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
                <div className='space-y-2'>
                  <p className='text-muted-foreground text-xs uppercase mb-2'>
                    preferences
                  </p>
                  <div className='flex items-center justify-between'>
                    <p>Theme</p>
                    <ThemeSwitcher variant='group' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Languages</p>
                    <LanguageSwitcher variant='select' />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          :
          <>
            <div className='flex items-center gap-2 flex-wrap justify-center'>
              {
                pages.map((p, i) => (
                  <Link to={p.url} key={i}>{p.title}</Link>
                ))
              }
            </div>
            <div className='flex max-md:flex-col items-center gap-1'>
              <ThemeSwitcher variant={"button"} />
              <LanguageSwitcher variant={"button"} />
            </div>
          </>
      }
    </header>
  )
}
