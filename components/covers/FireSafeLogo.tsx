"use client";

/**
 * Fire Safe hero: the project mark (three interlocking chevrons around a core)
 * and wordmark, traced from the logo artwork into SVG so it stays crisp.
 *
 * Loop: the three chevrons fly in and lock together, the emblem turns a third
 * of a turn like a beacon (it is 3-fold symmetric, so the loop is seamless), a
 * red glow pulses like an alarm light, and the wordmark rises in.
 * Paused (or reduced motion) it shows the finished logo, the still frame.
 */

const RED = "#fa341a";

// Traced outlines (viewBox 1800 × 941). ox/oy = fly-in offset along each piece's direction.
const PIECES: { d: string; ox: number; oy: number }[] = [
  {
    "d": "M912 241 L915 241 L916 378 L909 388 L863 414 L853 415 L744 353 L744 321 L869 394 L879 396 L880 257 Z",
    "ox": -150,
    "oy": -212
  },
  {
    "d": "M1040 331 L1069 347 L940 420 L937 426 L1055 495 L1054 534 L937 469 L929 458 L932 395 Z",
    "ox": 260,
    "oy": 12
  },
  {
    "d": "M848 438 L864 441 L906 466 L912 475 L912 600 L886 616 L885 465 L882 461 L762 529 L730 508 Z",
    "ox": -162,
    "oy": 203
  }
];

const WORDMARK = "M956 744 L958 745 L958 748 L954 749 L954 754 L957 754 L958 758 L954 758 L954 778 L949 779 L949 759 L946 758 L946 755 L949 753 L949 748 Z M838 745 L842 745 L843 750 L841 751 L838 750 Z M818 748 L836 748 L835 752 L822 752 L822 761 L831 761 L833 763 L832 765 L822 766 L822 779 L818 779 Z M900 748 L911 748 L916 753 L916 756 L911 756 L909 752 L902 752 L900 754 L900 758 L902 760 L911 762 L916 766 L916 770 L917 770 L916 774 L914 777 L910 779 L899 778 L895 772 L899 770 L903 775 L909 775 L912 772 L912 769 L909 766 L900 764 L896 761 L895 754 L897 750 L899 750 Z M839 754 L843 755 L843 778 L842 779 L838 778 L838 755 Z M848 754 L851 754 L852 757 L855 756 L856 754 L859 754 L859 759 L855 759 L852 762 L852 779 L847 778 L847 755 Z M868 754 L876 754 L880 756 L884 762 L884 768 L866 768 L865 769 L866 773 L869 775 L875 775 L878 772 L883 772 L883 774 L879 778 L868 779 L864 777 L860 771 L861 760 L864 756 Z M927 754 L934 754 L936 756 L939 756 L940 754 L944 755 L944 778 L943 779 L939 779 L938 776 L934 779 L927 779 L927 778 L924 778 L920 774 L920 771 L918 768 L920 759 Z M967 754 L975 754 L978 757 L980 757 L980 759 L982 760 L982 764 L983 764 L982 768 L964 768 L964 772 L968 775 L974 775 L976 774 L976 772 L981 772 L980 776 L975 779 L964 778 L960 774 L960 771 L959 771 L960 759 L964 755 L967 755 Z M870 758 L865 762 L865 764 L879 764 L877 759 Z M930 758 L924 762 L924 771 L926 772 L926 774 L934 775 L938 772 L939 764 L936 759 Z M969 758 L964 761 L964 764 L978 764 L978 762 L974 758 Z";

export function FireSafeLogo({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 1800 941"
      preserveAspectRatio="xMidYMid slice"
      className="fs-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        <radialGradient id="fs-bg" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#3d3b3a" />
          <stop offset="100%" stopColor="#141414" />
        </radialGradient>
        <radialGradient id="fs-glow-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.55" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1800" height="941" fill="url(#fs-bg)" />
      <circle className="fs-glow" cx="900" cy="428" r="300" fill="url(#fs-glow-fill)" />

      <g className="fs-emblem">
        {PIECES.map((p, i) => (
          <g
            key={i}
            className="fs-piece"
            style={{ ["--ox" as string]: `${p.ox}px`, ["--oy" as string]: `${p.oy}px`, animationDelay: `${i * 140}ms` }}
          >
            {/* Thin matching stroke softens the traced corners */}
            <path d={p.d} fill={RED} stroke={RED} strokeWidth={3} strokeLinejoin="round" />
          </g>
        ))}
      </g>

      <path className="fs-word" d={WORDMARK} fill={RED} fillRule="evenodd" />
    </svg>
  );
}
