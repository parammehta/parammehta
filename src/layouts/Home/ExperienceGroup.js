import { Divider, Section, Transition } from 'components';
import styles from './ExperienceGroup.module.css';

/**
 * Groups the roles held at a single company under one section, so the company
 * logo and the trailing divider are rendered once per company rather than once
 * per role.
 */
export const ExperienceGroup = ({
  id,
  sectionRef,
  visible,
  index,
  companyName,
  companyLogo,
  invertOnDark,
  children,
  ...rest
}) => (
  <Section
    className={styles.group}
    as="section"
    id={id}
    ref={sectionRef}
    aria-label={companyName}
    data-first={index === 1}
    {...rest}
  >
    <Transition in={visible}>
      {visible => (
        <>
          {companyLogo && (
            <div className={styles.header}>
              <img
                src={companyLogo}
                alt=""
                aria-hidden
                className={styles.companyLogo}
                data-visible={visible}
                data-invert-dark={invertOnDark || undefined}
              />
            </div>
          )}

          {children}

          <div className={styles.dividerWrap}>
            <Divider
              className={styles.sectionDivider}
              notch={false}
              light
              collapsed={!visible}
              collapseDelay={1200}
            />
          </div>
        </>
      )}
    </Transition>
  </Section>
);
