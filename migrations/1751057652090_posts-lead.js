export const up = (pgm) => {
  pgm.addColumns('posts', {
    lead: { type: 'text', notNull: true },
  });
};
