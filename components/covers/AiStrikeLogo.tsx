"use client";

/**
 * AiStrike hero: the AiStrike wordmark and its figure mark, traced from the
 * logo into SVG.
 *
 * Loop: the letters type in left to right, the figure assembles (arms extend,
 * legs drop, the head pops on, standing guard), then an orange scan line sweeps
 * across the wordmark. Paused (or reduced motion) it shows the finished logo.
 */

const COLORS = { O: "#ef5525", D: "#252022" } as const;
const BG = "#fff9eb";

// Traced outlines (viewBox 2000 × 1125). x = left edge, used to stagger the typing.
const GLYPHS: { d: string; fill: "O" | "D"; x: number; evenodd?: boolean }[] = [
  {
    "d": "M551 514 L563 514 L569 516 L577 522 L584 534 L588 548 L591 552 L600 578 L606 590 L607 596 L610 600 L619 626 L642 681 L642 692 L640 696 L632 702 L620 702 L616 700 L610 692 L557 550 L554 552 L551 564 L544 579 L542 588 L532 611 L522 642 L516 654 L514 663 L512 665 L501 696 L497 700 L488 703 L477 700 L472 694 L471 681 L473 675 L478 666 L484 647 L488 641 L494 622 L501 608 L530 532 L538 520 L540 520 L544 516 Z",
    "fill": "O",
    "x": 471
  },
  {
    "d": "M672 511 L678 511 L686 514 L693 525 L693 534 L691 539 L687 544 L679 548 L671 548 L664 545 L658 538 L656 532 L656 526 L659 519 L664 514 Z M673 562 L683 564 L688 569 L690 575 L690 690 L688 696 L681 702 L667 701 L662 696 L660 690 L660 575 L662 569 L667 564 Z",
    "fill": "O",
    "x": 660
  },
  {
    "d": "M769 514 L814 514 L818 516 L823 522 L823 534 L818 540 L814 542 L773 542 L762 544 L754 548 L747 555 L745 560 L746 572 L756 581 L814 598 L834 610 L841 617 L848 631 L850 643 L849 658 L846 669 L837 683 L827 692 L812 699 L796 703 L734 703 L727 698 L724 691 L725 683 L730 677 L738 674 L797 673 L808 668 L814 662 L817 655 L816 641 L809 633 L796 627 L760 618 L737 609 L720 595 L715 585 L712 563 L715 550 L722 537 L731 528 L744 520 Z",
    "fill": "D",
    "x": 712
  },
  {
    "d": "M876 529 L888 529 L895 535 L897 544 L897 565 L925 565 L928 566 L934 574 L934 583 L928 590 L899 591 L896 593 L897 670 L903 676 L923 676 L931 680 L935 689 L934 694 L933 697 L925 703 L900 704 L887 702 L879 698 L873 692 L869 684 L867 676 L867 539 L869 534 Z",
    "fill": "D",
    "x": 867
  },
  {
    "d": "M1001 562 L1010 562 L1015 564 L1019 568 L1020 584 L1013 591 L1003 592 L995 595 L985 604 L981 615 L981 692 L977 699 L972 702 L960 702 L954 697 L952 693 L953 600 L961 584 L973 572 L986 565 Z",
    "fill": "D",
    "x": 952
  },
  {
    "d": "M1049 511 L1057 511 L1062 513 L1067 517 L1071 524 L1071 535 L1069 539 L1066 543 L1056 548 L1050 548 L1041 544 L1037 540 L1034 531 L1037 519 L1042 514 Z M1051 562 L1059 563 L1064 566 L1068 574 L1068 691 L1066 696 L1061 701 L1056 703 L1045 701 L1040 696 L1038 689 L1038 575 L1040 569 L1045 564 Z",
    "fill": "D",
    "x": 1038
  },
  {
    "d": "M1117 514 L1125 516 L1130 521 L1132 526 L1132 691 L1130 696 L1125 701 L1115 703 L1109 701 L1104 696 L1102 691 L1102 526 L1104 521 L1108 517 Z M1193 565 L1204 566 L1209 571 L1211 576 L1210 584 L1206 588 L1206 590 L1187 608 L1187 610 L1170 626 L1170 629 L1180 640 L1183 646 L1187 649 L1187 651 L1191 654 L1191 656 L1196 660 L1202 670 L1211 679 L1214 685 L1214 692 L1212 697 L1208 701 L1202 703 L1192 702 L1186 697 L1186 695 L1182 692 L1176 682 L1164 669 L1162 664 L1157 660 L1157 658 L1154 656 L1145 642 L1137 634 L1135 629 L1137 621 L1184 573 L1184 571 Z",
    "fill": "D",
    "x": 1102
  },
  {
    "d": "M1281 562 L1302 562 L1312 564 L1324 569 L1343 586 L1353 606 L1357 630 L1356 642 L1255 643 L1258 654 L1262 661 L1272 671 L1278 674 L1290 677 L1325 677 L1329 679 L1333 685 L1333 694 L1328 700 L1324 702 L1286 702 L1263 696 L1252 690 L1240 679 L1240 677 L1233 669 L1227 654 L1225 644 L1225 620 L1227 610 L1233 595 L1240 587 L1240 585 L1254 572 L1266 566 Z M1289 586 L1276 589 L1263 599 L1257 610 L1255 616 L1256 620 L1328 619 L1328 614 L1324 607 L1324 604 L1313 592 L1302 587 Z",
    "fill": "D",
    "x": 1225,
    "evenodd": true
  }
];

/** The figure's body (arms bar + three legs) and its head. */
const BODY = "M1357 514 L1523 514 L1527 516 L1529 520 L1529 530 L1525 535 L1521 536 L1469 536 L1469 538 L1506 574 L1507 582 L1505 586 L1498 591 L1489 589 L1453 552 L1451 552 L1450 608 L1447 612 L1439 614 L1432 612 L1429 608 L1428 553 L1424 555 L1422 559 L1420 559 L1420 561 L1418 561 L1417 564 L1415 564 L1415 566 L1392 589 L1388 591 L1382 591 L1376 586 L1376 584 L1374 583 L1375 574 L1392 558 L1392 556 L1394 556 L1394 554 L1396 554 L1396 552 L1399 551 L1400 548 L1402 548 L1411 539 L1412 536 L1354 535 L1350 528 L1350 522 L1352 517 Z";
const HEAD = "M1436 415 L1452 416 L1467 422 L1481 435 L1482 439 L1484 440 L1488 450 L1488 472 L1484 487 L1479 494 L1471 495 L1464 490 L1462 481 L1467 463 L1466 452 L1458 442 L1447 437 L1430 438 L1422 442 L1415 449 L1413 460 L1418 486 L1416 490 L1409 495 L1403 495 L1398 491 L1392 472 L1392 450 L1394 444 L1399 435 L1410 424 L1421 418 Z";

export function AiStrikeLogo({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="250 45 1500 1031"
      preserveAspectRatio="xMidYMid slice"
      className="ai-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        {/* Arms are the bar at the top of the body; legs are everything below it */}
        <clipPath id="ai-arms">
          <rect x="1300" y="500" width="260" height="42" />
        </clipPath>
        <clipPath id="ai-legs">
          <rect x="1300" y="542" width="260" height="90" />
        </clipPath>
        <linearGradient id="ai-scan" x1="0" x2="1">
          <stop offset="0" stopColor={COLORS.O} stopOpacity="0" />
          <stop offset="0.5" stopColor={COLORS.O} stopOpacity="0.35" />
          <stop offset="1" stopColor={COLORS.O} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="2000" height="1125" fill={BG} />

      {GLYPHS.map((g, i) => (
        <path
          key={i}
          className="ai-glyph"
          d={g.d}
          fill={COLORS[g.fill]}
          fillRule={g.evenodd ? "evenodd" : undefined}
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}

      <g className="ai-arms">
        <path d={BODY} fill={COLORS.O} clipPath="url(#ai-arms)" />
      </g>
      <g className="ai-legs">
        <path d={BODY} fill={COLORS.O} clipPath="url(#ai-legs)" />
      </g>
      <path className="ai-head" d={HEAD} fill={COLORS.O} />

      {/* Security scan sweeping across the wordmark */}
      <g className="ai-scan">
        <rect x="380" y="380" width="120" height="360" fill="url(#ai-scan)" />
        <rect x="438" y="380" width="4" height="360" fill={COLORS.O} opacity="0.8" />
      </g>
    </svg>
  );
}
