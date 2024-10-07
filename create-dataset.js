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
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1599201546283-28BBACEGV1KWFUIVAVK0/Earth+collection_paper+yarn+carpet_Railway_1163240_col.+nutria-graphite_interior+1_woodnotes.jpg?format=750w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458227907522-GVR7996H45KKOM1TQ5I6/_0020s_0010_line-12495_674.png?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459505050180-V4J8B4ZCHNR8ABF34ASO/11659_Railway+natural-black_1043.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459772385284-5Y8YCGZZY5UM9FTDPDN9/wn-city-117151.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1681800269187-TDHTNL66VZBUIFOJ46DA/1260545+Willow_natural-willow_web.jpg?format=1500w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1620970397496-SXIYWNVLYVGLJNJ9JBDT/Earth+collection_paper+yarn+carpet_Field+1313215_col.+nutria-stone_interior+1_woodnotes.jpg?format=750w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459505421379-YHYIF615GD6TXK36D7BD/wn-living-130151+stone-white.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458229859577-37RLOR2RA98BTAJ8H2KU/woef.png?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718102694813-KM4R2JY4G9M9SV19T2K6/Panorama+1333220+nutria-onyx_170x240+cm_interior.jpg?format=750w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458231646316-LPIVSU11UXWUXOA9JHVQ/ewtr.png?format=1500w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704448052703-AAWA4FYUXIMGZLBOCZ74/Grain+soft+brown-light+sand_web1.jpg?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704465644539-E9PUSJG6PGB39N3OAGH1/Beach+15380503_light+sand-soft+brown_in-out+carpet_interior0.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1716812092797-PFUIB0ALG17JLDUJX3ZF/Beach+15383040_col.+pearl+grey-graphite_finishing+type+U_ends+with+narrow+edging.jpg?format=750w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704449228735-N57Z4XDNJ7MSIRF25K83/Line+15240305_soft+brown-light+sand_in-out+carpet_interior1.jpg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704981552757-I74JNQ058MV3YMC06U6J/Play-Unicolour_thumpnail.jpg?format=1000w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1591356612880-5KLQ8ZPR6MDK1HC44YBU/wn-outdoor-8652.jpg?format=750w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1588593750863-G2POPC4PVHQ055C8GTXM/wn-inoutdoor-big+stripe_yellow-light+sand.jpg?format=750w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1718104409999-PRXQFNN1BUGK3WF86PDL/Ground+15320802+grass+green-melange+grey.jpeg?format=1500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1612429512136-QY33X3NWRQEWBFE72KS8/Piccolo+1_17115001-white_s%C3%A4vy_web.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1701182190156-O8WQP1U2CRQJYOTZ92VB/Piccolo+5_17121012-col.+stone-nutria_cotton+paper+yarn+carpet_interior+2_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611559310067-2S3FI72HRW5LBFBVCOFG/Duetto+5_17113012_col.+stone-nutria_hand+woven_woodnotes.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/d33e929f-7057-4e5a-9466-152a3ba9fc4a/Duetto+rug_ends+finishing_web.jpg?format=2500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1701182323996-76VU2MGSJKO1UZG1FUOQ/_Detail_Piccolo+2+_17116001_col.+white-white_hand+woven_edge+detail_woodnotes+%281%29.jpg",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642410817169-CP0LAWPXEQ2K5QBHRK5U/Minore+1_lv-valkoinen_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642410817169-CP0LAWPXEQ2K5QBHRK5U/Minore+1_lv-valkoinen_web+kopio.png?format=1000w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/e1992558-a76b-4615-a1d1-edab4cb8b9a6/Minore+rug+ends+finishing_web.jpg?format=2500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1646393670876-0D8YX204X2G1AW7651KZ/Minore_17155030_stone-natural+beige.jpeg?format=750w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642411311353-GAAWYY8M9G2FJF8VZYAV/Minore+5_kitti-valk_web+kopio.png?format=1000w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704874209904-7D0JBYU1F7TL3BP5JKFA/_E6A3855-2.jpg?format=750w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648032506005-0Z548D5ACUNR7NM4IOSI/Ristikkojalkainen_kapea+k+tuoli_Sand+valkoinen_2.jpeg?format=750w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611750761000-C7W7U2NYXSM52QOCPBWD/Sammal+1610101_col.+white_wool+linen_tufted+carpet_woodnotes.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611750761000-C7W7U2NYXSM52QOCPBWD/Sammal+1610101_col.+white_wool+linen_tufted+carpet_woodnotes.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/479bff9f-4f12-495b-a09b-0fd75c6413be/Sammal_web.jpg?format=2500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507485999-ZG765U5AHQ04RFY5FKCV/1620202+aapa+warm+grey+tufted+carpet.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1710509198744-RNPJ22FUBKAYXZ3U9B3L/Path+1630101_white.png?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/3fa5fb28-f6a9-4a21-a5e7-083201a33125/Path_web.jpg?format=2500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459509522460-4OL98AFZ7QAKRBCLKOGV/woodnotes-moonlight-9148.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1487241076219-27ZRVOG16RA2CZKHLD6F/1640115+Wild+col.+light+grey.jpg",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507783177-WMXF6XTPAK0HXHCSQM1K/wn-wild-1640115+light+grey.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648040052851-MFDURQZ9H9N9D4J77TM7/Majore+17270215226+opal.jpeg?format=750w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648043042488-LWKL7XFSD8FNYDIRT65C/MAJORE_QUARTZ+101_web.png?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458232414366-S63Q6UU2L7I5TKLH1B3P/erg.png?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458230760373-M6Q3M6FJF5MMACPL2CT5/wr4g.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1648041702043-TVJ24MJEWPS4B6YB8WWN/MAJORE_BLACK+_17270104207.jpeg?format=750w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1459507947516-7QVPW4UZ1BUH98GIBQJ6/wn-tundra-1651501+stone-white.jpg?format=750w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560760493293-5JBOEEN45BXPW0WNPS1L/Hand+knotted_wool+carpet_Uni_18500115+ivory+white_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560757288491-AQWUWUH5W72ZWVUKWI4G/Grid%2B18600109_white-black-1_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560756492526-YX2NWMN1HZ4BJOK6JWVA/Hand+knotted_wool+carpet_Grid_18600105+white-camel_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560757014497-QC2WKMJSVDNF66YAX98J/Hand+knotted_wool+carpet_Grid_18600102+white-grey_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560760493293-5JBOEEN45BXPW0WNPS1L/Hand+knotted_wool+carpet_Uni_18500115+ivory+white_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1551075700144-KSYXFYNHX94Y5NUSHH5E/wn-plain-4436.jpg?format=750w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560757014497-QC2WKMJSVDNF66YAX98J/Hand+knotted_wool+carpet_Grid_18600102+white-grey_web.jpg?format=1000w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565771333284-10KUL8GXS93FFTOWY0HA/Woodnotes_Grid_wool+carpet_white-black_Twiggy_table_black.jpg?format=750w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/dcc7d6ac-486d-44a2-acb5-cec46b958c73/Grid+rug_ends_corner+braid?format=2500w",
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
        carpetTypes.map((type) => [type, false])
      );
    } else {
      // Muuten toimi kuten aiemmin
      resultObject = Object.fromEntries(
        carpetTypes.map((type) => [type, type === carpet.type])
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
