export const pool = [
  {id: 1, title: 'Post 1 Title', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {commentor: "John", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 2, replies: [
      {commentor: "Mike", text: 'Bonjour', rate: 2, date: new Date(2023, 6, 18, 9, 10, 5).getTime(), isDeletable: false}
    ], date: new Date(2023, 6, 19, 6, 25, 36).getTime(), isDeletable: false},
    {commentor: "Stephany", text: "I'm hungry!", rate: 3, replies: [], date: new Date(2023, 6, 19, 7, 43, 21).getTime(), isDeletable: false},
    {commentor: "Walter", text: 'Got it!!', rate: 5, replies: [], date: new Date(2023, 6, 17, 3, 2, 45).getTime(), isDeletable: false}
  ]},
  {id: 2, title: 'Post 2 Title', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {commentor: "Benjamin", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 4, replies: [], date: new Date(2023, 6, 14, 9, 10, 5).getTime(), isDeletable: false},
    {commentor: "Foxy", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 1, replies: [], date: new Date(2023, 6, 16, 16, 16, 28).getTime(), isDeletable: false},
  ]},
  {id: 3, title: 'Post 3 Title', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {commentor: "Bob", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 1, replies: [], date: new Date(2023, 6, 13, 7, 36, 23).getTime(), isDeletable: false},
    {commentor: "Jack", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 5, replies: [], date: new Date(2023, 6, 13, 9, 15, 6).getTime(), isDeletable: false},
    {commentor: "Harry", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 2, replies: [], date: new Date(2023, 6, 13, 6, 43, 15).getTime(), isDeletable: false}
  ]},
  {id: 4, title: 'Post 4 Title', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {commentor: "Piter", text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 5, replies: [], date: new Date(2023, 6, 11, 9, 35, 20).getTime(), isDeletable: false}
  ]}
];