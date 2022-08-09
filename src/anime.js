import {
  clamp,
  random,
} from './helpers.js';

import {
  parseEasings,
  penner,
} from './easings.js';

import {
  convertPxToUnit,
} from './units.js';

import {
  getOriginalTargetValue,
  setTargetsValue,
} from './values.js';

import {
  setDashoffset,
  getPath,
} from './svg.js';

import {
  removeAnimatablesFromActiveInstances,
} from './animatables.js';

import {
  activeInstances,
} from './engine.js';

import {
  animate,
} from './animate.js';

import {
  createTimeline,
} from './timelines.js';

import {
  stagger,
} from './stagger.js';


const anime = animate;

anime.version = '__packageVersion__';
anime.speed = 1;
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeAnimatablesFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = createTimeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.clamp = clamp;
anime.random = random;

export default anime;