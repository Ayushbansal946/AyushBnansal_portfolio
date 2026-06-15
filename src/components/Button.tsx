/**
 * Button.tsx — Unified CTA Button component
 * 
 * Variants:
 *   primary  → Orange (#FF4925) fill with white text
 *   secondary → White fill with orange text (for use on orange backgrounds)
 *   outline  → Transparent with text-main border; inverts on hover
 * 
 * Props:
 *   - as: 'button' | 'a'   (renders as <button> or <a> tag)
 *   - href, target, rel    (anchor props, only used when as='a')
 *   - type                 (button type, only used when as='button')
 *   - variant, onClick, className, style, children
 * 
 * Design Notes:
 *   - Border-radius = 20/phi ≈ 12.36px (golden ratio rectangle)
 *   - Arrow icon animates out-to-top-right on hover then enters from bottom-left
 *   - All styles use inline CSS or CSS variables for reliable dark-mode rendering
 */

import type { ReactNode } from 'react';
import { ArrowUpRight } from './Icons';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Golden Ratio constant (phi ≈ 1.61803398875)
// Border radius = 20px / phi ≈ 12.36px → perfectly balanced rectangular button corners
const PHI = 1.61803398875;
const GOLDEN_RADIUS = `${(20 / PHI).toFixed(2)}px`; // 12.36px

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  style,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
}: ButtonProps) {
  const Component = as as any;

  // Variant-specific styles
  const variantStyles: Record<string, string> = {
    primary: "bg-[#0055FF] text-white border-2 border-[#0055FF]",
    secondary: "bg-white text-[#0055FF] border-2 border-white",
    outline: "bg-transparent text-text-main border-2 border-white/20",
  };

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      type={as === 'button' ? type : undefined}
      className={`group inline-flex items-center justify-center gap-3 py-[14px] px-7 font-body text-xs font-bold uppercase tracking-[0.12em] cursor-pointer overflow-hidden relative no-underline transition-colors duration-[400ms] ${variantStyles[variant]} ${className}`}
      style={{
        borderRadius: GOLDEN_RADIUS,
        ...style,
      }}
    >
      <span className="relative z-1">{children}</span>

      {/* Animated Arrow: exits to top-right, re-enters from bottom-left */}
      <div className="relative overflow-hidden w-[18px] h-[18px] flex items-center justify-center">
        <ArrowUpRight
          size={18}
          className="absolute transform transition-transform duration-500 group-hover:translate-x-full group-hover:-translate-y-full"
        />
        <ArrowUpRight
          size={18}
          className="absolute transform -translate-x-full translate-y-full transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </div>
    </Component>
  );
}
