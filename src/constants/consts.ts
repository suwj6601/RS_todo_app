import moment from 'moment';
export default {
  VI: 'vi',
  EN: 'en',

  TOKEN: 'TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',

  IMAGE: 'image',
  VIDEO: 'video',
  HTML: 'html',
  FILE: 'file',
  FOLDER: 'folder',

  LANGUAGE: 'LANGUAGE',
  FORMAT_TIME: 'DD/MM/YYYY',
  FORMAT_DATE: 'YYYY-MM-DD',

  ACTION: {
    1: 'BID',
    2: 'BUDGET',
  },

  BID_RATE: {
    LOWER: 3,
    UPPER: 10,
  },

  ascend: 'ASC',
  descend: 'DESC',

  WAIT_DEBOUNCE: 200,
};

export const DEFAULT_CURRENT_SIZE = 10;
export const DEFAULT_SMALL_CURRENT_SIZE = 5;
export const DEFAULT_LARGE_CURRENT_SIZE = 20;

export const STATUS = {
  TODO: 'Todo',
  DONE: 'Done',
  HOLD: 'Hold',
};

export const PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const INIT_TODO = [
  {
    title: 'test1',
    description:
      'Donec in mi vel felis fermentum volutpat. Ut in erat vel arcu rutrum egestas eu a mauris',
    status: 'Todo',
    dueDate: [moment('2024-01-24T03:32:34.750Z'), moment('2024-01-24T03:32:34.750Z')],
    priority: 'High',
    id: '36ff8afd-d7f4-40b8-aa76-7c3448c65ff9',
  },
  {
    title: 'test2',
    description:
      'Mauris a lacus enim. Maecenas ac pulvinar ipsum. Integer at massa eu libero aliquam faucibus vel ut dolor. Donec euismod leo libero, quis convallis dolor egest',
    status: 'Hold',
    dueDate: [moment('2024-01-09T03:32:56.831Z'), moment('2024-01-27T03:32:56.831Z')],
    priority: 'Medium',
    id: 'a40cc5c5-aae0-4854-8ae1-da572901a7f1',
  },
  {
    title: 'test3',
    description:
      'ula congue pellentesque sit amet vel arcu. In varius pellentesque tempor. Vivamus venenatis risus vitae nibh consectetur varius. Duis ante massa, egestas quis fin',
    status: 'Done',
    dueDate: [moment('2024-01-23T03:33:16.069Z'), moment('2024-02-22T03:33:16.069Z')],
    priority: 'High',
    id: 'fa42a3d0-0d67-453f-9d8e-5c067bf4ec86',
  },
  {
    title: 'test4',
    description:
      'ula congue pellentesque sit amet vel arcu. In varius pellentesque tempor. Vivamus venenatis risus vitae nibh consectetur varius. Duis ante massa, egestas quis fin',
    status: 'Hold',
    dueDate: [moment('2024-12-31T03:33:16.069Z'), moment('2024-08-11T03:33:16.069Z')],
    priority: 'Medium',
    id: 'fa42a3d0-0d67-453f-9d8e-5c067bf4ec22',
  },
  {
    title: 'test5',
    description:
      'ula congue pellentesque sit amet vel arcu. In varius pellentesque tempor. Vivamus venenatis risus vitae nibh consectetur varius. Duis ante massa, egestas quis fin',
    status: 'Todo',
    dueDate: [moment('2024-12-11T03:33:16.069Z'), moment('2024-08-24T03:33:16.069Z')],
    priority: 'Medium',
    id: 'fa42a3d0-0d67-453f-9d8e-5c067bf4ed1',
  },
  {
    title: 'test6',
    description: 's vulputate nisi et felis vulputate sodales. Ut no',
    status: 'Hold',
    dueDate: [moment('2023-12-11T03:33:16.069Z'), moment('2023-08-24T03:33:16.069Z')],
    priority: 'Medium',
    id: 'fa42a3d0-0d67-453f-9d8e-5c067bf4ed1',
  },
  {
    title: 'test7',
    description: 'n mi vel felis fermentum volutpat. Ut in erat vel arcu rutrum egesta',
    status: 'Todo',
    dueDate: [moment('2025-12-11T03:33:16.069Z'), moment('2025-08-24T03:33:16.069Z')],
    priority: 'Medium',
    id: 'fa42a3d0-0d67-453f-9d8e-5c067bf4ed1',
  },
];
