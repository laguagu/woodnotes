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
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1681800269187-TDHTNL66VZBUIFOJ46DA/1260545+Willow_natural-willow_web.jpg?format=1500w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1599201546283-28BBACEGV1KWFUIVAVK0/Earth+collection_paper+yarn+carpet_Railway_1163240_col.+nutria-graphite_interior+1_woodnotes.jpg?format=1000w",
    type: "paperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1704448052703-AAWA4FYUXIMGZLBOCZ74/Grain+soft+brown-light+sand_web1.jpg?format=500w",
    type: "outdoorRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1612429512136-QY33X3NWRQEWBFE72KS8/Piccolo+1_17115001-white_s%C3%A4vy_web.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1612429976312-W144E3JSL1CP5IN9HL56/Duetto+1_+17101001_col.+natural-white_woodnotes_s%C3%A4vy_web.png?format=500w",
    type: "cottonPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1642410817169-CP0LAWPXEQ2K5QBHRK5U/Minore+1_lv-valkoinen_web+kopio.png?format=500w",
    type: "woolPaperYarnRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1611750761000-C7W7U2NYXSM52QOCPBWD/Sammal+1610101_col.+white_wool+linen_tufted+carpet_woodnotes.jpg?format=1000w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1458230760373-M6Q3M6FJF5MMACPL2CT5/wr4g.png?format=500w",
    type: "tuftedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1560760493293-5JBOEEN45BXPW0WNPS1L/Hand+knotted_wool+carpet_Uni_18500115+ivory+white_web.jpg?format=500w",
    type: "handKnottedRugs",
  },
  {
    url: "https://images.squarespace-cdn.com/content/v1/56d575ab1d07c014ff47e83c/1565772120703-6SWFD7GW2TF575KYOWCZ/Woodnotes_Uni_wool+carpet_camel.jpg?format=1000w",
    type: "handKnottedRugs",
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
          content: "Identify Woodnotes carpet types in the image. If the image is not a Woodnotes carpet, all types should be false.",
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
                detail: "auto"
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