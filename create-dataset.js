const { default: dedent } = require("dedent");
const fs = require("fs");

const carpetTypes = [
  "paperYarnRugs",
  "handKnottedRugs",
  "tuftedRugs",
  "outdoorRugs",
  "cottonPaperYarnRugs",
  "woolPaperYarnRugs",
];

const carpets = [
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1673352199936-DH8HXBHV75ZXGRTOC79V/Kjq5TUT5.jpeg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1681800711061-CC2Z5FTXSXTI9TY1FXMD/1264505+Willow_willow-natural_interior_original.jpeg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1599201546283-28BBACEGV1KWFUIVAVK0/Earth+collection_paper+yarn+carpet_Railway_1163240_col.+nutria-graphite_interior+1_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1599480249882-BBXVUND708NPSH2LZZYU/wn-field-9980.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1461325725910-AY1HLKI8U5PJUQCDFNPU/12459_Line+natural-black_1050.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1620969954152-NW2XCP2N5P8UMWMDO6H7/Earth+collection_paper+yarn+carpet_Line+1241532_col.+stone-nutria_interior+2_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1473417381265-T8NMXZF8VJQF7WRK7AOA/116151+Raiway+stone_white.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1518507732855-71VZ41OASHVD0928AK1K/wn-road-w3137.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1620970397496-SXIYWNVLYVGLJNJ9JBDT/Earth+collection_paper+yarn+carpet_Field+1313215_col.+nutria-stone_interior+1_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1620970419733-Q6UFWEJCHUS7N7GV3HKL/Earth+collection_paper+yarn+carpet_Field+1313215_col.+nutria-stone_interior+2_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1460633541546-QAXBUUWMUQ79Z5VTC3CW/Summer+Rain.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704966667649-5FQ0UTTR3RCYZMLDW3Y6/1322730+Coast_aspen+green-light+grey_paper+yarn+rug_1.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1620970886788-SF9D2X53E455A3M6YUX3/Earth+collection_paper+yarn+carpet_Living+1301532_col.+stone-nutria_interior+1_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459505567035-O27RZNCCL3XPA5WX81A6/wn-midsummer-1394009+graphite-black.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1701249859398-F3N1LMOUCOPSO3T50Z7H/New+York+11851_col.+natural-white_paper+yarn_woodnotes.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459505866875-ZMYTFBXX8ZBSTM71RNVW/wn-new-york-6012_124.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459509041324-M6BDHHEE89CZ1JM7KX2A/wn-cutstripe-11595.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459506774761-7Z7D5K0FFP0BFYAOJETF/kchair-1976_614.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718102694813-KM4R2JY4G9M9SV19T2K6/Panorama+1333220+nutria-onyx_170x240+cm_interior.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459506208270-6ASVWF1OL6L1RGBKVB62/wn-bridge-8937_81.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1470914746872-4R6WUDTCLZOC2RMN3662/Big+Stripe+1421501+stone-white.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459506550733-5LC2Z37J2IDP7CNZ5566/wn-fourways-4567_1068.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507279260-CGNWXI6YNYPH3VYSMXDC/wn-avenue-9677_73.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1460352985213-16SD3THQTG4FYEF914MO/wn-squareplay-5448_1131.jpg",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704465644539-E9PUSJG6PGB39N3OAGH1/Beach+15380503_light+sand-soft+brown_in-out+carpet_interior0.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1716812092797-PFUIB0ALG17JLDUJX3ZF/Beach+15383040_col.+pearl+grey-graphite_finishing+type+U_ends+with+narrow+edging.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704448313915-63TSUS9XSQU8YQYEI5EN/Grain+15524003_graphite-soft+brown_in-out+carpet_in2.jpeg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704448488305-CQF329VHQHWLYQJO4EYL/Grain+15520305_soft+brown-light+sand_in-out_interior1.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591355684139-GGAGEE3701K51TLDMRHY/wn-line_outdoor-8688.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704449228735-N57Z4XDNJ7MSIRF25K83/Line+15240305_soft+brown-light+sand_in-out+carpet_interior1.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591356798707-BWM3TKXOY7L5O0D7NEKM/wn-outdoor-8757.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591356916230-AJEI6IMUFXZ2RDTM7E6Z/wn-river_outdoor-8618.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704462457091-5W9T7ECEAH71T5V1SOA2/Big+Stripe+15420205+melange+grey-light+sand_in-out+carpet_in_ends+with+narrow+edging.jpeg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718104409999-PRXQFNN1BUGK3WF86PDL/Ground+15320802+grass+green-melange+grey.jpeg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718104374925-3LX7SK90YJ1CAALZ5LKZ/Ground+15320802+grass+green-melange+grey_2.jpeg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704447724567-SWV91Z67MH5BERIBT045/Beach+15380503_light+sand-soft+brown_in-out+carpet_interior2.jpg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718104699702-7WXK8KP8G7FM2Y067CFX/Beach_15380508-under-_Line+15240508-top-_light+sand-grass+green_+interior.jpeg",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559257219-LVTBHGPU8NTJOY4ECDK1/Duetto+1_17101001_col.+natural-white_hand+woven+cotton+paper+yarn_rug_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559278438-TVL790W4N9S4Q8W59XN1/Duetto+5_17113012_col.+stone-nutria_hand+woven_interior+2_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559310067-2S3FI72HRW5LBFBVCOFG/Duetto+5_17113012_col.+stone-nutria_hand+woven_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1615809940179-C0QLKZ4ZY4UCQDH3ZZQQ/Duetto+2_17107034_col.+white-cream_hand+woven_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://media.fds.fi/decor_image/800/Piccolo-1_17115002-col-natural-black_cotton-paper-yarn-carpet_1_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://lehmusto.fi/wp-content/uploads/2023/01/Minore-matto.jpg.webp",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://lehmusto.fi/wp-content/uploads/2023/01/Minore5_kitti-valk_webkopio.png.webp",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://else.fi/kuva/3/Woodnotes_Minore_HannaKorvela_matto.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://porinkalustetalo.fi/wp-content/uploads/2023/03/Minore_hand-woven-carpet_finishing_hand-sewn-end_woven-edges-1.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://img.tori.net/dynamic/1280w/2024/5/vertical-0/14/2/845/256/2_2391749f-ec68-450d-8248-77774061920c.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://img.tori.net/dynamic/1280w/2024/5/vertical-0/14/2/845/256/2_3f196b5a-1b88-4d0b-a33c-a679dd8ed87a.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://media.fds.fi/product_additional/500/Minore_hand-sewn-end_woven-edges_corner-detail.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://media.franckly.com/Thvv54jLNJatj7Q4tw9whhD4q331cGFBpCIpYeGmMP4/w:500/h:500/ex:1/bG9jYWw6Ly8vdmludGFnZV9wcm9kdWN0X3Bob3Rvcy9xZ2VNbmN4T1U5eEpib0tPTkFrWGxIWVpmYXRCbEtCZnloNmFwOVBpLmpwZWc.jpeg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://media.franckly.com/SSr-9KtwwLLmp0Q0QyWb_e5PwSWqMF5N-b8LUOQY2_8/w:500/h:500/ex:1/bG9jYWw6Ly8vdmludGFnZV9wcm9kdWN0X3Bob3Rvcy91cVB1YTRuQmw1ajBQd3g0UUcwbEZiazhTMENOMnZ4VjhWVk83YnRuLmpwZWc.jpeg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://media.franckly.com/y5Z54OwX8iCxYdrQHz2cSJ8G5gtNzyzgwWZh7r54llA/w:500/h:500/ex:1/bG9jYWw6Ly8vdmludGFnZV9wcm9kdWN0X3Bob3Rvcy8zVUdSenpNVER4dkdmMUR0eVZJUUNMV2liSU40OGNMelkxVllySENkLmpwZWc.jpeg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://media.franckly.com/O5axauOzf3SgnR_awM6UMPFIytXI7f8SF2kZ46eQjUU/w:500/h:500/ex:1/bG9jYWw6Ly8vdmludGFnZV9wcm9kdWN0X3Bob3Rvcy81c1NuNTU0Q1U0cGsyU29zT3p2ZzZUQjJvUmVoVU11c2NJNWlYSzJyLmpwZWc.jpeg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://img.tori.net/dynamic/1280w/2024/5/vertical-0/14/2/845/256/2_2391749f-ec68-450d-8248-77774061920c.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://img.tori.net/dynamic/1280w/2024/5/vertical-0/14/2/845/256/2_3f196b5a-1b88-4d0b-a33c-a679dd8ed87a.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642411311353-GAAWYY8M9G2FJF8VZYAV/Minore+5_kitti-valk_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642411311353-GAAWYY8M9G2FJF8VZYAV/Minore+5_kitti-valk_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1646393670876-0D8YX204X2G1AW7651KZ/Minore_17155030_stone-natural+beige.jpeg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704874144003-A9013NQG9FG73CWNTW4B/Minore+1+17151001_natural-white_detail.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704874209904-7D0JBYU1F7TL3BP5JKFA/_E6A3855-2.jpg",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/e1992558-a76b-4615-a1d1-edab4cb8b9a6/Minore+rug+ends+finishing_web.jpg?format=1000w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611750761000-C7W7U2NYXSM52QOCPBWD/Sammal+1610101_col.+white_wool+linen_tufted+carpet_woodnotes.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1461840301606-VY8Z35UAVAQ8KXWKVKP2/1612222+Sammal+ice.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/479bff9f-4f12-495b-a09b-0fd75c6413be/Sammal_web.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507485999-ZG765U5AHQ04RFY5FKCV/1620202+aapa+warm+grey+tufted+carpet.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507518082-3E8G33KN7SEVVARYRR3W/1620202+aapa+warm+grey+tufted+carpet_livingroom.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507620242-RRVKX0CAKS6794N7HSZM/wn-path-3386_1199.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459509522460-4OL98AFZ7QAKRBCLKOGV/woodnotes-moonlight-9148.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507653544-STDL0065E6QZH807ONWH/wn-path-1630101+white.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1487241076219-27ZRVOG16RA2CZKHLD6F/1640115+Wild+col.+light+grey.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507783177-WMXF6XTPAK0HXHCSQM1K/wn-wild-1640115+light+grey.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611217407153-8P0RXFSX1I5EFU0KLNCM/wn-wild-2818.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507947516-7QVPW4UZ1BUH98GIBQJ6/wn-tundra-1651501+stone-white.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648040015576-PZA7MKXUAPTUVQCKNJ0F/Majore+17270215226+col.+opal.jpeg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648040052851-MFDURQZ9H9N9D4J77TM7/Majore+17270215226+opal.jpeg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648040086177-ZXMBA6CFU6P7F7PA5QS0/Majore_17270215226_col.+opal_star+base_k+Chair_k+Ottoman_1.jpeg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1551075700144-KSYXFYNHX94Y5NUSHH5E/wn-plain-4436.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1551075762443-PQU7XA45XZMQG2PSS5DO/wn-plain-4442.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565772120703-6SWFD7GW2TF575KYOWCZ/Woodnotes_Uni_wool+carpet_camel.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1645687077809-6OL5GZ4RPGEOZGZY3T7C/46704W-twiggy-table_oak_88x88x38%2C5+cm_XL_web.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/0040c0fa-b370-43b7-a1dc-7849cd996fbf/Uni+rug_ends_corner+without+braid?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/dcc7d6ac-486d-44a2-acb5-cec46b958c73/Grid+rug_ends_corner+braid?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771333284-10KUL8GXS93FFTOWY0HA/Woodnotes_Grid_wool+carpet_white-black_Twiggy_table_black.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1551075561446-A2Y4ZQRPOBCYSG9IUIGV/wn-grid-4397.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771532224-T0NSUYZVI5L56G9TUSV3/Woodnotes_Grid_wool+carpet_white-camel.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771852058-X4A95Q5M7TM4TQDAZQF7/Woodnotes_Grid_wool+carpet_white-light+grey.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://res.cloudinary.com/tokmanni/image/upload/c_pad,b_white,f_auto,h_800,w_800/d_default.png/6438565084700.jpg",
    type: "",
  },
  {
    url: "https://res.cloudinary.com/tokmanni/image/upload/c_pad,b_white,f_auto,h_800,w_800/d_default.png/6419835250025.png",
    type: "",
  },
  {
    url: "https://isku.fi/cdn/shop/files/Terttu-villamatto-finarte-1692948802177.jpg?v=1702382173&width=600",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/maevinn-matto-kukanmuotoinen-luonnonvaerinen__1246409_pe922146_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/busenkel-matto-harlekiinikuvio-monivaerinen__1032940_pe837065_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/busenkel-matto-harlekiinikuvio-monivaerinen__1071213_pe854887_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/foderlosta-matto-kudottu-luonnonvaerinen-kaesin-tehty__1244237_pe921116_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/vedbaek-matto-matala-nukka-vaaleanharmaa__1072491_pe855183_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/tiphede-matto-kudottu-luonnonvaerinen-musta__0772105_pe755880_s5.jpg?f=xl",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/stoense-matto-matala-nukka-luonnonvalkoinen__0684912_ph156147_s5.jpg?f=xl",
    type: "",
  },

  // Lisää tähän lisää esimerkkejä jokaisesta mattoluokasta
];
const carpets_dataset_2 = [
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459506595739-NEE2E5NYSVY9V0U9BR7Q/wn-fourways-4605_1094.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1679577774305-NVGANLYH7F99237VM657/San+Francisco+1430305+brown-natural_0.jpeg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1460358072345-UVEADCWXDI4M4R6IERBH/wn-bigstripe.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1460972225786-81G69MMJIUI0S30WX5YL/_0003_wn-bigstripe-8772_1227.jpg?format=500w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704447724567-SWV91Z67MH5BERIBT045/Beach+15380503_light+sand-soft+brown_in-out+carpet_interior2.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718104699702-7WXK8KP8G7FM2Y067CFX/Beach_15380508-under-_Line+15240508-top-_light+sand-grass+green_+interior.jpeg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704465644539-E9PUSJG6PGB39N3OAGH1/Beach+15380503_light+sand-soft+brown_in-out+carpet_interior0.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704448488305-CQF329VHQHWLYQJO4EYL/Grain+15520305_soft+brown-light+sand_in-out_interior1.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1705564622681-1TBTCOZDOW4C1AOJD3E5/Grain+15524003_graphite-soft+brown_in-out+carpet_in.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591604206309-NU8SW0U3G8OS3N8RVR5N/wn-grain_outdoor-7498.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704447917479-ULDRTSRXQA9KVE4X5O85/Grain+graphite-soft+brown_in-out_web.jpg?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704449228735-N57Z4XDNJ7MSIRF25K83/Line+15240305_soft+brown-light+sand_in-out+carpet_interior1.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591604328472-NZY4P967H54MV65VE4WK/wn-line_outdoor-7510.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1590658157941-U3IHQ4OFXAMIQ6XC1LXZ/15243040+Line_pearl+grey-graphite_web.png?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1588593750863-G2POPC4PVHQ055C8GTXM/wn-inoutdoor-big+stripe_yellow-light+sand.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1705565791313-A6ZPMJ0Q1NRXAWBWPK7P/15420405+Big+Stripe_navy+blue-light+sand_web.png?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1712911772043-A5DUYDQYS3CGV15HK5CE/15530308+Shadow_soft+brown-grass+green_web.png?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1712912581638-NXMCZPRTIWLRB7OW8TRU/Ground_grass+green-melange+grey.jpg?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1712910049023-TAYLMIJ4J4D6H4A8WYDZ/15320802+Ground_grass+green-melange+grey_web.png?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704875620218-35N5CCY4SCLUI0H3IHJ2/wn-in-out+carpets-32-yellow.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591357032233-QGYAXC2GTC0FNTDHRL2C/wn-river_outdoor-8621.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1701182323996-76VU2MGSJKO1UZG1FUOQ/_Detail_Piccolo+2+_17116001_col.+white-white_hand+woven_edge+detail_woodnotes+%281%29.jpg?format=1000w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1701182258190-MSBJHL1JLKKG255Z1DIQ/Piccolo+4_17118035-col.+grey-stone_cotton+paper+yarn+carpet_interior+2_woodnotes.jpg?format=1000w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1634105548575-GWH72NDSTZ4JJLWWPDIQ/17111036+Duetto+4_grey-turquoise.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1634104951623-D61N63ADPY9VP68CZPB2/17101034+Duetto+1_natural-cream.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559257219-LVTBHGPU8NTJOY4ECDK1/Duetto+1_17101001_col.+natural-white_hand+woven+cotton+paper+yarn_rug_woodnotes.jpg?format=1000w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559257219-LVTBHGPU8NTJOY4ECDK1/Duetto+1_17101001_col.+natural-white_hand+woven+cotton+paper+yarn_rug_woodnotes.jpg?format=1000w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559310067-2S3FI72HRW5LBFBVCOFG/Duetto+5_17113012_col.+stone-nutria_hand+woven_woodnotes.jpg?format=1500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1634105273839-UEXO4IS72YKOE2XJXNN3/17107006+Duetto+2_white-yellow.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1634105695771-OPBI3OSKKF0UV4RU85QL/17113001+Duetto+5_stone-white.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://www.wilmainterior.fi/assets/ProductCatalog/4/SilverShop_Page_Product-3805/thumbnail_IMG-1867-v2.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://media.fds.fi/product_additional/800/_Detail_Piccolo-2-_17116001_col-white-white_hand-woven_end_woodnotes2.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://media.fds.fi/product_additional/800/_Detail_Piccolo-2-_17116001_col-white-white_hand-woven_end_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://media.fds.fi/decor_image/800/Piccolo-1_17115002-col-natural-black_cotton-paper-yarn-carpet_1_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611560163809-HFLT1JG192YANPXHDTJL/Piccolo+5_17121012_nutria_web.png?format=1000w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642411311353-GAAWYY8M9G2FJF8VZYAV/Minore+5_kitti-valk_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704874144003-A9013NQG9FG73CWNTW4B/Minore+1+17151001_natural-white_detail.jpg?format=1000w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/e1992558-a76b-4615-a1d1-edab4cb8b9a6/Minore+rug+ends+finishing_web.jpg?format=1500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642411119617-CRPC653FGVYYJZI4R20A/Minore+4_harmaa-tumm.harmaa_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1710509198744-RNPJ22FUBKAYXZ3U9B3L/Path+1630101_white.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507653544-STDL0065E6QZH807ONWH/wn-path-1630101+white.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458232396111-D4BZIUH7QB5V4EP1TDPU/wertwe.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/19e16e99-61c1-4112-a726-fe39fb1844ca/Majore_kulmakuva_web.jpg?format=1500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648043095933-6Q48L82SM24655PXESVE/MAJORE_OPAL+215-226_web.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648043042488-LWKL7XFSD8FNYDIRT65C/MAJORE_QUARTZ+101_web.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507485999-ZG765U5AHQ04RFY5FKCV/1620202+aapa+warm+grey+tufted+carpet.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458230754955-GZZB3ANIOPQ7IXDNDUQW/3h5.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648040086177-ZXMBA6CFU6P7F7PA5QS0/Majore_17270215226_col.+opal_star+base_k+Chair_k+Ottoman_1.jpeg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560759700970-2PLBT9PKZ2W1HKZ8Z4OM/Hand+knotted_wool+carpet_Uni_18500202+grey_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560759977154-FWDWLUG1JYQN236PS8L6/Hand+knotted_wool+carpet_Uni_18503030+light+grey_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1645687077809-6OL5GZ4RPGEOZGZY3T7C/46704W-twiggy-table_oak_88x88x38%2C5+cm_XL_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560757014497-QC2WKMJSVDNF66YAX98J/Hand+knotted_wool+carpet_Grid_18600102+white-grey_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/dcc7d6ac-486d-44a2-acb5-cec46b958c73/Grid+rug_ends_corner+braid?format=1500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1551075561446-A2Y4ZQRPOBCYSG9IUIGV/wn-grid-4397.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771852058-X4A95Q5M7TM4TQDAZQF7/Woodnotes_Grid_wool+carpet_white-light+grey.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://www.vepsalainen.com/globalassets/catalogs/image/v/e/vepsalainen_woodnotes_grid_matto_valkoinen_vaaleanharmaa_rug_white_light_grey_250x350_4.jpg?maxWidth=1200",
    type: "handKnottedRugs",
  },
  {
    url: "https://www.vepsalainen.com/globalassets/catalogs/image/v/e/vepsalainen_woodnotes_grid_matto_valkoinen_vaaleanharmaa_rug_white_light_grey_250x350_3.jpg?maxWidth=1200",
    type: "handKnottedRugs",
  },
  {
    url: "https://www.vepsalainen.com/globalassets/catalogs/image/v/e/vepsalainen_woodnotes_grid_matto_valkoinen_vaaleanharmaa_rug_white_light_grey_250x350_2.jpg?maxWidth=1200",
    type: "handKnottedRugs",
  },
  {
    url: "https://media.fds.fi/product_additional/800/wn-handknotted-3989.jpg",
    type: "handKnottedRugs",
  },
  {
    url: "https://www.laatukaluste.com/cdn/shop/files/Woodnotes-Uni-matto-200x300-valkoinen-Woodnotes-61295023_2048x.jpg?v=1700236467",
    type: "handKnottedRugs",
  },
  {
    url: "https://scontent-hel3-1.xx.fbcdn.net/v/t1.6435-9/106666650_4057300694342541_3153023693992777905_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=5CmG-pRWVT0Q7kNvgGMz2uA&_nc_zt=23&_nc_ht=scontent-hel3-1.xx&_nc_gid=AsGpZA4wwls683YsuDXyZND&oh=00_AYC6RQuD99kfU8EFnkdo-Mcncv30pfHGm25aWYgMR1nkDw&oe=6752EAB7",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560757288491-AQWUWUH5W72ZWVUKWI4G/Grid%2B18600109_white-black-1_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771852058-X4A95Q5M7TM4TQDAZQF7/Woodnotes_Grid_wool+carpet_white-light+grey.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://res.cloudinary.com/tokmanni/image/upload/c_pad,b_white,f_auto,h_800,w_800/d_default.png/6438565084700.jpg",
    type: "",
  },
  {
    url: "https://img.tori.net/dynamic/1280w/2024/11/vertical-0/06/1/161/193/21_b1be57bc-9804-4fbd-acd5-1453084716b5.jpg",
    type: "",
  },
  {
    url: "https://isku.fi/cdn/shop/files/Rustiikki-matto-VM-Carpet-1694071285917.jpg?v=1694071288&width=493",
    type: "",
  },
  {
    url: "https://isku.fi/cdn/shop/files/Rustiikki-matto-VM-Carpet-1694071289623.jpg?v=1694071292&width=1100",
    type: "",
  },
  {
    url: "https://isku.fi/cdn/shop/files/Mombasa-Villamatto-140-x-200-cm-Isku-Stage-1687779626827.jpg?v=1687779629&width=493",
    type: "",
  },
  {
    url: "https://isku.fi/cdn/shop/files/Tweed-matto-pyorea-VM-Carpet-1693918116920_3f769d79-3503-4914-bf79-c50199a53dc2.jpg?v=1702381377&width=493",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/lohals-matto-kudottu-luonnonvaerinen__0893155_pe583381_s5.jpg?f=xs",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/isgraes-matto-matala-nukka-monivaerinen__1211039_pe909960_s5.jpg?f=xs",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/skriftsprak-matto-matala-nukka-beige-vihreae-tummansininen__1123722_pe874879_s5.jpg?f=xs",
    type: "",
  },
  {
    url: "https://www.ikea.com/fi/fi/images/products/lohals-matto-kudottu-luonnonvaerinen__0982475_pe815669_s5.jpg?f=xs",
    type: "",
  },

  // Lisää tähän lisää esimerkkejä jokaisesta mattoluokasta
];
// Yhdistä molemmat datasetit
const allCarpets = [...carpets, ...carpets_dataset_2];

// Poista duplikaatit URL:n perusteella ja optimoi kuvien formaatti
const uniqueCarpets = Array.from(
  new Map(
    allCarpets.map((carpet) => {
      // Puhdista URL parametrit ja formaatti
      const cleanUrl = cleanImageUrl(carpet.url);
      return [cleanUrl, { ...carpet, url: cleanUrl }];
    }),
  ).values(),
);

// Validoi URL
function isValidUrl(url) {
  if (!url || url.trim() === "") return false;
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|webp|gif)($|\?)/.test(url.toLowerCase());
  } catch (e) {
    return false;
  }
}

// Paranneltu cleanImageUrl
function cleanImageUrl(url) {
  if (!isValidUrl(url)) {
    console.log(`Invalid URL found: ${url}`);
    return null;
  }

  // Poista format ja dimension parametrit Squarespace-urleista
  if (url.includes("squarespace-cdn.com")) {
    url = url.split("?")[0];
  }
  // Poista resoluutio ja format parametrit CDN-urleista
  if (url.includes("cloudinary.com") || url.includes("ikea.com")) {
    url = url.split("?")[0];
  }
  return url;
}

// Laske mattotyyppien jakauma
function calculateDistribution(carpets) {
  const distribution = {};
  carpets.forEach((carpet) => {
    if (carpet.type) {
      distribution[carpet.type] = (distribution[carpet.type] || 0) + 1;
    } else {
      distribution["negative"] = (distribution["negative"] || 0) + 1;
    }
  });
  return distribution;
}

const distribution = calculateDistribution(uniqueCarpets);
console.log("Mattotyyppien jakauma:", distribution);

// Järjestä data niin että joka tyypistä on tasaisesti esimerkkejä
function balanceDataset(carpets) {
  // Laske pienin määrä esimerkkejä per luokka (pois lukien negatiiviset esimerkit)
  const minPositiveExamples = Math.min(
    ...Object.entries(distribution)
      .filter(([key]) => key !== "negative")
      .map(([_, count]) => count),
  );

  // Ryhmittele matot tyypin mukaan
  const groupedCarpets = carpets.reduce((acc, carpet) => {
    const type = carpet.type || "negative";
    if (!acc[type]) acc[type] = [];
    acc[type].push(carpet);
    return acc;
  }, {});

  // Ota tasainen määrä esimerkkejä joka tyypistä
  let balancedCarpets = [];
  Object.entries(groupedCarpets).forEach(([type, typeCarpets]) => {
    // Negatiivisia esimerkkejä otetaan saman verran kuin positiivisia per luokka
    const targetCount =
      type === "negative"
        ? Math.min(typeCarpets.length, minPositiveExamples * 2)
        : Math.min(typeCarpets.length, minPositiveExamples);

    // Sekoita ja valitse haluttu määrä
    const shuffled = [...typeCarpets].sort(() => Math.random() - 0.5);
    balancedCarpets = balancedCarpets.concat(shuffled.slice(0, targetCount));
  });

  return balancedCarpets;
}

const balancedCarpets = balanceDataset(uniqueCarpets);
console.log("Tasapainotettu data:", calculateDistribution(balancedCarpets));

// Sekoita lopullinen datasetti
const shuffledCarpets = [...balancedCarpets].sort(() => Math.random() - 0.5);

const createJSONL = () => {
  const stream = fs.createWriteStream("woodnotes_carpets_optimized.jsonl");

  shuffledCarpets.forEach((carpet) => {
    let resultObject;
    if (carpet.type === "") {
      resultObject = Object.fromEntries(
        carpetTypes.map((type) => [type, false]),
      );
    } else {
      resultObject = Object.fromEntries(
        carpetTypes.map((type) => [type, type === carpet.type]),
      );
    }

    const conversation = {
      messages: [
        {
          role: "system",
          content: dedent`You are a specialized Woodnotes carpet classifier. Analyze the image and identify the carpet type.
          Return ONLY a valid JSON object with boolean values for all carpet types.
          - If the image shows a Woodnotes carpet, set the corresponding type to true
          - If the image is not a Woodnotes carpet or you're unsure, set all values to false
          - The response must ALWAYS be in this exact format:
          {
            "paperYarnRugs": false,
            "handKnottedRugs": false,
            "tuftedRugs": false,
            "outdoorRugs": false,
            "cottonPaperYarnRugs": false,
            "woolPaperYarnRugs": false
          }`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Classify this carpet image. Return the classification as a JSON object with boolean values.",
            },
            {
              type: "image_url",
              image_url: {
                url: carpet.url,
                detail: "high",
              },
            },
          ],
        },
        {
          role: "assistant",
          content: JSON.stringify(resultObject),
        },
      ],
    };

    stream.write(JSON.stringify(conversation) + "\n");
  });

  stream.end();
  console.log(
    "JSONL file created successfully with",
    shuffledCarpets.length,
    "examples",
  );
};

createJSONL();
