import * as migration_20260910_053254_initial_cms from './20260910_053254_initial_cms';
import * as migration_20260910_053415_course_card_title from './20260910_053415_course_card_title';
import * as migration_20260913_044647_testimonials from './20260913_044647_testimonials';

export const migrations = [
  {
    up: migration_20260910_053254_initial_cms.up,
    down: migration_20260910_053254_initial_cms.down,
    name: '20260910_053254_initial_cms',
  },
  {
    up: migration_20260910_053415_course_card_title.up,
    down: migration_20260910_053415_course_card_title.down,
    name: '20260910_053415_course_card_title',
  },
  {
    up: migration_20260913_044647_testimonials.up,
    down: migration_20260913_044647_testimonials.down,
    name: '20260913_044647_testimonials'
  },
];
