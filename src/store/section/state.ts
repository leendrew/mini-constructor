import type { SectionState } from './types';

export const state: SectionState = {
  sections: [
    {
      id: 0,
      type: 'text',
      data: {
        title: 'Title',
        description: 'description',
      },
    },
    {
      id: 1,
      type: 'cards',
      data: [
        {
          id: 0,
          title: 'card 1',
          description: 'description of card 1',
        },
        {
          id: 1,
          title: 'card 2',
          description: 'description of card 2',
        },
      ],
    },
  ],
};
