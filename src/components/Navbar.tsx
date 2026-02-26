"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/Navbar.module.css";
import { useLockBodyScroll } from "@/components/useLockBodyScroll";
import { useFocusTrap } from "@/components/useFocusTrap";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/como-funciona" },
  { label: "Pricing", href: "/agenda" },
  { label: "About", href: "/bases" },
  { label: "Contact", href: "/contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useLockBodyScroll(isOpen);
  useFocusTrap({ containerRef: menuRef, isActive: isOpen, returnFocusRef: buttonRef });

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (media.matches) {
        setIsOpen(false);
      }
    };
    media.addEventListener("change", handleChange);
    handleChange();
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link className={styles.brand} href="/">
          Brand
        </Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} className={styles.navLink} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className={styles.hamburger}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
          ref={buttonRef}
        >
          <span className={styles.hamburgerIcon} aria-hidden="true" />
        </button>
      </div>

      {isOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <nav
        id="primary-navigation"
        className={`${styles.mobileNav} ${isOpen ? styles.open : ""}`}
        aria-label="Main menu"
        ref={menuRef}
      >
        <div className={styles.mobileNavInner}>
          {links.map((link) => (
            <Link
              key={link.href}
              className={styles.mobileLink}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
