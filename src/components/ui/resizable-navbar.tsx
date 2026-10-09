"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full pointer-events-none", className)}
    >
      <div className="pointer-events-auto w-full">
        {React.Children.map(children, (child) =>
          React.isValidElement<{ visible?: boolean }>(child)
            ? React.cloneElement(child, { visible })
            : child,
        )}
      </div>
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible
          ? "blur(24px) saturate(185%) contrast(108%)"
          : "blur(0px) saturate(100%) contrast(100%)",
        boxShadow: visible
          ? "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 24px 0 rgba(255, 255, 255, 0.05), 0 24px 48px -12px rgba(0, 0, 0, 0.55), 0 0 24px 0 rgba(255, 255, 255, 0.06)"
          : "none",
        width: visible ? "82%" : "100%",
        y: visible ? 14 : 0,
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.07)"
          : "rgba(255, 255, 255, 0)",
        borderColor: visible
          ? "rgba(255, 255, 255, 0.24)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 34,
      }}
      style={{
        maxWidth: "1180px",
        backgroundImage: visible
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 42%, rgba(12, 16, 24, 0.35) 100%)"
          : "none",
        WebkitBackdropFilter: visible
          ? "blur(24px) saturate(185%) contrast(108%)"
          : "none",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-6xl xl:max-w-7xl flex-row items-center justify-between self-start rounded-full border px-6 py-2.5 transition-colors lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-1 flex-row items-center justify-center space-x-1 lg:space-x-1.5 xl:space-x-2 text-sm font-medium transition duration-200",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-2.5 xl:px-3.5 py-1.5 font-mono text-[11px] xl:text-xs uppercase tracking-wider text-slate-200/90 hover:text-white transition-colors whitespace-nowrap shrink-0 inline-block text-center"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full border border-white/25 bg-white/15 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
            />
          )}
          <span className="relative z-20 whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {item.name}
          </span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible
          ? "blur(24px) saturate(185%) contrast(108%)"
          : "blur(0px) saturate(100%) contrast(100%)",
        boxShadow: visible
          ? "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 20px 0 rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.55)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "16px" : "16px",
        paddingLeft: visible ? "16px" : "16px",
        borderRadius: visible ? "1.25rem" : "0rem",
        y: visible ? 12 : 0,
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.07)"
          : "rgba(255, 255, 255, 0)",
        borderColor: visible
          ? "rgba(255, 255, 255, 0.24)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 34,
      }}
      style={{
        backgroundImage: visible
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 42%, rgba(12, 16, 24, 0.35) 100%)"
          : "none",
        WebkitBackdropFilter: visible
          ? "blur(24px) saturate(185%) contrast(108%)"
          : "none",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between border px-4 py-3 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          style={{
            backgroundImage:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(18, 24, 34, 0.8) 100%)",
            backdropFilter: "blur(28px) saturate(185%) contrast(108%)",
            WebkitBackdropFilter: "blur(28px) saturate(185%) contrast(108%)",
            boxShadow:
              "inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.6), inset 0 0 24px 0 rgba(255, 255, 255, 0.04), 0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-white/25 p-6 shadow-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
      aria-label="Toggle navigation menu"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <Menu className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2.5 px-1 py-1 group shrink-0"
    >
      <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:border-[#38bdf8] transition-colors shrink-0">
        <span className="font-serif text-xs font-semibold tracking-wider text-white group-hover:text-[#38bdf8]">
          C
        </span>
      </div>
      <span className="font-serif text-xs xl:text-sm tracking-[0.18em] font-medium text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] whitespace-nowrap">
        Chronos Atelier
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "button",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "glass";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold relative cursor-pointer transition-all duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.3),_inset_0_1px_0_rgba(255,255,255,0.9)] active:scale-95",
    secondary:
      "bg-white/10 text-white hover:bg-white/20 border border-white/25 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
    glass:
      "bg-white/15 text-white hover:bg-white/25 border border-white/30 backdrop-blur-md shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.6)]",
    dark: "bg-black/60 text-white border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-md",
    gradient:
      "bg-gradient-to-r from-[#38bdf8] to-blue-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:opacity-90",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
