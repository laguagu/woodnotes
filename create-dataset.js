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

const createJSONL = () => {
  const stream = fs.createWriteStream("woodnotes_carpets.jsonl");

  carpets.forEach((carpet) => {
    let resultObject;
    if (carpet.type === "") {
      // Jos tyyppi on tyhjä, aseta kaikki arvot falseksi
      resultObject = Object.fromEntries(
        carpetTypes.map((type) => [type, false]),
      );
    } else {
      // Muuten toimi kuten aiemmin
      resultObject = Object.fromEntries(
        carpetTypes.map((type) => [type, type === carpet.type]),
      );
    }

    const conversation = {
      messages: [
        {
          role: "system",
          content:
            "Identify Woodnotes carpet types in the image. If the image is not a Woodnotes carpet, all types should be false.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What type of Woodnotes carpet is this, if any?",
            },
            {
              type: "image_url",
              image_url: {
                url: carpet.url,
                detail: "auto",
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
  console.log("JSONL file created successfully.");
};

createJSONL();
