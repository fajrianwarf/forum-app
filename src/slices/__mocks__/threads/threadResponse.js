const mockThreadListResponse = {
  status: 'success',
  message: 'threads retrieved',
  data: {
    threads: [
      {
        id: 'thread-01',
        title: 'Hello',
        body: 'World!\n~',
        category: '👋🏻🌏',
        createdAt: '2025-05-05T09:17:18.785Z',
        ownerId: 'user-01',
        totalComments: 0,
        upVotesBy: ['user-02'],
        downVotesBy: ['user-03'],
      },
      {
        id: 'thread-02',
        title: 'Halo Bang Messi',
        body: 'haloww',
        category: 'greeting',
        createdAt: '2025-05-05T09:00:18.570Z',
        ownerId: 'user-02',
        totalComments: 0,
        upVotesBy: ['user-01'],
        downVotesBy: [],
      },
      {
        id: 'thread-03',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-03',
        totalComments: 1,
        upVotesBy: ['user-01'],
        downVotesBy: [],
      },
      {
        id: 'thread-04',
        title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
        body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
        category: 'perkenalan',
        createdAt: '2023-05-29T07:54:35.746Z',
        ownerId: 'user-04',
        totalComments: 3,
        upVotesBy: ['user-01', 'user-02'],
        downVotesBy: [],
      },
    ],
  },
};

const mockThreadDetailResponse = {
  status: 'success',
  message: 'thread retrieved',
  data: {
    detailThread: {
      id: 'thread-01',
      title: 'Hello',
      body: 'World!\n~',
      createdAt: '2025-05-05T09:17:18.785Z',
      owner: {
        id: 'user-01',
        name: 'Thread Starter',
        avatar:
          'https://ui-avatars.com/api/?name=Thread Starter&background=random',
      },
      category: '👋🏻🌏',
      comments: [
        {
          id: 'comment-01',
          content: 'haloww',
          createdAt: '2025-05-05T09:25:14.577Z',
          owner: {
            id: 'user-05',
            name: 'ali',
            avatar: 'https://ui-avatars.com/api/?name=ali&background=random',
          },
          upVotesBy: ['user-01'],
          downVotesBy: [],
        },
      ],
      upVotesBy: ['user-02'],
      downVotesBy: ['user-03'],
    },
  },
};

export { mockThreadListResponse, mockThreadDetailResponse };
