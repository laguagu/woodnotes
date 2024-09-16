export type Photo = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
};

export type RugMaterialPhotos = {
  name: string;
  photos: Photo[];
};

export const rugPhotos: RugMaterialPhotos[] = [
  {
    name: "paperYarnRugs",
    photos: [
      {
        id: "1",
        name: "paperYarnRugs",
        href: "paperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "paperYarnRugs",
        href: "paperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "paperYarnRugs",
        href: "paperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "handKnottedRugs",
    photos: [
      {
        id: "1",
        name: "handKnottedRugs",
        href: "handKnottedRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "handKnottedRugs",
        href: "handKnottedRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "tuftedRugs",
    photos: [
      {
        id: "1",
        name: "tuftedRugs",
        href: "tuftedRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "tuftedRugs",
        href: "tuftedRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "tuftedRugs",
        href: "tuftedRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "outdoorRugs",
    photos: [
      {
        id: "1",
        name: "outdoorRugs",
        href: "outdoorRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "outdoorRugs",
        href: "outdoorRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "outdoorRugs",
        href: "outdoorRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "cottonPaperYarnRugs",
    photos: [
      {
        id: "1",
        name: "cottonPaperYarnRugs",
        href: "cottonPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "cottonPaperYarnRugs",
        href: "cottonPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "cottonPaperYarnRugs",
        href: "cottonPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "woolPaperYarnRugs",
    photos: [
      {
        id: "1",
        name: "woolPaperYarnRugs",
        href: "woolPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "woolPaperYarnRugs",
        href: "woolPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "woolPaperYarnRugs",
        href: "woolPaperYarnRugs",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
];
export const photos: Photo[] = [
  {
    id: "1",
    name: "paperYarnRugs",
    href: "paperYarnRugs",
    imageSrc: "/care-instructions/paper-yarn-rugs.png",
  },
  {
    id: "2",
    name: "handKnottedRugs",
    href: "handKnottedRugs",
    imageSrc: "/care-instructions/hand-knotted-rugs.png",
  },
  {
    id: "3",
    name: "tuftedRugs",
    href: "tuftedRugs",
    imageSrc: "/care-instructions/tufted-rugs.png",
  },
  {
    id: "4",
    name: "outdoorRugs",
    href: "outdoorRugs",
    imageSrc: "/care-instructions/outdoor-rugs.png",
  },
  {
    id: "5",
    name: "cottonPaperYarnRugs",
    href: "cottonPaperYarnRugs",
    imageSrc: "/care-instructions/cotton-paper-yarn-rugs.png",
  },
  {
    id: "6",
    name: "woolPaperYarnRugs",
    href: "woolPaperYarnRugs",
    imageSrc: "/care-instructions/wool-paper-yarn-rugs.png",
  },
];
export default photos;
