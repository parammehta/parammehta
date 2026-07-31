import { useEffect, useRef, useState } from 'react';
import { Icon, Monogram, tokens, Transition } from 'components';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext, useScrollToHash, useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { cssProps, media, msToNum, numToMs } from 'utils/style';
import { NavToggle } from './NavToggle';
import styles from './Navbar.module.css';
import { ThemeToggle } from './ThemeToggle';
import { navLinks, socialLinks } from './navData';

export const Navbar = () => {
  const [current, setCurrent] = useState();
  const [target, setTarget] = useState();
  const [scrollActive, setScrollActive] = useState(null);
  const { themeId } = useTheme();
  const { menuOpen, dispatch } = useAppContext();
  const { route, asPath } = useRouter();
  const windowSize = useWindowSize();
  const headerRef = useRef();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(asPath);
  }, [asPath]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || route !== '/') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(`${route}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [route, scrollToHash, target]);

  // Scroll-spy: highlight nav link for the section currently in view
  useEffect(() => {
    if (route !== '/') return;

    const hashIds = navLinks
      .filter(l => l.pathname.startsWith('/#'))
      .map(l => l.pathname.slice(2));

    const intersecting = new Set();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });
        const active = hashIds.find(id => intersecting.has(id)) ?? null;
        setScrollActive(active);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    hashIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [route]);

  // Handle swapping the theme when intersecting with inverse themed elements
  useEffect(() => {
    const navItems = document.querySelectorAll('[data-navbar-item]');
    const inverseTheme = themeId === 'dark' ? 'light' : 'dark';
    const { innerHeight } = window;

    let inverseMeasurements = [];
    let navItemMeasurements = [];

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
    };

    const resetNavTheme = () => {
      for (const measurement of navItemMeasurements) {
        measurement.element.dataset.theme = '';
      }
    };

    const handleInversion = () => {
      const invertedElements = document.querySelectorAll(
        `[data-theme='${inverseTheme}'][data-invert]`
      );

      if (!invertedElements) return;

      inverseMeasurements = Array.from(invertedElements).map(item => ({
        element: item,
        top: item.offsetTop,
        bottom: item.offsetTop + item.offsetHeight,
      }));

      const { scrollY } = window;

      resetNavTheme();

      for (const inverseMeasurement of inverseMeasurements) {
        if (
          inverseMeasurement.top - scrollY > innerHeight ||
          inverseMeasurement.bottom - scrollY < 0
        ) {
          continue;
        }

        for (const measurement of navItemMeasurements) {
          if (isOverlap(inverseMeasurement, measurement, scrollY)) {
            measurement.element.dataset.theme = inverseTheme;
          } else {
            measurement.element.dataset.theme = '';
          }
        }
      }
    };

    // Currently only the light theme has dark full-width elements
    if (themeId === 'light') {
      navItemMeasurements = Array.from(navItems).map(item => {
        const rect = item.getBoundingClientRect();

        return {
          element: item,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      document.addEventListener('scroll', handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener('scroll', handleInversion);
      resetNavTheme();
    };
  }, [themeId, windowSize, asPath]);

  // Check if a nav item should be active
  const getCurrent = (url = '') => {
    const nonTrailing = current?.endsWith('/') ? current?.slice(0, -1) : current;

    if (url === nonTrailing) {
      return 'page';
    }

    return '';
  };

  // Store the current hash to scroll to
  const handleNavItemClick = event => {
    const hash = event.currentTarget.href.split('#')[1];
    setTarget(null);

    if (hash && route === '/') {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = event => {
    handleNavItemClick(event);
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <RouterLink
        href={route === '/' ? '/#intro' : '/'}
        scroll={false}
        data-navbar-item
        className={styles.logo}
        aria-label="Param Mehta, Developer"
        onClick={handleMobileNavClick}
      >
        <Monogram highlight />
      </RouterLink>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <RouterLink
              href={pathname}
              scroll={false}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={
                pathname.startsWith('/#')
                  ? (route === '/' && scrollActive === pathname.slice(2) ? 'page' : undefined)
                  : getCurrent(pathname)
              }
              onClick={handleNavItemClick}
            >
              {label}
            </RouterLink>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>
      <Transition unmount in={menuOpen} timeout={msToNum(tokens.base.durationL)}>
        {visible => (
          <nav className={styles.mobileNav} data-visible={visible}>
            {navLinks.map(({ label, pathname }, index) => (
              <RouterLink
                href={pathname}
                scroll={false}
                key={label}
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={
                  pathname.startsWith('/#')
                    ? (route === '/' && scrollActive === pathname.slice(2) ? 'page' : undefined)
                    : getCurrent(pathname)
                }
                onClick={handleMobileNavClick}
                style={cssProps({
                  transitionDelay: numToMs(
                    Number(msToNum(tokens.base.durationS)) + index * 50
                  ),
                })}
              >
                {label}
              </RouterLink>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);
