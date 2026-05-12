export const COLS = 4;
export const ROWS = 5;

// Win condition: Cao Cao (caocao) must reach col=1, row=3
export const WIN_COL = 1;
export const WIN_ROW = 3;

export const LEVELS = [
  {
    id: 1,
    name: '横刀立马',
    subtitle: 'Hengdao Lima',
    description: 'La configuración clásica. Cao Cao está atrapado por sus generales.',
    difficulty: 1,
    minMoves: 81,
    story: 'En la Batalla del Río Rojo, Cao Cao debe escapar por el desfiladero de Huarong. Sus generales le protegen, ¡pero también le bloquean!',
    pieces: [
      { id: 'caocao',    name: '曹操', sub: 'Cao Cao',     col: 1, row: 0, w: 2, h: 2, type: 'caocao' },
      { id: 'p1',        name: '张飞', sub: 'Zhang Fei',   col: 0, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p2',        name: '赵云', sub: 'Zhao Yun',    col: 3, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p3',        name: '马超', sub: 'Ma Chao',     col: 0, row: 2, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p4',        name: '黄忠', sub: 'Huang Zhong', col: 3, row: 2, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p5',        name: '关羽', sub: 'Guan Yu',     col: 1, row: 2, w: 2, h: 1, type: 'hgeneral' },
      { id: 's1',        name: '兵',   sub: 'Bing',        col: 1, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's2',        name: '兵',   sub: 'Bing',        col: 2, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's3',        name: '兵',   sub: 'Bing',        col: 0, row: 4, w: 1, h: 1, type: 'soldier' },
      { id: 's4',        name: '兵',   sub: 'Bing',        col: 3, row: 4, w: 1, h: 1, type: 'soldier' },
    ],
  },
  {
    id: 2,
    name: '兵分两路',
    subtitle: 'Bing Fen Liang Lu',
    description: 'Los soldados flanquean el tablero. Una ruta diferente hacia la libertad.',
    difficulty: 2,
    minMoves: 73,
    story: 'Las tropas se dividen en dos flancos. Cao Cao debe navegar entre sus propias fuerzas para encontrar la salida al desfiladero.',
    pieces: [
      { id: 'caocao',    name: '曹操', sub: 'Cao Cao',     col: 1, row: 0, w: 2, h: 2, type: 'caocao' },
      { id: 'p1',        name: '张飞', sub: 'Zhang Fei',   col: 0, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p2',        name: '赵云', sub: 'Zhao Yun',    col: 3, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p5',        name: '关羽', sub: 'Guan Yu',     col: 1, row: 2, w: 2, h: 1, type: 'hgeneral' },
      { id: 'p3',        name: '马超', sub: 'Ma Chao',     col: 0, row: 3, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p4',        name: '黄忠', sub: 'Huang Zhong', col: 3, row: 3, w: 1, h: 2, type: 'vgeneral' },
      { id: 's1',        name: '兵',   sub: 'Bing',        col: 1, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's2',        name: '兵',   sub: 'Bing',        col: 2, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's3',        name: '兵',   sub: 'Bing',        col: 0, row: 2, w: 1, h: 1, type: 'soldier' },
      { id: 's4',        name: '兵',   sub: 'Bing',        col: 3, row: 2, w: 1, h: 1, type: 'soldier' },
    ],
  },
  {
    id: 3,
    name: '近在咫尺',
    subtitle: 'Jin Zai Zhichi',
    description: 'La salida está tan cerca... pero los generales horizontales lo hacen imposible.',
    difficulty: 3,
    minMoves: 100,
    story: 'La libertad está al alcance de la mano, pero cuatro generales horizontales cierran cada paso. El desafío definitivo del Desfiladero de Huarong.',
    pieces: [
      { id: 'caocao',    name: '曹操', sub: 'Cao Cao',     col: 1, row: 0, w: 2, h: 2, type: 'caocao' },
      { id: 'p1',        name: '张飞', sub: 'Zhang Fei',   col: 0, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p2',        name: '赵云', sub: 'Zhao Yun',    col: 3, row: 0, w: 1, h: 2, type: 'vgeneral' },
      { id: 'p3',        name: '关羽', sub: 'Guan Yu',     col: 0, row: 2, w: 2, h: 1, type: 'hgeneral' },
      { id: 'p4',        name: '马超', sub: 'Ma Chao',     col: 2, row: 2, w: 2, h: 1, type: 'hgeneral' },
      { id: 'p5',        name: '黄忠', sub: 'Huang Zhong', col: 1, row: 3, w: 2, h: 1, type: 'hgeneral' },
      { id: 's1',        name: '兵',   sub: 'Bing',        col: 0, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's2',        name: '兵',   sub: 'Bing',        col: 3, row: 3, w: 1, h: 1, type: 'soldier' },
      { id: 's3',        name: '兵',   sub: 'Bing',        col: 0, row: 4, w: 1, h: 1, type: 'soldier' },
      { id: 's4',        name: '兵',   sub: 'Bing',        col: 3, row: 4, w: 1, h: 1, type: 'soldier' },
    ],
  },
];
