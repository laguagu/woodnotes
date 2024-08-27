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
        name: "lacqueredWood",
        href: "wood",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "lacqueredWood",
        href: "wood",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "tuftedRugs",
    photos: [
      {
        id: "1",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "outdoorRugs",
    photos: [
      {
        id: "1",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "duetto",
    photos: [
      {
        id: "1",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "piccolo",
    photos: [
      {
        id: "1",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "minore",
    photos: [
      {
        id: "1",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
];

const photos: Photo[] = [
  {
    id: "1",
    name: "wood",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "2",
    name: "laminate",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "3",
    name: "metal",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "4",
    name: "leather",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "5",
    name: "plastic",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "6",
    name: "fabric",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
  {
    id: "7",
    name: "outdoor",
    href: "akademia",
    imageSrc: "/care-instructions/empty.png",
  },
];

export default photos;
